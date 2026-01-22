# Tripleten web_project_api_full

# Conceptos principales

- Autenticación en el servidor: Validar la identidad de los usuarios desde el back‑end, no solo en el cliente.

- Registro y login: Implementar endpoints para crear usuarios y permitir su acceso.

- Tokens: Generar y manejar tokens (por ejemplo, JWT) para mantener sesiones seguras.

# Pasos clave

1. Crear usuarios

- Endpoint de registro.

- Validación de datos entrantes.

- Almacenamiento seguro de contraseñas (hashing).

2. Autenticación

- Endpoint de login.

- Verificación de credenciales.

- Emisión de un token seguro.

3. Autorización

- Uso del token en cada petición.

- Middleware que valida el token antes de acceder a recursos protegidos.

# Habilidades que se desarrollan

1. Implementar autenticación y autorización en el back‑end.

2. Configurar un servidor remoto y trabajar con SSL/TLS para encriptar datos.

3. Crear y conectar un dominio propio.

4. Actualizar y desplegar el código en un servidor remoto.

# Importancia práctica

- Pruebas automatizadas: esenciales para garantizar que la autenticación funciona correctamente antes de publicar.

- Despliegue seguro: subir el proyecto con protocolos de encriptación y certificados SSL.

- Aplicación real: con estas bases se puede llevar el proyecto a producción o incluso iniciar una startup.

![Descripción de la imagen](./frontend/src/images/Autenticaionbackend.png)
--> Cómo leerlo

- Register → Login → Token → Access Resources

- El usuario primero se registra, luego inicia sesión.

- El servidor valida credenciales y genera un token JWT.

- El cliente guarda ese token y lo envía en cada petición.

- El middleware del back‑end verifica el token antes de permitir acceso a recursos protegidos.

## 🌐 Demo en GitHub Pages Puedes ver el proyecto desplegado aquí: [Ir al sitio](https://angelicacuadrosfarelo.github.io/web_project_api_full/)
