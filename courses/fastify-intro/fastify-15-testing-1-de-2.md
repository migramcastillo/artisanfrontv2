# Testing Parte 1 - Fastify desde 0

Para ejecutar el demo de testing o que puedas probar los tests que vamos a ejecutar, debes tener el proyecto final realizado en las últimas 3 lecciones ya que los tests los hacemos a partir de ahí.

## Instalar Node Tap

Node Tap es una librería para realizar tests de una forma sencilla en aplicaciones Node.js, lo vamos a ejecutar como una `devDependencie` así que lo instalaremos de la siguiente forma:

```sh
npm install --dev tap
```

Una vez instalado, dentro de nuestro archivo `package.json` vamos a crear un nuevo `script` llamado `test`:

```json
//  Este es un fragmento de package.json, si bajaste el template podrás observar los scripts dev y build

 "scripts": {
  "dev": "parcel ./src/index.html -d ./build",
  "build": "parcel build ./src/index.html -d ./build",
  "test": "tap"
},
```

Esto va a permitirno ejecutar tap con el comando `npm run test` pero antes vamos a configurar nuestro servidor de pruebas.

## Servidor de pruebas

Vamos a crear un nuevo archivo llamado `helper.js`, en este archivo vamos a importar la función de `server.js` que crea el servidor de nuestro proyecto final para aplicarle unas modificaciones:

```js
const buildServer = require("./server.js");

//  En esta función vamos a recibir como parametro
//  la suite de test que se estará ejecutando
const buildTestServer = async (tap) => {
  //  Creamos un nuevo server SIN LOGGER
  const server = buildServer();

  /* 
  Esta línea le indicará a tap que una vez que termine de ejecutar los tests cierre el servidor Fastify para terminar el proceso de Node.js
*/
  tap.tearDown(() => {
    server.close();
  });

  //  Retornamos nuestro server modificado
  return server;
};

// Exportamos nuestro constructor de server de pruebas
module.exports = buildTestServer;
```

## Fastify inject

`inject` es un método que incluye la instancia de Fastify para realizar solicitudes HTTP de prueba sin tener que iniciar el servidor en un puerto HTTP con `listen`.

Las propiedades que puede recibir son:

- method: Indica el método HTTP de la solicitud: GET, POST, PUT, DELETE, etc.
- url: Ruta en la cual se va a realizar la prueba, debe iniciar desde la ruta raíz `/`.
- query: Objeto con los query params de prueba a enviar, los cuales se reciben en `request.query`.
- payload: Objeto con el body de prueba a enviar, los cuales se reciben en `request.body`.
- headers: Cabecera de la petición que queremos agregar a la prueba.
- cookies: Cookies que queremos agregar a la prueba.

Los datos los puede retornar ya sea en modo callback o en promesa:

```js
fastify
  .inject({ method: "GET", url: "/" })
  .then((response) => {
    // Hacer algo con el response
  })
  .catch((err) => {
    // Error al hacer la solicitud
  });
```

Y los podemos utilizar en `async/await`:

```js
const response = await fastify.inject({ method: "GET", url: "/" });
```

Inject va a resolver la promesa con éxito aunque tu respuesta sea 400 o 500 mientras el error haya sido bien manejado de tu parte.

El valor `response` que entrega `inject` tiene disponible las siguientes propiedades:

- statusCode: Código HTTP que devolvió la ruta.
- headers: Cabeceras de respuesta.
- json(): Es un método el cual devuelve el formato JSON los datos de la respuesta.

## Test en tap

Algunos de los tipos de tests que podemos hacer con tap son:

`ok`: Indica que el valor es válido, no null, vacio o undefined

```js
//  Como primer argumento se tiene el valor a validar y como segundo un mensaje
//  a mostrar cuando el test haya pasado o haya fallado
t.ok(valor, "El valor no es vacío");
```

`type`: Indica que el tipo de dato esperado que debe tener el valor

```js
//  Se espera que valor sea de tipo string, como tercer argumento
//  se envia el mensaje cuando haya pasado o fallado el test
t.type(valor, "string", "El valor debe ser string");
```

`equal`: Indica que el valor sea el esperado

```js
//  Se espera que valor sea igual a valorEsperado, como tercer argumento
//  se envia el mensaje cuando haya pasado o fallado el test
t.equal(valor, valorEsperado, "El valor es el valorEsperado");
```

`deepEqual`: Indica que el valor sea el esperado, este se usa para el caso de Objetos o de Arrays para validar que igual los elementos que los contienen sean iguales

```js
//  Se espera que valor sea igual a valorEsperado, como tercer argumento
//  se envia el mensaje cuando haya pasado o fallado el test
t.deepEqual(
  valorArray,
  valorEsperado,
  "El valorArray y sus elementos es igual al valorEsperado"
);
```

## Crear nuestro primer test

Vamos a crear una carpeta llamada `test` en la raíz del proyecto final y ahi dentro un archivo llamado `index.test.js`

En este archivo vamos a importar nuestro server de pruebas y la librería tap:

```js
const tap = require("tap");
const buildTestServer = require("../helper");

//  Iniciamos la suite de tap la cual llamaremos Fastify Firebase API
tap.test("Fastify Firebase API", async (subtest) => {
  //  Obtenemos la instancia del servidor de pruebas
  //  Como argumento le enviamos la suite de pruebas
  const server = await buildTestServer(tap);

  //  Hacemos un subtest de nuestra ruta raíz que entrega
  //  el HTML del proyecto React
  subtest.test("Obtener ruta raíz", async (t) => {
    //  Con plan, le indicamos a este subtest cuantos
    //  tests van a ejecutarse
    t.plan(2);

    //  Usamos la propiedad inject especial de Fastify para
    //  realizar pruebas
    const response = await server.inject({
      method: "GET",
      url: `/`,
    });

    //  Validamos que la respuesta sea un código HTTP 200
    t.equal(response.statusCode, 200, "Respuesta / debe ser 200");
    //  Validamos que la cabecera content-type indique que sea un HTML
    t.equal(
      response.headers["content-type"],
      "text/html; charset=UTF-8",
      "Respuesta debe ser texto html con UTF 8"
    );
  });
});
```

Ahora ejecutamos el comando:

```js
npm run test
```

Deberiamos tener una respuesta parecida del resumen del test:

```sh
> tap

 PASS  test/index.test.js 2 OK 1s


  🌈 SUMMARY RESULTS 🌈


Suites:   1 passed, 1 of 1 completed
Asserts:  2 passed, of 2
Time:     4s
```

## Tests congelados

Si observas que los tests se quedan congelados, puede ser que hayas olvidado agregar el hook `onClose` que hicimos en el proyecto final para cerrar la conexión de Firebase. Recuerda que es de la siguiente forma en tu archivo `server.js`:

```js
server.addHook("onClose", (fastify, done) => {
  admin
    .app()
    .delete()
    .then(() => done());
});

/*
  Si eso no llega a funcionar puedes utilizar el siguiente hook
  aunque no es muy recomendado:
  
  server.addHook("onClose", (fastify, done) => {
    process.exit(0)
  });
*/

return server;
```
