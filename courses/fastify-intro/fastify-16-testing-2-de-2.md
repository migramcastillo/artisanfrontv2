# Testing Parte 2 - Fastify desde 0

Si todo ha salido bien en los tests anteriores quiza observes la siguiente tabla en la terminal:

```sh
-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |    58.93 |        0 |    53.85 |       60 |                   |
 helper.js |      100 |      100 |      100 |      100 |                   |
 routes.js |    21.43 |        0 |    16.67 |    21.43 |... 66,168,169,174 |
 server.js |    95.24 |      100 |       80 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
```

Esta tabla indica el `coverage` que tienen tus tests en tu aplicación. El `coverage` es un resumen de las líneas de tu código que han cubierto tus tests, lo ideal sería tener todo el valor `% Lines` de cada archivo en un 100, sin embargo a veces puede ser complicado. En esta última lección vamos a enfocarnos en tratar de cubrir ese 100 en el coverage haciendo pruebas a nuestras rutas.

## Test crear libro

Vamos a agregar a nuestro archivo `index.test.js` el siguiente test:

```js
//  Debajo de donde obtener nuestro server de pruebas declaramos 2 nuevas variables
const server = await buildTestServer(tap);

//  bookKey va a guardar temporalmente la key del libro que vamos a crear
let bookKey = "";
//  bookData va a guardar temporalmente el valor del libro
let bookData = {};

//  Test a la ruta POST /api/v1/book
subtest.test("Crear Libro", async (t) => {
  //  Le indicamos que vamos a ejecutar 5 tests
  t.plan(5);

  //  Creamos un libro con datos enviados desde payload
  const response = await server.inject({
    method: "POST",
    url: "/api/v1/book",
    payload: {
      name: "La brújula dorada",
      author: [
        {
          name: "Philip",
          surname: "Pullman",
        },
      ],
      year: 2003,
      synopsis:
        "Las aventuras de Lyra en un mundo donde los clanes de brujas y osos polares armados gobiernan.",
    },
  });

  // Validamos que la respuesta sea un 200
  t.equal(response.statusCode, 200, "Respuesta debe ser 200");
  const body = response.json();
  //  Validamos que los campos enviados existan y sean del tipo esperado
  t.ok(body.message, "Se debe enviar un message");
  t.ok(body.key, "Se debe enviar la key generada");
  t.type(body.message, "string", "message debe ser string");
  t.type(body.key, "string", "key debe ser string");
  //  Almacenamos la key del objeto en nuestra variable bookKey
  bookKey = body.key;
});
```

## Test crear libro con datos incorrectos

Recuerda que con `setErrorHandler` en el proyecto final cambiamos el código que devuelven los errores de `schema` de 400 a 422.

```js
subtest.test("Crear libro con schema inválido", async (t) => {
  t.plan(1);

  //  Enviaremos el author con el formato incorrecto

  const response = await server.inject({
    method: "POST",
    url: "/api/v1/book",
    payload: {
      name: "La brújula dorada",
      author: ["Philip Pullman"],
      year: 2003,
      synopsis:
        "Las aventuras de Lyra en un mundo donde los clanes de brujas y osos polares armados gobiernan.",
    },
  });

  t.equal(response.statusCode, 422, "Respuesta debe ser 422");
});
```

## Test obtener libros

```js
subtest.test("Obtener libros", async (t) => {
  t.plan(2);

  const response = await server.inject({
    method: "GET",
    url: "/api/v1/books",
  });

  t.equal(response.statusCode, 200, "Respuesta debe ser 200");
  const booksLength = Object.keys(response.json()).length;
  t.equal(booksLength > 0, true, "Debe contener al menos un libro");
});
```

## Test para obtener un libro por su key

Recuerda que debemos guardar primero el valor de `bookKey` que creamos para validar que lo podamos obtener. En este test vamos a guardar los valores del libro para los siguientes tests

```js
subtest.test("Obtener libro por key", async (t) => {
  t.plan(5);

  const response = await server.inject({
    method: "GET",
    url: `/api/v1/book/${bookKey}`,
  });

  t.equal(response.statusCode, 200, "Respuesta debe ser 200");
  const body = response.json();
  t.ok(body.name, "Debe retornar un nombre");
  t.ok(body.author, "Debe retornar un author");
  t.ok(body.year, "Debe retornar un año");
  t.ok(body.synopsis, "Debe retornar una sinposis");
  bookData = body;
});
```

## Test actualizar libro por su key

```js
subtest.test("Actualizar libro por key", async (t) => {
  t.plan(6);

  const responsePut = await server.inject({
    method: "PUT",
    url: `/api/v1/book/${bookKey}`,
    payload: {
      name: "The Golden Compass",
    },
  });

  t.equal(responsePut.statusCode, 200, "Respuesta PUT debe ser 200");

  const responseGet = await server.inject({
    method: "GET",
    url: `/api/v1/book/${bookKey}`,
  });

  t.equal(responseGet.statusCode, 200, "Respuesta GET debe ser 200");
  const body = responseGet.json();

  t.equal(
    body.name,
    "The Golden Compass",
    "Debe retornar el nuevo nombre de libro"
  );
  t.deepEqual(body.author, bookData.author, "Debe retornar el mismo author");
  t.equal(body.year, bookData.year, "Debe retornar el mismo año");
  t.equal(body.synopsis, bookData.synopsis, "Debe retornar la misma sinopsis");
});
```

## Test actualizar libro con esquema invalido

```js
subtest.test("Actualizar libro por key con esquema invalido", async (t) => {
  t.plan(1);

  const responsePut = await server.inject({
    method: "PUT",
    url: `/api/v1/book/${bookKey}`,
    payload: {
      name: "",
    },
  });

  t.equal(responsePut.statusCode, 422, "Respuesta PUT debe ser 422");
});
```

## Test de eliminar un libro

```js
subtest.test("Eliminar libro por key", async (t) => {
  t.plan(3);

  const responseDel = await server.inject({
    method: "DELETE",
    url: `/api/v1/book/${bookKey}`,
  });

  t.equal(responseDel.statusCode, 200, "Respuesta DELETE debe ser 200");

  const responseGet = await server.inject({
    method: "GET",
    url: `/api/v1/book/${bookKey}`,
  });

  t.equal(responseGet.statusCode, 200, "Respuesta GET debe ser 200");
  const body = responseGet.json();
  t.equal(body, null, "Respuesta debe ser nula");
});
```

## Test de eliminar un libro ya eliminado

Como en el test anterior eliminamos el libro, al hacer una nueva petición deberiamos recibir el error 400 de que el libro que queremos eliminar no existe

```js
subtest.test("Eliminar libro por key error", async (t) => {
  t.plan(1);

  const responseDel = await server.inject({
    method: "DELETE",
    url: `/api/v1/book/${bookKey}`,
  });

  t.equal(
    responseDel.statusCode,
    400,
    "Respuesta DELETE debe ser 400 para key que no existe"
  );
});
```

## Test actualizar libro que no existe

```js
subtest.test("Actualizar libro por key que no existe", async (t) => {
  t.plan(1);

  const responseDel = await server.inject({
    method: "PUT",
    url: `/api/v1/book/${bookKey}`,
    payload: {
      name: "Nuevo nombre",
    },
  });

  t.equal(
    responseDel.statusCode,
    400,
    "Respuesta PUT debe ser 400 para key que no existe"
  );
});
```

## Ejecutar todos los tests

Una vez que tengas todos los tests pudes ejecutarlos con el comando

```sh
npm run test
```

Para esta suite que hicimos deberias tener el siguiente resultado:

```sh
PASS  test/index.test.js 27 OK 4s


  🌈 SUMMARY RESULTS 🌈


Suites:   1 passed, 1 of 1 completed
Asserts:  27 passed, of 27
Time:     6s
-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |      100 |    83.33 |      100 |      100 |                   |
 helper.js |      100 |      100 |      100 |      100 |                   |
 routes.js |      100 |    83.33 |      100 |      100 |               182 |
 server.js |      100 |      100 |      100 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
```

Indica que hemos cubierto casi en su totalidad las líneas de nuestro proyecto final!

## Fin del curso

Espero que el curso te haya servido para aprender lo básico de Fastify, hay muchas cosas más en la documentación oficial de Fastify que puedes utilizar en tus futuras aplicaciones, recuerda siempre hacer tests en la medida posible y mantenerte muy al pendiente de las mejoras de este Framework que vino para quedarse. Si tienes alguna duda o quieres dejar algún comentario puedes hacerlo a través de mi cuenta de twitter [@migramcastillo](https://www.twitter.com/migramcastillo)

Estaré subiendo en este blog más artículos y tutoriales de Fastify!
