# Tripleten web_project_around_express

- Desarollo del lado del servidor con Node.js
- Introducción a Express.js

Se configuró un servidor simple a través de Node.js, y se ha desplegado en el back-end con Express.

El objetivo fue crear un servidor con una API y autenticación del usuario.

Se configuró las tres rutas:

- Request - Response

  - GET: Lista JSON de todos los usuarios
  - GET: Lista JSON de todas las tarjetas

- Error
  - GET: Lista JSON con ID que pasamos despues de /users.
    Se generó un estado de respuesta 404 para los usuarios que no se encuentran en la lista, y así mismo para la dirección no existente.

# Conexión a bases de datos con REST API

- Creación de API REST
  REST usa principios como recursos, métodos HTTP y respuestas en formato JSON.
  Cada URL representa un recurso y cada método (GET,POST,PACH,DELETE) una operación.

- Bases de datos
  La API evita exponer directamente las bases de datos.

- Expresiones regulares
  Caracteres que se asignan a una campo para indicarle sobre la validacion requerida.
