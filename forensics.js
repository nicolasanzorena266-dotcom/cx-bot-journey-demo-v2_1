function getForensicAnalysis(context) {
  const data = context.caseData || {};
  const module = data.module || "Demo";

  const base = {
    module,
    title: module,
    risk: "Sin riesgo inferido",
    friction: "No aplica",
    point: "No aplica",
    recommendation: "Continuar el recorrido según el módulo seleccionado.",
    genes: [],
    crm: []
  };

  if (module === "Ventas") {
    return {
      ...base,
      title: "Ventas | Consulta comercial",
      caseName: "Contratación o modificación de producto/servicio",
      friction: "No se infiere fricción en etapa inicial",
      point: "No aplica en la card inicial",
      recommendation: ADVISOR_SUGGESTIONS.sales_advisor,
      genes: ["Intención comercial", "Producto solicitado", "Derivación con contexto mínimo"]
    };
  }

  if (module === "Onboarding") {
    return {
      ...base,
      title: "Onboarding | Potencial detractor",
      risk: "Potencial detractor",
      caseName: "Inconsistencia entre oferta comercial y primera factura",
      friction: "Inconsistencia comercial",
      point: "Cuando la revisión no encuentra respaldo suficiente o no corresponde ajuste según BC.",
      recommendation: ADVISOR_SUGGESTIONS.onboarding_advisor,
      genes: ["Consulta por conceptos facturados", "Oferta vs factura", "Dependencia de CRM/BC"],
      crm: ["Oferta registrada", "Primera factura", "Bonificaciones aplicadas", "Criterio BC"]
    };
  }

  if (module === "Soporte") {
    return {
      ...base,
      title: "Soporte | Cliente reincidente / potencial detractor",
      risk: "Cliente reincidente / potencial detractor",
      caseName: "Inconveniente técnico con afectación del servicio",
      friction: "Falta de resolución efectiva",
      point: "Cuando el cliente percibe que vuelve a empezar la gestión desde cero.",
      recommendation: ADVISOR_SUGGESTIONS.support_advisor,
      genes: ["Diagnóstico insuficiente", "Pruebas ya realizadas", "Continuidad de gestión"],
      crm: ["Reclamos recientes", "Visitas recientes", "Agenda técnica", "Falla masiva/zona", "Última gestión registrada"]
    };
  }

  if (module === "Retención") {
    return {
      ...base,
      title: "Retención | Riesgo de fuga",
      risk: "Fuga / detracción",
      caseName: "Intención de baja, disconformidad o migración",
      friction: "Percepción de costo no sostenible o valor insuficiente del servicio",
      point: "Cuando la propuesta de retención no responde al motivo real de salida.",
      recommendation: ADVISOR_SUGGESTIONS.retention_advisor,
      genes: ["Motivo declarado", "Continuidad del servicio", "Recuperabilidad"],
      crm: ["Servicios activos", "Descuentos vigentes", "Historial de reclamos", "Aumentos recientes", "Alternativas comerciales"]
    };
  }

  if (module === "Prepago" || module === "Overnight") {
    return {
      ...base,
      title: `${module} | Pendiente de definición`,
      caseName: "Flujo pendiente",
      friction: "No definida todavía",
      point: "No definido todavía",
      recommendation: module === "Prepago" ? ADVISOR_SUGGESTIONS.prepaid_pending : ADVISOR_SUGGESTIONS.overnight_pending,
      genes: ["Módulo visible", "Pendiente de relevamiento", "Sin inferencias"]
    };
  }

  return base;
}
