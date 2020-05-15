# Manejo de Errores - Fastify desde 0

Uno de los puntos más importantes cuando se crea una aplicación es saber en donde son capturados y procesados
los errores, siempre van a existir los errores en las aplicaciones que construimos así que es mejor prevenir
y conocer su manejo. En Fastify tenemos los siguientes puntos en cuanto al manejo de errores:

- Errores de rutas no encontradas por defecto van a retornar una respuesta JSON con código 404.
- Errores de ejecución dentro de nuestros handlers como errores de sintaxis van a retornar una respuesta JSON con código 500.
- Por defecto las validaciones de schemas que no cumplan los requisitos son retornadas con el detalle de validación
  y un código de error 400.
- En cuanto a promesas y solicitudes asincronas, es nuestra responsabilidad capturar los errores, **un error de promesa
  no capturado finalizará la ejecución de nuestra aplicación.**
- Como se ha mostrado en los hooks, podemos retornar peticiones con códigos de errores 400 o 500 en algún hook
  de forma manual dentro de un bloque `try/catch`.
- Podemos manejar los errores de todo un contexto mediante la propiedad `setErrorHandler`.
- Podemos manejar los errores de rutas no encontradas mediante la propiedad `setNotFoundHandler`.

## Errores de promesas no manejadas

Tomando como ejemplo el siguiente código:

```js
const enviarError = () =>
  new Promise((resolve, reject) => {
    reject("Esta promesa debe fallar");
  });

server.get("/", (request, reply) => {
  enviarError().then(() => {
    reply.send({
      message: "Mi mensaje",
    });
  });
});
```

Podemos observar que `enviarError` es una promesa que siempre enviará error (¿Quién lo diria?), como no hemos capturado el error de
la promesa mediante `.catch()` vamos a causar un error en la aplicación de tipo `UnhandledPromiseRejectionWarning`
el cual sólo vamos a poder ver en la consola pero el usuario sólo tendrá como respuesta un tiempo de espera indefinido.

La mejor solución en estos casos ya sea usando un handler con funciones sincrona o asíncrona es capturar las excepeciones
en las promesas:

```js
//  Modo sincrono
server.get("/", (request, reply) => {
  enviarError()
    .then(() => {
      reply.send({
        message: "Mi mensaje",
      });
    })
    .catch((error) => {
      // El error lo mostramos con nuestro logger
      request.log.error(error);
      // Retornamos respuesta con código de error y un mensaje
      reply.code(500).send({
        message: "Error en el servidor",
      });
    });
});

//  Modo async
server.get("/", async (request, reply) => {
  try {
    await enviarError();
    reply.send({
      message: "Mi mensaje",
    });
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({
      message: "Error en el servidor",
    });
  }
});
```

## setErrorHandler

Esta propiedad se encarga de especificar la función que se llamará en caso de que se genere algún error en
las solicitudes que no haya sido manejado, **se puede definir por contexto** o en general para la aplicación por lo que puedes
utilizar diferentes errorHandlers en diferentes grupos de rutas. Toma en cuenta que también los errores
generados por solicitudes que no cumplen con el schema serán manejados en esta función.

```js
server.setErrorHandler(function (error, request, reply) {
  //  No olvides capturar los errores en tu logger
  request.log.error(error);

  reply.code(500).send({
    message: "Error en el servidor",
  });
});
```

Muy bien, ya podemos capturar todos los errores generados por nuestra aplicación, sin embargo queremos
darle un trato especial a los errores generados por validación de schemas, en este caso el argumento `error`
en `setErrorHandler` cuenta con la propiedad `validation` y `validationContext` los cuales tendrán datos en
caso de ser un error de validación de schema:

```js
server.setErrorHandler(function (error, request, reply) {
  if (error && error.validation) {
    //  En caso de ser un error de validación vamos a cambiar el comportamiento
    //  indicando el código 422 y un mensaje en español
    request.log.info(
      `Context: ${error.validationContext}, errores: ${error.validation}`
    );

    reply.code(422).send({
      message: "Los campos no se enviaron correctamente",
      context: error.validationContext,
      error: error.validation,
    });
  } else {
    //    Cualquier otro tipo de error lo manejamos dentro del bloque else
    request.log.error(error);

    reply.code(500).send({
      message: "Error en el servidor",
    });
  }
});
```

## setNotFoundHandler

Si deseamos cambiar la respuesta que retorna Fastify en caso de no encontrar la ruta deseada, podemos
modificar este comportamiento con la propiedad `setNotFoundHandler`:

```js
server.setNotFoundHandler(function (request, reply) {
  //  Modificamos la respuesta para que el mensaje sea en Español
  reply.code(404).send({
    message: "Ruta no encontrada",
    error: 404,
  });
});
```

### Consejo

Dentro de tus funciones de manejo de errores siempre imprime logs, recuerda que tienes la flexibilidad
de especificar el nivel de log de la aplicación, puedes colocar en algunas funciones el log de nivel `info`
donde no sea tan indispensable capturarlos y el log de nivel `warn` o `error` donde si sea indispensable capturar
esos errores, eso te permitirá por ejemplo capturar errores importantes en el ambiente de producción o capturar
información muy útil de depuración en el modo desarrollo.
