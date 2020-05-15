# Logging - Fastify desde 0

Una de las librerías con las que Fastify ya trabaja desde su código es con [Pinno Logger](https://getpino.io/), un logger con
una velocidad de procesamiento más rápida que otras librerias.

Una de las ventajas de tener activado un logger en tu aplicación es la capacidad de poder formatear los avisos
de errores o alertas que puede mandar la aplicación, la clasificación de tus mensajes de alerta para que en caso
de estar en un ambiente en producción puedas solamente mostrar mensajes importantes y en ambiente de desarrollo
mensajes menos importantes e incluso puedes guardar tus logs en un archivo separado para consultarlos después.

## Activar Pino logging

Para activar Pino Logger, solamente debemos declararlo en la instancia de Fastify de la siguiente forma en `index.js`:

```js
const fastify = require("fastify");

const server = fastify({
  logger: true,
});

//  Nuestra ruta de prueba
server.get("/", function (request, reply) {
  reply.send({
    message: "Fastify works",
  });
});

server.listen(3000, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
```

Si te das cuenta en la parte de `listen` ahora no colocamos un console.log que nos diga que la aplicación
esta corriendo. Vamos a dejar que el logger se encarge de eso, una vez que ejecutes la aplicación con:

```sh
node index.js
```

Al momento de correr la aplicación deberás ver un mensaje parecido a este en la consola:

```sh
{"level":30,"time":1586702279807,"pid":16219,"hostname":"Mi hostname","msg":"Server listening at http://127.0.0.1:3000","v":1}
```

Si consultas `http://localhost:3000/` vas a ver 2 nuevos mensajes de logs, uno de la solicitud GET y otro del response
de esta solicitud.

## Configurar nivel de logger

Pino Logger cuenta con los siguientes niveles de log, ordenados desde el más importante hasta el más trivial:

- fatal
- error
- warn
- info (este es el default)
- debug
- trace

Es importante tener en cuenta el nivel de logger, **sólo se van a observar logs de igual o mayor importancia al nivel
establecido**, ejemplo:

- Si estableces el nivel `warn` sólo se mostrarán logs de nivel warn, error y fatal.
- Si estableces el nivel `trace` se mostrarán los logs de nivel trace, debug, info, warn, error y fatal.

Para cambiar este nivel, en vez de enviar el valor `true` a `logger` los configuraremos como un objeto:

```js
const fastify = require("fastify");

const server = fastify({
  logger: {
    level: "warn",
  },
});
```

Reinicia la aplicación y podrás observar como ya no aparecen los logs anteriores, debido a que Fastify manda
esos logs de aplicación al nivel `info`.

## Enviar logs

Ademas de los logs generados automaticamente por Fastify, tu puedes enviar logs desde tus funciones handler
en las rutas declaradas, por ejemplo para la ruta `/` vamos a enviar un log `warn` y un log `error`

```js
server.get("/", function (request, reply) {
  //  Se envia un log utilizando request con su propiedad log seguido del nivel de log que se quiere enviar
  request.log.warn("Soy un log warn");
  request.log.error("Soy un log error");
  reply.send({
    message: "Fastify works",
  });
});
```

Sólo un argumento se acepta en las funciones log y puede ser un string o un objeto el cual automaticamente se
va a convertir a string. Recuerda que sólo los logs del mismo nivel o superior van a mostrarse.

Reinicia tu aplicación e intenta cambiar el `level` del logger a `error` para observar como el log de nivel `warn` no se
envía.

## Formatear logs

Puede que los logs actuales no sean muy fáciles de leer, si deseas mostrar una versión más amigable de los logs,
puedes instalar una libreria para Pino que se adapta fácilmente con Fastify:

```sh
npm install pino-pretty
```

Una vez instalada esta libreria podemos utilizar la opción de `prettyPrint`:

```js
const fastify = require("fastify");

const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: true,
  },
});
```

Ahora podremos ver los logs de una forma más amigable

```sh
[1586717176314] WARN  (17088 on myHost): Soy un log warn
    reqId: 1
[1586717176317] ERROR (17088 on myHost): Soy un log error
    reqId: 1
```

## Guardar logs a un archivo

Si en vez de mostrar los logs en la consola prefieres guardarlos en un archivo, simplemente agregamos la opción
`file` en la configuración de logger para especificar el archivo destino:

```js
const fastify = require("fastify");

const server = fastify({
  logger: {
    level: "warn",
    prettyPrint: true,
    file: "logs.log",
  },
});
```

Una vez que reinicies el programa podras ver que ya no se muestran los logs en la consola pero aparecerá un nuevo
archivo en la raíz de tu proyecto llamado `logs.log` con los logs que se generaban antes.
