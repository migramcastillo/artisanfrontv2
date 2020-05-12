# Handlers Asíncronos - Fastify desde 0

Fastify soporta el uso de las funciones asincronas en sus Handlers por si quieres evitar patrones como el famoso `callback hell`
cuando estas consultando datos de una promese. Lo único que debes tener en mente es que para funciones asincronas la
sintaxis puede variar un poco.

Nota: Los códigos de ejemplo de está lección son sólo de referencia, no hemos declarado las funciones utilizadas
para consultar a base de datos o validar un token, vamos a hacer eso en una lección a futuro.

## Uso de async en Handlers

Para el uso de funciones async, hay 2 alternativas:

- Retornar el body de `reply` con `return`, automaticamente el valor que retornes en el handler será considerado el body de
  la función.
- Utilizar `reply.send`. Como ya se venia haciendo con las funciones sincronas, puedes utilizar reply.send para la respuesta
  sin combinar con `return`.

Nota: Si usas la primera alternativa y el valor devuelto es `undefined` tendrás un error en la consola y la aplicación
se detendrá.

```js
server.get("/book/:id", async (request, reply) => {
  const book = await obtenerDeBaseDeDatos(request.params.id);
  return book;
});
```

```js
server.get("/book/:id", async (request, reply) => {
  const book = await obtenerDeBaseDeDatos(request.params.id);
  reply.send(book);
});
```

## Uso de async en Hooks

Para el caso de los hooks, recordemos que contamos con el tercer argumento que es la función `done()` que
indica que el ciclo de vida de la ruta debe continuar, si se quiere utilizar una función asincrona, la alternativa
es hacer un simple `return` para continuar como en el siguiente ejemplo con el hook `preHandler`:

```js
server.get("/book/:id", {
  preHandler: async (request, reply, done) => {
    //  Con try catch podemos atrapar la excepciones generadas por peticiones asincronas
    try {
      //  Vamos a simular que obtenemos un token del header de la petición
      const { authorization } = request.headers;

      //  Simulamos que validamos el token
      await validarToken(authorization);

      //  Esto es como si hicieramos un done()
      return;
    } catch (err) {
      //  Utilizamos el logger para guardar el error generado
      request.log.warn(err);

      //  De este lado le avisamos al usuario que no esta autorizado
      reply.code(401).send({
        error: "El usuario no esta autorizado",
      });
    }
  },
  handler: async (request, reply) => {
    //    Si el ciclo continua, vamos a obtener el resultado de la base de datos!
    const book = await obtenerDeBaseDeDatos(request.params.id);
    reply.send(book);
  },
});
```
