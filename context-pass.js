const ADVISOR_SUGGESTIONS = {
  download_invoice_menu:
    "El cliente solicitó su factura y fue enviada por el bot. Retomar desde solicitud de factura actual en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, revisá si la factura enviada corresponde a la solicitada y consultá si tiene dudas al respecto.",

  old_invoices:
    "Consultá al cliente si tiene dudas sobre facturas anteriores en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá el período solicitado por el cliente.",

  invoice_total:
    "Retomar desde consulta sobre total a pagar en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá importe, cargos aplicados, ajustes y deuda previa.",

  invoice_due_date:
    "El cliente consulta sobre el vencimiento de factura en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá fecha de vencimiento, estado de deuda y medios de pago disponibles.",

  missing_invoice:
    "El cliente reclama la no recepción de su factura. Enviá la última factura correspondiente a su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá medio de envío, email registrado y disponibilidad de factura digital.",

  overcharged:
    "Retomar desde reclamo por posible cobro incorrecto en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá el detalle de factura, cargos aplicados y período reclamado.",

  billing_debt_problem:
    "Retomar desde consulta por deuda en su servicio de {{servicio}}. No reiniciar el flujo. Validá CUIT/DNI y motivo ya informado, y revisá saldo, deuda previa, vencimientos y pagos aplicados.",

  billing_advisor:
    "Retomar desde consulta de facturación en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá la última opción seleccionada por el cliente antes de continuar.",

  pay_card:
    "El cliente consultó por pago con tarjeta en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá si pudo acceder al medio de pago o si necesita asistencia para completar la operación.",

  pay_link:
    "El cliente solicitó un link de pago para su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y verificá si el link fue enviado correctamente o si requiere un nuevo envío.",

  payment_not_applied:
    "El cliente informa un pago no impactado en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá fecha de pago, medio utilizado, importe y plazo de acreditación. Solicitá comprobante solo si corresponde.",

  upload_receipt:
    "Retomar desde pago no impactado en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado. Solicitá comprobante solo si corresponde y revisá fecha, medio de pago, importe y plazo de acreditación.",

  debit_activate:
    "El cliente quiere activar débito automático en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá si cuenta con medio de pago habilitado para adherir.",

  debit_change_card:
    "El cliente quiere cambiar la tarjeta adherida al débito automático en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá el medio de pago actual antes de continuar.",

  debit_cancel:
    "El cliente solicita la baja del débito automático en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá el medio de pago actualmente adherido antes de continuar la gestión.",

  payments_advisor:
    "Retomar desde consulta de pagos en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, revisá la última opción seleccionada y evitá reiniciar el recorrido.",

  moving:
    "El cliente solicita gestionar una mudanza en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá domicilio nuevo, cobertura disponible, fecha estimada de mudanza y continuidad del servicio.",

  moving_advisor:
    "El cliente solicita gestionar una mudanza en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá domicilio nuevo, cobertura disponible, fecha estimada de mudanza y continuidad del servicio.",

  ownership_change:
    "El cliente solicita cambio de titularidad en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, e informá la documentación requerida para titular actual y nuevo titular.",

  ownership_advisor:
    "El cliente solicita cambio de titularidad en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, e informá la documentación requerida para titular actual y nuevo titular.",

  power_of_attorney:
    "El cliente consulta por alta de poder/autorizado en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá requisitos, documentación necesaria y alcance de la autorización.",

  procedures_advisor:
    "El cliente consulta por un trámite administrativo en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y retomá desde la última opción seleccionada.",

  commercial_offices:
    "El cliente consulta por atención en oficinas comerciales vinculadas a su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá localidad, trámite requerido y canal de atención disponible.",

  digital_invoice:
    "El cliente consulta por factura digital en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá email registrado, estado de adhesión y disponibilidad de envío digital.",

  no_internet:
    "El cliente informa inconveniente sin servicio en {{servicio}}. Validá CUIT/DNI y motivo ya informado, y continuá el diagnóstico considerando que el cliente ya indicó que el servicio no volvió luego de las pruebas iniciales.",

  slow_internet:
    "El cliente informa lentitud en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y revisá estado técnico de la conexión, señal, equipo instalado y pruebas ya indicadas por el bot.",

  tv_problem:
    "El cliente informa inconveniente con TV en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y continuá la revisión considerando que el cliente ya verificó conexión/decodificador y el problema persiste.",

  tech_advisor:
    "El cliente fue derivado desde soporte técnico en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y retomá desde el inconveniente indicado sin volver al menú general.",

  cancellation_advisor:
    "El cliente solicita la baja de su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y continuá la gestión desde la solicitud de baja sin redirigir al menú general.",

  sales_advisor:
    "El cliente consulta por contratación o mejora de plan en su servicio de {{servicio}}. Validá CUIT/DNI y motivo ya informado, y retomá desde la intención comercial indicada por el cliente.",

  mobile_plan:
    "El cliente consulta por información de su plan móvil. Validá CUIT/DNI y motivo ya informado, y revisá plan vigente, beneficios incluidos, consumos disponibles y posibles cambios solicitados.",

  mobile_packs:
    "El cliente consulta por compra o activación de pack en su línea móvil. Validá CUIT/DNI y motivo ya informado, y revisá disponibilidad del pack, saldo, vigencia y estado de activación.",

  roaming_coverage:
    "El cliente consulta por cobertura de roaming. Validá CUIT/DNI y motivo ya informado, y revisá país/destino informado, disponibilidad del servicio y condiciones de uso.",

  roaming_prices:
    "El cliente consulta por precios de roaming. Validá CUIT/DNI y motivo ya informado, y revisá destino, pack disponible, tarifa aplicable y vigencia del servicio.",

  roaming_config:
    "El cliente consulta por configuración de roaming. Validá CUIT/DNI y motivo ya informado, y continuá desde la configuración del equipo/línea considerando la guía ya enviada por el bot.",

  esim_advisor:
    "El cliente solicita eSIM para su línea móvil. Validá CUIT/DNI y motivo ya informado, y revisá compatibilidad del equipo, línea asociada y condiciones para activación."
};

const SPECIAL_SUGGESTIONS = {
  free_text_friction:
    "El cliente presentó posible fricción durante el recorrido del bot. Validá CUIT/DNI ya informado, retomá desde la última opción seleccionada y evitá reiniciar la consulta desde cero.",

  long_journey:
    "El cliente realizó un recorrido extenso antes de ser derivado. Validá CUIT/DNI y motivo ya informado, revisá la cadena de opciones seleccionadas y retomá desde el último punto del flujo.",

  repeated_bot:
    "El recorrido muestra respuestas repetidas del bot. Validá CUIT/DNI y motivo ya informado, y retomá desde la última intención clara del cliente sin volver a enviar al menú anterior.",

  repeated_menu:
    "El cliente volvió varias veces al menú principal durante el recorrido. Validá CUIT/DNI y motivo ya informado, identificá la última opción seleccionada y confirmá si esa sigue siendo la consulta actual.",

  unclear_transfer:
    "El cliente fue derivado sin una intención final claramente resuelta por el bot. Validá CUIT/DNI ya informado, revisá la cadena de opciones seleccionadas y confirmá el motivo antes de continuar.",

  default:
    "Validá CUIT/DNI y motivo ya informado. Revisá el recorrido realizado por el cliente y retomá desde la última opción seleccionada sin reiniciar la consulta desde cero."
};
