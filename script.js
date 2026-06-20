const modules = {
  ventas: { label: "Ventas", colorClass: "card-sales", icon: "▣", title: "Ventas | Consulta comercial", badge: "Contexto mínimo" },
  onboarding: { label: "Onboarding", colorClass: "card-onboarding", icon: "◆", title: "Onboarding | Potencial detractor", badge: "Contexto listo" },
  soporte: { label: "Soporte", colorClass: "card-support", icon: "☎", title: "Soporte | Continuidad del servicio", badge: "Contexto listo" },
  retencion: { label: "Retención", colorClass: "card-retention", icon: "⟳", title: "Retención | Riesgo de fuga", badge: "Contexto listo" }
};

const flows = {
  ventas: {
    start: "ventas_dni",
    nodes: {
      ventas_dni: { bot: "¡Hola! Soy el asistente virtual CX 😎\n\nPara ayudarte con una consulta comercial, escribime el DNI o CUIT asociado.", inputKey: "dniCuit", next: "ventas_producto" },
      ventas_producto: { bot: "¿Qué servicio o producto querés consultar?", options: [
        ["Internet / TV", "ventas_fin"], ["Línea móvil", "ventas_fin"], ["Combo / Conexión Total", "ventas_fin"], ["Portabilidad", "ventas_fin"], ["Equipo contra factura", "ventas_fin"], ["Línea adicional", "ventas_fin"], ["Reposición de SIM / recuperar línea", "ventas_fin"], ["Otro producto / servicio", "ventas_fin"]
      ], storeKey: "productoSolicitado" },
      ventas_fin: { bot: "Perfecto. Te paso con un asesor comercial para continuar con la gestión.", advisor: true }
    }
  },
  onboarding: {
    start: "ob_dni",
    nodes: {
      ob_dni: { bot: "Detectamos que tu servicio fue adquirido recientemente.\n\nPara revisar la primera factura, escribime el DNI o CUIT asociado.", inputKey: "dniCuit", next: "ob_servicio" },
      ob_servicio: { bot: "¿Qué tipo de servicio tenés?", options: [["Internet / TV", "ob_domicilio"], ["Telefonía fija", "ob_domicilio"], ["Línea móvil", "ob_linea"]], storeKey: "servicio" },
      ob_domicilio: { bot: "¿Cuál es el domicilio donde tenés instalado el servicio?", inputKey: "domicilio", next: "ob_submotivo" },
      ob_linea: { bot: "¿Cuál es el número de línea móvil?", inputKey: "linea", next: "ob_submotivo" },
      ob_submotivo: { bot: "¿Qué situación querés revisar sobre la primera factura?", options: [["Precio/promoción no coincidente", "ob_importe_venta"], ["Proporcional no comprendido", "ob_importe_venta"], ["Bonificación/descuento no visualizado", "ob_importe_venta"]], storeKey: "submotivo" },
      ob_importe_venta: { bot: "¿Qué importe te informaron al momento de la venta?", inputKey: "importeVenta", next: "ob_importe_factura" },
      ob_importe_factura: { bot: "¿Qué importe visualizás actualmente en la factura?", inputKey: "importeFactura", next: "ob_promo" },
      ob_promo: { bot: "¿Qué promo o descuento te habían informado?", inputKey: "promo", next: "ob_canal" },
      ob_canal: { bot: "¿A través de qué canal te realizaron la oferta?", options: [["Llamada", "ob_fin"], ["WhatsApp", "ob_fin"], ["Mail", "ob_fin"], ["Presencial / local", "ob_fin"], ["Web / app", "ob_fin"], ["No recuerdo", "ob_fin"]], storeKey: "canalOferta" },
      ob_fin: { bot: "Gracias. Con esta información te paso con un asesor para revisar CRM, factura y condiciones comerciales.", advisor: true }
    }
  },
  soporte: {
    start: "soporte_dni",
    nodes: {
      soporte_dni: { bot: "Para ayudarte con soporte técnico, escribime el DNI o CUIT asociado al servicio.", inputKey: "dniCuit", next: "soporte_servicio" },
      soporte_servicio: { bot: "¿Qué tipo de servicio tenés?", options: [["Internet / TV", "soporte_menu"], ["Telefonía fija", "soporte_menu"], ["Línea móvil", "soporte_menu"]], storeKey: "servicio" },
      soporte_menu: { bot: "¿Por dónde viene tu consulta?", options: [["Facturación", "soporte_no_scope"], ["Pagos", "soporte_no_scope"], ["Trámites", "soporte_no_scope"], ["Soporte técnico", "soporte_inconveniente"], ["Ventas", "soporte_no_scope"], ["Baja", "soporte_no_scope"]] },
      soporte_no_scope: { bot: "Para esta simulación vamos a continuar por Soporte técnico.", next: "soporte_inconveniente", auto: true },
      soporte_inconveniente: { bot: "¿Qué inconveniente técnico tenés?", options: [["Sin servicio", "soporte_contacto"], ["Servicio intermitente / microcortes", "soporte_contacto"], ["Lentitud", "soporte_contacto"], ["Problema con TV / Flow", "soporte_contacto"], ["Telefonía fija sin funcionamiento", "soporte_contacto"], ["Visita técnica incumplida", "soporte_contacto"], ["Ya reclamé y sigue igual", "soporte_contacto"], ["No puedo avanzar por bot/app", "soporte_contacto"]], storeKey: "inconveniente" },
      soporte_contacto: { bot: "Indicame el domicilio del servicio o la línea afectada.", inputKey: "domicilioLinea", next: "soporte_fecha" },
      soporte_fecha: { bot: "¿Desde cuándo ocurre el inconveniente?", inputKey: "fechaInicio", next: "soporte_pruebas" },
      soporte_pruebas: { bot: "¿Qué pruebas ya realizaste?", options: [["Reinicié el módem", "soporte_fin"], ["Revisé cables/conexiones", "soporte_fin"], ["Probé con otro dispositivo", "soporte_fin"], ["Ya hice pruebas con el bot/app", "soporte_fin"], ["No realicé pruebas", "soporte_fin"], ["Otra", "soporte_fin"]], storeKey: "pruebas" },
      soporte_fin: { bot: "Gracias. Te paso con soporte técnico con el contexto capturado para evitar reiniciar el diagnóstico desde cero.", advisor: true }
    }
  },
  retencion: {
    start: "ret_dni",
    nodes: {
      ret_dni: { bot: "Para continuar con tu solicitud, escribime el DNI o CUIT asociado al servicio.", inputKey: "dniCuit", next: "ret_servicio" },
      ret_servicio: { bot: "¿Qué tipo de servicio tenés?", options: [["Internet / TV", "ret_menu"], ["Telefonía fija", "ret_menu"], ["Línea móvil", "ret_menu"]], storeKey: "servicio" },
      ret_menu: { bot: "¿Por dónde viene tu consulta?", options: [["Facturación", "ret_no_scope"], ["Pagos", "ret_no_scope"], ["Trámites", "ret_no_scope"], ["Soporte técnico", "ret_no_scope"], ["Ventas", "ret_no_scope"], ["Baja", "ret_motivo"]] },
      ret_no_scope: { bot: "Para esta simulación vamos a continuar por Baja / Retención.", next: "ret_motivo", auto: true },
      ret_motivo: { bot: "Entiendo. Puedo ayudarte con eso.\n¿Cuál es el motivo de tu solicitud?", options: [["Aumento del servicio / precio", "ret_fin"], ["Oferta de otra compañía", "ret_fin"], ["Falla técnica no resuelta", "ret_fin"], ["No uso el servicio", "ret_fin"], ["Quiero bajar el costo / reducir servicios", "ret_fin"], ["Gestión previa no resuelta", "ret_fin"], ["Mudanza", "ret_fin"], ["Otro motivo", "ret_fin"]], storeKey: "motivo" },
      ret_fin: { bot: "Gracias. Te paso con un asesor para revisar el motivo declarado y las alternativas disponibles.", advisor: true }
    }
  }
};

const app = document.getElementById("app");
const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const advisorNameInput = document.getElementById("advisorNameInput");
const advisorGreeting = document.getElementById("advisorGreeting");
const advisorProfileName = document.getElementById("advisorProfileName");
const chat = document.getElementById("chat");
const options = document.getElementById("options");
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const advisorCard = document.getElementById("advisorCard");
const actionBox = document.getElementById("actionBox");
const actionSuggestion = document.getElementById("actionSuggestion");
const contextBadge = document.getElementById("contextBadge");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

let advisorName = "Nicolás";
let currentModule = null;
let currentNode = null;
let data = {};
let events = [];
let conversations = [];
let currentCaseId = "";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  advisorName = advisorNameInput.value.trim() || "Nicolás";
  advisorGreeting.textContent = advisorName;
  advisorProfileName.textContent = advisorName;
  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");
  resetWorkspace();
});

document.querySelectorAll(".module-card").forEach(btn => btn.addEventListener("click", () => startModule(btn.dataset.module)));
document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => handleNav(btn.dataset.view, btn)));
document.getElementById("newSimulationBtn").addEventListener("click", resetWorkspace);
document.getElementById("diagnosticBtn").addEventListener("click", showDiagnostic);
document.getElementById("csvBtn").addEventListener("click", downloadCSV);
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = textInput.value.trim();
  if (!value || !currentModule || !currentNode) return;
  addMessage(value, "client");
  events.push({ actor: "cliente", type: "texto", content: value, timestamp: new Date().toISOString() });
  const node = flows[currentModule].nodes[currentNode];
  if (node.inputKey) data[node.inputKey] = value;
  textInput.value = "";
  goTo(node.next);
});

function resetWorkspace() {
  currentModule = null;
  currentNode = null;
  data = {};
  events = [];
  currentCaseId = "CX-" + new Date().toISOString().slice(0,19).replace(/[-:T]/g, "");
  document.querySelectorAll(".module-card").forEach(b => b.classList.remove("active"));
  chat.innerHTML = `<div class="day-pill">Hoy</div>`;
  addMessage("Seleccioná un módulo CX para iniciar la simulación.", "bot", false);
  options.innerHTML = "";
  renderEmptyCard();
}

function startModule(moduleKey) {
  currentModule = moduleKey;
  currentNode = flows[moduleKey].start;
  data = { modulo: modules[moduleKey].label };
  events = [];
  currentCaseId = "CX-" + new Date().toISOString().slice(0,19).replace(/[-:T]/g, "");
  document.querySelectorAll(".module-card").forEach(b => b.classList.toggle("active", b.dataset.module === moduleKey));
  chat.innerHTML = `<div class="day-pill">Hoy</div>`;
  renderWaitingCard(moduleKey);
  runNode();
}

function runNode() {
  const node = flows[currentModule].nodes[currentNode];
  if (!node) return;
  if (node.auto) { setTimeout(() => goTo(node.next), 550); return; }
  addMessage(node.bot, "bot");
  events.push({ actor: "bot", type: "mensaje_bot", content: node.bot, timestamp: new Date().toISOString() });
  options.innerHTML = "";
  if (node.options) renderOptions(node.options, node.storeKey);
  if (node.advisor) {
    setTimeout(() => {
      addMessage("Hola, soy un asesor. Ya veo el recorrido que hiciste con el bot.", "advisor");
      renderAdvisorCard();
      saveConversation();
    }, 650);
  }
}

function goTo(nodeId) { currentNode = nodeId; setTimeout(runNode, 360); }

function renderOptions(list, storeKey) {
  options.innerHTML = "";
  list.forEach(([label, next]) => {
    const btn = document.createElement("button");
    btn.className = "option-button";
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      addMessage(label, "client");
      events.push({ actor: "cliente", type: "boton", content: label, timestamp: new Date().toISOString() });
      if (storeKey) data[storeKey] = label;
      options.innerHTML = "";
      goTo(next);
    });
    options.appendChild(btn);
  });
}

function addMessage(text, actor, store = true) {
  const div = document.createElement("div");
  div.className = `message ${actor}`;
  div.innerHTML = `${escapeHtml(text)}<span class="time">${new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function renderEmptyCard() {
  contextBadge.textContent = "En espera";
  contextBadge.className = "context-badge waiting";
  advisorCard.className = "advisor-card empty-card";
  advisorCard.innerHTML = `<div><h3>Seleccioná un módulo para iniciar</h3><p>La card se completará con el contexto capturado durante el recorrido.</p></div>`;
  actionBox.classList.add("hidden");
}

function renderWaitingCard(moduleKey) {
  const mod = modules[moduleKey];
  contextBadge.textContent = "En espera";
  contextBadge.className = "context-badge waiting";
  advisorCard.className = `advisor-card ${mod.colorClass}`;
  advisorCard.innerHTML = `<div class="card-header"><div class="card-heading"><span class="card-icon">${mod.icon}</span>${mod.title}</div><span class="status-pill">EN CURSO</span></div><div class="card-body"><div class="info-row"><span class="info-icon">◇</span><span class="label">Estado:</span><span class="value">Recopilando contexto</span></div></div>`;
  actionBox.classList.add("hidden");
}

function renderAdvisorCard() {
  const mod = modules[currentModule];
  contextBadge.textContent = mod.badge;
  contextBadge.className = "context-badge";
  const rows = getRowsForModule(currentModule);
  advisorCard.className = `advisor-card ${mod.colorClass}`;
  advisorCard.innerHTML = `
    <div class="card-header"><div class="card-heading"><span class="card-icon">${mod.icon}</span>${mod.title}</div><span class="status-pill">${mod.badge.toUpperCase()}</span></div>
    <div class="card-body">${rows.map(r => `<div class="info-row"><span class="info-icon">${r.icon}</span><span class="label">${escapeHtml(r.label)}</span><span class="value">${escapeHtml(r.value || "—")}</span></div>`).join("")}</div>`;
  actionSuggestion.textContent = getSuggestion(currentModule);
  actionBox.classList.remove("hidden");
}

function getRowsForModule(moduleKey) {
  if (moduleKey === "ventas") return [
    { icon: "▣", label: "DNI/CUIT:", value: data.dniCuit },
    { icon: "⌁", label: "Producto solicitado:", value: data.productoSolicitado },
    { icon: "▢", label: "Caso:", value: "Contratación o modificación de producto/servicio" }
  ];
  if (moduleKey === "onboarding") {
    const diff = calcDiff(data.importeVenta, data.importeFactura);
    return [
      { icon: "▣", label: "DNI/CUIT:", value: data.dniCuit },
      { icon: "⌁", label: "Servicio:", value: data.servicio },
      { icon: "⌂", label: data.linea ? "Línea:" : "Domicilio:", value: data.linea || data.domicilio },
      { icon: "◇", label: "Caso:", value: "Inconsistencia entre oferta comercial y primera factura" },
      { icon: "▤", label: "Submotivo:", value: data.submotivo },
      { icon: "$", label: "Importe informado:", value: data.importeVenta },
      { icon: "$", label: "Importe facturado:", value: data.importeFactura },
      { icon: "△", label: "Diferencia declarada:", value: diff },
      { icon: "◌", label: "Promo/descuento:", value: data.promo },
      { icon: "↗", label: "Canal de oferta:", value: data.canalOferta }
    ];
  }
  if (moduleKey === "soporte") return [
    { icon: "▣", label: "DNI/CUIT:", value: data.dniCuit },
    { icon: "⌁", label: "Servicio:", value: data.servicio },
    { icon: "△", label: "Inconveniente:", value: data.inconveniente },
    { icon: "⌂", label: "Domicilio / línea:", value: data.domicilioLinea },
    { icon: "◷", label: "Fecha de inicio:", value: data.fechaInicio },
    { icon: "✓", label: "Pruebas realizadas:", value: data.pruebas },
    { icon: "↺", label: "Reclamos recientes:", value: "Consultar en CRM" },
    { icon: "☎", label: "Visitas recientes:", value: "Consultar en CRM" },
    { icon: "▥", label: "Estado técnico / agenda:", value: "Consultar en herramienta interna" }
  ];
  return [
    { icon: "▣", label: "DNI/CUIT:", value: data.dniCuit },
    { icon: "⌁", label: "Servicio:", value: data.servicio },
    { icon: "◇", label: "Motivo declarado:", value: data.motivo },
    { icon: "▢", label: "Caso:", value: "Intención de baja, disconformidad o migración" },
    { icon: "△", label: "Fricción detectada:", value: "Percepción de costo no sostenible o valor insuficiente" },
    { icon: "↺", label: "Historial CRM:", value: "Reclamos recientes / descuentos vigentes / fecha último ajuste / gestiones abiertas" }
  ];
}

function getSuggestion(moduleKey) {
  if (moduleKey === "ventas") return "Retomar la gestión desde el producto o servicio solicitado. Explorar necesidad del cliente, disponibilidad, condiciones de contratación y promociones vigentes antes de confirmar la oferta comercial.";
  if (moduleKey === "onboarding") return "Retomar la gestión desde la inconsistencia comercial declarada por el cliente. Validar en CRM la oferta registrada, revisar primera factura, bonificaciones aplicadas y criterio BC. Si corresponde, gestionar ajuste/NC; si no corresponde, informar criterio y evaluar alternativa comercial o escalamiento.";
  if (moduleKey === "soporte") return "Retomar la gestión desde el inconveniente técnico declarado. Revisar historial de reclamos, pruebas ya realizadas, visitas previas y estado técnico del servicio antes de indicar nuevas pruebas. Priorizar continuidad de gestión y evitar reiniciar el diagnóstico desde cero.";
  return "Retomar la gestión desde el motivo declarado por el cliente. Revisar servicios activos, descuentos vigentes, historial de reclamos, aumentos recientes y alternativas comerciales disponibles antes de ofrecer una propuesta de retención. Evitar responder solo con descuento si el motivo principal es técnico, administrativo o una gestión previa no resuelta.";
}

function showDiagnostic() {
  const title = currentModule ? `Diagnóstico CX · ${modules[currentModule].label}` : "Diagnóstico CX";
  const content = currentModule ? diagnosticContent() : `<p>Seleccioná un módulo y completá un recorrido para generar el diagnóstico CX.</p>`;
  openModal(title, content);
}
function diagnosticContent() {
  const rows = getRowsForModule(currentModule).map(r => `<tr><th>${escapeHtml(r.label)}</th><td>${escapeHtml(r.value || "—")}</td></tr>`).join("");
  return `<div class="modal-content-card"><h3>Contexto capturado</h3><table class="table-like">${rows}</table></div><div class="modal-content-card"><h3>Acción sugerida</h3><p>${escapeHtml(getSuggestion(currentModule))}</p></div><div class="modal-content-card"><h3>Recorrido</h3><p>${events.filter(e => e.actor === "cliente").map(e => e.content).join(" → ") || "Sin recorrido del cliente registrado todavía."}</p></div>`;
}
function handleNav(view, btn) {
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const map = {
    inicio: ["Inicio", "Seleccioná un módulo CX para iniciar una simulación o usá Nueva simulación para limpiar el recorrido actual."],
    conversaciones: ["Conversaciones", buildConversationsView()],
    reportes: ["Reportes", buildReport()],
    conocimiento: ["Conocimiento", buildKnowledge()],
    configuracion: ["Configuración", buildSettings()]
  };
  openModal(map[view][0], map[view][1]);
}

function buildConversationsView() {
  if (!conversations.length) return "No hay conversaciones guardadas en esta sesión.";
  return conversations.map(c => `
    <details class="modal-content-card conversation-item">
      <summary><strong>${escapeHtml(c.caseLabel)}</strong> · ${escapeHtml(c.module)} · ${escapeHtml(c.time)}</summary>
      <div class="conversation-detail">
        <p><strong>Estado:</strong> ${escapeHtml(c.status)}</p>
        <p><strong>Recorrido:</strong> ${escapeHtml(c.path || "Sin interacciones del cliente")}</p>
        <h3>Datos del caso</h3>
        <table class="table-like">${c.rows.map(r => `<tr><th>${escapeHtml(r.label)}</th><td>${escapeHtml(r.value || "—")}</td></tr>`).join("")}</table>
        <h3>Chat</h3>
        <ol class="chat-log">${c.events.map(e => `<li><strong>${escapeHtml(e.actor)}</strong>: ${escapeHtml(e.content)}</li>`).join("")}</ol>
      </div>
    </details>`).join("");
}

function buildReport() {
  return `<table class="table-like"><tr><th>ID caso</th><td>${currentCaseId}</td></tr><tr><th>Módulo</th><td>${currentModule ? modules[currentModule].label : "Sin módulo"}</td></tr><tr><th>Mensajes bot</th><td>${events.filter(e => e.actor === "bot").length}</td></tr><tr><th>Interacciones cliente</th><td>${events.filter(e => e.actor === "cliente").length}</td></tr><tr><th>Derivado a asesor</th><td>${events.some(e => e.actor === "asesor") ? "Sí" : "No"}</td></tr></table>`;
}
function buildKnowledge() {
  return `<div class='modal-content-card'><h3>Ventas</h3><p>Captura mínima para consulta comercial: DNI/CUIT y producto solicitado.</p></div><div class='modal-content-card'><h3>Onboarding</h3><p>Primeros 60 días. Inconsistencia entre oferta comercial y primera factura.</p></div><div class='modal-content-card'><h3>Soporte</h3><p>Inconveniente técnico con afectación del servicio. Se consulta CRM para reclamos y visitas.</p></div><div class='modal-content-card'><h3>Retención</h3><p>Intención de baja, disconformidad o migración. Se captura motivo declarado.</p></div>`;
}
function buildSettings() {
  return `<p>Asesor actual: <strong>${escapeHtml(advisorName)}</strong></p>
  <div class='modal-content-card'>
    <h3>Sesión</h3>
    <p>Usá Nueva simulación para limpiar el recorrido actual. Para cambiar el nombre, recargá la página e ingresá nuevamente al simulador.</p>
  </div>
  <div class='modal-content-card'>
    <h3>Conversaciones guardadas</h3>
    <p>${conversations.length} conversación/es guardadas en esta sesión.</p>
  </div>`;
}

function saveConversation() {
  const path = events.filter(e => e.actor === "cliente").map(e => e.content).join(" → ");
  const rows = currentModule ? getRowsForModule(currentModule) : [];
  const caseLabel = `Caso ${String(conversations.length + 1).padStart(4, "0")}`;
  conversations.unshift({
    caseLabel,
    caseId: currentCaseId,
    module: currentModule ? modules[currentModule].label : "Sin módulo",
    time: new Date().toLocaleString("es-AR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }),
    status: events.some(e => e.actor === "asesor") ? "Derivado a asesor" : "En curso",
    path: path || "Sin interacciones",
    rows: rows.map(r => ({ ...r })),
    events: events.map(e => ({ actor: e.actor, type: e.type, content: e.content }))
  });
  conversations = conversations.slice(0, 10);
}
function downloadCSV() {
  const rows = getRowsForModule(currentModule || "ventas");
  const csv = "\uFEFFCampo;Valor\n" + rows.map(r => `"${r.label.replaceAll('"','""')}";"${String(r.value || "").replaceAll('"','""')}"`).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${currentCaseId}_contexto_cx.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
function openModal(title, content) { modalTitle.textContent = title; modalContent.innerHTML = typeof content === "string" ? content : String(content); modal.classList.remove("hidden"); }
function closeModal() { modal.classList.add("hidden"); }
function calcDiff(a, b) {
  const x = parseMoney(a), y = parseMoney(b);
  if (Number.isFinite(x) && Number.isFinite(y)) return formatMoney(y - x);
  return "Verificar importes declarados";
}
function parseMoney(v) { const n = Number(String(v || "").replace(/[^0-9,-]/g, "").replace(",", ".")); return Number.isFinite(n) ? n : NaN; }
function formatMoney(n) { return `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("es-AR")}`; }
function escapeHtml(text) { return String(text ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
