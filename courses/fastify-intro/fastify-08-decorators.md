# Decorators - Fastify desde 0

Supongamos que en algún hook como `preHanlder` o `preValidation` quieres agregar algún campo que puedas utilizar
en las siguientes funciones del ciclo de vida, algo común por ejemplo guardar datos del usuario autenticado.

Este es un ejemplo erroneo.

```js
server.get("/books", {
  //  Recuerda que con async ya no necesitamos done
  preHandler: async (request, reply) => {
    try {
      //  Obtenemos el token enviado en las cabeceras
      const token = request.headers("Authorization");

      //  Vamos a simular que obtenemos datos a partir del token
      const userData = await getUserData(token);

      // MAL x
      request.user = userData.name;

      return;
    } catch (error) {
      return reply
        .code(400)
        .send({ error: "No se pudo obtener datos del usuario" });
    }
  },
  handler: (request, reply) => {
    reply({
      books: ["100 años de soledad", "La metamorfosis"],
      user: request.user,
    });
  },
});
```

La forma correcta de agregar campos extra tanto al request, al reply y a toda nuestra instancia es mediante
los decorators. La forma correcta de hacer el ejemplo anterior sería la siguiente:

```js
//  Antes de las rutas definimos el decorator
server.decorateRequest("user", "");

server.get("/books", {
  //  Recuerda que con async ya no necesitamos done
  preHandler: async (request, reply) => {
    try {
      //  Obtenemos el token enviado en las cabeceras
      const token = request.headers["authorization"];

      //  Vamos a simular que obtenemos datos a partir del token
      const userData = await getUserData(token);

      // Con el decorator ahora si esto es correcto
      request.user = userData.name;

      return;
    } catch (error) {
      return reply
        .code(400)
        .send({ error: "No se pudo obtener datos del usuario" });
    }
  },
  handler: (request, reply) => {
    reply.send({
      books: ["100 años de soledad", "La metamorfosis"],
      user: request.user,
    });
  },
});
```

## ¿Para qué sirven los decorators?

Los decorators permiten agregar campos adicionales a nuestro request, reply o server sin afectar la optimización llevada a cabo
por Fastify, el uso más común de los decorators es al momento de utilizar los `plugins` de Fastify para
agregar nuevas funcionalidades dentro de todas nuestras rutas, por ejemplo el plugin `fastify-cookie` nos
genera decorators para asignar cookies, obtener valos de una cookie y eliminar cookies en todas nuestras rutas.

## Decorator de request

Podemos agregar propiedades y funcionalidades extra al request utilizando `decorateRequest`:

```js
const server = fastify();

server.decorateRequest("user", "");
```

Para comprobar si existe el decorator utilizamos `hasRequestDecorator`:

```js
const server = fastify();

server.decorateRequest("user", "");

server.hasDecorator("user");
```

## Decorator de reply

Podemos agregar propiedades y funcionalidades extra al request utilizando `decorateReply`:

```js
const server = fastify();

server.decorateReply("replyUtil", "");
```

Para comprobar si existe el decorator utilizamos `hasReplyDecorator`:

```js
const server = fastify();

server.decorateReply("replyUtil", "");

server.hasReplyDecorator("replyUtil");
```

## Nota acerca de los decorator

No se puede definir más de una vez el mismo decorator, esto provocará automaticamente que la aplicación mande
un error, sin embargo si se define un nuevo context de Fastify, dentro de ese context se pueden definir decorators
con el mismo nombre, veremos esto más a detalle en la lección de plugins.

## Decorators en la práctica

El siguiente fragmento de código muestra una parte del plugin de cookies de Fastify:

```js
// Fragmento de plugin.js en fastify-cookie

fastify.decorateRequest("cookies", {});

fastify.decorateReply("setCookie", function setCookieWrapper(
  name,
  value,
  options
) {
  return fastifyCookieSetCookie(this, name, value, options, secret);
});

fastify.decorateReply("clearCookie", function clearCookieWrapper(
  name,
  options
) {
  return fastifyCookieClearCookie(this, name, options);
});
```

Lo que hace el plugin de cookies es declarar decoradores con valores guardados o con funciones que se van
a ejecutar. Al configurar este `plugin` tendremos disponibles aquellos métodos en nuestro `reply` y `request``

```js
server.get("/logout", (request, reply) => {
  //  Ahora tengo disponible mediante el hook de cookies las cookies enviadas en la cabecera http
  const myCookies = request.cookies;

  //  Voy a simular eliminar la cookieSession como un cierre de sesión, el decorator declarado en
  //  el plugin me permite hacer esto
  reply
    .code(200)
    .clearCookie("cookieSession")
    .send({ message: "Sesión cerrada" });
});
```
