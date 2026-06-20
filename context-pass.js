const ADVISOR_SUGGESTIONS = {
  onboarding_promise_gap:
    "Retomar desde brecha de onboarding: el cliente indica que la promesa comercial no coincide con el estado real. Validá DNI/CUIT ya informado, revisá solicitud comercial, fecha/condición prometida, estado de activación y próximo paso concreto.",

  onboarding_no_tracking:
    "Retomar desde falta de trazabilidad de activación. Validá DNI/CUIT ya informado, revisá si la venta quedó tomada, estado de activación/instalación y comunicá una fecha o hito verificable. Evitá responder solo con 'aguardá'.",

  onboarding_advisor:
    "Retomar desde consulta de Ventas - Onboarding masivo. Validá DNI/CUIT ya informado, revisá promesa comercial, estado de alta y próximo paso. El cliente necesita certeza postventa, no reiniciar la venta desde cero.",

  support_repeated_test:
    "Retomar desde soporte: el cliente ya realizó una prueba inicial y el servicio sigue con inconvenientes. Validá DNI/CUIT ya informado, no repitas el reinicio sin revisar contexto, consultá estado de red/equipo y definí siguiente acción técnica.",

  support_already_tried:
    "Retomar desde soporte con pruebas previas realizadas. Validá DNI/CUIT ya informado, revisá el recorrido del bot y evitá pedir nuevamente lo mismo salvo que sea técnicamente necesario y explicado.",

  support_advisor:
    "Retomar desde diagnóstico de soporte. Validá DNI/CUIT ya informado, revisá motivo técnico, pruebas indicadas por bot y último resultado declarado por el cliente.",

  retention_unresolved:
    "Retomar desde baja motivada por problema no resuelto. Validá DNI/CUIT ya informado, reconstruí contactos previos, identificá promesas incumplidas y diferenciá si la baja es decisión final o pedido de reparación.",

  retention_offer:
    "Retomar desde retención con apertura a alternativas. Validá DNI/CUIT ya informado, revisá motivo real de baja, historial de reclamos y oferta aplicable. No tratarlo como caso puramente comercial si viene de una fricción previa.",

  retention_irreversible:
    "Retomar desde solicitud de baja con baja recuperabilidad. Validá DNI/CUIT ya informado, gestioná la baja sin forzar loops comerciales y registrá causa raíz declarada.",

  pay_traceability_gap:
    "Retomar desde Personal Pay con falta de trazabilidad. Validá DNI/CUIT ya informado, revisá operación, fecha, importe, estado real y plazo. El cliente necesita saber dónde está la plata, no solo recibir un plazo genérico.",

  pay_advisor:
    "Retomar desde Personal Pay. Validá DNI/CUIT ya informado, identificá operación consultada, estado, importe, fecha y expectativa del cliente. Priorizá claridad y trazabilidad.",

  pay_advisor_critical:
    "Retomar desde Personal Pay con posible riesgo financiero. Validá DNI/CUIT ya informado, revisá movimiento desconocido, acciones preventivas disponibles y explicá claramente próximos pasos para recuperar control.",

  night_dead_end:
    "Retomar desde Prepago madrugada con callejón sin salida de autogestión. Validá DNI/CUIT ya informado, revisá recarga/saldo/pack y ofrecé alternativa inmediata si existe. El cliente está en urgencia horaria.",

  night_urgent_advisor:
    "Retomar desde Prepago madrugada con urgencia horaria. Validá DNI/CUIT ya informado, revisá recarga, saldo, pack y disponibilidad del servicio. No lo envíes de nuevo a la app si declaró que no tiene datos o no puede acceder.",

  default:
    "Validá DNI/CUIT ya informado, revisá el recorrido realizado por el cliente y retomá desde la última opción seleccionada sin reiniciar la consulta desde cero."
};

const SPECIAL_SUGGESTIONS = {
  free_text_friction:
    "El cliente presentó posible fricción con texto libre durante el recorrido. Validá DNI/CUIT ya informado, retomá desde la última intención clara y evitá devolverlo al menú.",

  long_journey:
    "El cliente realizó un recorrido extenso antes de ser derivado. Validá DNI/CUIT ya informado, revisá la cadena de opciones seleccionadas y retomá desde el último punto del flujo.",

  repeated_bot:
    "El recorrido muestra respuestas repetidas o loops del bot. Validá DNI/CUIT ya informado y retomá desde la última intención clara sin repetir pasos innecesarios.",

  repeated_menu:
    "El cliente volvió varias veces en el flujo. Validá DNI/CUIT ya informado, identificá la última opción seleccionada y confirmá si esa sigue siendo la consulta actual.",

  unclear_transfer:
    "El cliente fue derivado sin una intención final claramente resuelta por el bot. Validá DNI/CUIT ya informado, revisá la cadena de opciones seleccionadas y confirmá el motivo antes de continuar.",

  default:
    "Validá DNI/CUIT ya informado. Revisá el recorrido realizado por el cliente y retomá desde la última opción seleccionada sin reiniciar la consulta desde cero."
};
