# Introducción - Fastify desde 0

Fastify es un framework de NodeJS que ha empezado a tomar popularidad estos últimos años, entre las razones
por las cuales ha incrementado su uso podemos listar las siguientes:

- Es un proyecto en etapa de incubación soportado por la OpenJS Foundation, esto significa que está en el proceso de
  ser un proyecto de alto impacto dentro de la comunidad de JavaScript.
- Cuenta con una comunidad en constante crecimiento.
- El ecosistema del Framework es muy completo, permite hacer validaciones, logging, testing y ademas tiene un ciclo de vida muy bien definido que permite personalizar mucho el comportamiento de la aplicación.
- La principal es que cuenta con la mejor velocidad de respuesta a las solicitudes HTTP.

En mi opinión personal ha sido un Framework fácil de implementar y de sustituir por Express,
sin embargo siento que aun le queda un camino por recorrer para ser la primera opción de Framework web
para NodeJS, otro tema que considero importante es la cercania que necesita a otras comunidades como
la de habla hispana donde aun no tenemos documentación oficial en Español y para finalizar la falta
de tutoriales y dificultad de adopción de desarrolladores principiantes.

Espero que esta serie de articulos pueda ayudarte a adoptar y encontrar en Fastify una herramienta
escencial para tus próximos proyectos.

## Instalación

Para instalarlo no olviden contar con una versión soportada de Node.js, de preferencia una versión LTS como la 12, [puedes descargar Node.js aquí](https://nodejs.org/es/download/). Empezamos en una carpeta iniciando un nuevo proyecto de NodeJS:

```sh
# Crear la nueva carpeta
mkdir curso-fastify

# Nos posicionamos en la carpeta
cd curso-fastify

# Iniciamos el nuevo proyecto de node
npm init -y
```

Este comando creará un `package.json` con algunos campos por defecto, una vez completado esto vamos a instalar el paquete de Fastify:

```sh
npm install fastify
```

## Mi primer servidor Fastify

Ahora vamos a proceder a crear nuestro servidor web, crearemos un archivo llamado `index.js`.

Empezamos importando nuestro paquete instalado:

```js
const fastify = require("fastify");
```

Luego, instanciamos el servidor HTTP de fastify a alguna variable ejecutandolo como función, más adelante
veremos los parametros que se pueden mandar a esa función:

```js
const server = fastify();
```

Procedemos a declarar nuestra primera ruta GET con Fastify, las rutas reciben como primer argumento
el path de la ruta y como segundo argumento una función denominada `handler` de las acciones a ejecutar cuando se alcance esa ruta, dicha función recibe dos parametros, `request` y `reply`.

```js
server.get("/", function (request, reply) {
  reply.send({
    message: "Fastify works",
  });
});
```

- `request` es el objeto de la petción realizada por el cliente.
- `reply` es el objeto de la respuesta que va a ejecutar nuestro servidor, la propiedad `send` lo que hará es enviar la respuesta automaticamente en formato JSON.

Por último vamos a agregar la propiedad `listen` la cual levantará nuestro servidor HTTP especificando el puerto que queremos utilizar:

```js
server.listen(3000, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Fastify corriendo en el puerto 3000");
});
```

La propiedad `listen` en este caso recibió 2 parametros, el primero es el número de puerto donde nuestra aplicación va a responer y el segundo una función handler que se ejecutará una vez que el servidor este listo para recibir solicitudes. Puedes observar que hicimos un bloque `if` en el cual simplemente vamos a detectar si hay un error al momento de levantar este servidor.

Nota: `process.exit(1)` lo que hará es literalmente matar el proceso de Node.js especificando que la causa
fue a partir de un error, en este caso uno de los errores más comunes en `listen` es que el puerto este
que quieres usar esté actualmente ocupado.

## Probar el servidor

En una consola vamos a ejecutar el servidor con el comando

```sh
node index.js
```

Deberás ver en la consola la leyenda `Fastify corriendo en el puerto 3000` y ahora desde un navegador podras introducir la URL `http://localhost:3000` si todo sale bien deberías poder ver el mensaje que establecimos anteriormente, muy bien acabamos de ejecutar un servidor web con unas pocas líneas de código!

## Código completo

```js
const fastify = require("fastify");

const server = fastify();

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

  console.log("Fastify corriendo en el puerto 3000");
});
```
