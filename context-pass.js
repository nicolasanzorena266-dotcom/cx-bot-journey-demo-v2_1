const ADVISOR_SUGGESTIONS = {
  sales_advisor:
    "Retomar la gestión desde el producto o servicio solicitado. Explorar necesidad del cliente, disponibilidad, condiciones de contratación y promociones vigentes antes de confirmar la oferta comercial.",

  onboarding_advisor:
    "Retomar la gestión desde la inconsistencia comercial declarada por el cliente. Validar en CRM la oferta registrada, revisar primera factura, bonificaciones aplicadas y criterio BC. Si corresponde, gestionar ajuste/NC; si no corresponde, informar criterio y evaluar alternativa comercial o escalamiento.",

  support_advisor:
    "Retomar la gestión desde el inconveniente técnico declarado. Revisar historial de reclamos, pruebas ya realizadas, visitas previas y estado técnico del servicio antes de indicar nuevas pruebas. Priorizar continuidad de gestión y evitar reiniciar el diagnóstico desde cero.",

  retention_advisor:
    "Retomar la gestión desde el motivo declarado por el cliente. Revisar servicios activos, descuentos vigentes, historial de reclamos, aumentos recientes y alternativas comerciales disponibles antes de ofrecer una propuesta de retención. Evitar responder solo con descuento si el motivo principal es técnico, administrativo o una gestión previa no resuelta.",

  prepaid_pending:
    "Flujo Prepago pendiente de definición. Mantener módulo visible como parte del mapa de recorrido, sin inferir fricciones ni sugerencias operativas todavía.",

  overnight_pending:
    "Flujo Overnight pendiente de definición. Mantener módulo visible como parte del mapa de recorrido, sin inferir fricciones ni sugerencias operativas todavía.",

  default:
    "Validá DNI/CUIT ya informado, revisá el recorrido realizado por el cliente y retomá desde la última opción seleccionada sin reiniciar la consulta desde cero."
};

const SPECIAL_SUGGESTIONS = {
  free_text_friction:
    "El cliente presentó posible fricción con texto libre durante el recorrido. Validá DNI/CUIT ya informado, retomá desde la última intención clara y evitá devolverlo al menú.",

  long_journey:
    "El cliente realizó un recorrido extenso antes de ser derivado. Validá DNI/CUIT ya informado, revisá la cadena de opciones seleccionadas y retomá desde el último punto del flujo.",

  unclear_transfer:
    "El cliente fue derivado sin una intención final claramente resuelta por el bot. Validá DNI/CUIT ya informado, revisá la cadena de opciones seleccionadas y confirmá el motivo antes de continuar.",

  default:
    "Validá DNI/CUIT ya informado. Revisá el recorrido realizado por el cliente y retomá desde la última opción seleccionada sin reiniciar la consulta desde cero."
};
