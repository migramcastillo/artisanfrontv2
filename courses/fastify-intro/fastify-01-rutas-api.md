# Rutas API - Fastify desde 0

Al igual que con otros Frameworks Web de NodeJS, es muy fácil utilizar diferentes métodos de solicitudes HTTP
como GET, POST, PUT y DELETE los más comunes para una REST API. Para probar los métodos POST, PUT y DELETE te recomiendo
descargar algúna herramienta API como [Postman](https://www.postman.com/downloads/).

Vamos a utilizar el script que creamos en la lección pasada.

### Reinicio de Node.js

Para detener el proceso de una aplicación Node.js en la terminal puedes utilizar en tu teclado la combinación `CTRL + c`, cada vez que hagas una actualización de tus archivos JS deberás detener el proceso
e iniciarlo nuevamente.

## GET

Este método lo utilizamos en la lección pasada con la instancia de Fastify, para esta lección vamos a realizar
rutas para listar libros.

```js
// Agregar después de la ruta /

server.get("/books", function (request, reply) {
  //  Tambien podemos regresar un array que se va a convertir en JSON
  reply.send([
    "El laberinto de la soledad",
    "Rebelión en la granja",
    "100 años de soledad",
  ]);
});
```

### Params 

Para declarar parametros dinamicos como algún `id` o un `slug` utilizamos la sintaxis `:id` y dentro
de la función handler los podemos obtener dentro del `request.params`:

```js
server.get('/book/:id', function (request, reply) {
  /*
    Como es un objeto podemos usar la deestructuracion
    como si fuera
    const id = request.params.id
  */
  const { id } = request.params;

  reply.send({
    message: `Estas buscando el libro ${id}`
  })
});
```

Si levantas el server y con un navegador consultas la URL `http://localhost:3000/book/32` podras observar como
la respuesta incluye el mensaje con el id consultado.

### Query params

¿Qué pasa si queremos leer parametros desde la URL? Dentro del mismo request podemos obtener los query params como
un objeto así como los `request.params` con la propiedad `request.query`, vamos a modificar un poco la URL `/books`

```js
server.get("/books", function (request, reply) {
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
```

Ahora realizamos la consulta con la URL `http://localhost:3000/books?filtro=laberinto` debemos solamente obtener el
libro "El laberinto de la soledad".

## POST

En el caso de POST que suele ser utilizado para guardar datos y crear nuevos registros en una base de datos, por ahora
vamos a limitarnos a ver como funciona el método en Fastify y en otras lecciones más adelante haremos conexiones con base
de datos. En una petición POST dentro de `request` podemos obtener los parámetros enviados mediante la propiedad
`request.body`.

```js
server.post("/book", function (request, reply) {
  //  Obtenemos los datos de nombre y autor del libro
  const { name, author } = request.body;

  reply.send({
    name: `El libro se llama ${name}`,
    author: `El autor se llama ${author}`,
  });
});
```

Una vez que reinicies la aplicación puedes hacer una prueba con Postman o la herramienta que prefieras enviando los
datos name y author para que puedas observar la respuesta API de tu aplicación.

## PUT

Usualmente utilizamos una petición PUT para modificar un registro existente en una base de datos, en Fastify la solicitud
PUT al igual que la POST recibe le propiedad `request.body`, puedes también recibir `request.params` en caso de que
quieras realizar la modificación en algún `id` en especifico.

```js
server.put("/book/:id", function (request, reply) {
  const { id } = request.params;

  //  Obtenemos los datos de nombre y autor del libro
  const { name, author } = request.body;

  reply.send({
    message: `El registro con id ${id} será actualizado`,
    name: `El libro ahora se llama ${name}`,
    author: `El autor ahora se llama ${author}`,
  });
});
```

Una vez que reinicies la aplicación puedes hacer una prueba con Postman o la herramienta que prefieras enviando los
datos de id, name y author para que puedas observar la respuesta API de tu aplicación.

## DELETE

El método DELETE es comunmente utilizado para eliminar registros en la base de datos, a diferencia de POST y
PUT, usualmente DELETE utiliza `request.query` para obtener parametros adicionales como lo hace GET y también
`request.params`.

```js
server.delete("/book/:id", function (request, reply) {
  const { id } = request.params;

  //  Si necesitas datos adicionales puedes utilizar query
  // const { other } = request.query;

  reply.send({
    message: `Se elimanará el libro con id ${id}`,
  });
});
```

Una vez que reinicies la aplicación puedes hacer una prueba con Postman o la herramienta que prefieras enviando los
datos de id para que puedas observar la respuesta API de tu aplicación.

## Código completo

```js
const fastify = require("fastify");

const server = fastify();

server.get("/books", function (request, reply) {
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

server.get("/book/:id", function (request, reply) {
  //  Sinónimo de const id = request.params.id;
  const { id } = request.params;

  reply.send({
    message: `Estas buscando el libro ${id}`,
  });
});

server.post("/book", function (request, reply) {
  //  Obtenemos los datos de nombre y autor del libro
  const { name, author } = request.body;

  reply.send({
    name: `El libro se llama ${name}`,
    author: `El autor se llama ${author}`,
  });
});

server.put("/book/:id", function (request, reply) {
  const { id } = request.params;

  //  Obtenemos los datos de nombre y autor del libro
  const { name, author } = request.body;

  reply.send({
    message: `El registro con id ${id} será actualizado`,
    name: `El libro ahora se llama ${name}`,
    author: `El autor ahora se llama ${author}`,
  });
});

server.delete("/book/:id", function (request, reply) {
  const { id } = request.params;

  //  Si necesitas datos adicionales puedes utilizar query
  // const { other } = request.query;

  reply.send({
    message: `Se elimanará el libro con id ${id}`,
  });
});

server.listen(3000, function (err) {
  if (err) {
    console.error(err);
    process.exit(0);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```
