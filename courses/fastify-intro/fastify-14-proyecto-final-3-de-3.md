# Proyecto Final 3 de 3 - Fastify desde 0

Ya contamos con la integración a Firebase y nuestras rutas, ahora vamos a realizar la integración del proyecto React que incluye el template.

## Integrar plugins

Ya instalamos los paquetes `fastify-cors` y `fastify-static`, estos paquetes vamos a utilizarlo para evitar problemas CORS y servir los archivos React listos para producción.

En `server.js` registraremos estos plugins:

```js
//  Con esta configuración vamos a eviatr problemas CORS
server.register(require("fastify-cors"), {
  origin: true,
});

/*
    Registramos fastify-static con la carpeta /build, paraservir los archivos a partir de ese directorio. /build lo vamos a crear más adelante
*/
server.register(require("fastify-static"), {
  root: path.resolve(__dirname, "build"),
  prefix: "/",
});
```

## Generar /build

El proyecto template ya está configurado para generar el sitio React, vamos a situarnos en la raíz del proyecto para ejecutar el siguiente comando:

```sh
npm run build
```

Este va a generar la carpeta `/build` con el proyecto React en modo producción.

## Ruta /

En `server.js` vamos a declarar la ruta `/` para servir el archivo `index.html` que se generó en el build:

```js
//  server.js

server.get("/", (request, reply) => {
  reply.sendFile("index.html");
});
```

## Proyecto React

Reiniciamos nuevamente nuestra aplicación y visitamos la ruta `http://localhost:3000` y deberiamos poder observar el proyecto React consultando nuestra API REST.

![01 Crear Proyecto](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/demo-react.png)

En este mismo proyecto podrás consultar, agregar, editar y eliminar libros.

## Detalles finales

Vamos a agregar un detalle final a `server.js` un `hook` especial a nivel aplicación llamado `onClose` esto debido a que cuando hagamos los tests vamos a necesitar cerrar todas las conexiones disponibles para dar por finalizado el test, este `hook` se ejecutará cuando se detenga la ejecución de Fastify y lo que haremos será cerrar la conexión Firebase:

```js
//server.js

//  Nuestras rutas API
server.register(require("./routes"), {
  prefix: "/api/v1",
});

//  Nuestro hook donde vamos a cerrar la conexión Firebase
server.addHook("onClose", (fastify, done) => {
  admin
    .app()
    .delete()
    .then(() => done());
});

return server;
```

### Error handler

En `routes.js` también vamos a agregar `setErrorHandler` para cambiar el código HTTP por defecto de 422 a 400 y enviar un mensaje menos detallado:

```js
fastify.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    request.log.info(
      `Context: ${error.validationContext}, errores: ${error.validation}`
    );

    reply.code(422).send({
      message: "Los campos no se enviaron correctamente",
      context: error.validationContext,
      error: error.validation,
    });
  }
});
```

Ya con esto hemos creado todo una API Rest con todo lo aprendido en el curso:

- Hemos creado un server Fastify.
- Declarado rutas API REST.
- Validado los datos con schemas.
- Registramos plugins.
- Utilizamos decorators.
- Logger por niveles.
- Usamos funciones asíncronas.
- Servimos archivos estáticos.
- Integramos con Firebase.

Para finalizar el curso vamos a ver un tema **muy importante e infravalorado en el desarrollo**: Los tests.
