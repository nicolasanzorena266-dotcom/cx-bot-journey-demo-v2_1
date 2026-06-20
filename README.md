# CX Journey Forensics Demo

Demo interactiva para simular recorridos conversacionales estilo WhatsApp y detectar fricciones CX en escenarios críticos de Personal.

La demo no se conecta a sistemas reales, no usa datos de clientes y no replica un flujo productivo. Sirve para presentar hipótesis de mejora, comparar recorridos y mostrar cómo se rompe la experiencia desde una mirada forense.

## Módulos incluidos

El flujo está ordenado así:

1. Ventas - Onboarding del masivo
2. Soporte
3. Retención
4. Personal Pay
5. Prepago y madrugada

## Qué permite mostrar

Además de simular el recorrido del cliente, la demo permite generar:

- Métricas del recorrido.
- Sugerencia operativa para asesor.
- Análisis forense CX.
- Exportación CSV con métricas + genes de fricción.

## Qué agrega la capa forense

El botón **Análisis forense** interpreta el recorrido y muestra:

- Módulo CX.
- Riesgo CX.
- Score de fricción.
- Gen principal de fricción.
- Genoma de fricción completo.
- Paradoja detectada.
- Momento irreversible.
- Rediseño sugerido.
- Journey actual vs journey ideal.
- Caja negra CX con los eventos principales.
- Contexto mínimo para asesor.

## Conceptos usados

### Genoma de fricción

Clasifica la falla de experiencia más allá del motivo declarado.

Ejemplos:

- Promesa rota.
- Incertidumbre postventa.
- Contexto perdido.
- Baja como síntoma.
- Ansiedad financiera.
- Vulnerabilidad horaria.
- Paradoja de canal.
- Autonomía bloqueada.

### Paradoja detectada

Expone contradicciones del sistema.

Ejemplo:

> Necesitás internet para resolver que no tenés internet.

### Momento irreversible

Identifica el punto donde el contacto deja de ser solo operativo y empieza a romper confianza, control o paciencia.

## Estructura

```txt
cx-bot-journey-forensics/
├── index.html
├── style.css
├── flow.js
├── context-pass.js
├── forensics.js
├── script.js
└── README.md
```

## Archivos principales

### `flow.js`

Contiene el árbol conversacional del demo.

Cada nodo puede tener:

```js
{
  bot: "Mensaje del bot",
  options: [
    { label: "Opción visible", next: "id_del_siguiente_nodo" }
  ]
}
```

También puede pedir texto:

```js
{
  bot: "Escribime un DNI o CUIT ficticio",
  input: true,
  next: "service_menu"
}
```

Derivar a asesor:

```js
{
  bot: "Te paso con un asesor.",
  advisor: true
}
```

Cerrar como resuelto:

```js
{
  bot: "Gracias por comunicarte.",
  resolved: true
}
```

### `context-pass.js`

Contiene las sugerencias operativas para el asesor según el nodo final del recorrido.

### `forensics.js`

Contiene la lógica nueva:

- genes de fricción;
- reglas por nodo;
- paradojas;
- momentos irreversibles;
- rediseños sugeridos;
- score de fricción;
- journey ideal.

### `script.js`

Registra eventos, calcula métricas, renderiza el chat, muestra reportes, genera análisis forense y exporta CSV.

## Cómo usar localmente

Abrir `index.html` en el navegador.

## Cómo subir a GitHub Pages

Si ya tenés el repo del demo anterior, no hace falta crear uno nuevo.

1. Descargá estos archivos.
2. Descomprimí el ZIP.
3. Reemplazá en tu repo los archivos existentes.
4. Agregá el archivo nuevo `forensics.js`.
5. Subí los cambios a GitHub.
6. Esperá a que GitHub Pages actualice el sitio.

Si GitHub Pages ya estaba activo, el link debería seguir siendo el mismo.

## Nota

Esto sigue siendo una demo conceptual. La gracia no es replicar todo el árbol real de Personal, sino tener una herramienta para mostrar cómo un recorrido puede medirse, interpretarse y convertirse en rediseño operativo.
