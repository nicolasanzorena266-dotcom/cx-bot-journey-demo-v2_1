const MODULES = {
  ventas: {
    name: "Ventas",
    icon: "▣",
    theme: "ventas",
    badge: "Consulta",
    start: "ventas_dni",
    title: "Ventas | Consulta comercial",
    caseName: "Contratación o modificación de producto/servicio",
    suggestion: "Retomar la gestión desde el producto o servicio solicitado. Explorar necesidad del cliente, disponibilidad, condiciones de contratación y promociones vigentes antes de confirmar la oferta comercial."
  },
  onboarding: {
    name: "Onboarding",
    icon: "◆",
    theme: "onboarding",
    badge: "Atención",
    start: "onboarding_dni",
    title: "Onboarding | Potencial detractor",
    caseName: "Inconsistencia entre oferta comercial y primera factura",
    suggestion: "Retomar la gestión desde la inconsistencia comercial declarada por el cliente. Validar en CRM la oferta registrada, revisar primera factura, bonificaciones aplicadas y criterio BC. Si corresponde, gestionar ajuste/NC; si no corresponde, informar criterio y evaluar alternativa comercial o escalamiento."
  },
  soporte: {
    name: "Soporte",
    icon: "☏",
    theme: "soporte",
    badge: "Contexto",
    start: "soporte_dni",
    title: "Soporte | Cliente reincidente / potencial detractor",
    caseName: "Inconveniente técnico con afectación del servicio",
    suggestion: "Retomar la gestión desde el inconveniente técnico declarado. Revisar historial de reclamos, pruebas ya realizadas, visitas previas y estado técnico del servicio antes de indicar nuevas pruebas. Si existen reclamos recientes o visitas incumplidas en CRM, priorizar continuidad de gestión y evitar reiniciar el diagnóstico desde cero."
  },
  retencion: {
    name: "Retención",
    icon: "⟳",
    theme: "retencion",
    badge: "Riesgo de fuga",
    start: "retencion_dni",
    title: "Retención | Riesgo de fuga",
    caseName: "Intención de baja, disconformidad o migración",
    suggestion: "Retomar la gestión desde el motivo declarado por el cliente. Revisar servicios activos, descuentos vigentes, historial de reclamos, aumentos recientes y alternativas comerciales disponibles antes de ofrecer una propuesta de retención. Evitar responder solo con descuento si el motivo principal es técnico, administrativo o una gestión previa no resuelta."
  }
};

const FLOW = {
  ventas_dni: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nPara empezar, escribime el DNI o CUIT asociado al servicio, sin puntos ni guiones. ✍️",
    input: "dniCuit",
    next: "ventas_producto"
  },
  ventas_producto: {
    bot: "¿Qué servicio o producto querés contratar o modificar?",
    options: [
      ["Internet / TV", "ventas_advisor", "productoSolicitado"],
      ["Línea móvil", "ventas_advisor", "productoSolicitado"],
      ["Combo / Conexión Total", "ventas_advisor", "productoSolicitado"],
      ["Portabilidad", "ventas_advisor", "productoSolicitado"],
      ["Equipo contra factura", "ventas_advisor", "productoSolicitado"],
      ["Línea adicional", "ventas_advisor", "productoSolicitado"],
      ["Reposición de SIM / recuperar línea", "ventas_advisor", "productoSolicitado"],
      ["Otro producto / servicio", "ventas_advisor", "productoSolicitado"]
    ]
  },
  ventas_advisor: {
    bot: "Perfecto. Te paso con un asesor comercial para continuar la gestión.",
    advisor: true
  },

  onboarding_dni: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nDetectamos que tu servicio fue adquirido recientemente. Para empezar, escribime el DNI o CUIT asociado, sin puntos ni guiones. ✍️",
    input: "dniCuit",
    next: "onboarding_service"
  },
  onboarding_service: {
    bot: "¿Qué tipo de servicio tenés?",
    options: [
      ["Internet / TV", "onboarding_address", "serviceType"],
      ["Telefonía fija", "onboarding_address", "serviceType"],
      ["Línea móvil", "onboarding_line", "serviceType"]
    ]
  },
  onboarding_address: {
    bot: "¿Cuál es el domicilio donde tenés instalado el servicio?",
    input: "addressOrLine",
    next: "onboarding_issue"
  },
  onboarding_line: {
    bot: "¿Cuál es el número de línea afectada?",
    input: "addressOrLine",
    next: "onboarding_issue"
  },
  onboarding_issue: {
    bot: "Para ayudarte con la primera factura, indicame cuál de estas situaciones querés revisar:",
    options: [
      ["Precio/promoción no coincidente", "onboarding_sale_amount", "submotivo"],
      ["Proporcional no comprendido", "onboarding_sale_amount", "submotivo"],
      ["Bonificación/descuento no visualizado", "onboarding_sale_amount", "submotivo"]
    ]
  },
  onboarding_sale_amount: {
    bot: "¿Qué importe te informaron al momento de la venta?",
    input: "importeVenta",
    next: "onboarding_invoice_amount"
  },
  onboarding_invoice_amount: {
    bot: "¿Qué importe visualizás actualmente en la factura?",
    input: "importeFactura",
    next: "onboarding_discount"
  },
  onboarding_discount: {
    bot: "¿Qué promo, bonificación o descuento te habían informado?",
    input: "promoDescuento",
    next: "onboarding_channel"
  },
  onboarding_channel: {
    bot: "¿A través de qué canal te realizaron la oferta?",
    options: [
      ["Llamada", "onboarding_advisor", "canalOferta"],
      ["WhatsApp", "onboarding_advisor", "canalOferta"],
      ["Mail", "onboarding_advisor", "canalOferta"],
      ["Presencial / local", "onboarding_advisor", "canalOferta"],
      ["Web / app", "onboarding_advisor", "canalOferta"],
      ["No recuerdo", "onboarding_advisor", "canalOferta"]
    ]
  },
  onboarding_advisor: {
    bot: "Gracias. Con esa información te paso con un asesor para revisar la inconsistencia entre la oferta comercial y la primera factura.",
    advisor: true
  },

  soporte_dni: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nPara empezar, escribime el DNI o CUIT asociado al servicio, sin puntos ni guiones. ✍️",
    input: "dniCuit",
    next: "soporte_service"
  },
  soporte_service: {
    bot: "¿Qué tipo de servicio tenés?",
    options: [
      ["Internet / TV", "soporte_menu", "serviceType"],
      ["Telefonía fija", "soporte_menu", "serviceType"],
      ["Línea móvil", "soporte_menu", "serviceType"]
    ]
  },
  soporte_menu: {
    bot: "¿Por dónde viene tu consulta?",
    options: [
      ["Facturación", "soporte_not_supported", "menuReal"],
      ["Pagos", "soporte_not_supported", "menuReal"],
      ["Trámites", "soporte_not_supported", "menuReal"],
      ["Soporte técnico", "soporte_issue", "menuReal"],
      ["Ventas", "soporte_not_supported", "menuReal"],
      ["Baja", "soporte_not_supported", "menuReal"]
    ]
  },
  soporte_not_supported: {
    bot: "Para esta demo vamos a recorrer el flujo de Soporte técnico. Elegí esa opción para continuar.",
    next: "soporte_menu"
  },
  soporte_issue: {
    bot: "¿Qué inconveniente técnico tenés?",
    options: [
      ["Sin servicio", "soporte_location", "inconveniente"],
      ["Servicio intermitente / microcortes", "soporte_location", "inconveniente"],
      ["Lentitud", "soporte_location", "inconveniente"],
      ["Problema con TV / Flow", "soporte_location", "inconveniente"],
      ["Telefonía fija sin funcionamiento", "soporte_location", "inconveniente"],
      ["Visita técnica incumplida", "soporte_location", "inconveniente"],
      ["Ya reclamé y sigue igual", "soporte_location", "inconveniente"],
      ["No puedo avanzar por bot/app", "soporte_location", "inconveniente"]
    ]
  },
  soporte_location: {
    bot: "Indicame el domicilio del servicio o la línea afectada, según corresponda.",
    input: "addressOrLine",
    next: "soporte_start_date"
  },
  soporte_start_date: {
    bot: "¿Desde cuándo ocurre el inconveniente?",
    input: "fechaInicio",
    next: "soporte_tests"
  },
  soporte_tests: {
    bot: "¿Qué pruebas ya realizaste?",
    options: [
      ["Reinicié el módem", "soporte_advisor", "pruebas"],
      ["Revisé cables/conexiones", "soporte_advisor", "pruebas"],
      ["Probé con otro dispositivo", "soporte_advisor", "pruebas"],
      ["Ya hice pruebas con el bot/app", "soporte_advisor", "pruebas"],
      ["No realicé pruebas", "soporte_advisor", "pruebas"],
      ["Otra", "soporte_advisor", "pruebas"]
    ]
  },
  soporte_advisor: {
    bot: "Gracias. Te paso con soporte técnico con el contexto del recorrido para evitar reiniciar el diagnóstico desde cero.",
    advisor: true
  },

  retencion_dni: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nPara empezar, escribime el DNI o CUIT asociado al servicio, sin puntos ni guiones. ✍️",
    input: "dniCuit",
    next: "retencion_service"
  },
  retencion_service: {
    bot: "¿Qué tipo de servicio tenés?",
    options: [
      ["Internet / TV", "retencion_menu", "serviceType"],
      ["Telefonía fija", "retencion_menu", "serviceType"],
      ["Línea móvil", "retencion_menu", "serviceType"]
    ]
  },
  retencion_menu: {
    bot: "¿Por dónde viene tu consulta?",
    options: [
      ["Facturación", "retencion_not_supported", "menuReal"],
      ["Pagos", "retencion_not_supported", "menuReal"],
      ["Trámites", "retencion_not_supported", "menuReal"],
      ["Soporte técnico", "retencion_not_supported", "menuReal"],
      ["Ventas", "retencion_not_supported", "menuReal"],
      ["Baja", "retencion_reason", "menuReal"]
    ]
  },
  retencion_not_supported: {
    bot: "Para esta demo vamos a recorrer el flujo de Baja / Retención. Elegí Baja para continuar.",
    next: "retencion_menu"
  },
  retencion_reason: {
    bot: "¿Cuál es el motivo de tu solicitud?",
    options: [
      ["Aumento del servicio / precio", "retencion_advisor", "motivoDeclarado"],
      ["Oferta de otra compañía", "retencion_advisor", "motivoDeclarado"],
      ["Falla técnica no resuelta", "retencion_advisor", "motivoDeclarado"],
      ["No uso el servicio", "retencion_advisor", "motivoDeclarado"],
      ["Quiero bajar el costo / reducir servicios", "retencion_advisor", "motivoDeclarado"],
      ["Gestión previa no resuelta", "retencion_advisor", "motivoDeclarado"],
      ["Mudanza", "retencion_advisor", "motivoDeclarado"],
      ["Otro motivo", "retencion_advisor", "motivoDeclarado"]
    ]
  },
  retencion_advisor: {
    bot: "Entiendo. Te paso con un asesor para revisar tu solicitud y las alternativas disponibles.",
    advisor: true
  }
};

let agentName = "";
let activeModule = "ventas";
let currentNode = null;
let events = [];
let data = {};
let caseId = "DEMO-" + new Date().toISOString().slice(0,19).replace(/[-:T]/g, "");

const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const agentNameInput = document.getElementById("agentName");
const displayName = document.getElementById("displayName");
const displayNameRight = document.getElementById("displayNameRight");
const chat = document.getElementById("chat");
const options = document.getElementById("options");
const textForm = document.getElementById("textForm");
const textInput = document.getElementById("textInput");
const advisorCard = document.getElementById("advisorCard");
const suggestionCard = document.getElementById("suggestionCard");
const suggestionText = document.getElementById("suggestionText");
const contextStatus = document.getElementById("contextStatus");
const restartBtn = document.getElementById("restartBtn");
const csvBtn = document.getElementById("csvBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = agentNameInput.value.trim() || "Asesor";
  agentName = name;
  displayName.textContent = firstName(name);
  displayNameRight.textContent = name;
  loginScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  startModule("ventas");
});

document.querySelectorAll(".module-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const module = btn.dataset.module;
    if (!MODULES[module]) {
      showPending(module);
      return;
    }
    startModule(module);
  });
});

restartBtn.addEventListener("click", () => startModule(activeModule));
csvBtn.addEventListener("click", downloadCSV);

textForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = textInput.value.trim();
  if (!value || !currentNode) return;
  addClientMessage(value, "texto");
  textInput.value = "";
  const node = FLOW[currentNode];
  if (node?.input) {
    data[node.input] = value;
    setTimeout(() => goToNode(node.next), 320);
  }
});

function startModule(module) {
  activeModule = module;
  data = { module: MODULES[module].name };
  events = [];
  caseId = "DEMO-" + new Date().toISOString().slice(0,19).replace(/[-:T]/g, "");
  chat.innerHTML = "";
  options.innerHTML = "";
  suggestionCard.classList.add("is-hidden");
  contextStatus.textContent = "En espera";
  contextStatus.classList.add("waiting");
  setActiveModule(module);
  renderEmptyAdvisor(module);
  goToNode(MODULES[module].start);
}

function setActiveModule(module) {
  document.querySelectorAll(".module-card").forEach(btn => btn.classList.toggle("active", btn.dataset.module === module));
}

function showPending(module) {
  setActiveModule(module);
  chat.innerHTML = "";
  options.innerHTML = "";
  const label = module === "prepago" ? "Prepago" : "Overnight";
  advisorCard.className = "advisor-card empty-state";
  advisorCard.innerHTML = `<h3>${label} | Pendiente</h3><p>Este módulo queda visible para la presentación, pero todavía no tiene flujo cargado.</p>`;
  suggestionCard.classList.add("is-hidden");
  contextStatus.textContent = "Pendiente";
  contextStatus.classList.add("waiting");
  addBotMessage(`Módulo ${label} pendiente de definición. Cuando tengamos insumos, cargamos el recorrido conversacional.`);
}

function goToNode(nodeId) {
  const node = FLOW[nodeId];
  if (!node) return;
  currentNode = nodeId;
  addBotMessage(node.bot);
  renderOptions(node.options || []);
  if (node.next && !node.input && !node.options && !node.advisor) {
    setTimeout(() => goToNode(node.next), 650);
  }
  if (node.advisor) {
    setTimeout(() => {
      addAdvisorMessage("Hola, soy un asesor. Ya veo el contexto que recopiló Pía.");
      renderAdvisorCard();
    }, 550);
  }
}

function renderOptions(optionList) {
  options.innerHTML = "";
  optionList.forEach(([label, next, field]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-button";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      addClientMessage(label, "boton");
      if (field) data[field] = label;
      setTimeout(() => goToNode(next), 300);
    });
    options.appendChild(btn);
  });
}

function addBotMessage(content) { addMessage(content, "bot"); addEvent("bot", content); }
function addClientMessage(content, type) { addMessage(content, "client"); addEvent("cliente", content, type); }
function addAdvisorMessage(content) { addMessage(content, "advisor"); addEvent("asesor", content); }

function addMessage(content, actor) {
  const div = document.createElement("div");
  div.className = `message ${actor}`;
  div.innerHTML = `${escapeHtml(content)}<span class="time">${currentTime()}</span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addEvent(actor, content, type = "mensaje") {
  events.push({ timestamp: new Date().toISOString(), actor, type, content });
}

function renderEmptyAdvisor(module) {
  const m = MODULES[module];
  advisorCard.className = "advisor-card empty-state";
  advisorCard.innerHTML = `<h3>${m.title}</h3><p>La card se completará cuando el bot capture la información clave del recorrido.</p>`;
}

function renderAdvisorCard() {
  const m = MODULES[activeModule];
  const rows = getAdvisorRows(activeModule);
  advisorCard.className = `advisor-card card-${m.theme}`;
  advisorCard.innerHTML = `
    <div class="card-title">
      <span class="big-icon">${m.icon}</span>
      <h3>${m.title}</h3>
      <span class="badge">${m.badge}</span>
    </div>
    <div class="card-body">
      ${rows.map(row => `
        <div class="info-row">
          <span class="row-icon">${row.icon}</span>
          <span class="label">${escapeHtml(row.label)}</span>
          <span class="value">${escapeHtml(row.value || "No informado")}</span>
        </div>
      `).join("")}
    </div>
  `;
  suggestionText.textContent = m.suggestion;
  suggestionCard.classList.remove("is-hidden");
  contextStatus.textContent = "Contexto listo";
  contextStatus.classList.remove("waiting");
}

function getAdvisorRows(module) {
  if (module === "ventas") {
    return [
      { icon: "▦", label: "DNI/CUIT:", value: data.dniCuit },
      { icon: "◇", label: "Servicio / producto solicitado:", value: data.productoSolicitado },
      { icon: "▣", label: "Caso:", value: MODULES.ventas.caseName }
    ];
  }

  if (module === "onboarding") {
    return [
      { icon: "▦", label: "DNI/CUIT:", value: data.dniCuit },
      { icon: "◌", label: "Servicio:", value: data.serviceType },
      { icon: "⌂", label: data.serviceType === "Línea móvil" ? "Línea:" : "Domicilio:", value: data.addressOrLine },
      { icon: "◇", label: "Motivo:", value: "Consulta por conceptos facturados" },
      { icon: "⚠", label: "Fricción:", value: "Inconsistencia comercial" },
      { icon: "▣", label: "Caso:", value: MODULES.onboarding.caseName },
      { icon: "$", label: "Importe informado en venta:", value: data.importeVenta },
      { icon: "$", label: "Importe visualizado en factura:", value: data.importeFactura },
      { icon: "↕", label: "Diferencia declarada:", value: calculateDifference(data.importeVenta, data.importeFactura) },
      { icon: "%", label: "Promo/descuento informado:", value: data.promoDescuento },
      { icon: "☵", label: "Canal de oferta declarado:", value: data.canalOferta }
    ];
  }

  if (module === "soporte") {
    return [
      { icon: "▦", label: "DNI/CUIT:", value: data.dniCuit },
      { icon: "◌", label: "Servicio:", value: data.serviceType },
      { icon: "⚠", label: "Inconveniente:", value: data.inconveniente },
      { icon: "⌂", label: "Domicilio / línea:", value: data.addressOrLine },
      { icon: "◷", label: "Fecha de inicio:", value: data.fechaInicio },
      { icon: "✓", label: "Pruebas realizadas:", value: data.pruebas },
      { icon: "↺", label: "Reclamos recientes:", value: "Consultar en CRM" },
      { icon: "☏", label: "Visitas recientes:", value: "Consultar en CRM" },
      { icon: "▣", label: "Estado técnico / agenda:", value: "Consultar herramienta interna" }
    ];
  }

  return [
    { icon: "▦", label: "DNI/CUIT:", value: data.dniCuit },
    { icon: "◌", label: "Servicio:", value: data.serviceType },
    { icon: "◇", label: "Motivo declarado:", value: data.motivoDeclarado },
    { icon: "▣", label: "Caso:", value: MODULES.retencion.caseName },
    { icon: "⚠", label: "Fricción detectada:", value: "Percepción de costo no sostenible o valor insuficiente" },
    { icon: "◷", label: "Historial CRM:", value: "Reclamos recientes / descuentos vigentes / fecha último ajuste / gestiones abiertas" }
  ];
}

function calculateDifference(a, b) {
  const n1 = parseMoney(a);
  const n2 = parseMoney(b);
  if (Number.isNaN(n1) || Number.isNaN(n2)) return "Calcular según importes declarados";
  const diff = Math.abs(n2 - n1);
  return formatMoney(diff);
}
function parseMoney(value) {
  if (!value) return NaN;
  const clean = String(value).replace(/\$/g, "").replace(/\./g, "").replace(/,/g, ".").replace(/[^0-9.]/g, "");
  return Number(clean);
}
function formatMoney(num) { return "$" + Math.round(num).toLocaleString("es-AR"); }
function currentTime() { return new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }); }
function firstName(name) { return String(name).trim().split(/\s+/)[0] || "Asesor"; }
function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function downloadCSV() {
  const rows = getAdvisorRows(activeModule);
  const values = {
    "ID caso": caseId,
    "Módulo": MODULES[activeModule]?.name || activeModule,
    "Eventos": events.length,
    ...Object.fromEntries(rows.map(r => [r.label.replace(":", ""), r.value || "No informado"])),
    "Acción sugerida": MODULES[activeModule]?.suggestion || ""
  };
  const headers = Object.keys(values);
  const csv = "\uFEFF" + headers.map(csvEscape).join(";") + "\n" + headers.map(h => csvEscape(values[h])).join(";");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${caseId}_contexto_${activeModule}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function csvEscape(value) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }

document.getElementById("phoneTime").textContent = currentTime();
