const FLOW = {
  start: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nEste demo simula recorridos críticos para detectar fricción CX.\n\nPara empezar, escribime un DNI o CUIT ficticio, sin puntos ni guiones. ✍️",
    input: true,
    next: "service_menu"
  },

  service_menu: {
    bot: "Bien. 😊\n\nElegí el módulo que querés recorrer:",
    options: [
      { label: "Ventas - Onboarding del masivo", next: "onboarding_menu" },
      { label: "Soporte", next: "support_menu" },
      { label: "Retención", next: "retention_menu" },
      { label: "Personal Pay", next: "personal_pay_menu" },
      { label: "Prepago y madrugada", next: "prepaid_night_menu" }
    ]
  },

  // 1. Ventas - Onboarding masivo
  onboarding_menu: {
    bot: "Módulo Ventas - Onboarding del masivo.\n\nAcá miramos la brecha entre comprar y empezar a ser cliente. ¿Qué caso querés simular?",
    options: [
      { label: "Compré y no sé si quedó activo", next: "onboarding_activation_unclear" },
      { label: "Me prometieron algo distinto", next: "onboarding_promise_gap" },
      { label: "No sé cuál es el próximo paso", next: "onboarding_next_step_unclear" }
    ]
  },

  onboarding_activation_unclear: {
    bot: "Veo una solicitud comercial iniciada.\n\nLa activación puede demorar y te vamos a avisar cuando esté disponible. Mientras tanto, podés consultar el estado desde Mi Personal.",
    options: [
      { label: "Pero ya me dijeron que estaba activo", next: "onboarding_promise_gap" },
      { label: "No puedo ver el estado", next: "onboarding_no_tracking" },
      { label: "Quiero hablar con asesor", next: "onboarding_advisor" }
    ]
  },

  onboarding_promise_gap: {
    bot: "Entiendo. Para revisar la condición comercial y el estado de activación, necesito pasarte con un asesor.",
    advisor: true
  },

  onboarding_next_step_unclear: {
    bot: "Después de la compra, tenés que esperar la confirmación de activación.\n\nSi corresponde instalación o validación adicional, te vamos a contactar.",
    options: [
      { label: "¿Cuándo?", next: "onboarding_no_tracking" },
      { label: "No me sirve esa respuesta", next: "onboarding_advisor" },
      { label: "Gracias", next: "resolved_end" }
    ]
  },

  onboarding_no_tracking: {
    bot: "Todavía no tengo un estado más detallado para mostrarte desde este canal.\n\nTe paso con un asesor para que revise la solicitud.",
    advisor: true
  },

  onboarding_advisor: {
    bot: "Te paso con un asesor para revisar la venta, la promesa comercial y el estado de activación.",
    advisor: true
  },

  // 2. Soporte
  support_menu: {
    bot: "Módulo Soporte.\n\nAcá miramos diagnóstico, handoff y repetición de pruebas. ¿Qué caso querés recorrer?",
    options: [
      { label: "Sin servicio", next: "support_no_service" },
      { label: "Internet lento", next: "support_slow_service" },
      { label: "Ya pasé por el bot", next: "support_already_tried" }
    ]
  },

  support_no_service: {
    bot: "Vamos a revisar tu servicio.\n\nPrimero reiniciá el módem y esperá 2 minutos. ¿Volvió la conexión?",
    options: [
      { label: "Sí", next: "resolved_end" },
      { label: "No", next: "support_repeated_test" },
      { label: "Ya lo hice antes", next: "support_already_tried" }
    ]
  },

  support_slow_service: {
    bot: "Probá acercarte al módem o conectarte por cable para descartar señal WiFi.\n\n¿Mejoró?",
    options: [
      { label: "Sí", next: "resolved_end" },
      { label: "No", next: "support_repeated_test" },
      { label: "Necesito asesor", next: "support_advisor" }
    ]
  },

  support_repeated_test: {
    bot: "Si el problema continúa, necesito derivarte a soporte técnico para revisar la línea y el equipo instalado.",
    advisor: true
  },

  support_already_tried: {
    bot: "Entiendo que ya hiciste pruebas previas.\n\nPara continuar, te paso con soporte técnico con el recorrido realizado.",
    advisor: true
  },

  support_advisor: {
    bot: "Te paso con soporte técnico para continuar el diagnóstico.",
    advisor: true
  },

  // 3. Retención
  retention_menu: {
    bot: "Módulo Retención.\n\nAcá no miramos solo la baja: reconstruimos qué la produjo. ¿Qué caso querés simular?",
    options: [
      { label: "Quiero dar de baja", next: "retention_cancel_start" },
      { label: "Me voy por precio", next: "retention_price" },
      { label: "Me voy porque nunca resolvieron", next: "retention_unresolved" }
    ]
  },

  retention_cancel_start: {
    bot: "Lamento que quieras dar de baja el servicio.\n\nAntes de continuar, puedo revisar alternativas para que sigas con Personal.",
    options: [
      { label: "No quiero ofertas", next: "retention_irreversible" },
      { label: "Escucho alternativas", next: "retention_offer" },
      { label: "Mi problema no es el precio", next: "retention_unresolved" }
    ]
  },

  retention_price: {
    bot: "Puedo revisar si hay una opción comercial disponible para tu línea o servicio.\n\n¿Querés que lo vea un asesor?",
    options: [
      { label: "Sí", next: "retention_offer" },
      { label: "No, quiero la baja", next: "retention_irreversible" }
    ]
  },

  retention_unresolved: {
    bot: "Entiendo. Cuando la baja viene por un problema no resuelto, necesito que un asesor revise el historial antes de continuar.",
    advisor: true
  },

  retention_offer: {
    bot: "Te paso con un asesor para revisar alternativas comerciales y el motivo de baja informado.",
    advisor: true
  },

  retention_irreversible: {
    bot: "Te paso con un asesor para gestionar la solicitud de baja.",
    advisor: true
  },

  // 4. Personal Pay
  personal_pay_menu: {
    bot: "Módulo Personal Pay.\n\nAcá el eje es confianza, plata y trazabilidad. ¿Qué caso querés recorrer?",
    options: [
      { label: "No se acreditó mi plata", next: "pay_money_not_visible" },
      { label: "Veo un movimiento desconocido", next: "pay_unknown_movement" },
      { label: "No me aplicaron cashback", next: "pay_cashback_missing" }
    ]
  },

  pay_money_not_visible: {
    bot: "Si la operación fue reciente, puede demorar en impactar.\n\nRevisá nuevamente más tarde desde la app.",
    options: [
      { label: "Necesito saber dónde está la plata", next: "pay_traceability_gap" },
      { label: "Ya pasó mucho tiempo", next: "pay_advisor" },
      { label: "Espero", next: "resolved_end" }
    ]
  },

  pay_unknown_movement: {
    bot: "Si no reconocés un movimiento, te recomendamos revisar el detalle desde la app y bloquear preventivamente la cuenta si lo considerás necesario.",
    options: [
      { label: "Quiero bloquear", next: "pay_advisor_critical" },
      { label: "Quiero asesor", next: "pay_advisor_critical" },
      { label: "Solo quería consultar", next: "resolved_end" }
    ]
  },

  pay_cashback_missing: {
    bot: "El reintegro puede demorar según las condiciones de la promoción.\n\nRevisá bases y condiciones desde la app.",
    options: [
      { label: "No encuentro la promo", next: "pay_traceability_gap" },
      { label: "Quiero asesor", next: "pay_advisor" },
      { label: "Gracias", next: "resolved_end" }
    ]
  },

  pay_traceability_gap: {
    bot: "No tengo más detalle del estado desde este canal.\n\nTe paso con un asesor para revisar la operación.",
    advisor: true
  },

  pay_advisor: {
    bot: "Te paso con un asesor de Personal Pay para revisar la operación.",
    advisor: true
  },

  pay_advisor_critical: {
    bot: "Te paso con un asesor para revisar el movimiento y tomar una acción preventiva si corresponde.",
    advisor: true
  },

  // 5. Prepago y madrugada
  prepaid_night_menu: {
    bot: "Módulo Prepago y madrugada.\n\nSon las 03:17. El cliente necesita resolver ahora, no en horario administrativo. ¿Qué caso querés simular?",
    options: [
      { label: "Recargué y no impactó", next: "night_topup_not_applied" },
      { label: "Estoy sin datos", next: "night_no_data" },
      { label: "Necesito comprar un pack", next: "night_pack_needed" }
    ]
  },

  night_topup_not_applied: {
    bot: "La recarga puede demorar en impactar según el medio de pago utilizado.\n\nTe sugerimos verificar más tarde desde Mi Personal.",
    options: [
      { label: "No tengo datos para entrar", next: "night_channel_paradox" },
      { label: "Necesito usar la línea ahora", next: "night_urgent_advisor" },
      { label: "Espero", next: "resolved_end" }
    ]
  },

  night_no_data: {
    bot: "Podés consultar y comprar packs desde la app Mi Personal.\n\nTambién podés revisar tu saldo disponible.",
    options: [
      { label: "No puedo entrar a la app", next: "night_channel_paradox" },
      { label: "Comprar pack", next: "night_pack_needed" },
      { label: "Quiero asesor", next: "night_urgent_advisor" }
    ]
  },

  night_pack_needed: {
    bot: "Para comprar un pack necesitás saldo suficiente o un medio de pago disponible desde Mi Personal.",
    options: [
      { label: "No carga la app", next: "night_channel_paradox" },
      { label: "No tengo saldo", next: "night_low_autonomy" },
      { label: "Gracias", next: "resolved_end" }
    ]
  },

  night_channel_paradox: {
    bot: "Entiendo. En este momento no puedo completar la gestión desde acá.\n\nTe sugiero intentar nuevamente más tarde o revisar desde Mi Personal cuando tengas conexión.",
    options: [
      { label: "Entonces no puedo hacer nada", next: "night_dead_end" },
      { label: "Quiero asesor", next: "night_urgent_advisor" }
    ]
  },

  night_low_autonomy: {
    bot: "Sin saldo o medio de pago disponible no puedo activar el pack desde este canal.\n\nTe sugiero intentar una nueva recarga.",
    options: [
      { label: "Ya recargué y no impactó", next: "night_topup_not_applied" },
      { label: "Quiero asesor", next: "night_urgent_advisor" }
    ]
  },

  night_dead_end: {
    bot: "Lamento no poder resolverlo desde este canal en este momento.\n\nTe paso con un asesor para revisar alternativas disponibles.",
    advisor: true
  },

  night_urgent_advisor: {
    bot: "Te paso con un asesor. El recorrido indica urgencia horaria y baja autonomía para resolver por autogestión.",
    advisor: true
  },

  resolved_end: {
    bot: "Gracias por comunicarte. Me alegra haberte ayudado. 😊",
    resolved: true
  }
};
