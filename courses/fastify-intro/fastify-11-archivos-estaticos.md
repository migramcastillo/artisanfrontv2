# Archivos Estáticos - Fastify desde 0

Por defecto Fastify no puede enviar archivos HTML como respuestas en `reply` pero con un plugin oficial de
Fastify podemos servir archivos estáticos como HTML, Imagenes, CSS y Javascript. Vamos en esta lección a configurar
nuestro web server para dar respuestas HTML.

Nota: En producción no es recomendable servir archivos estáticos con NodeJS sin un proxy reverso como Nginx.
(En este artículo puedes ver más detalles al respecto)[https://carlosazaustre.es/como-configurar-nginx-con-node-js-en-produccion]

## Instalación

Instalamos el plugin oficial de Fastify:

```sh
npm install --save fastify-static
```

Lo que hace este plugin es crear un `decoratorReply` llamado `sendFile` para servir los archivos estáticos, así
como igual definiremos una ruta raíz para que los archivos HTML puedan solicitar otros archivos como imagenes
y hojas de estilo.

## Configuración

En la lección de plugins vimos como registrar un nuevo plugin, vamos a poner en práctica lo aprendido
instalando el plugin de `fastify-static`, una de las opciones de este plugin es especificar la carpeta raíz
de nuestros archivos estáticos, como vamos a especificar una ruta de archivo vamos a utilizar el módulo nativo
de NodeJS llamado `path` que nos ayuda a definir las rutas de archivos de la mejor forma posible, en nuestro `index.js`:

```js
const fastify = require("fastify");
const path = require("path");
const server = fastify();

//  Registramos el plugin
server.register(require("fastify-static"), {
  /*
    Con ayuda de "path" le indicamos con __dirname que en este directorio busque la carpeta "public"
  */
  root: path.join(__dirname, "public"),

  /*
    Prefix es opcional y por defecto es el valor "/", en esta opción especificamos el prefijo de ruta
    de nuestros archivos estáticos, por ejemplo:

    Si dentro de public tenemos un archivo llamado "styles.css" y prefix es "/" vamos a poder consultar este archivo en la
    ruta localhost:3000/styles.css

    En cambio si definimos prefix con un valor como "/dist/" vamos a poder consultar este archivo en 
    la ruta localhost:3000/dist/styles.css
*/
  prefix: "/",
});
```

## Servir un archivo estático

Vamos crear una carpeta en la raíz de nuestro proyecto llamada `public` en esta carpeta vamos a crear el archivo
`index.html` con el siguiente contenido:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido</title>
  </head>
  <body>
    <h1>Archivos estáticos desde Fastify!!!</h1>
  </body>
</html>
```

Ahora en nuestro `index.js` agregamos una ruta para servir este archivo

```js
//  ...Debajo del registro del plugin

server.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

server.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en puerto 3000");
});
```

## Prueba

Ejecutamos nuestra aplicación con:

```sh
node index.js
```

Y en un navegador navegamos a (http://localhost:3000)[http://localhost:3000] para ver nuestro archivo
HTML servido.

## Agregando CSS, imagenes y Javascript

Dentro de la misma carpeta `public` vamos a colcoar una imagen, una de tu preferencia. También
vamos a colocar un archivo `css` con el siguiente contenido:

```css
/* Esto se va a ver horrible pero es sólo para probar que se cargue el CSS */
body {
  background: red;
  color: gray;
}
```

Y tambien ahi mismo creamos un archivo llamado `script.js`:

```js
window.onload = function () {
  alert("He cargado JS a mi archivo estatico");
};
```

Ahora vamos a modificar nuestro HTML para leer estos archivos:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>Archivos estáticos desde Fastify!!!</h1>
    <img src="/imagen.jpg" alt="Mi imagen" />
    <script src="/script.js"></script>
  </body>
</html>
```

Recuerda que si en la configuración del plugin utilizaste otro prefix, este lo debes colocar también
en las etiquetas `src` y `href` para solicitar tus archivos estáticos.

Probamos nuevamente en (http://localhost:3000)[http://localhost:3000] y debemos ver tanto la imagen, como
el alert y el estilo tan feo que aplicamos a nuestro HTML.

## Pagina 404

Si para las peticiones API Rest quisieramos retornar una respuesta JSON pero para las demas quisieramos
devolver una página HTML de 404, podemos hacerlo mediante `setNotFoundHandler` que utilizamos en la lección
de manejo de errores:

```js
server.setNotFoundHandler(function (request, reply) {
  /*
        Lo que hacemos es verificar si el request está solicitando una respuesta JSON, esto lo 
        podemos saber consultando los headers del request. En caso de ser "aplication/json" retornaremos
        un JSON. En caso contrario vamos a utilizar sendFile para enviar nuestro HTML personalizado para 404
    */
  if (
    request.headers["content-type"] &&
    request.headers["content-type"] === "application/json"
  ) {
    reply.code(404).send({
      message: "Ruta no encontrada",
    });
  } else {
    reply.code(404).sendFile("404.html");
  }
});
```
