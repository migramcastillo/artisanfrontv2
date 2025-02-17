# Validacion personalizada - Fastify desde 0

Si quisieras cubrir una validación que no puedes realizar con JSON Schema o simplemente no te gusta JSON Schema
puedes realizar tu propia validación de una forma sencilla y antes de procesar tu handler.

Recordemos el ciclo de vida de una solicitud y vamos a definir un hook ya sea antes de la validación o antes
de entrar en el handler. Una recomendación personal que te puedo hacer de cual hook utilizar puede ser la siguiente:

- `preValidation`: Si quieres validar la existencia de un valor en el header de la solicitud como una cookie o token
  para rechazar inmediatamente todo request no autorizado.
- `preHandler`: En el caso de que no quieras utilizar JSON Schema. En caso de que si lo utilices para que tu primera
  validación de los datos pueda pasar y tengas que utilizar esos valores validados para hacer otras validaciones.

## Ejemplo de validación personalizada

Vamos a utilizar el mismo escenario de los libros para el ejemplo, vamos a suponer que debemos recibir la
fecha en la que el libro se publicó, esta fecha no puede ser posterior a la fecha actual, siempre debe ser la fecha
actual o antes. En ese caso vamos a definir nuestra ruta de la siguiente forma:

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
  },
  handler: (request, reply) => {
    const { name, author, release } = request.body;
    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
      release: `Fue publicado en la fecha ${release}`,
    });
  },
});
```

Muy bien con esto ya validamos que debemos recibir esos campos, no obstante el campo release debería ser una fecha
y debería ser inferior o igual a la fecha actual, vamos a hacer uso del `preHandler` hook para esto.

**Nota**: Observarás que cambiamos un poco la sintaxis de `handler` para en vez de usar `function` utilicemos
una `arrow function () => {}` no hay mayor inconveniente utilizando ambas sintaxis, pero de ahora en adelante utilizaremos **arrow functions** en los hooks y handlers para simplificar el código.

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
  },
  preHandler: (request, reply, done) => {
    const { release } = request.body;

    const releaseDate = new Date(release);

    //  Validamos que sea una fecha valida
    if (isNaN(releaseDate) || releaseDate === "Invalid Date") {
      reply.code(400).send({
        error: "La fecha no es valida",
      });
    } else if (releaseDate > new Date()) {
      reply.code(400).send({
        error: "La fecha es posterior a la fecha actual",
      });
    } else {
      done();
    }
  },
  handler: (request, reply) => {
    const { name, author, release } = request.body;
    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
      release: `Fue publicado en la fecha ${release}`,
    });
  },
});
```

Lo primero que hay que tener en cuenta es que el hook `preHandler` recibio un argumento adicional llamado `done`.
Cuando utilizamos funciones que NO son asincronas vamos a requerir el uso de `done()` para el caso de las
asincronas lo veremos en la próxima lección. Cuando el hook llama a la función `done()` inmediatamente se continua
el ciclo de vida de la solicitud, en este caso pasa a la función handler.

Otro detalle nuevo que estamos viendo son las dos primeras sentencias if estan retornando un `reply` con
el código 400 detallando el error por el cual esta solicitud es invalida, como no llegamos a ejecutar ninguna
función `done()` el ciclo de vida se detiene ahi con la última respuesta de este preHandler.

**Nota:** Puedes utilizar reply.code también en tus handlers si quieres retornar un error u otró código de respuesta válida, por defecto el código es siempre 200. No olvides declarar `done()` si no lo haces Fastify
no podrá saber que debe continuar en el ciclo de vida y tu aplicación se quedará estancada en ese punto.

## Validación avanzada con JSON Schema

La validación con Schemas personalizados Ajv y schemas compartidos va a quedar fuera del alcance de este curso. Voy a crear un artículo y un video especial a futuro para mostrar como hacer este tipo de validaciones.
