# Ciclo de vida - Fastify desde 0

Antes de pasar a las validaciones, middlewares y hooks es importante saber que desde la recepción de la solicitud del cliente hasta
la respuesta que le enviamos atraviesa un proceso de ciclo de vida y nosotros podemos declarar funciones `hooks` que se ejecutan en un punto especifico de este ciclo de vida, algunos ejemplos de esta implementación puede ser:

- Validar la existencia de una cookie o un token antes de realizar la validación de campos.
- Validar condiciones especificas de la solicitud antes de la función handler pero después de hacer la validación.
- Ejecutar alguna tarea una vez que la respuesta del servidor ha sido enviada al cliente.

[Puedes consultar el diagrama oficial de ciclo de vida aquí](https://www.fastify.io/docs/v2.0.x/Lifecycle/). En resumen
esto sucede cuando un usuario envia un request a tu server Fastify:

- Busca la ruta que coincida con el request del cliente.
- Se ejecuta el Hook `onRequest`.
- Se ejecutan los Middlewares de la aplicación.
- Se ejecuta el Hook `preParsing`.
- Se realiza el parsing de la solicitud, esto es la transformación del request para preparar `query`, `params` o `body`
  en el formato solicitado.
- Se ejecuta el Hook `preValidation`.
- Se ejecuta la validación con el JSON Schema especificado.
- Se ejecuta el Hook `preHandler`.
- Se ejecuta la función handler de la ruta, esta son las funciones que hemos definido en las lecciones anteriores
  después del nombre de la ruta.
- Se ejecuta el Hook `preSerialization` este se encarga de transformar el reply que le entregaremos al usuario.
- Se ejecuta el Hook `onSend` que es el último Hook antes de que la solicitud sea enviada al cliente.
- Se envía la respuesta al cliente.
- Se ejecuta el Hook `onResponse`.

## Ejemplo de implementación

En el siguiente ejemplo observamos la implementación de los `hooks`, los hooks no son más que funciones que "enganchamos" a un punto
del ciclo de vida para que se ejecute:

```js
const fastify = require("fastify");

const server = fastify({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

server.addHook("onRequest", function (request, reply, done) {
  request.log.info("Se ejecuta onRequest a nivel aplicación");
  done();
});

server.get("/", {
  onRequest: function (request, reply, done) {
    request.log.info("Se ejecuta onRequest");
    done();
  },
  preParsing: function (request, reply, done) {
    request.log.info("Se ejecuta preParsing");
    done();
  },
  preValidation: function (request, reply, done) {
    request.log.info("Se ejecuta preValidation");
    done();
  },
  preHandler: function (request, reply, done) {
    request.log.info("Se ejecuta preHandler");
    done();
  },
  handler: function (request, reply) {
    request.log.info("Se ejecuta handler");
    reply.code(200).send({
      message: "Fastify works!",
    });
  },
  preSerialization: function (request, reply, payload, done) {
    request.log.info("Se ejecuta preSerialization");
    done(null, payload);
  },
  onSend: function (request, reply, payload, done) {
    request.log.info("Se ejecuta onSend");
    done(null, payload);
  },
  onResponse: function (request, reply, done) {
    request.log.info("Se ejecuta onResponse");
    done();
  },
});

server.listen(3000, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
```

Cuando ejecutes el script podrás observar como se envía cada uno de los logs en un punto del ciclo de vida en especifico.
La propiedad `addHook` permite a la instancia de Fastify definir una función `hook` en una parte especifica de su ciclo de vida, como
primer argumento recibe el nombre del `hook` y como segundo argumento la función que se "enganchará" a ese ciclo de vida.

Observarás igual que la ruta ha recibido como segundo argumento un objeto, en la siguiente función vamos a ver más a detalle este
tipo de sintaxis por ahora el objetivo de esta lección es mostrarte que se ejecutan los logs en cada paso del ciclo de vida.

No es crítico memorizar cada paso pero si es una buena referencia saber que podemos modificar el comportamiento
de toda nuestra solicitud o una ruta especifica manipulando el Hook correspondiente. En mi experiencia personal
he utilizado más los hooks `preValidation` y `preHandler`. En la siguiente lección vamos a ver como realizar una
validación con JSON Schema para nuestras rutas.
