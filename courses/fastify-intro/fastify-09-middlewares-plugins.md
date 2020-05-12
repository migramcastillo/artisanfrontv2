# Middlewares y Plugins - Fastify desde 0

Puede haber un poco de confusión en cuanto a este tema de Middlewares en Fastify, de forma resumida _no existen los Middlewares
en Fastify_ sin embargo mediante un plugin se pueden "adaptar" los middlewares de Express para su uso en Fastify.
Aunque hoy en día ya es fácil encontrar algún plugin que pueda sustituir de una forma mucho más optimizada los
middlewares de Express.

## ¿Qué puedo hacer para sustituir los middlewares?

En Fastify hay alternativas para solucionar especificamente los problemas que resuelven los middlewares. Entre
esas soluciones podemos mencionar las siguientes:

- ¿Requieres cambiar el comportamiento de todas las rutas de tu aplicación, agregar sesiones, agregar cookies o CORS?
  La solución es mediante plugins.
- ¿Quieres ejecutar código cómo validación personalizada de campos, validación del token mediante otra llamda API?
  La solución es utilizando algún hook como 'preHandler' o 'preValidation' como vimos en lecciones anteriores.

## Primer uso de plugins, rutas separadas

Antes de explicar lo que es el contexto creado por `register` vamos a ver uno de los usos más simples que se puede
hacer con esta propiedad: separar rutas por archivos y colocar sufijos.

Vamos a crear un archivo llamado `routes.js`con el siguiente contenido:

```js
async function myRoutes(fastify, options) {
  fastify.get("/", (request, reply) => {
    reply.send({
      message: "Fastify works",
    });
  });

  fastify.get("/books", (request, reply) => {
    //  Vamos a guardar todos nuestros libros en una variable
    const books = [
      "El laberinto de la soledad",
      "Rebelión en la granja",
      "100 años de soledad",
    ];

    //  Obtenemos el string de filtro que vamos a aplicar
    const { filtro } = request.query;

    //  Esta linea filtra los libros por aquellos cuyo nombre coincida con el filtro enviado
    const filteredBooks = books.filter((book) => book.includes(filtro));

    //  Retornamos los libros filtrados
    reply.send(filteredBooks);
  });

  fastify.get("/book/:id", (request, reply) => {
    //  Sinónimo de const id = request.params.id;
    const { id } = request.params;

    reply.send({
      message: `Estas buscando el libro ${id}`,
    });
  });

  fastify.post("/book", (request, reply) => {
    //  Obtenemos los datos de nombre y autor del libro
    const { name, author } = request.body;

    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
    });
  });

  fastify.put("/book/:id", (request, reply) => {
    const { id } = request.params;

    //  Obtenemos los datos de nombre y autor del libro
    const { name, author } = request.body;

    reply.send({
      message: `El registro con id ${id} será actualizado`,
      name: `El libro ahora se llama ${name}`,
      author: `El autor ahora se llama ${author}`,
    });
  });

  fastify.delete("/book/:id", (request, reply) => {
    const { id } = request.params;

    //  Si necesitas datos adicionales puedes utilizar query
    // const { other } = request.query;

    reply.send({
      message: `Se elimanará el libro con id ${id}`,
    });
  });
}

module.exports = myRoutes;
```

Lo que hicimos fue declarar todas las rutas usadas en lecciones anteriores dentro de una función que recibe
2 parámetros, la instancia de Fastify y las opciones como segundo argumento. Notarás que utilizamos una función
`async`, al igual que en los hooks, podemos declarar el plugin de forma normal y utilizando el tercer argumento
`done` para especificar el fin de la ejecución de la función. A toda esta función vamos a conocerla como un `context`,
ahora lo que haremos es importar este módulo en nuestro script principal y declararlo como plugin.

```js
//  index.js

const fastify = require("fastify");
const server = fastify();

//  Ahora nuestras rutas son un plugin!
server.register(require("./routes.js"));

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```

### Agregando un prefijo a nuestras rutas

Si quisieramos agregar un prefijo como `api` a todas las rutas que declaramos en el archivo, `register` puede
recibir un segundo argumento en donde se puede declarar la propiedad `prefix`

```js
server.register(require("./routes.js"), { prefix: "/api" });
```

Ahora todas nuestras rutas declaradas en `routes.js` tendrán el prefijo `/api`.

## ¿Qué es el context?

Supongamos que en routes.js quieres declarar un hook en general para todas las rutas, el hook `preHandler`
para validar que el usuario debe tener un token para entrar a todas estas rutas, sin afectar las rutas que están
en raíz ni las de otros archivos de rutas. El context en los plugins nos permite tener este comportamiento,
todo decorator y todo hook que declares dentro del plugin sólo afectará a las rutas declaradas dentro del mismo archivo.

```js
async function myRoutes(fastify, options) {
  //  Este decorator y hook sólo afectará a las rutas en este archivo o mejor dicho en este context
  fastify.addDecoratorRequest("token", "");

  fastify.addHook("preHandler", async (request, reply) => {
    try {
      const token = request.header("Authorization");

      await validateToken(token);
      request.token = token;
      return;
    } catch (err) {
      reply.code(401).send({ message: "No autorizado" });
    }
  });

  fastify.get("/", (request, reply) => {
    reply.send({
      message: "Fastify works",
    });
  });

  //  Otras rutas declaradas
}
```

Cabe mencionar que si en el script principal declaras hooks y decorators estos SI afectaran a los archivos hijos
como `routes.js`

```js
//  index.js
const fastify = require("fastify");
const server = fastify();

//  Este hook si afectará a las rutas en routes.js porque fue declarado en el context padre
server.addHook("preValidation", (request, reply, done) => {
  done();
});

//  Ahora nuestras rutas son un plugin!
server.register(require("./routes.js"));

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```

## Plugins creados con fastify-plugin

Ahora que conoces el concepto de context te preguntarás, si los decorators y hooks declarados dentro del plugin
sólo afectan al plugin ¿Cómo es que los plugins como `fastify-cors` y `fastify-cookie` pueden afectar a toda la
aplicación? La respuesta es el módulo `fastify-plugin`. Este módulo permite que los plugins puedan reflejar sus hooks
y decorators en el contexto principal, en este curso no vamos a profundizar en como crear plugins mediante `fastify-plugin`
en la documentación oficial hay muy buenos recursos en inglés para ver más a detalle como crear un plugin.

## Usar un plugin de node_modules

Como la comunidad se encuentra en constante crecimiento, actualmente hay muchos plugins oficiales disponibles que
pueden sustituir de una forma fácil funcionalidades que se tenian con los middlewares de Express conservando la velodicad
de ejecución que tiene Fastify. Vamos a instalar 3 plugins en nuestra aplicación para aprender su uso, en una
nueva terminal en nuestro proyecto ejecutamos el comando:

```sh
npm install fastify-cors fastify-cookies fastify-helmet
```

¿Qué hacen estos plugins?

- `fastify-cors`: Permite el acceso Cross Origin Resource Sharing para que otros dominios puedan consumir
  tus APIs, este plugin permite especificar los dominios autorizados o permitir cualquier dominio.
- `fastify-cookie`: Permite el uso de cookies en el lado del servidor. Permite generar nuevas cookies y leer las
  cookies enviadas en la cabecera del request.
- `fastify-helmet`: Agrega una capa básica de seguridad a tu aplicación eliminando headers no necesarios que pueden
  ser un recurso para los atacantes.

Y una vez finalizado vamos a declararlos en nuestro script pricipal

```js
//  index.js
const fastify = require("fastify");
const server = fastify();

//  Registramos nuestros plugins

// Plugin de cookies con un secret basico para cifrar las cookies
server.register(require("fastify-cookie"), {
  secret: "mysecret",
  parseOptions: {},
});

//  Helmet para eliminar cabeceras inseguras
server.register(require("fastify-helmet"));

//  Con esta configuración de CORS podemos recibir solicitudes de cualquier dominio
//  Para los metodos GET, PUT, POST y DELETE en nuestra APIRest
server.register(require("fastify-cors"), {
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: false,
});

//  Ahora nuestras rutas son un plugin!
server.register(require("./routes.js"));

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```
