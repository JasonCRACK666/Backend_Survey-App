# APP SURVEY (API)

Una API (aun sin terminar) para una aplicación de encuestas

## Requisitos

Todas las cosas que necesita para poder correr la API de forma correcta y sin fallos

- [Node.js](https://nodejs.org/es)
- [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) - Base de datos
- [pnpm](https://pnpm.io/installation) - Manejador de paquetes para node.js (una mejor alternativa a npm)

## Pasos para iniciar la API

1. Ingrese al proyecto y abra una terminal (Powershell si esta en Windows), dentro de esté, ingrese el siguiente comando

```
pnpm install
```

2. Luego de que termine de instalar las dependencias, abrirá PgAdmin y crea una base de datos con el nombre `api_survey` (opcional podría crear otra base de datos llamada `api_survey_test`).

3. Creada la base de datos ingrese a la carpeta llamada `database`, deberá encontrar un archivo .sql llamado `db.sql` y desde PgAdmin abrirá el archivo .sql para luego después ejecutarlo. Creando asi las tablas y relaciones necesarias para la API.

4. __IMPORTANTE__ se requiere añadir un archivo en la carpeta raíz del proyecto llamado `.env` y debe de contener estar variable de entorno:

```js
SERVER_PORT=4000
DATABASE_DB=api_survey
DATABASE_DB_TEST=api_survey_test
USER_DB=postgres
PORT_DB=5432
HOST_DB=localhost
PASSWORD_DB= // Aquí va la contraseña del postgres
SECRET_JWT= // Aquí poner cualquier texto, no importa que sea, solo evitar poner caracteres especiales
```

5. Acabado lo anterior regrese al proyecto y desde la terminal que abrió anteriormente ejecutara el siguiente comando.

```console
pnpm build
```

6. Luego de que se haya hecho correctamente la build del proyecto, procederá a ejecutar el comando para poner en marcha la API

```console
pnpm start
```

7. Si no ha ocurrido ningún error entonces debería de poder ver en la terminal un mensaje como este

```console
Server on port 4000
```
