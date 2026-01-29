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

## Enlaces del proyecto

### Frontend

- **Dominio principal:** https://www.aroundproject19.mooo.com
- **Dominio alternativo:** https://aroundproject19.mooo.com

### Backend/API

- **API:** https://api.aroundproject19.mooo.com

### IP del servidor

- **IP pública:** 35.184.129.8

1. Manejo centralizado de errores

- Crear un middleware que capture y gestione errores de forma uniforme.

- Devolver códigos adecuados (ej. 500 para errores inesperados).

2. Validación de solicitudes

- Usar librerías como celebrate y validator para validar datos de entrada.

- Asegurar que los cuerpos, parámetros y encabezados cumplan con los esquemas definidos.

3. Registro de solicitudes y errores

- Guardar logs en archivos request.log y error.log en formato JSON.

- No incluir estos archivos en el repositorio.

4. Conectar frontend y backend

- Estructura del proyecto con carpetas frontend/ y backend/.

- Construir el frontend y copiarlo al servidor.

- Usar scp para transferir archivos.

5. Crear servidor en la nube y desplegar la API

- Configurar un servidor (ej. Google Cloud).

- Instalar dependencias necesarias y desplegar la API para que sea accesible por dominio.

6. Mantener la aplicación en ejecución permanente

- Usar PM2 para que el servidor se reinicie automáticamente si se cae.

- Añadir una ruta /crash-test para comprobar la recuperación automática.

7. Configurar dominio y HTTPS

- Registrar un dominio (puede ser gratuito con FreeDNS).

- Configurar Nginx para servir frontend y backend en el mismo dominio o subdominios.

- Emitir certificados SSL con Let’s Encrypt para habilitar HTTPS.

8. Configurar variables de entorno

- Crear un archivo .env en el servidor con claves como NODE_ENV=production y JWT_SECRET.

- No subir este archivo al repositorio.

9. Habilitar CORS

- Instalar y configurar el módulo cors en el backend para permitir solicitudes entre dominios.

- Pruebas finales

10. Verificar que el frontend y backend funcionan juntos.

- Comprobar funcionalidades: registro, login, edición de perfil, CRUD de tarjetas y “likes”.
