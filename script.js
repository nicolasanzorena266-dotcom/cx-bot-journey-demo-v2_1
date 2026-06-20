let currentNodeId = "start";
let events = [];
let visitedNodeIds = [];
let lastRealNodeId = "start";
let lastAdvisorTriggerNodeId = "";
let caseId = createCaseId();
let offRouteTextCount = 0;
let caseData = {};

const chat = document.getElementById("chat");
const options = document.getElementById("options");
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const summary = document.getElementById("summary");
const advisorCard = document.getElementById("advisorCard");
const contextStatus = document.getElementById("contextStatus");

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

document.querySelectorAll(".module-chip").forEach(button => {
  button.addEventListener("click", () => {
    const targetModule = button.dataset.module;
    const option = (FLOW.start.options || []).find(item => item.label === targetModule);
    restart(false);
    setTimeout(() => {
      if (!option) return;
      applySet(option.set);
      addClientMessage(option.label, "boton");
      goToNode(option.next);
    }, 350);
  });
});

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = textInput.value.trim();
  if (!text) return;

  addClientMessage(text, "texto");
  textInput.value = "";

  const node = FLOW[currentNodeId];
  if (node && node.input && node.next) {
    if (node.inputKey) caseData[node.inputKey] = text;
    setTimeout(() => goToNode(node.next), 450);
    return;
  }

  offRouteTextCount += 1;
  setTimeout(() => {
    if (offRouteTextCount >= 2) {
      addBotMessage("Veo que no pudiste avanzar con las opciones. Te paso con un asesor para continuar.");
      lastAdvisorTriggerNodeId = lastRealNodeId;
      addAdvisorMessage("Hola, soy un asesor. Ya tengo el recorrido que hiciste con Pía.");
      currentNodeId = "__advisor__";
      clearOptions();
      renderAdvisorCard();
    } else {
      addBotMessage("Para seguir, elegí una de las opciones disponibles del menú.");
      renderOptions(node?.options || []);
    }
  }, 450);
});

function createCaseId() {
  return "CX-" + new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");
}

function now() {
  return new Date();
}

function formatTime(date) {
  return date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function addEvent(actor, type, content) {
  events.push({ timestamp: now().toISOString(), actor, type, content });
}

function addMessage(content, actor) {
  const div = document.createElement("div");
  div.className = `message ${actor}`;
  div.innerHTML = `${escapeHtml(content)}<span class="time">${formatTime(now())}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(content) {
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
  if (!optionList || !optionList.length) return;

  optionList.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.type = "button";
    btn.textContent = option.label;
    btn.addEventListener("click", () => {
      offRouteTextCount = 0;
      applySet(option.set);
      addClientMessage(option.label, "boton");
      setTimeout(() => goToNode(option.next), 400);
    });
    options.appendChild(btn);
  });
}

function clearOptions() {
  options.innerHTML = "";
}

function applySet(set = {}) {
  Object.entries(set || {}).forEach(([key, value]) => {
    caseData[key] = value;
  });
  highlightSelectedModule();
}

function highlightSelectedModule() {
  document.querySelectorAll(".module-chip").forEach(button => {
    button.classList.toggle("selected", button.dataset.module === caseData.module);
  });
}

function goToNode(nodeId) {
  const node = FLOW[nodeId];
  if (!node) {
    addBotMessage("No encontré ese camino del flujo.");
    return;
  }

  if (node.module && !caseData.module && node.module !== "Demo") {
    caseData.module = node.module;
  }

  currentNodeId = nodeId;
  lastRealNodeId = nodeId;
  visitedNodeIds.push(nodeId);
  clearOptions();
  highlightSelectedModule();
  addBotMessage(node.bot);

  if (node.autoNext && node.router === "serviceLocation") {
    setTimeout(() => {
      goToNode(caseData.serviceType === "Línea móvil" ? "support_mobile_line" : "support_address");
    }, 700);
    return;
  }

  if (node.advisor) {
    lastAdvisorTriggerNodeId = nodeId;
    setTimeout(() => {
      addAdvisorMessage("Hola, soy un asesor. Ya veo el recorrido que hiciste con Pía.");
      currentNodeId = "__advisor__";
      renderAdvisorCard();
    }, 700);
    return;
  }

  if (node.resolved) {
    currentNodeId = "__resolved__";
    return;
  }

  if (node.options) renderOptions(node.options);
}

function restart(showStart = true) {
  currentNodeId = "start";
  events = [];
  visitedNodeIds = [];
  lastRealNodeId = "start";
  lastAdvisorTriggerNodeId = "";
  caseId = createCaseId();
  offRouteTextCount = 0;
  caseData = {};
  chat.innerHTML = "";
  summary.classList.add("hidden");
  summary.innerHTML = "";
  clearOptions();
  resetAdvisorCard();
  highlightSelectedModule();
  if (showStart) setTimeout(() => goToNode("start"), 250);
}

function resetAdvisorCard() {
  contextStatus.textContent = "En espera";
  contextStatus.className = "status-pill waiting";
  advisorCard.className = "empty-state";
  advisorCard.innerHTML = `
    <div class="empty-icon">▧</div>
    <h3>Sin contexto todavía</h3>
    <p>Elegí un flujo y avanzá el recorrido. Cuando el bot derive a asesor, la card se completa con los datos capturados.</p>
  `;
}

function getAdvisorSuggestion() {
  const nodeId = lastAdvisorTriggerNodeId || lastRealNodeId;
  return ADVISOR_SUGGESTIONS[nodeId] || ADVISOR_SUGGESTIONS.default;
}

function renderAdvisorCard() {
  const analysis = getForensicAnalysis(buildContext());
  const moduleClass = normalizeClass(caseData.module || "default");
  const rows = getAdvisorRows(caseData.module);
  const crmRows = analysis.crm || [];
  const chips = (analysis.genes || []).map(g => `<span class="mini-chip">${escapeHtml(g)}</span>`).join("");
  const severity = getSeverityBadge(caseData.module);

  contextStatus.textContent = "Contexto listo";
  contextStatus.className = "status-pill ready";
  advisorCard.className = `advisor-card-live ${moduleClass}`;
  advisorCard.innerHTML = `
    <div class="advisor-alert-head">
      <div class="advisor-icon">${getModuleIcon(caseData.module)}</div>
      <div>
        <h3>${escapeHtml(analysis.title)}</h3>
        <p>${escapeHtml(analysis.caseName || "Caso derivado a asesor")}</p>
      </div>
      <span class="severity-badge">${escapeHtml(severity)}</span>
    </div>

    <div class="advisor-data">
      ${rows.map(row => `
        <div class="data-row">
          <div class="data-icon">${getRowIcon(row.label)}</div>
          <span>${escapeHtml(row.label)}:</span>
          <strong>${escapeHtml(row.value || "No informado")}</strong>
        </div>
      `).join("")}
    </div>

    ${chips ? `<div class="chip-row">${chips}</div>` : ""}

    ${crmRows.length ? `
      <div class="crm-box">
        <h4>Historial CRM / herramientas</h4>
        <ul>${crmRows.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
    ` : ""}

    <div class="suggestion-box">
      <h4>Acción sugerida</h4>
      <p>${escapeHtml(analysis.recommendation)}</p>
    </div>
  `;
}

function getSeverityBadge(module) {
  const map = {
    "Ventas": "COMERCIAL",
    "Onboarding": "ATENCIÓN",
    "Soporte": "PRIORIZAR",
    "Retención": "ALTO RIESGO",
    "Prepago": "PENDIENTE",
    "Overnight": "PENDIENTE"
  };
  return map[module] || "CX";
}

function getRowIcon(label) {
  const text = normalizeClass(label);
  if (text.includes("dni")) return "▧";
  if (text.includes("servicio")) return "⌁";
  if (text.includes("motivo")) return "◇";
  if (text.includes("caso")) return "▣";
  if (text.includes("friccion")) return "△";
  if (text.includes("historial")) return "↺";
  if (text.includes("domicilio") || text.includes("linea")) return "⌂";
  if (text.includes("importe")) return "$";
  if (text.includes("promo") || text.includes("canal")) return "◌";
  if (text.includes("inconveniente")) return "⚠";
  if (text.includes("fecha")) return "◷";
  if (text.includes("pruebas")) return "✓";
  return "•";
}

function getAdvisorRows(module) {
  if (module === "Ventas") {
    return [
      { label: "DNI/CUIT", value: caseData.dniCuit },
      { label: "Servicio / producto solicitado", value: caseData.requestedProductDetail || caseData.requestedProduct },
      { label: "Motivo", value: "Consulta comercial" }
    ];
  }

  if (module === "Onboarding") {
    return [
      { label: "DNI/CUIT", value: caseData.dniCuit },
      { label: "Servicio", value: caseData.serviceType },
      { label: caseData.serviceType === "Línea móvil" ? "Línea" : "Domicilio", value: caseData.mobileLine || caseData.address },
      { label: "Motivo", value: "Consulta por conceptos facturados" },
      { label: "Submotivo", value: caseData.subReason },
      { label: "Importe informado en venta", value: caseData.saleAmount },
      { label: "Importe visualizado en factura", value: caseData.invoiceAmount },
      { label: "Promo/descuento informado", value: caseData.promoInfo },
      { label: "Canal de oferta declarado", value: caseData.offerChannel }
    ];
  }

  if (module === "Soporte") {
    return [
      { label: "DNI/CUIT", value: caseData.dniCuit },
      { label: "Inconveniente", value: caseData.technicalIssue },
      { label: "Servicio", value: caseData.serviceType },
      { label: caseData.serviceType === "Línea móvil" ? "Línea afectada" : "Domicilio", value: caseData.mobileLine || caseData.address },
      { label: "Fecha de inicio", value: caseData.issueStartDate },
      { label: "Pruebas realizadas", value: caseData.testsDoneDetail || caseData.testsDone }
    ];
  }

  if (module === "Retención") {
    return [
      { label: "DNI/CUIT", value: caseData.dniCuit },
      { label: "Servicio", value: caseData.serviceType },
      { label: "Motivo declarado", value: caseData.retentionReasonDetail || caseData.retentionReason },
      { label: "Caso", value: "Intención de baja, disconformidad o migración" }
    ];
  }

  return [
    { label: "Módulo", value: module },
    { label: "Estado", value: "Pendiente de definición" }
  ];
}

function getModuleIcon(module) {
  const map = {
    "Ventas": "▣",
    "Onboarding": "◉",
    "Soporte": "⚙",
    "Prepago": "◌",
    "Overnight": "☾",
    "Retención": "↺"
  };
  return map[module] || "▧";
}

function buildContext() {
  return { events, visitedNodeIds, lastRealNodeId, lastAdvisorTriggerNodeId, currentNodeId, caseData, metrics: getMetrics() };
}

function showAdvisorSuggestion() {
  const suggestion = getAdvisorSuggestion();
  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h2>Sugerencia para asesor</h2>
    <div class="soft-card"><p>${escapeHtml(suggestion)}</p></div>
  `;
}

function showForensicAnalysis() {
  const analysis = getForensicAnalysis(buildContext());
  summary.classList.remove("hidden");
  summary.innerHTML = `
    <h2>Análisis CX</h2>
    <div class="analysis-grid">
      <div><span>Módulo</span><strong>${escapeHtml(analysis.module)}</strong></div>
      <div><span>Caso</span><strong>${escapeHtml(analysis.caseName || "No definido")}</strong></div>
      <div><span>Fricción</span><strong>${escapeHtml(analysis.friction)}</strong></div>
      <div><span>Riesgo</span><strong>${escapeHtml(analysis.risk)}</strong></div>
    </div>
    <div class="soft-card">
      <h3>Punto de quiebre</h3>
      <p>${escapeHtml(analysis.point)}</p>
      <h3>Acción sugerida</h3>
      <p>${escapeHtml(analysis.recommendation)}</p>
    </div>
  `;
}

function getMetrics() {
  const botEvents = events.filter(e => e.actor === "bot");
  const clientButtonEvents = events.filter(e => e.actor === "cliente" && e.type === "boton");
  const clientTextEvents = events.filter(e => e.actor === "cliente" && e.type === "texto");
  const advisorEvents = events.filter(e => e.actor === "asesor");
  const firstBot = botEvents[0];
  const lastBot = botEvents[botEvents.length - 1];

  return {
    "ID caso": caseId,
    "Módulo": caseData.module || "No seleccionado",
    "DNI/CUIT": caseData.dniCuit || "",
    "Inicio bot": firstBot ? formatTime(new Date(firstBot.timestamp)) : "",
    "Fin bot": lastBot ? formatTime(new Date(lastBot.timestamp)) : "",
    "Tiempo en bot": firstBot && lastBot ? msToHuman(new Date(lastBot.timestamp) - new Date(firstBot.timestamp)) : "No disponible",
    "Botones seleccionados": clientButtonEvents.length,
    "Mensajes escritos": clientTextEvents.length,
    "Atendido por asesor": advisorEvents.length ? "Sí" : "No",
    "Nodo final": lastAdvisorTriggerNodeId || lastRealNodeId,
    "Cadena de opciones": clientButtonEvents.map(e => e.content).join(" >> "),
    "Datos capturados": JSON.stringify(caseData)
  };
}

function showReport() {
  const metrics = getMetrics();
  const rows = Object.entries(metrics).map(([key, value]) => `
    <tr><th>${escapeHtml(key)}</th><td>${escapeHtml(String(value || ""))}</td></tr>
  `).join("");

  summary.classList.remove("hidden");
  summary.innerHTML = `<h2>Métricas del recorrido</h2><table>${rows}</table>`;
}

function downloadCSV() {
  const metrics = getMetrics();
  const analysis = getForensicAnalysis(buildContext());
  const data = {
    ...metrics,
    "Caso CX": analysis.caseName || "",
    "Fricción": analysis.friction || "",
    "Riesgo": analysis.risk || "",
    "Punto de quiebre": analysis.point || "",
    "Acción sugerida": analysis.recommendation || ""
  };

  const headers = Object.keys(data);
  const values = headers.map(h => csvEscape(data[h]));
  const csv = "\uFEFF" + headers.map(csvEscape).join(";") + "\n" + values.join(";");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${caseId}_cx_lab.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const str = String(value ?? "");
  return `"${str.replaceAll('"', '""')}"`;
}

function normalizeClass(text) {
  return String(text || "default").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function msToHuman(ms) {
  if (ms < 0 || Number.isNaN(ms)) return "No disponible";
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

restart();
