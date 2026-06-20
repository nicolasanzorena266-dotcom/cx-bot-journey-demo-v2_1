let currentNodeId = "start";
let events = [];
let caseId = "DEMO-" + new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
let offRouteTextCount = 0;
let started = false;
let customerData = {
  dniCuit: "",
  service: ""
};
let visitedNodeIds = [];
let lastRealNodeId = "start";
let lastAdvisorTriggerNodeId = "";

const chat = document.getElementById("chat");
const options = document.getElementById("options");
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const summary = document.getElementById("summary");

const restartBtn = document.getElementById("restartBtn");
const reportBtn = document.getElementById("reportBtn");
const forensicBtn = document.getElementById("forensicBtn");
const advisorSuggestionBtn = document.getElementById("advisorSuggestionBtn");
const csvBtn = document.getElementById("csvBtn");

restartBtn.addEventListener("click", restart);
reportBtn.addEventListener("click", showReport);
forensicBtn.addEventListener("click", showForensicAnalysis);
advisorSuggestionBtn.addEventListener("click", showAdvisorSuggestion);
csvBtn.addEventListener("click", downloadCSV);

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  if (!text) return;

  addClientMessage(text, "texto");
  textInput.value = "";

  const node = FLOW[currentNodeId];

  if (node && node.input && node.next) {
    if (currentNodeId === "start") {
      customerData.dniCuit = text;
    }
    setTimeout(() => goToNode(node.next), 450);
    return;
  }

  offRouteTextCount += 1;

  if (offRouteTextCount >= 2) {
    setTimeout(() => {
      addBotMessage("Veo que no pudiste avanzar con las opciones. Te paso con un asesor para que pueda ayudarte.");
      addAdvisorMessage("Hola, soy un asesor. Ya tengo el recorrido que hiciste con el bot.");
      clearOptions();
      lastAdvisorTriggerNodeId = lastRealNodeId;
      currentNodeId = "__advisor__";
    }, 450);
  } else {
    setTimeout(() => {
      addBotMessage("Para seguir, elegí una de las opciones disponibles del menú.");
      renderOptions(FLOW[currentNodeId]?.options || []);
    }, 450);
  }
});

function now() {
  return new Date();
}

function formatTime(date) {
  return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function addEvent(actor, type, content) {
  events.push({
    timestamp: now().toISOString(),
    actor,
    type,
    content
  });
}

function addMessage(content, actor) {
  const div = document.createElement("div");
  div.className = `message ${actor}`;
  div.innerHTML = `${escapeHtml(content)}<span class="time">${formatTime(now())}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(content) {
  if (!started) started = true;
  addMessage(content, "bot");
  addEvent("bot", "mensaje_bot", content);
}

function addClientMessage(content, type = "texto") {
  addMessage(content, "client");
  addEvent("cliente", type, content);
}

function addAdvisorMessage(content) {
  addMessage(content, "advisor");
  addEvent("asesor", "mensaje_asesor", content);
}

function renderOptions(optionList) {
  clearOptions();

  if (!optionList || optionList.length === 0) return;

  optionList.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.type = "button";
    btn.textContent = option.label;
    btn.addEventListener("click", () => {
      offRouteTextCount = 0;
      if (currentNodeId === "service_menu") {
        customerData.service = option.label;
      }
      addClientMessage(option.label, "boton");
      setTimeout(() => goToNode(option.next), 400);
    });
    options.appendChild(btn);
  });
}

function clearOptions() {
  options.innerHTML = "";
}

function goToNode(nodeId) {
  const node = FLOW[nodeId];
  if (!node) {
    addBotMessage("No encontré ese camino del flujo.");
    return;
  }

  currentNodeId = nodeId;
  lastRealNodeId = nodeId;
  visitedNodeIds.push(nodeId);
  clearOptions();
  addBotMessage(node.bot);

  if (node.advisor) {
    lastAdvisorTriggerNodeId = nodeId;
    setTimeout(() => {
      addAdvisorMessage("Hola, soy un asesor. Ya veo el recorrido que hiciste con Pía.");
      currentNodeId = "__advisor__";
    }, 700);
    return;
  }

  if (node.resolved) {
    currentNodeId = "__resolved__";
    return;
  }

  if (node.options) {
    renderOptions(node.options);
  }
}

function restart() {
  currentNodeId = "start";
  events = [];
  caseId = "DEMO-" + new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
  offRouteTextCount = 0;
  started = false;
  customerData = { dniCuit: "", service: "" };
  visitedNodeIds = [];
  lastRealNodeId = "start";
  lastAdvisorTriggerNodeId = "";
  chat.innerHTML = "";
  summary.classList.add("hidden");
  summary.innerHTML = "";
  clearOptions();
  setTimeout(() => goToNode("start"), 250);
}

function getMetrics() {
  const botEvents = events.filter(e => e.actor === "bot");
  const clientButtonEvents = events.filter(e => e.actor === "cliente" && e.type === "boton");
  const clientTextEvents = events.filter(e => e.actor === "cliente" && e.type === "texto");
  const advisorEvents = events.filter(e => e.actor === "asesor");

  const firstBot = botEvents[0];
  const advisorIndex = events.findIndex(e => e.actor === "asesor");
  const botBeforeAdvisor = advisorIndex === -1
    ? botEvents
    : events.slice(0, advisorIndex).filter(e => e.actor === "bot");

  const lastBot = botBeforeAdvisor[botBeforeAdvisor.length - 1] || botEvents[botEvents.length - 1];
  const lastClientBeforeAdvisor = advisorIndex === -1
    ? [...events].reverse().find(e => e.actor === "cliente")
    : events.slice(0, advisorIndex).reverse().find(e => e.actor === "cliente");

  const repeatedBotResponses = countRepeatedMessages(botEvents.map(e => normalize(e.content)));
  const attendedByAdvisor = advisorEvents.length > 0 ? "Sí" : "No";
  const resolvedByBot = inferResolvedByBot(lastBot, attendedByAdvisor);
  const finalState = inferFinalState(attendedByAdvisor, resolvedByBot, lastClientBeforeAdvisor, lastBot);
  const duration = firstBot && lastBot ? msToHuman(new Date(lastBot.timestamp) - new Date(firstBot.timestamp)) : "No disponible";

  return {
    "ID caso": caseId,
    "Módulo CX": customerData.service || "No seleccionado",
    "Inicio bot": firstBot ? formatTime(new Date(firstBot.timestamp)) : "",
    "Fin bot": lastBot ? formatTime(new Date(lastBot.timestamp)) : "",
    "Tiempo invertido en bot": duration,
    "Botones seleccionados por cliente": clientButtonEvents.length,
    "Mensajes escritos por cliente": clientTextEvents.length,
    "Caracteres escritos por cliente": clientTextEvents.reduce((sum, e) => sum + e.content.length, 0),
    "Cantidad de respuestas del bot": botEvents.length,
    "Cantidad de respuestas repetidas del bot": repeatedBotResponses,
    "Último mensaje del bot": lastBot ? lastBot.content : "",
    "Último mensaje del cliente": lastClientBeforeAdvisor ? lastClientBeforeAdvisor.content : "",
    "Atendido por asesor": attendedByAdvisor,
    "Resuelto por bot": resolvedByBot,
    "Estado final inferido": finalState,
    "Nodo final": lastAdvisorTriggerNodeId || lastRealNodeId,
    "Cadena de nodos": visitedNodeIds.join(" >> "),
    "Cadena de opciones": clientButtonEvents.map(e => e.content).join(" >> "),
    "Cadena de respuestas del bot": botEvents.map(e => cleanLine(e.content)).join(" >> ")
  };
}

function inferResolvedByBot(lastBot, attendedByAdvisor) {
  if (attendedByAdvisor === "Sí") return "No";
  if (!lastBot) return "Indeterminado";

  const text = normalize(lastBot.content);
  const positiveClosures = [
    "me alegra haberte ayudado",
    "gracias por comunicarte",
    "te ayudo con algo más",
    "no, gracias"
  ];

  if (positiveClosures.some(p => text.includes(p))) return "Sí";
  return "Indeterminado";
}

function inferFinalState(attendedByAdvisor, resolvedByBot, lastClient, lastBot) {
  if (attendedByAdvisor === "Sí") return "Derivado a asesor";
  if (resolvedByBot === "Sí") return "Resuelto por bot";

  const lastClientText = lastClient ? normalize(lastClient.content) : "";
  if (["hola", "hola?", "hola??", "no responde", "asesor", "ayuda", "no puedo", "no me sirve"].some(p => lastClientText.includes(p))) {
    return "Posible abandono con fricción";
  }

  if (lastBot) return "Sin cierre claro";
  return "Sin actividad";
}

function buildForensicsContext() {
  return {
    events,
    metrics: getMetrics(),
    visitedNodeIds,
    lastRealNodeId,
    lastAdvisorTriggerNodeId,
    currentNodeId,
    customerData
  };
}

function showForensicAnalysis() {
  const analysis = getForensicAnalysis(buildForensicsContext());

  const geneChips = analysis.genes.length
    ? analysis.genes.map(gene => `<span class="chip" title="${escapeHtml(gene.description)}">${escapeHtml(gene.label)}</span>`).join("")
    : `<span class="chip muted-chip">Sin genes detectados</span>`;

  const paradoxes = analysis.paradoxes.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  const signals = analysis.signals.length
    ? analysis.signals.map(item => `<li>${escapeHtml(item)}</li>`).join("")
    : `<li>No aparecen señales adicionales fuera del recorrido declarado.</li>`;

  const blackBox = analysis.blackBox.map((item, index) => `
    <li>
      <span class="event-index">${index + 1}</span>
      <strong>${escapeHtml(item.actor)}</strong>
      <em>${escapeHtml(item.type)}</em>
      <p>${escapeHtml(item.content)}</p>
    </li>
  `).join("");

  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h2>Análisis forense CX</h2>

    <div class="forensic-hero">
      <div>
        <span class="label">Módulo</span>
        <strong>${escapeHtml(analysis.service)}</strong>
      </div>
      <div>
        <span class="label">Riesgo CX</span>
        <strong>${escapeHtml(analysis.riskLevel)} · ${analysis.frictionScore}/10</strong>
      </div>
      <div>
        <span class="label">Gen principal</span>
        <strong>${escapeHtml(analysis.primaryGeneLabel)}</strong>
      </div>
    </div>

    <div class="forensic-grid">
      <article class="forensic-card">
        <h3>Genoma de fricción</h3>
        <div class="chips">${geneChips}</div>
      </article>

      <article class="forensic-card">
        <h3>Paradoja detectada</h3>
        <ul>${paradoxes}</ul>
      </article>

      <article class="forensic-card">
        <h3>Momento irreversible</h3>
        <p>${escapeHtml(analysis.irreversibleMoment)}</p>
      </article>

      <article class="forensic-card">
        <h3>Rediseño sugerido</h3>
        <p>${escapeHtml(analysis.redesignSuggestion)}</p>
      </article>
    </div>

    <div class="comparison">
      <div>
        <h3>Journey actual</h3>
        <p>${escapeHtml(analysis.currentJourney)}</p>
      </div>
      <div>
        <h3>Journey ideal</h3>
        <p>${escapeHtml(analysis.idealJourney)}</p>
      </div>
    </div>

    <details class="details-box" open>
      <summary>Caja negra CX</summary>
      <ol class="blackbox">${blackBox}</ol>
    </details>

    <details class="details-box">
      <summary>Señales adicionales</summary>
      <ul>${signals}</ul>
    </details>

    <details class="details-box">
      <summary>Contexto mínimo para asesor</summary>
      <p>${escapeHtml(analysis.advisorContext)}</p>
    </details>
  `;
}

function showAdvisorSuggestion() {
  const suggestion = getAdvisorSuggestion();
  const metrics = getMetrics();
  const lastPath = metrics["Cadena de opciones"] || "Sin opciones seleccionadas";

  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h2>Sugerencia para asesor</h2>
    <div class="advisor-card">
      <p>${escapeHtml(suggestion)}</p>
      <small>Recorrido: ${escapeHtml(lastPath)}</small>
    </div>
  `;
}

function getAdvisorSuggestion() {
  const metrics = getMetrics();
  const nodeId = lastAdvisorTriggerNodeId || lastRealNodeId;
  const nodeSuggestion = ADVISOR_SUGGESTIONS[nodeId];

  if (nodeSuggestion) return fillTemplate(nodeSuggestion);

  const special = getSpecialSuggestion(metrics);
  if (special) return fillTemplate(special);

  return fillTemplate(SPECIAL_SUGGESTIONS.default);
}

function getSpecialSuggestion(metrics) {
  const clientTexts = events
    .filter(e => e.actor === "cliente" && e.type === "texto")
    .map(e => normalize(e.content));

  const hasFreeTextFriction = clientTexts.some(text =>
    ["hola", "hola?", "hola??", "no responde", "asesor", "ayuda", "no puedo", "no me sirve"].some(pattern => text.includes(pattern))
  );

  if (hasFreeTextFriction) return SPECIAL_SUGGESTIONS.free_text_friction;

  if (Number(metrics["Cantidad de respuestas repetidas del bot"]) > 0) {
    return SPECIAL_SUGGESTIONS.repeated_bot;
  }

  if (Number(metrics["Botones seleccionados por cliente"]) >= 6) {
    return SPECIAL_SUGGESTIONS.long_journey;
  }

  const menuReturns = events.filter(e =>
    e.actor === "cliente" &&
    e.type === "boton" &&
    normalize(e.content).includes("volver")
  ).length;

  if (menuReturns >= 2) return SPECIAL_SUGGESTIONS.repeated_menu;

  if (metrics["Atendido por asesor"] === "Sí" && !lastAdvisorTriggerNodeId) {
    return SPECIAL_SUGGESTIONS.unclear_transfer;
  }

  return "";
}

function fillTemplate(template) {
  const service = customerData.service || "servicio consultado";
  return String(template || "")
    .replaceAll("{{servicio}}", service)
    .replaceAll("{{dni_cuit}}", customerData.dniCuit || "DNI/CUIT informado");
}

function showReport() {
  const metrics = getMetrics();
  summary.classList.remove("hidden");

  const rows = Object.entries(metrics).map(([key, value]) => `
    <tr>
      <th>${escapeHtml(key)}</th>
      <td>${escapeHtml(String(value || ""))}</td>
    </tr>
  `).join("");

  summary.innerHTML = `
    <h2>Métricas del recorrido</h2>
    <table>${rows}</table>
  `;
}

function downloadCSV() {
  const metrics = getMetrics();
  const analysis = getForensicAnalysis(buildForensicsContext());
  const forensicFields = {
    "Riesgo CX": analysis.riskLevel,
    "Score fricción": analysis.frictionScore,
    "Gen principal": analysis.primaryGeneLabel,
    "Genes de fricción": analysis.genes.map(g => g.label).join(" | "),
    "Paradojas detectadas": analysis.paradoxes.join(" | "),
    "Momento irreversible": analysis.irreversibleMoment,
    "Rediseño sugerido": analysis.redesignSuggestion,
    "Journey ideal": analysis.idealJourney,
    "Contexto mínimo asesor": analysis.advisorContext
  };

  const data = { ...metrics, ...forensicFields };
  const headers = Object.keys(data);
  const values = headers.map(h => csvEscape(data[h]));

  const csv = "\uFEFF" + headers.map(csvEscape).join(";") + "\n" + values.join(";");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${caseId}_metricas_forenses.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const str = String(value ?? "");
  return `"${str.replaceAll('"', '""')}"`;
}

function normalize(text) {
  return String(text || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function cleanLine(text) {
  return String(text || "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
}

function countRepeatedMessages(messages) {
  const counts = {};
  let repeats = 0;

  messages.forEach(msg => {
    counts[msg] = (counts[msg] || 0) + 1;
    if (counts[msg] === 2) repeats += 1;
  });

  return repeats;
}

function msToHuman(ms) {
  if (ms < 0 || Number.isNaN(ms)) return "No disponible";
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

restart();
