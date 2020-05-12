# Validaciones - Fastify desde 0

Fastify utiliza validaciones de Schema mediante librerias llamdas JSON Schema y Ajv. Esto quiere decir que
nostros definimos los nombres de las propiedades que se reciben, el tipo de valor que debe tener esa propiedad
y algunos parámetros adicionales como valores mínimos y valores máximos.

Antes de continuar debemos saber que nuestras rutas pueden recibir como segundo argumento la función handler, pero
también pueden recibir un objeto que son las opciones de la ruta, dentro de esas opciones podemos definir los hooks
que vimos en la lección pasada, el handler y los schemas que aplican a esa ruta.

## Definiendo un Schema

Vamos a comenzar con una petición POST donde es más común ver las validaciones, continuando con los
libros vamos a validar que cuando se quiere insertar un nuevo libro sean necesarios los campos de Autor
y de Nombre de la siguiente forma:

```js
server.post("/book", {
  schema: {
    body: {
      type: "object",
      required: ["name", "author"],
      properties: {
        name: { type: "string" },
        author: { type: "string" },
      },
    },
  },
  handler: (request, reply) => {
    const { name, author } = request.body;
    reply.send({
      name: `El libro se llama ${name}`,
      author: `El autor se llama ${author}`,
    });
  },
});
```

Parece un poco complicado al principio pero si entendemos bien como se realiza la estructura y con la prácitca todo será más sencillo, podemos
separar tanto los Schemas como el Handler en archivos separados para manejarlo mejor.

La ruta book recibe las opciones de handler y schema, handler es la misma función que utilizamos anteriormente,
por lo que sólo cambia un poco la forma de declararlo, schema por otro lado puede recibir las siguientes propiedades:

- `body`: Es el esquema que define el body de las solicitudes POST y PUT.
- `querystring`: Es el esquema que define los query params de las solicitudes GET y DELETE.
- `params`: Es el esquema de los parametros que definimos en la URL de nuestra ruta.
- `headers`: Es el esquema de las cabeceras que debamos recibir para procesar la solicitud.

Hay otra propiedad llamada `response` del cual hablaremos en la lección de serialización.

## Definir un esquema

Como observamos en el ejemplo la forma de describir un esquema se hace como un objeto el cual cuenta con
las siguientes propiedades:

- `type`: El tipo de dato que recibe este Schema, casi siempre vamos a definir que sea tipo `object` ya que es
  el modo por defecto con el cual Fastify trabaja el body y querystring.
- `required`: Es un array en el cual vamos a definir las propiedades que son obligatorias que existan.
- `properties`: Aqui definimos un objeto en el cual se define cada uno de los nombres de los campos que vamos a
  recibir.

A continuación se definen algunos de los tipos disponibles para las propiedades:

- `type`: Especifica el tipo de la propiedad, puede ser:
  - `number`: Para un número entero o decimal.
  - `integer`: Para un número entero.
  - `string`: Para un string.
  - `object`: Para un objeto.
  - `array`: Para un array.
  - `bool`: Para un valor booleano.

En el caso del ejemplo lo que queremos son 2 propiedades llamadas `author` y `name`, cada una debe ser de tipo string
y ambar son requeridas.

## Probando mi schema

Con ayuda de Postman o tu herramienta de API test favorita vamos a enviar un solicitud sin ningúna propiedad
en el body a la ruta `/book`. Observaras que nuestra aplicación va a responder con un error 400 porque no detecta
el body como un objeto, ahora vamos a sólo mandar el campo author, también deberiamos recibir un error 400 con
los siguientes datos:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body should have required property 'name'"
}
```

Ahora mandemos los 2 datos correctamente, ahora si obtendremos la respuesta deseada. Vamos a hacer otra prueba
enviando un valor de tipo objeto como nombre de autor. Algo así como el siguiente ejemplo:

```json
{
  "author": {
    "name": "Sun",
    "lastname": "Tzu"
  },
  "name": "El arte de la guerra"
}
```

Observarás que también vamos a recibir una respuesta 400 de nuestra aplicación:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "body.author should be string"
}
```

Nota: Si envias un valor númerico como author o name no tendrás errores, esto se debe a que es un valor que puede
ser transformado a string sin problemas, al contrario si defines que el campo sea de tipo number no puedes
recibir un string.

## Schemas con Arrays y Array de objetos

Si la ruta de tu API va a recibir valores de tipo array o array de objetos pueden definirse también dentro del Schema:

```js
schema: {
    body: {
      type: "object",
      required: ["name", "author"],
      properties: {
        //  Array de strings, la propiedad item define el tipo que tendra cada elemento del array
        authors: {
            type: "array",
            items: {
                type: "string"
            }
        },
        //  Ahora definimos un array de objects con cada edición que ha tenido el libro
        editions: {
            type: "array",
            //  Tambien definimos un item de un forma distinga
            items: {
                type: "object",
                //  También podemos definir que valores son requeridos en cada objeto del array
                required: ["year","editionNumber"],
                properties: {
                    year: { type: "integer" },
                    editionNumber: { type: "integer" },
                    editorial: { type: "string" },
                    isbn: { type: "string" }
                }
            },
            //  Este valor hace que mínimo deba haber un elemento en el array
            minItems: 1,
        },
        //  Tipo string
        name: { type: "string" },
      },
    },
}
```

## Saber más de JSON Schema

[Entra a esta URL para conocer más de JSON Schema](https://json-schema.org/learn/getting-started-step-by-step.html)

Aunque muchas veces podemos definir fácilmente los tipos de datos que vamos a recibir en nuestras rutas, otra veces
unos datos dependen del valor de otros o hay validaciones muy especificas que podemos realizar, en la siguiente
lección vamos a ver como definir un hook en donde se aplicará esta validación.
