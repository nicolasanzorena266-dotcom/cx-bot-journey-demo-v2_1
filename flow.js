const FLOW = {
  start: {
    bot: "¡Hola! Soy Pía, tu línea directa con Personal 😎\n\nSi necesitás consultar o gestionar tus servicios, es acá.\n\nPara empezar, escribime el CUIT o DNI por el que necesitás ayuda, sin puntos ni guiones. ✍️",
    input: true,
    next: "service_menu"
  },

  service_menu: {
    bot: "Bien. 😊\n\n¿Por qué servicio me estás consultando?",
    options: [
      { label: "TV / Internet", next: "tv_internet_menu" },
      { label: "Línea móvil", next: "mobile_menu" },
      { label: "Telefonía fija", next: "fixed_menu" }
    ]
  },

  tv_internet_menu: {
    bot: "¡Buenísimo! Contame, ¿cuál es tu consulta sobre tu servicio de TV o Internet?",
    options: [
      { label: "Facturación", next: "billing_menu" },
      { label: "Pagos", next: "payments_menu" },
      { label: "Trámites", next: "procedures_menu" },
      { label: "Soporte técnico", next: "tech_support_menu" },
      { label: "Ventas", next: "sales_advisor" },
      { label: "Baja", next: "cancellation_advisor" }
    ]
  },

  billing_menu: {
    bot: "Dale, charlemos sobre tu factura. 🧾\n\n¿Vemos alguno de estos temas?",
    options: [
      { label: "Descargar factura", next: "download_invoice_menu" },
      { label: "Entender factura", next: "understand_invoice_menu" },
      { label: "Facturas anteriores", next: "old_invoices" },
      { label: "Tengo un problema", next: "billing_problem_menu" },
      { label: "Volver al menú principal", next: "tv_internet_menu" }
    ]
  },

  download_invoice_menu: {
    bot: "La pedís y listo. Acá te comparto tu última factura en PDF.\n\n¿Querés revisar algo más sobre facturación?",
    options: [
      { label: "Entender factura", next: "understand_invoice_menu" },
      { label: "Facturas anteriores", next: "old_invoices" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  understand_invoice_menu: {
    bot: "Lo más importante de tu factura está arriba a la derecha.\n\nAhí vas a encontrar: total a pagar, vencimiento, referencia de pago y forma de pago.\n\n¿Sobre qué querés que te explique más?",
    options: [
      { label: "Total a pagar", next: "invoice_total" },
      { label: "Vencimiento", next: "invoice_due_date" },
      { label: "Medios de pago", next: "payments_menu" },
      { label: "Volver a facturación", next: "billing_menu" }
    ]
  },

  invoice_total: {
    bot: "El total a pagar incluye el abono del período y posibles cargos pendientes o ajustes.\n\n¿Te quedó claro?",
    options: [
      { label: "Sí, gracias", next: "resolved_end" },
      { label: "No entiendo mi deuda", next: "billing_debt_problem" }
    ]
  },

  invoice_due_date: {
    bot: "La fecha de vencimiento indica hasta cuándo podés pagar sin recargos.\n\nSi ya venció, podés consultar medios de pago disponibles.",
    options: [
      { label: "Ir a pagos", next: "payments_menu" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  old_invoices: {
    bot: "Para descargar tus facturas anteriores, entrá acá: https://personal.com.ar/facturas\n\n¿Te ayudo con otra consulta?",
    options: [
      { label: "Sí", next: "billing_menu" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  billing_problem_menu: {
    bot: "Entiendo. Decime cuál es el problema con tu factura:",
    options: [
      { label: "Me cobraron de más", next: "overcharged" },
      { label: "No entiendo mi deuda", next: "billing_debt_problem" },
      { label: "No recibí factura", next: "missing_invoice" },
      { label: "Necesito asesor", next: "billing_advisor" }
    ]
  },

  overcharged: {
    bot: "Para revisar un posible cobro de más necesito que un asesor vea el detalle de la cuenta.\n\nTe paso con alguien del equipo.",
    advisor: true
  },

  billing_debt_problem: {
    bot: "Veo que esta consulta requiere revisar el detalle de tu deuda y pagos aplicados.\n\nTe paso con un asesor para que lo vea con vos.",
    advisor: true
  },

  missing_invoice: {
    bot: "Podés descargar tu factura desde Mi Personal.\n\nTambién puedo ayudarte a activar factura digital.",
    options: [
      { label: "Activar factura digital", next: "digital_invoice" },
      { label: "Quiero asesor", next: "billing_advisor" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  billing_advisor: {
    bot: "Perfecto. Te paso con un asesor para continuar la gestión.",
    advisor: true
  },

  payments_menu: {
    bot: "Perfecto, sigamos por ahí. 😊\n\nTengo mucho para contarte sobre tus pagos.\n\nPara seguir, indicame cómo te ayudo eligiendo una de las opciones del menú.",
    options: [
      { label: "Quiero pagar", next: "want_to_pay" },
      { label: "Sobre mis pagos", next: "about_payments" },
      { label: "Pago no impactado", next: "payment_not_applied" },
      { label: "Débito automático", next: "automatic_debit" },
      { label: "Factura digital", next: "digital_invoice" },
      { label: "Otros temas", next: "payments_advisor" }
    ]
  },

  want_to_pay: {
    bot: "Genial. Podés abonar con tarjeta o desde un link de pago.\n\n¿Qué preferís?",
    options: [
      { label: "Tarjeta", next: "pay_card" },
      { label: "Link de pago", next: "pay_link" },
      { label: "Pago en efectivo", next: "cash_payment" }
    ]
  },

  pay_card: {
    bot: "Te comparto el acceso para pagar con tarjeta desde Mi Personal.\n\n¿Necesitás algo más?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Sí, volver a pagos", next: "payments_menu" }
    ]
  },

  pay_link: {
    bot: "Te comparto un link de pago seguro para abonar tu factura.\n\nCuando pagues, puede demorar hasta 48 horas en impactar.",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Ya pagué y no impactó", next: "payment_not_applied" }
    ]
  },

  cash_payment: {
    bot: "Podés pagar en puntos habilitados con el código de pago de tu factura.\n\n¿Querés consultar algo más?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Volver a pagos", next: "payments_menu" }
    ]
  },

  about_payments: {
    bot: "Acá podés consultar pagos realizados, pagos pendientes y vencimientos.\n\n¿Qué necesitás revisar?",
    options: [
      { label: "Pagos recientes", next: "recent_payments" },
      { label: "Pago pendiente", next: "pending_payment" },
      { label: "Otra consulta", next: "payments_advisor" }
    ]
  },

  recent_payments: {
    bot: "El último pago registrado se encuentra aplicado en tu cuenta.\n\n¿Necesitás algo más?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Otra consulta", next: "payments_menu" }
    ]
  },

  pending_payment: {
    bot: "Tenés un pago pendiente asociado a tu factura actual.\n\nPodés pagarlo ahora desde el link de pago.",
    options: [
      { label: "Ir a link de pago", next: "pay_link" },
      { label: "Hablar con asesor", next: "payments_advisor" }
    ]
  },

  payment_not_applied: {
    bot: "Si pagaste hace menos de 48 horas, puede estar procesándose.\n\nSi ya pasaron más de 48 horas, puedo pedirte el comprobante.",
    options: [
      { label: "Ya pasaron 48 horas", next: "upload_receipt" },
      { label: "Espero", next: "resolved_end" },
      { label: "Quiero asesor", next: "payments_advisor" }
    ]
  },

  upload_receipt: {
    bot: "Para revisar el pago necesito que un asesor valide el comprobante.\n\nTe paso con el equipo.",
    advisor: true
  },

  automatic_debit: {
    bot: "Con débito automático podés adherir, modificar o dar de baja la tarjeta asociada.",
    options: [
      { label: "Activar débito", next: "debit_activate" },
      { label: "Cambiar tarjeta", next: "debit_change_card" },
      { label: "Dar de baja débito", next: "debit_cancel" }
    ]
  },

  debit_activate: {
    bot: "Te comparto el acceso para adherirte a débito automático desde Mi Personal.\n\n¿Te ayudo con algo más?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Volver a pagos", next: "payments_menu" }
    ]
  },

  debit_change_card: {
    bot: "Para cambiar la tarjeta, ingresá a Mi Personal > Pagos > Débito automático.\n\n¿Querés hacer otra consulta?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Volver a pagos", next: "payments_menu" }
    ]
  },

  debit_cancel: {
    bot: "Para dar de baja el débito automático necesito confirmar algunos datos.\n\nTe paso con un asesor.",
    advisor: true
  },

  digital_invoice: {
    bot: "Podés adherirte a factura digital desde Mi Personal.\n\nUna vez activada, te llega por mail todos los meses.",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Volver a pagos", next: "payments_menu" }
    ]
  },

  payments_advisor: {
    bot: "Perfecto. Te paso con un asesor de pagos.",
    advisor: true
  },

  procedures_menu: {
    bot: "¡Bien! Indicame cuál es el trámite que necesitás realizar y te cuento cómo seguir.",
    options: [
      { label: "Mudanza", next: "moving" },
      { label: "Cambio de titular", next: "ownership_change" },
      { label: "Alta de poder", next: "power_of_attorney" },
      { label: "Oficinas comerciales", next: "commercial_offices" },
      { label: "Volver al menú principal", next: "tv_internet_menu" }
    ]
  },

  moving: {
    bot: "Si ya te mudaste o estás por hacerlo, podés gestionar el cambio de domicilio y seguir disfrutando tu conexión en tu nuevo hogar.",
    options: [
      { label: "Quiero gestionarlo", next: "moving_advisor" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  moving_advisor: {
    bot: "Para avanzar con la mudanza necesito que un asesor confirme la cobertura en el nuevo domicilio.",
    advisor: true
  },

  ownership_change: {
    bot: "Para cambiar la titularidad del servicio necesitás documentación del titular y de la persona que toma la cuenta.\n\n¿Querés continuar?",
    options: [
      { label: "Sí, continuar", next: "ownership_advisor" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  ownership_advisor: {
    bot: "Te paso con un asesor para completar el cambio de titularidad.",
    advisor: true
  },

  power_of_attorney: {
    bot: "Bien. Voy a pasarte con alguien del equipo de atención para que te ayuden con eso. ¿Podés conversar ahora?",
    options: [
      { label: "Sí", next: "procedures_advisor" },
      { label: "No", next: "tv_internet_menu" }
    ]
  },

  commercial_offices: {
    bot: "Podés encontrar oficinas comerciales cercanas desde el buscador oficial.\n\n¿Te ayudo con otra consulta?",
    options: [
      { label: "Sí", next: "procedures_menu" },
      { label: "No, gracias", next: "resolved_end" }
    ]
  },

  procedures_advisor: {
    bot: "Te paso con un asesor para continuar el trámite.",
    advisor: true
  },

  tech_support_menu: {
    bot: "Vamos a revisar tu servicio.\n\n¿Qué inconveniente tenés?",
    options: [
      { label: "Sin internet", next: "no_internet" },
      { label: "Internet lento", next: "slow_internet" },
      { label: "Problema con TV", next: "tv_problem" }
    ]
  },

  no_internet: {
    bot: "Reiniciá el módem y esperá 2 minutos.\n\n¿Volvió el servicio?",
    options: [
      { label: "Sí", next: "resolved_end" },
      { label: "No", next: "tech_advisor" }
    ]
  },

  slow_internet: {
    bot: "Probá acercarte al módem o conectarte por cable para descartar señal WiFi.\n\n¿Mejoró?",
    options: [
      { label: "Sí", next: "resolved_end" },
      { label: "No", next: "tech_advisor" }
    ]
  },

  tv_problem: {
    bot: "Revisá que el decodificador esté encendido y conectado.\n\nSi el problema sigue, te paso con soporte.",
    options: [
      { label: "Se solucionó", next: "resolved_end" },
      { label: "Sigue igual", next: "tech_advisor" }
    ]
  },

  tech_advisor: {
    bot: "Te paso con soporte técnico para revisar tu servicio.",
    advisor: true
  },

  mobile_menu: {
    bot: "📱 Genial. ¿Cuál es tu consulta sobre el servicio de tu línea?",
    options: [
      { label: "Mi plan", next: "mobile_plan" },
      { label: "Packs", next: "mobile_packs" },
      { label: "Facturación", next: "billing_menu" },
      { label: "Soporte técnico", next: "tech_support_menu" },
      { label: "Pagos", next: "payments_menu" },
      { label: "Roaming", next: "roaming_menu" }
    ]
  },

  mobile_plan: {
    bot: "Con tu plan tenés gigas para navegar y acceso a beneficios desde Mi Personal.\n\n¿Querés consultar algo más?",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Comprar packs", next: "mobile_packs" }
    ]
  },

  mobile_packs: {
    bot: "Podés comprar packs de datos, llamadas o roaming desde Mi Personal.",
    options: [
      { label: "Pack de datos", next: "resolved_end" },
      { label: "Pack roaming", next: "roaming_menu" },
      { label: "Necesito asesor", next: "sales_advisor" }
    ]
  },

  roaming_menu: {
    bot: "Menú Roaming.\n\n¿Qué necesitás saber?",
    options: [
      { label: "Cobertura", next: "roaming_coverage" },
      { label: "Precios", next: "roaming_prices" },
      { label: "Configurar roaming", next: "roaming_config" },
      { label: "Solicitar eSIM", next: "esim_advisor" }
    ]
  },

  roaming_coverage: {
    bot: "Te comparto el mapa de cobertura internacional para revisar los destinos disponibles.",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Ver precios", next: "roaming_prices" }
    ]
  },

  roaming_prices: {
    bot: "Consultá precios de roaming desde Mi Personal según el país al que viajás.",
    options: [
      { label: "No, gracias", next: "resolved_end" },
      { label: "Configurar roaming", next: "roaming_config" }
    ]
  },

  roaming_config: {
    bot: "Te comparto una guía para configurar roaming en tu celular antes de viajar.",
    options: [
      { label: "Gracias", next: "resolved_end" },
      { label: "Necesito asesor", next: "tech_advisor" }
    ]
  },

  esim_advisor: {
    bot: "Para solicitar eSIM necesito que un asesor valide la línea.",
    advisor: true
  },

  fixed_menu: {
    bot: "Perfecto.\n\nAntes de seguir, decime, ¿por dónde viene tu consulta?",
    options: [
      { label: "Pagos", next: "payments_menu" },
      { label: "Administrativo", next: "procedures_menu" },
      { label: "Soporte técnico", next: "tech_support_menu" },
      { label: "Ventas", next: "sales_advisor" },
      { label: "Baja", next: "cancellation_advisor" }
    ]
  },

  sales_advisor: {
    bot: "Te paso con un asesor comercial para continuar.",
    advisor: true
  },

  cancellation_advisor: {
    bot: "Te paso con un asesor para gestionar tu solicitud.",
    advisor: true
  },

  resolved_end: {
    bot: "Gracias por comunicarte. Me alegra haberte ayudado. 😊",
    resolved: true
  }
};
