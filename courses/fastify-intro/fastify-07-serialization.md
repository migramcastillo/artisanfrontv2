# Serialization - Fastify desde 0

Serialization es el proceso que utiliza Fastify para dar forma al body que se retorna al usuario cuando se
utiliza `reply.send`, al igual que en las validaciones, dentro de `schema` se puede definir el schema de
el **response** que se le va a entregar al usuario dependiendo del código de respuesta, la manipulación de la serialización
puede ayudarnos a evitar que se envien datos innecesarios.

## Definir esquemas de serialización

En el siguiente ejemplo tomamos la solicitud POST de la lección pasada y la simplificamos para agregar
el schema de serialización, como observarás el schema se define por código de respuesta HTTP:

```js
server.post("/book", {
  schema: {
    body: {
      type: "object",
      required: ["name", "author", "release"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
        release: { type: "string" },
      },
    },
    //  Schema de response
    response: {
      //  Definimos schema para respuestas 200
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          author: { type: "string" },
          release: { type: "string" },
        },
      },
    },
  },
  handler: (request, reply) => {
    const { name, author, release } = request.body;
    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
      release: `Fue publicado en la fecha ${release}`,
      invalid: `Esta propiedad será filtrada por el schema`,
    });
  },
});
```

## Definir schema para muchas solicitudes

Si por ejemplo para todos los errores de servidor que son los 500 queremos definir un schema,
podemos utilizar la sintaxis wildcard para que aplique a todos los tipos 500

```js
server.post("/book", {
  schema: {
    body: {
      type: "object",
      required: ["name", "author", "release"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
        release: { type: "string" },
      },
    },
    //  Schema de response
    response: {
      //  Definimos schema para respuestas 200
      200: {
        type: "object",
        properties: {
          name: { type: "string" },
          author: { type: "string" },
          release: { type: "string" },
        },
      },
      //  Definimos schema para respuestas desde 500 a 599
      "5xx": {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
  handler: (request, reply) => {
    const { name, author, release } = request.body;
    reply.code(503).send({
      error: `Error en el servidor`,
      invalid: `Esta propiedad será filtrada por el schema`,
    });
  },
});
```

Nota: Aunque en esta petición siempre vamos a mandar error, lo mejor sería tener un schema general para los errores
y manejar todo error desde el errorHandler, vamos a ver a detalle el errorHandler en otras lecciones.
