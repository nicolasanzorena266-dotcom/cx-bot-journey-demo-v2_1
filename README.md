# CX Bot Journey Demo

Demo interactiva para simular un bot conversacional estilo WhatsApp y medir el esfuerzo del cliente durante el recorrido.

La demo no se conecta a sistemas reales, no usa datos de clientes y no replica marcas reales. Sirve para mostrar cómo medir un journey conversacional antes de implementar cambios en un bot productivo.

## Qué permite mostrar

Además de las métricas del recorrido, la demo incluye un botón **Sugerencia asesor**.

Ese botón muestra solo una recomendación operativa de continuidad para el representante, basada en:

- el nodo final del recorrido;
- la última opción seleccionada;
- si hubo texto libre del cliente;
- si el recorrido fue extenso;
- si hubo señales de fricción.

No usa IA entrenada. Las sugerencias están cargadas por nodo en `context-pass.js`.

Prioridad de sugerencias:
1. Primero se usa la sugerencia específica del nodo final.
2. Si no hay nodo claro, se usa una regla general del recorrido.

## Qué permite medir

- ID del caso.
- Inicio del bot.
- Fin del bot.
- Tiempo invertido en bot.
- Cantidad de botones seleccionados por el cliente.
- Cantidad de mensajes escritos por el cliente.
- Cantidad de caracteres escritos por el cliente.
- Cantidad de respuestas del bot.
- Cantidad de respuestas repetidas del bot.
- Último mensaje del bot.
- Último mensaje del cliente.
- Si fue atendido por asesor.
- Si fue resuelto por bot.
- Estado final inferido.
- Cadena de opciones seleccionadas.
- Cadena de respuestas del bot.

## Cómo usar

Abrir `index.html` en el navegador.

También se puede publicar en GitHub Pages:

1. Crear un repositorio.
2. Subir estos archivos.
3. Ir a `Settings > Pages`.
4. En `Branch`, elegir `main` y carpeta `/root`.
5. Guardar.
6. Abrir el link público que genera GitHub Pages.

## Estructura

```txt
cx-bot-journey-demo/
├── index.html
├── style.css
├── flow.js
├── context-pass.js
├── script.js
└── README.md
```

## Cómo editar el flujo

El árbol conversacional está en `flow.js`.

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
  bot: "Escribime tu DNI o CUIT",
  input: true,
  next: "service_menu"
}
```

También puede derivar a asesor:

```js
{
  bot: "Te paso con un asesor.",
  advisor: true
}
```

También puede cerrar como resuelto:

```js
{
  bot: "Gracias por comunicarte. Me alegra haberte ayudado.",
  resolved: true
}
```

## Nota

Esta es una demo para conversación y métricas, no un bot productivo.
