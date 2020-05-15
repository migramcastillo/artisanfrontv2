# Proyecto Final 2 de 3 - Fastify desde 0

Ahora que tenemos el proyecto base y nuestras claves de firebase vamos realizar la configuración de nuestra API REST. Vamos a crear 3 archivos distintos:

- **routes.js**: Donde vamos a tener nuestra rutas API.
- **server.js**: Donde vamos a definir la configuración del servidor.
- **index.js**: En donde vamosa definir el puerto donde se va a ejecutar nuestra aplicación.

Lo vamos a dividir de esta forma para que sea más fácil realizar los tests al final del proyecto, vamos entonces a empezar con `server.js`.

Primero vamos a importar los modulos que necesitaremos, declararemos una función que construya el servidor y también vamos a importar las credenciales de nuestro archivo `firebase.json` generado en la lección pasada:

```js
const fastify = require("fastify");
const path = require("path");

//  Paquete especial que instalamos la lección pasada para usar Firebase
const admin = require("firebase-admin");

//  Podemos importar el archivo JSON como un objeto
const serviceAccount = require("./firebase.json");

//  Esta función va a crear nuestro servidor
const buildServer = (options) => {};

//  Exportamos nuestra función que crea el server
module.exports = buildServer;
```

Ahora con `firebase-admin` vamos a iniciar la instancia de Firebase para que lo podamos utilizar:

```js
const buildServer = (options) => {
  admin.initializeApp({
    //  Le pasamos todo el objeto como credenciales
    credential: admin.credential.cert(serviceAccount),
    //  Obtenemos la URL de nuestra DB con la propiedad project_id
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  // Guardamos la instancia de la base de datos en una variable
  const db = admin.database();

  //    También debemos guardar la referencia a raíz
  const ref = db.red("/");
};
```

Para que podamos acceder a esa referencia que hemos creado vamos a utilziar lo aprendido creando un `decorator` a nivel aplicación que estará disponible en cualquier ruta:

```js
const buildServer = (options) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  const db = admin.database();

  const ref = db.ref("/");

  // Vamos a crear una instancia de Fastify con las opciones que le pasemos a la función buildServer
  const server = fastify(options);

  /*
        Creamos el decorator llamado dbRef el cuál será una función que reciba como parámetro el nombre de la colección a la que deseamos acceder
    */
  server.decorate("dbRef", (name) => ref.child(name));

  //  En esta función vamos a retornar la instancia creada para utilizarla en los tests y en index.js
  return server;
};
```

Muy bien ahora vamos a crear nuestras rutas que se conectarán a Firebase.

## Creación de rutas

Creamos el archivo `routes.js` si no lo tuvimos antes y vamos a exportar un nuevo contexto que recibe como argumento la instancia de Fastify:

```js
module.exports = async (fastify, opts) => {};
```

Procedemos a declarar nuestra primera ruta para validar la conexión a Firebase

```js
module.exports = async (fastify, opts) => {
  fastify.get("/books", async (request, reply) => {
    //  Accesamos a nuestro decorator creado
    //  y utilizamos once de firebase-admin para obtener los
    // datos
    const snapshot = await fastify.dbRef("books").once("value");

    //  Enviamos los datos obtenidos
    reply.code(200).send(snapshot.val());
  });
};
```

Ahora que tenemos la ruta declarada vamos a regresar a nuestro archivo `server.js` para registrar `routes.js` como un plugin:

```js
// Continuamos server.js debajo de la declaración de decorate
server.decorate("dbRef", (name) => ref.child(name));

// Registramos las rutas con el prefijo /api/v1
server.register(require("./routes"), { prefix: "/api/v1" });

//  Seguirmos retornando la instancia
return server;
```

## Iniciar el servidor

Ahora vamos a crear el archivo `index.js` para importar nuestra función que crea un servidor y escuchar solicitudes en el puerto que le asignemos:

```js
const buildServer = require("./server");

//  Creamos nuestro server con un logger
const server = buildServer({
  logger: {
    level: "info",
    prettyPrint: true,
  },
});

//  Asignamos el puerto 3000 al server e iniciamos
server.listen(3000, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```

Ahora iniciamos el server ejecutando:

```sh
node index.js
```

Y consultamos la ruta `http://localhost:3000/api/v1/books` en nuestro navegador o hacemos una solicitud GET en Postman y deberiamos obtener como respuesta la colección que declaramos en Firebase:

```json
{
  "name": "Mi libro"
}
```

## Crear un libro

Vamos a definir las siguientes reglas para el `schema` de validación de creación de libros:

- Requiere un campo string llamado `name` con mínimo 1 caracter.
- Requiere un campo array llamado `author` que debe tener mínimo 1 elemento con las siguientes propiedades:
  - `name` que es el nombre del autor de tipo string y con mínimo 1 caracter.
  - `surname` que es el apellido del autor de tipo string y con mínimo 1 caracter.
- Requiere un campo integer llamado `year` que especificará el año de publicación de nuestro libro.
- Requiere un campo llamada `synopsis` de tipo string con mínimo 1 caracter donde pondremos una breve descripción del libro.

Nuestra ruta con esquema quedaría de la siguiente forma:

```js
//  Archivo routes.js debajo de la primera ruta GET que declaramos

fastify.post(
  "/book",
  {
    schema: {
      body: {
        type: "object",
        required: ["name", "author", "year", "synopsis"],
        properties: {
          name: { type: "string", minLength: 1 },
          author: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["name", "surname"],
              properties: {
                name: { type: "string", minLength: 1 },
                surname: { type: "string", minLength: 1 },
              },
            },
          },
          year: { type: "integer", minLength: 1 },
          synopsis: { type: "string", minLength: 1 },
        },
        additionalProperties: false,
      },
    },
  },
  //  También podemos utilizar el handler como tercer argumento si
  //  usamos el segundo argumento para sólo definir schemas y hooks
  async (request, reply) => {
    //  Obtenemos los campos de equest.body
    const { name, author, year, synopsis } = request.body;

    //    Esta es la sintaxis para crear un nuevo objeto en Firebase en nuestra colección books
    const bookCreated = await fastify
      .dbRef("books")
      .push({ name, author, year, synopsis });

    // Retornaremos mensaje de nuevo libro agregado con la key que generó Firebase
    reply.code(200).send({
      message: "Nuevo libro agregado",
      key: bookCreated.key,
    });
  }
);
```

Con POSTMAN hacemos pruebas a la ruta `/api/v1/book` mediante POST con un JSON como el siguiente ejemplo:

```json
{
  "name": "El laberinto de la soledad",
  "author": [
    {
      "name": "Octavio",
      "surname": "Paz"
    }
  ],
  "year": 1950,
  "synopsis": "El laberinto de la soledad es un ensayo publicado en 1950 por el escritor mexicano Octavio Paz."
}
```

Deberiamos ver la respuesta JSON de nuestro server con una key generada:

```json
{
  "message": "Nuevo libro agregado",
  "key": "-M7K-08Mf1tWGxyCtL8f"
}
```

**Nota:** La propiedad `additionalProperties` como `false` indica que toda propiedad que no esté definido en el `schema` sea descartada de `request.body`.

Si volvemos a consultar la ruta GET `/api/v1/books` vamos a obtener el libro que generamos en Firebase:

```json
{
  "-M7K-08Mf1tWGxyCtL8f": {
    "author": [
      {
        "name": "Octavio",
        "surname": "Paz"
      }
    ],
    "name": "El laberinto de la soledad",
    "synopsis": "El laberinto de la soledad es un ensayo publicado en 1950 por el escritor mexicano Octavio Paz.",
    "year": 1950
  },
  "name": "Mi libro"
}
```

Observamos que ya tenemos el libro que creamos sin embargo tenemos igual el campo "name" "Mi libro" que creamos de prueba en Firebase. Podemos ir a nuestra base de datos otra vez en Firebase a eliminar ese registro:

![Eliminar registro basura](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/eliminar-prueba-firebase.png)

Busca más libros que conozcas o datos de prueba para tener más datos en Firebase que podamos modificar y eliminar.

## Consultar un registro por su key

En nuestro archivo `routes.js` vamos a agregar una nueva ruta para consultar un libro por su key en especifico.

```js
fastify.get(
  "/book/:key",
  {
    schema: {
      params: {
        type: "object",
        required: ["key"],
        properties: {
          key: { type: "string", minLength: 4 },
        },
      },
    },
  },
  async (request, reply) => {
    const key = request.params.key;

    const snapshot = await fastify.dbRef(`books/${key}`).once("value");

    reply.code(200).send(snapshot.val());
  }
);
```

Para esta ruta especificamos una URL con el parámetro dinámico llamado `key` con un `schema` con un tamaño mínimo de 4. Esta ruta va a consultar ese objeto en especifico en Firebase mediante la key que enviamos. Por ejemplo la key que generó el libro de "El laberinto de la soledad" fue `-M7K-08Mf1tWGxyCtL8f` vamos a reiniciar la aplicación y consultamos la ruta GET `/api/v1/book/-M7K-08Mf1tWGxyCtL8f`

Con esto deberiamos obtener como respuesta el libro en especifico:

```json
{
  "author": [
    {
      "name": "Octavio",
      "surname": "Paz"
    }
  ],
  "name": "El laberinto de la soledad",
  "synopsis": "El laberinto de la soledad es un ensayo publicado en 1950 por el escritor mexicano Octavio Paz.",
  "year": 1950
}
```

## Modificar un registro

Ya tenemos libros disponibles para consulta, ahora vamos a especificar una ruta en `routes.js` para modificar alguna propiedad de un libro en específico, reutilizamos el esquema que definimos para POST en el body y para el GET en params:

```js
fastify.put(
  "/book/:key",
  {
    schema: {
      params: {
        type: "object",
        required: ["key"],
        properties: {
          key: { type: "string", minLength: 4 },
        },
      },
      //  A diferencia en POST no haremos campos requeridos
      body: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string", minLength: 1 },
          author: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["name", "surname"],
              properties: {
                name: { type: "string", minLength: 1 },
                surname: { type: "string", minLength: 1 },
              },
            },
          },
          year: { type: "integer" },
          synopsis: { type: "string", minLength: 1 },
        },
      },
    },
  },
  async (request, reply) => {
    const key = request.params.key;

    //  Obtenemos los datos actuales de esa key
    const snapshot = await fastify.dbRef(`books/${key}`).once("value");
    const value = snapshot.val();

    //  Si existe el registro lo modificaremos
    if (value) {
      /*  Hacemos una combinacion de los campos actuales y los campos nuevos solo para modificar los campos que fueron enviados
       */
      const data = await fastify.dbRef(`books/${key}`).update({
        ...value,
        ...request.body,
      });

      //  Retornamos el mensaje con los nuevos valores del libro
      reply.code(200).send({
        message: "El libro se ha actualizado",
        key,
        book: {
          ...value,
          ...request.body,
        },
      });
    } else {
      //  Si no se encuentra el libro devolvemos el error 400
      reply.code(400).send({
        message: "El libro no existe",
      });
    }
  }
);
```

Con la misma key de nuestro libro generado vamos a modificar el año del libro, en POSTMAN hacemos un nuevo request a la ruta PUT `/api/v1/book/-M7K-08Mf1tWGxyCtL8f` con los siguiente datos JSON de ejemplo:

```json
{
  "year": 1960
}
```

Deberiamos obtener una respuesta de la siguiente forma:

```json
{
  "message": "El libro se ha actualizado",
  "key": "-M7K-08Mf1tWGxyCtL8f",
  "book": {
    "author": [
      {
        "name": "Octavio",
        "surname": "Paz"
      }
    ],
    "name": "El laberinto de la soledad",
    "synopsis": "El laberinto de la soledad es un ensayo publicado en 1950 por el escritor mexicano Octavio Paz.",
    "year": 1960
  }
}
```

Si volvemos a consultar ese libro en especifico vamos a ver que el año del libro ya fue modificado.

## Eliminar un registro

En nuestra última ruta vamos a eliminar el libro por la key que enviamos como parámetro. De la misma forma vamos a hacer un `schema` para validar ese parámetro en `routes.js`:

```js
fastify.delete(
  "/book/:key",
  {
    schema: {
      params: {
        type: "object",
        required: ["key"],
        properties: {
          key: { type: "string", minLength: 4 },
        },
      },
    },
  },
  async (request, reply) => {
    const key = request.params.key;

    const snapshot = await fastify.dbRef(`books/${key}`).once("value");
    const value = snapshot.val();

    //  Consultamos y verificamos si existe el libro
    if (value) {
      //  Si existe el libro lo eliminamos
      await fastify.dbRef(`books/${key}`).remove();
      reply.code(200).send({
        message: "El libro ha sido eliminado",
        key,
      });
    } else {
      reply.code(400).send({
        message: "Libro no válido",
      });
    }
  }
);
```

Vamos a eliminar el libro de "El laberinto de la soledad" reiniciando nuestra aplicación y enviando un request en POSTMAN de tipo DELETE a la ruta `/api/v1/book/-M7K-08Mf1tWGxyCtL8f`, este va a eliminar ese registro de nuestra colección y ya no lo tendremos disponible en el listado de libros.

Ya tenemos completa nuestra API REST, en la siguiente lección vamos a integrar el proyecto React a nuestra aplicación y a realizar algunas configuraciones adicionales.
