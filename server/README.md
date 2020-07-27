# GUATEMALA APP SERVER

Este proyecto se creo con el fin de crear una api rest en node.js la cual se conectara a un base de datos postgres y tendras las sigueintes funciones 
crear promociones
editar promociones
leer promociones
eliminar promociones
crear usuario
autenticar usuario

### Demo

Descargue la coleccion de postman para que hagan sus respectivas validaciones [click aqui](http://demo.luismeraweb.com/guatemala-app/ABC.postman_collection.json)

esta API esta deplegada en un servidor Heroku para que el apk pueda funcionar aqui deje el link de la api en heroku https://app-events-back.herokuapp.com/api

### Instalación

requiere [Node.js](https://nodejs.org/).

Cree una base de datos postgres en su maquina local y ejecute los comando sql que estan en:

```sh
/guatemala-app/server/database/db.sql
```

ajuste las conexion a su base de datos en:

```sh
/guatemala-app/server/database/connection.js
```

Instale las dependencias

```sh
$ cd guatemala-app/server
$ npm install
```

Despliegue la aplicacion...

```sh
$ npm run dev
```

### Plugins

guatemala-app actualmente está usando los siguientes complementos. Las instrucciones sobre cómo usarlas en su propia aplicación están vinculadas a continuación.

| Plugin | README |
| ------ | ------ |
| bcrypt-nodejs | [Repositorio](https://github.com/) |
| body-parser | [Repositorio](https://github.com/) |
| cors | [Repositorio](https://github.com/) |
| express | [Repositorio](https://github.com/) |
| jwt-simple | [Repositorio](https://github.com/) |
| moment | [Repositorio](https://github.com/) |
| pg | [Repositorio](https://github.com/) |

