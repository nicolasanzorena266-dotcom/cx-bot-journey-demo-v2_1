const FLOW = {
  start: {
    module: "Demo",
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nEsta demo permite simular flujos críticos y visualizar el contexto que debería recibir el asesor.\n\nElegí el flujo que querés simular:",
    options: [
      { label: "Ventas", next: "sales_dni", set: { module: "Ventas" } },
      { label: "Onboarding", next: "onboarding_dni", set: { module: "Onboarding" } },
      { label: "Soporte", next: "support_dni", set: { module: "Soporte" } },
      { label: "Prepago", next: "prepaid_pending", set: { module: "Prepago" } },
      { label: "Overnight", next: "overnight_pending", set: { module: "Overnight" } },
      { label: "Retención", next: "retention_dni", set: { module: "Retención" } }
    ]
  },

  sales_dni: {
    module: "Ventas",
    bot: "Escribime el DNI o CUIT asociado al servicio.",
    input: true,
    inputKey: "dniCuit",
    next: "sales_product"
  },
  sales_product: {
    module: "Ventas",
    bot: "¿Qué servicio o producto querés contratar o modificar?",
    options: [
      { label: "Internet / TV", next: "sales_advisor", set: { requestedProduct: "Internet / TV" } },
      { label: "Línea móvil", next: "sales_advisor", set: { requestedProduct: "Línea móvil" } },
      { label: "Combo / Conexión Total", next: "sales_advisor", set: { requestedProduct: "Combo / Conexión Total" } },
      { label: "Portabilidad", next: "sales_advisor", set: { requestedProduct: "Portabilidad" } },
      { label: "Equipo contra factura", next: "sales_advisor", set: { requestedProduct: "Equipo contra factura" } },
      { label: "Línea adicional", next: "sales_advisor", set: { requestedProduct: "Línea adicional" } },
      { label: "Reposición de SIM / recuperar línea", next: "sales_advisor", set: { requestedProduct: "Reposición de SIM / recuperar línea" } },
      { label: "Otro producto / servicio", next: "sales_other_product", set: { requestedProduct: "Otro producto / servicio" } }
    ]
  },
  sales_other_product: {
    module: "Ventas",
    bot: "Contame brevemente qué producto o servicio necesitás.",
    input: true,
    inputKey: "requestedProductDetail",
    next: "sales_advisor"
  },
  sales_advisor: {
    module: "Ventas",
    bot: "Perfecto. Te paso con un asesor comercial para continuar la gestión.",
    advisor: true,
    advisorType: "sales"
  },

  onboarding_dni: {
    module: "Onboarding",
    bot: "Escribime el DNI o CUIT asociado al servicio.",
    input: true,
    inputKey: "dniCuit",
    next: "onboarding_service_type"
  },
  onboarding_service_type: {
    module: "Onboarding",
    bot: "¿Qué tipo de servicio adquiriste recientemente?",
    options: [
      { label: "Internet / TV", next: "onboarding_address", set: { serviceType: "Internet / TV" } },
      { label: "Telefonía fija", next: "onboarding_address", set: { serviceType: "Telefonía fija" } },
      { label: "Línea móvil", next: "onboarding_mobile_line", set: { serviceType: "Línea móvil" } }
    ]
  },
  onboarding_address: {
    module: "Onboarding",
    bot: "¿Cuál es el domicilio donde tenés instalado el servicio?",
    input: true,
    inputKey: "address",
    next: "onboarding_reason"
  },
  onboarding_mobile_line: {
    module: "Onboarding",
    bot: "¿Cuál es el número de línea asociado a la consulta?",
    input: true,
    inputKey: "mobileLine",
    next: "onboarding_reason"
  },
  onboarding_reason: {
    module: "Onboarding",
    bot: "Detectamos que tu servicio fue adquirido recientemente.\n\nPara ayudarte con la primera factura, indicame cuál de estas situaciones querés revisar:",
    options: [
      { label: "Precio/promoción no coincidente", next: "onboarding_sale_amount", set: { subReason: "Precio/promoción no coincidente" } },
      { label: "Proporcional no comprendido", next: "onboarding_sale_amount", set: { subReason: "Proporcional no comprendido" } },
      { label: "Bonificación/descuento no visualizado", next: "onboarding_sale_amount", set: { subReason: "Bonificación/descuento no visualizado" } }
    ]
  },
  onboarding_sale_amount: {
    module: "Onboarding",
    bot: "¿Qué importe te informaron al momento de la venta?",
    input: true,
    inputKey: "saleAmount",
    next: "onboarding_invoice_amount"
  },
  onboarding_invoice_amount: {
    module: "Onboarding",
    bot: "¿Qué importe ves actualmente en la factura?",
    input: true,
    inputKey: "invoiceAmount",
    next: "onboarding_promo"
  },
  onboarding_promo: {
    module: "Onboarding",
    bot: "¿Qué promo, bonificación o descuento te habían informado?",
    input: true,
    inputKey: "promoInfo",
    next: "onboarding_channel"
  },
  onboarding_channel: {
    module: "Onboarding",
    bot: "¿A través de qué canal te realizaron la oferta?",
    options: [
      { label: "Llamada", next: "onboarding_advisor", set: { offerChannel: "Llamada" } },
      { label: "WhatsApp", next: "onboarding_advisor", set: { offerChannel: "WhatsApp" } },
      { label: "Mail", next: "onboarding_advisor", set: { offerChannel: "Mail" } },
      { label: "Presencial / local", next: "onboarding_advisor", set: { offerChannel: "Presencial / local" } },
      { label: "Web / app", next: "onboarding_advisor", set: { offerChannel: "Web / app" } },
      { label: "No recuerdo", next: "onboarding_advisor", set: { offerChannel: "No recuerda" } }
    ]
  },
  onboarding_advisor: {
    module: "Onboarding",
    bot: "Gracias. Con esta información te paso con un asesor de Onboarding para revisar la inconsistencia comercial.",
    advisor: true,
    advisorType: "onboarding"
  },

  support_dni: {
    module: "Soporte",
    bot: "Escribime el DNI o CUIT asociado al servicio.",
    input: true,
    inputKey: "dniCuit",
    next: "support_service_type"
  },
  support_service_type: {
    module: "Soporte",
    bot: "¿Qué tipo de servicio tenés?",
    options: [
      { label: "Internet / TV", next: "support_real_menu", set: { serviceType: "Internet / TV" } },
      { label: "Telefonía fija", next: "support_real_menu", set: { serviceType: "Telefonía fija" } },
      { label: "Línea móvil", next: "support_real_menu", set: { serviceType: "Línea móvil" } }
    ]
  },
  support_real_menu: {
    module: "Soporte",
    bot: "¿Por dónde viene tu consulta?",
    options: [
      { label: "Facturación", next: "non_support_route", set: { realMenu: "Facturación" } },
      { label: "Pagos", next: "non_support_route", set: { realMenu: "Pagos" } },
      { label: "Trámites", next: "non_support_route", set: { realMenu: "Trámites" } },
      { label: "Soporte técnico", next: "support_problem", set: { realMenu: "Soporte técnico" } },
      { label: "Ventas", next: "non_support_route", set: { realMenu: "Ventas" } },
      { label: "Baja", next: "retention_reason", set: { realMenu: "Baja", module: "Retención" } }
    ]
  },
  non_support_route: {
    module: "Soporte",
    bot: "Para esta demo estamos recorriendo Soporte técnico. Volvamos al motivo técnico para continuar.",
    options: [
      { label: "Ir a Soporte técnico", next: "support_problem", set: { realMenu: "Soporte técnico" } }
    ]
  },
  support_problem: {
    module: "Soporte",
    bot: "¿Qué inconveniente técnico tenés?",
    options: [
      { label: "Sin servicio", next: "support_location_router", set: { technicalIssue: "Sin servicio" } },
      { label: "Servicio intermitente / microcortes", next: "support_location_router", set: { technicalIssue: "Servicio intermitente / microcortes" } },
      { label: "Lentitud", next: "support_location_router", set: { technicalIssue: "Lentitud" } },
      { label: "Problema con TV / Flow", next: "support_location_router", set: { technicalIssue: "Problema con TV / Flow" } },
      { label: "Telefonía fija sin funcionamiento", next: "support_location_router", set: { technicalIssue: "Telefonía fija sin funcionamiento" } },
      { label: "Visita técnica incumplida", next: "support_location_router", set: { technicalIssue: "Visita técnica incumplida" } },
      { label: "Ya reclamé y sigue igual", next: "support_location_router", set: { technicalIssue: "Ya reclamé y sigue igual" } },
      { label: "No puedo avanzar por bot/app", next: "support_location_router", set: { technicalIssue: "No puedo avanzar por bot/app" } }
    ]
  },
  support_location_router: {
    module: "Soporte",
    bot: "Voy a pedirte un dato para ubicar el servicio afectado.",
    autoNext: true,
    router: "serviceLocation"
  },
  support_address: {
    module: "Soporte",
    bot: "¿Cuál es el domicilio donde tenés instalado el servicio?",
    input: true,
    inputKey: "address",
    next: "support_start_date"
  },
  support_mobile_line: {
    module: "Soporte",
    bot: "¿Cuál es el número de línea afectada?",
    input: true,
    inputKey: "mobileLine",
    next: "support_start_date"
  },
  support_start_date: {
    module: "Soporte",
    bot: "¿Desde cuándo ocurre el inconveniente?",
    input: true,
    inputKey: "issueStartDate",
    next: "support_tests"
  },
  support_tests: {
    module: "Soporte",
    bot: "¿Qué pruebas ya realizaste?",
    options: [
      { label: "Reinicié el módem", next: "support_advisor", set: { testsDone: "Reinició el módem" } },
      { label: "Revisé cables/conexiones", next: "support_advisor", set: { testsDone: "Revisó cables/conexiones" } },
      { label: "Probé con otro dispositivo", next: "support_advisor", set: { testsDone: "Probó con otro dispositivo" } },
      { label: "Ya hice pruebas con el bot/app", next: "support_advisor", set: { testsDone: "Ya hizo pruebas con el bot/app" } },
      { label: "No realicé pruebas", next: "support_advisor", set: { testsDone: "No realizó pruebas" } },
      { label: "Otra", next: "support_other_test", set: { testsDone: "Otra" } }
    ]
  },
  support_other_test: {
    module: "Soporte",
    bot: "Contame brevemente qué prueba realizaste.",
    input: true,
    inputKey: "testsDoneDetail",
    next: "support_advisor"
  },
  support_advisor: {
    module: "Soporte",
    bot: "Gracias. Te paso con soporte técnico con el contexto del inconveniente para evitar reiniciar el diagnóstico desde cero.",
    advisor: true,
    advisorType: "support"
  },

  retention_dni: {
    module: "Retención",
    bot: "Escribime el DNI o CUIT asociado al servicio.",
    input: true,
    inputKey: "dniCuit",
    next: "retention_service_type"
  },
  retention_service_type: {
    module: "Retención",
    bot: "¿Qué tipo de servicio tenés?",
    options: [
      { label: "Internet / TV", next: "retention_real_menu", set: { serviceType: "Internet / TV" } },
      { label: "Telefonía fija", next: "retention_real_menu", set: { serviceType: "Telefonía fija" } },
      { label: "Línea móvil", next: "retention_real_menu", set: { serviceType: "Línea móvil" } }
    ]
  },
  retention_real_menu: {
    module: "Retención",
    bot: "¿Por dónde viene tu consulta?",
    options: [
      { label: "Facturación", next: "retention_to_baja_hint", set: { realMenu: "Facturación" } },
      { label: "Pagos", next: "retention_to_baja_hint", set: { realMenu: "Pagos" } },
      { label: "Trámites", next: "retention_to_baja_hint", set: { realMenu: "Trámites" } },
      { label: "Soporte técnico", next: "retention_to_baja_hint", set: { realMenu: "Soporte técnico" } },
      { label: "Ventas", next: "retention_to_baja_hint", set: { realMenu: "Ventas" } },
      { label: "Baja", next: "retention_reason", set: { realMenu: "Baja" } }
    ]
  },
  retention_to_baja_hint: {
    module: "Retención",
    bot: "Para esta demo estamos recorriendo Retención. Sigamos por la solicitud de baja.",
    options: [
      { label: "Ir a Baja", next: "retention_reason", set: { realMenu: "Baja" } }
    ]
  },
  retention_reason: {
    module: "Retención",
    bot: "¿Cuál es el motivo de tu solicitud?",
    options: [
      { label: "Aumento del servicio / precio", next: "retention_advisor", set: { retentionReason: "Aumento del servicio / precio" } },
      { label: "Oferta de otra compañía", next: "retention_advisor", set: { retentionReason: "Oferta de otra compañía" } },
      { label: "Falla técnica no resuelta", next: "retention_advisor", set: { retentionReason: "Falla técnica no resuelta" } },
      { label: "No uso el servicio", next: "retention_advisor", set: { retentionReason: "No uso el servicio" } },
      { label: "Quiero bajar el costo / reducir servicios", next: "retention_advisor", set: { retentionReason: "Quiero bajar el costo / reducir servicios" } },
      { label: "Gestión previa no resuelta", next: "retention_advisor", set: { retentionReason: "Gestión previa no resuelta" } },
      { label: "Mudanza", next: "retention_advisor", set: { retentionReason: "Mudanza" } },
      { label: "Otro motivo", next: "retention_other_reason", set: { retentionReason: "Otro motivo" } }
    ]
  },
  retention_other_reason: {
    module: "Retención",
    bot: "Contame brevemente el motivo de la solicitud.",
    input: true,
    inputKey: "retentionReasonDetail",
    next: "retention_advisor"
  },
  retention_advisor: {
    module: "Retención",
    bot: "Te paso con un asesor para continuar la gestión desde el motivo declarado.",
    advisor: true,
    advisorType: "retention"
  },

  prepaid_pending: {
    module: "Prepago",
    bot: "El flujo Prepago queda pendiente de definición.\n\nEn esta versión se deja visible como módulo para mantener el mapa completo del recorrido.",
    advisor: true,
    advisorType: "pending"
  },
  overnight_pending: {
    module: "Overnight",
    bot: "El flujo Overnight queda pendiente de definición.\n\nEn esta versión se deja visible como módulo para trabajar luego el journey de atención fuera de horario.",
    advisor: true,
    advisorType: "pending"
  },

  resolved_end: {
    module: "Demo",
    bot: "Gracias por comunicarte. Me alegra haberte ayudado. 😊",
    resolved: true
  }
};
