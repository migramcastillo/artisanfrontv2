# Proyecto Final 1 de 3 - Fastify desde 0

Vamos a dividir en 3 lecciónes la creación del proyecto final, este tiene como objetivo integrar todo lo visto en lecciones anteriores más la implementación de Firebase.

Vamos a trabajar a partir de un proyecto ya creado para tener las vistas necesarias para interactuar con la API REST que vamos a construir.

## Instalación del template

Vamos a clonar el template del proyecto:

```sh
git clone https://github.com/migramcastillo/react-libros-template.git
```

Este va a generarnos la carpeta `react-libros-template`. Vamos a posicionar la terminal en la carpeta e instalar las dependencias que incluye:

```js
npm install
```

## Instalar dependencias

Adicionalmente vamos a instalar dependencias que vamos a utilizar en este proyecto

```js
npm install fastify fastify-static fastify-cors firebase-admin pino-pretty
```

## Configurar Firebase

Vamos a necesitar una cuenta de Google para este demo y vamos a visitar el sitio oficial de la [consola de Firebase](https://console.firebase.google.com/)

### En la página de la consola Firebase creamos un nuevo proyecto

![01 Crear Proyecto](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/01-crear-proyecto.png)

### Lo nombramos a nuestro gusto

![02 Nombrar Proyecto](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/02-nombrar-proyecto.png)

### Deshabilitamos analytics

![03 No Analytics](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/03-no-analytics.png)

### Proyecto creado

![04 Creado](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/04-proyecto-creado.png)

### Creamos una realtime database

En el home podemos encontrar la opción para generar una Realtime Database

![05 Realtime Database](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/05-realtime-database.png)

### La creamos en modo prueba

![06 DB Modo Prueba](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/06-db-modo-prueba.png)

### Entramos a la opción database desde el menú

![07 DB Menu](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/07-db-menu.png)

### Observamos la db vacia

Seleccionamos la opción +

![08 DB Menu](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/08-db-vacia.png)

### Creamos la colección

Con datos de prueba, sólo para que podamos acceder a la colección, la nombraremos como books

![09 Coleccion](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/09-crear-coleccion.png)

### Vamos a las configuraciones del proyecto

![10 Configuración](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/10-configuracion.png)

### Especificamos en opciones de cuenta que es un proyecto Node.js

![11 Nodejs](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/11-cuenta-nodejs.png)

### Presionamos el botón azul de generar claves

![12 Generar Clave](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/12-generar-clave-privada.png)

### Presionamos para descargar el archivo JSON de las claves

![13 Generar Clave](https://artisanfront.s3-us-west-2.amazonaws.com/firebase-pasos/13-generar-clave.png)

Después de este paso, vamos a renombrar el archivo descargado como `firebase.json` y lo vamos a colocar en la raíz del proyecto.

**Nota:** Desafortunadamente para ejecutar el demo debemos igual seguir estos pasos para generar el archivo firebase.json.

En la siguiente lección vamos a iniciar la conexión Firebase de nuestro proyecto y crearemos la API REST.
