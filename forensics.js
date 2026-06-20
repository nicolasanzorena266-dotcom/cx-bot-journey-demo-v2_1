const FRICTION_GENES = {
  promise_gap: {
    label: "Promesa rota",
    description: "La expectativa generada no coincide con lo que el sistema puede confirmar o resolver."
  },
  onboarding_uncertainty: {
    label: "Incertidumbre postventa",
    description: "El cliente no entiende si ya es cliente, qué falta o cuándo termina el alta."
  },
  low_traceability: {
    label: "Trazabilidad baja",
    description: "El canal no puede mostrar estado, hito o seguimiento verificable."
  },
  repeated_test: {
    label: "Prueba repetida",
    description: "El sistema vuelve a pedir una acción que el cliente ya realizó o considera inútil."
  },
  context_loss: {
    label: "Contexto perdido",
    description: "El recorrido previo no queda suficientemente disponible para quien continúa la gestión."
  },
  blind_transfer: {
    label: "Derivación ciega",
    description: "La derivación ocurre sin explicar qué se transfiere, por qué y desde dónde debe retomarse."
  },
  cancellation_symptom: {
    label: "Baja como síntoma",
    description: "La solicitud de baja aparece como consecuencia tardía de fricciones acumuladas."
  },
  late_recovery: {
    label: "Recuperación tardía",
    description: "El intento de retener aparece cuando la confianza o la paciencia ya están dañadas."
  },
  money_anxiety: {
    label: "Ansiedad financiera",
    description: "El problema involucra plata, control y confianza; una respuesta genérica aumenta la tensión."
  },
  generic_wait: {
    label: "Espera genérica",
    description: "La respuesta se apoya en plazos sin dar estado, causa o alternativa de seguimiento."
  },
  night_vulnerability: {
    label: "Vulnerabilidad horaria",
    description: "El contexto de madrugada cambia la urgencia y reduce la capacidad real de autogestión."
  },
  channel_paradox: {
    label: "Paradoja de canal",
    description: "La solución ofrecida requiere el mismo recurso que el cliente no tiene disponible."
  },
  low_autonomy: {
    label: "Autonomía bloqueada",
    description: "El cliente depende de una acción externa o de un canal que no puede usar en ese momento."
  },
  long_journey: {
    label: "Recorrido extenso",
    description: "El cliente acumula pasos antes de llegar a una salida clara."
  },
  free_text_friction: {
    label: "Texto libre con fricción",
    description: "El cliente sale de las opciones porque el menú no contiene o no resuelve su intención."
  },
  repeated_bot: {
    label: "Loop conversacional",
    description: "El bot repite respuestas o devuelve al cliente a zonas ya recorridas."
  }
};

const NODE_FORENSICS = {
  onboarding_menu: {
    genes: ["onboarding_uncertainty"],
    irreversible: "Cuando el cliente no sabe si la compra terminó, si falta algo o si tiene que esperar sin control.",
    redesign: "Agregar estado visible de alta: solicitud recibida, validación, activación/instalación, próximo hito y fecha estimada."
  },
  onboarding_activation_unclear: {
    genes: ["onboarding_uncertainty", "low_traceability"],
    paradox: "La venta ya ocurrió, pero el cliente todavía no puede confirmar si efectivamente empezó a ser cliente.",
    irreversible: "Cuando la respuesta postventa no puede mostrar un estado verificable.",
    redesign: "Convertir el onboarding en seguimiento: estado + plazo + canal de consulta + explicación de qué falta."
  },
  onboarding_promise_gap: {
    genes: ["promise_gap", "onboarding_uncertainty", "blind_transfer"],
    paradox: "La promesa comercial simplifica la compra, pero la operación posterior vuelve incierto el inicio del servicio.",
    irreversible: "Cuando el cliente compara 'me dijeron que ya estaba' contra 'el sistema no lo confirma'.",
    redesign: "Registrar promesa comercial y mostrarla al asesor junto con estado real, condición vigente y próximo paso."
  },
  onboarding_next_step_unclear: {
    genes: ["onboarding_uncertainty", "generic_wait"],
    paradox: "El sistema pide esperar, pero no explica qué evento debería ocurrir para que la espera tenga sentido.",
    irreversible: "Cuando la espera queda sin hito ni responsable visible.",
    redesign: "Reemplazar mensajes genéricos por una guía de próximos pasos con hito, plazo y canal de seguimiento."
  },
  onboarding_no_tracking: {
    genes: ["low_traceability", "blind_transfer", "onboarding_uncertainty"],
    paradox: "El cliente consulta el estado, pero el canal de consulta no puede mostrar estado.",
    irreversible: "Cuando el bot reconoce que no puede dar detalle y deriva sin resolver la incertidumbre.",
    redesign: "Mostrar estado mínimo de solicitud y, si deriva, entregar al asesor la promesa, fecha de venta y punto exacto de duda."
  },

  support_menu: {
    genes: ["context_loss"],
    irreversible: "Cuando el diagnóstico arranca como si el cliente nunca hubiera intentado nada.",
    redesign: "Separar primer contacto de contacto recurrente y guardar pruebas ya realizadas."
  },
  support_no_service: {
    genes: ["repeated_test"],
    paradox: "El diagnóstico técnico empieza pidiendo una acción básica sin saber si el cliente ya la hizo antes.",
    irreversible: "Cuando el cliente siente que el sistema lo hace empezar de cero.",
    redesign: "Preguntar si ya realizó pruebas previas y ajustar el camino según historial o declaración del cliente."
  },
  support_slow_service: {
    genes: ["repeated_test", "context_loss"],
    irreversible: "Cuando la guía técnica no diferencia entre problema WiFi, problema de red y contacto recurrente.",
    redesign: "Crear una rama de diagnóstico por síntomas: WiFi, equipo, red, zona, recurrencia y pruebas previas."
  },
  support_repeated_test: {
    genes: ["repeated_test", "context_loss", "blind_transfer"],
    paradox: "El cliente llega al asesor porque la prueba no resolvió, pero puede tener que explicar de nuevo que la prueba no resolvió.",
    irreversible: "Cuando la derivación no transporta resultado de prueba y síntoma declarado.",
    redesign: "Pasar una tarjeta técnica mínima: síntoma, prueba indicada, resultado, servicio afectado y recurrencia."
  },
  support_already_tried: {
    genes: ["context_loss", "repeated_test", "blind_transfer"],
    paradox: "El cliente avisa que ya hizo el recorrido, pero el sistema igual depende de una derivación para reconocerlo.",
    irreversible: "Cuando el cliente debe defender su propio historial ante el canal.",
    redesign: "Activar camino recurrente: no repetir pruebas, revisar historial y saltar al siguiente diagnóstico útil."
  },

  retention_menu: {
    genes: ["cancellation_symptom"],
    irreversible: "Cuando la empresa lee 'baja' como trámite y no como síntoma de algo anterior.",
    redesign: "Reconstruir causa raíz antes de ofrecer retención: precio, falla, promesa rota, atención previa o agotamiento."
  },
  retention_cancel_start: {
    genes: ["cancellation_symptom", "late_recovery"],
    paradox: "La empresa intenta recuperar al cliente en el mismo momento en que el cliente ya decidió irse.",
    irreversible: "Cuando el pedido de baja se convierte en el primer momento real de escucha.",
    redesign: "Crear señales tempranas de fuga a partir de recontactos, reclamos acumulados y promesas incumplidas."
  },
  retention_price: {
    genes: ["late_recovery"],
    irreversible: "Cuando el motivo declarado precio tapa un problema anterior no explorado.",
    redesign: "Diferenciar baja económica real de baja por enojo acumulado que usa precio como argumento visible."
  },
  retention_unresolved: {
    genes: ["cancellation_symptom", "context_loss", "late_recovery"],
    paradox: "El sistema ofrece retener a un cliente que primero necesitaba reparación de una experiencia fallida.",
    irreversible: "Cuando el cliente deja de pedir solución y empieza a pedir salida.",
    redesign: "Antes de oferta: reconstrucción de historial, promesas, reclamos y acción de reparación."
  },
  retention_irreversible: {
    genes: ["cancellation_symptom", "late_recovery"],
    paradox: "La retención aparece como última puerta, no como prevención del deterioro.",
    irreversible: "Cuando el cliente rechaza ofertas porque el problema ya no es solo económico.",
    redesign: "Medir recuperabilidad: decidido, agotado, negociador, traicionado, confundido o técnico recurrente."
  },

  personal_pay_menu: {
    genes: ["money_anxiety", "low_traceability"],
    irreversible: "Cuando el cliente siente que perdió control sobre su plata.",
    redesign: "Mostrar trazabilidad clara de movimientos, estados y próximos pasos."
  },
  pay_money_not_visible: {
    genes: ["money_anxiety", "generic_wait", "low_traceability"],
    paradox: "El cliente necesita certeza sobre plata, pero el sistema responde con una espera genérica.",
    irreversible: "Cuando no puede ver estado, causa ni seguimiento de la operación.",
    redesign: "Reemplazar 'revisá más tarde' por estado de operación: recibida, procesando, rechazada, demorada o pendiente de validación."
  },
  pay_unknown_movement: {
    genes: ["money_anxiety", "low_traceability"],
    paradox: "Ante una sospecha de movimiento desconocido, cada segundo sin claridad se siente como pérdida de control.",
    irreversible: "Cuando el cliente no sabe si debe esperar, bloquear o reclamar.",
    redesign: "Dar ruta crítica: bloquear preventivamente, revisar detalle, desconocer movimiento y recibir número de seguimiento."
  },
  pay_cashback_missing: {
    genes: ["money_anxiety", "generic_wait", "low_traceability"],
    paradox: "La promoción vende beneficio inmediato, pero el reclamo queda atado a condiciones difíciles de rastrear.",
    irreversible: "Cuando el cliente no puede verificar si cumple o no cumple la condición de la promo.",
    redesign: "Mostrar estado de cashback: promo detectada, condición cumplida/no cumplida, fecha estimada e importe esperado."
  },
  pay_traceability_gap: {
    genes: ["money_anxiety", "low_traceability", "blind_transfer"],
    paradox: "El canal deriva justamente porque no puede dar la trazabilidad que el cliente fue a buscar.",
    irreversible: "Cuando 'no tengo más detalle' aparece en un problema financiero.",
    redesign: "Crear ficha financiera para asesor: operación, importe, fecha, estado, plazo, comprobante y acción disponible."
  },
  pay_advisor_critical: {
    genes: ["money_anxiety", "low_traceability", "blind_transfer"],
    paradox: "El cliente necesita control inmediato, pero el sistema lo mueve a una cola de atención.",
    irreversible: "Cuando un movimiento desconocido no tiene una acción preventiva visible dentro del flujo.",
    redesign: "Ofrecer bloqueo preventivo, seguimiento y explicación del riesgo antes de la derivación."
  },

  prepaid_night_menu: {
    genes: ["night_vulnerability", "low_autonomy"],
    irreversible: "Cuando el horario transforma una consulta común en una situación urgente.",
    redesign: "Crear modo madrugada: rutas cortas, mensajes de contingencia y alternativas sin depender de app/datos."
  },
  night_topup_not_applied: {
    genes: ["night_vulnerability", "generic_wait", "low_traceability"],
    paradox: "La recarga puede estar procesándose, pero el cliente necesita usar la línea ahora.",
    irreversible: "Cuando el plazo operativo choca con la urgencia real del momento.",
    redesign: "Mostrar estado de recarga y alternativa temporal: pack SOS, préstamo, navegación bonificada o seguimiento de operación."
  },
  night_no_data: {
    genes: ["night_vulnerability", "channel_paradox", "low_autonomy"],
    paradox: "El sistema manda a la app a un cliente que justamente no tiene datos.",
    irreversible: "Cuando la solución depende del recurso que falta.",
    redesign: "Habilitar una ruta sin datos: USSD/SMS/WhatsApp zero-rated o pack de emergencia."
  },
  night_pack_needed: {
    genes: ["night_vulnerability", "low_autonomy"],
    irreversible: "Cuando comprar el pack depende de saldo/app/medio de pago que el cliente no puede usar en ese contexto.",
    redesign: "Ofrecer compra simplificada, deuda mínima autorizada o alternativa de emergencia nocturna."
  },
  night_channel_paradox: {
    genes: ["night_vulnerability", "channel_paradox", "low_autonomy", "generic_wait"],
    paradox: "Necesitás internet para resolver que no tenés internet. Una joya del absurdo operativo.",
    irreversible: "Cuando el cliente descubre que el canal recomendado es inaccesible para su situación real.",
    redesign: "Activar canal de contingencia sin datos y mensaje honesto: qué se puede hacer ahora y qué no."
  },
  night_low_autonomy: {
    genes: ["night_vulnerability", "low_autonomy", "generic_wait"],
    paradox: "El cliente necesita autonomía inmediata, pero el sistema solo ofrece intentar nuevamente.",
    irreversible: "Cuando la autogestión se convierte en un loop sin salida.",
    redesign: "Crear salida de emergencia: pack SOS, saldo anticipado o derivación priorizada por urgencia horaria."
  },
  night_dead_end: {
    genes: ["night_vulnerability", "channel_paradox", "low_autonomy", "blind_transfer"],
    paradox: "El sistema reconoce el callejón sin salida recién después de hacer caminar al cliente hasta el fondo.",
    irreversible: "Cuando el cliente confirma que no existe alternativa útil en el momento de necesidad.",
    redesign: "Detectar antes la combinación madrugada + sin datos + recarga/pack y ofrecer una ruta corta."
  }
};

const SERVICE_DEFAULTS = {
  "Ventas - Onboarding del masivo": {
    primaryGene: "onboarding_uncertainty",
    irreversible: "Cuando la venta termina, pero el cliente todavía no puede ubicarse dentro del alta.",
    redesign: "Diseñar un onboarding trazable: promesa comercial, estado real, fecha estimada y próximo paso."
  },
  "Soporte": {
    primaryGene: "context_loss",
    irreversible: "Cuando el diagnóstico ignora el recorrido previo del cliente.",
    redesign: "Convertir cada prueba en contexto transportable para el asesor o el siguiente nodo."
  },
  "Retención": {
    primaryGene: "cancellation_symptom",
    irreversible: "Cuando el pedido de baja aparece como síntoma tardío de fricciones acumuladas.",
    redesign: "Reconstruir señales previas y medir recuperabilidad antes de ofrecer descuentos."
  },
  "Personal Pay": {
    primaryGene: "money_anxiety",
    irreversible: "Cuando el cliente siente que perdió control sobre su plata.",
    redesign: "Dar trazabilidad financiera: estado, causa, plazo, acción y seguimiento."
  },
  "Prepago y madrugada": {
    primaryGene: "night_vulnerability",
    irreversible: "Cuando el contexto horario deja al cliente sin autonomía real.",
    redesign: "Crear un modo nocturno con rutas de emergencia y alternativas sin datos."
  }
};

function getForensicAnalysis(context) {
  const metrics = context.metrics || {};
  const path = context.visitedNodeIds || [];
  const service = context.customerData?.service || inferServiceFromPath(path);
  const finalNode = context.lastAdvisorTriggerNodeId || context.lastRealNodeId || path[path.length - 1] || "start";
  const finalState = metrics["Estado final inferido"] || "Sin estado";
  const advisor = metrics["Atendido por asesor"] === "Sí";
  const resolved = metrics["Resuelto por bot"] === "Sí";

  const genes = new Set();
  const paradoxes = [];
  const signals = [];

  path.forEach(nodeId => {
    const rule = NODE_FORENSICS[nodeId];
    if (!rule) return;
    (rule.genes || []).forEach(gene => genes.add(gene));
    if (rule.paradox) paradoxes.push(rule.paradox);
  });

  if (Number(metrics["Botones seleccionados por cliente"]) >= 6) {
    genes.add("long_journey");
    signals.push("El recorrido acumuló seis o más selecciones antes de cerrar o derivar.");
  }

  if (Number(metrics["Cantidad de respuestas repetidas del bot"]) > 0) {
    genes.add("repeated_bot");
    signals.push("Aparecen respuestas repetidas del bot durante el recorrido.");
  }

  if (Number(metrics["Mensajes escritos por cliente"]) >= 2) {
    genes.add("free_text_friction");
    signals.push("El cliente escribió texto libre más de una vez, posible señal de que las opciones no alcanzan.");
  }

  if (advisor) {
    genes.add("blind_transfer");
  }

  if (!resolved && !advisor && finalState !== "Resuelto por bot") {
    signals.push("El recorrido no muestra un cierre claro ni una derivación explícita.");
  }

  const finalRule = NODE_FORENSICS[finalNode] || {};
  const serviceDefault = SERVICE_DEFAULTS[service] || {};
  const geneList = Array.from(genes);
  const primaryGene = finalRule.genes?.[0] || serviceDefault.primaryGene || geneList[0] || "context_loss";
  const frictionScore = calculateFrictionScore({ metrics, genes: geneList, advisor, resolved });
  const riskLevel = frictionScore >= 8 ? "Crítico" : frictionScore >= 6 ? "Alto" : frictionScore >= 4 ? "Medio" : "Bajo";

  const uniqueParadoxes = unique(paradoxes).slice(-3);
  if (uniqueParadoxes.length === 0) {
    uniqueParadoxes.push(buildFallbackParadox(service, primaryGene));
  }

  return {
    service,
    finalNode,
    finalState,
    frictionScore,
    riskLevel,
    primaryGene,
    primaryGeneLabel: FRICTION_GENES[primaryGene]?.label || "Fricción no clasificada",
    genes: geneList.map(gene => ({
      id: gene,
      label: FRICTION_GENES[gene]?.label || gene,
      description: FRICTION_GENES[gene]?.description || "Sin descripción cargada."
    })),
    paradoxes: uniqueParadoxes,
    irreversibleMoment: finalRule.irreversible || serviceDefault.irreversible || "Cuando el cliente deja de sentir que el canal controla la situación.",
    redesignSuggestion: finalRule.redesign || serviceDefault.redesign || "Diseñar un punto de continuidad con contexto, estado visible y próximo paso claro.",
    advisorContext: buildAdvisorContext(context, service, finalNode),
    signals: signals,
    currentJourney: metrics["Cadena de opciones"] || "Sin opciones seleccionadas",
    idealJourney: buildIdealJourney(service, primaryGene),
    blackBox: buildBlackBox(context)
  };
}

function inferServiceFromPath(path) {
  if (path.some(id => id.startsWith("onboarding"))) return "Ventas - Onboarding del masivo";
  if (path.some(id => id.startsWith("support"))) return "Soporte";
  if (path.some(id => id.startsWith("retention"))) return "Retención";
  if (path.some(id => id.startsWith("pay"))) return "Personal Pay";
  if (path.some(id => id.startsWith("night") || id.startsWith("prepaid"))) return "Prepago y madrugada";
  return "No identificado";
}

function calculateFrictionScore({ metrics, genes, advisor, resolved }) {
  let score = 1;
  const buttons = Number(metrics["Botones seleccionados por cliente"]) || 0;
  const texts = Number(metrics["Mensajes escritos por cliente"]) || 0;
  const repeats = Number(metrics["Cantidad de respuestas repetidas del bot"]) || 0;

  score += Math.min(3, Math.floor(buttons / 2));
  if (texts >= 1) score += 1;
  if (texts >= 2) score += 1;
  if (repeats > 0) score += 1;
  if (advisor) score += 2;
  if (!resolved) score += 1;

  const highImpactGenes = ["money_anxiety", "night_vulnerability", "channel_paradox", "promise_gap", "cancellation_symptom"];
  highImpactGenes.forEach(gene => {
    if (genes.includes(gene)) score += 1;
  });

  return Math.max(1, Math.min(score, 10));
}

function buildFallbackParadox(service, primaryGene) {
  const byGene = {
    onboarding_uncertainty: "El cliente ya compró, pero todavía necesita demostrarle al sistema que necesita empezar.",
    context_loss: "El cliente trae historia, pero el canal lo trata como si acabara de nacer administrativamente.",
    cancellation_symptom: "La baja aparece al final, aunque el problema empezó bastante antes.",
    money_anxiety: "El sistema administra plazos; el cliente administra miedo a perder plata.",
    night_vulnerability: "La empresa ofrece autogestión justo cuando el contexto vuelve menos posible autogestionar."
  };

  return byGene[primaryGene] || `El módulo ${service} muestra una fricción que el flujo actual todavía no transforma en una acción clara.`;
}

function buildAdvisorContext(context, service, finalNode) {
  const metrics = context.metrics || {};
  const lastClient = metrics["Último mensaje del cliente"] || "Sin último mensaje";
  const path = metrics["Cadena de opciones"] || "Sin opciones seleccionadas";
  const dni = context.customerData?.dniCuit || "DNI/CUIT ficticio informado";

  return `Servicio/módulo: ${service}. DNI/CUIT: ${dni}. Nodo final: ${finalNode}. Última intención: ${lastClient}. Recorrido: ${path}. Retomar sin pedir que el cliente reconstruya el caso desde cero.`;
}

function buildIdealJourney(service, primaryGene) {
  const byService = {
    "Ventas - Onboarding del masivo": "Compra tomada → estado visible → promesa comercial registrada → próximo hito claro → asesor con contexto si hay desvío.",
    "Soporte": "Síntoma declarado → pruebas previas reconocidas → diagnóstico contextual → derivación técnica con resultado de prueba.",
    "Retención": "Pedido de baja → causa raíz → recuperabilidad → reparación/oferta/baja según intención real.",
    "Personal Pay": "Operación consultada → estado visible → causa/plazo → acción preventiva o seguimiento → asesor con trazabilidad.",
    "Prepago y madrugada": "Urgencia detectada → ruta sin datos/app → alternativa inmediata → seguimiento simple → derivación solo si aporta solución."
  };

  const byGene = {
    channel_paradox: "Problema detectado → no mandar a canal inaccesible → ofrecer alternativa sin datos → confirmar próximo paso.",
    money_anxiety: "Consulta financiera → estado de operación → explicación clara → acción disponible → seguimiento.",
    cancellation_symptom: "Baja → historial → causa raíz → decisión de recuperabilidad → acción sin loops."
  };

  return byService[service] || byGene[primaryGene] || "Intención clara → contexto transportado → respuesta específica → próximo paso verificable.";
}

function buildBlackBox(context) {
  const events = context.events || [];
  return events.slice(0, 12).map(event => {
    const clean = String(event.content || "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    return {
      actor: event.actor,
      type: event.type,
      content: clean.length > 130 ? clean.slice(0, 127) + "..." : clean
    };
  });
}

function unique(list) {
  return Array.from(new Set(list.filter(Boolean)));
}
