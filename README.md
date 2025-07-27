# 📦 Backend - El Sabor de Rosita

Backend para el sistema de gestión y visualización del menú de "El Sabor de Rosita".  
Incluye autenticación de usuarios, administración de ingredientes, platos y bebidas, así como recuperación de contraseñas.  
Desarrollado en **Node.js + Express + MySQL** y preparado para deployment en Railway, Render u otros proveedores.

---

## 🚀 Características principales

- API RESTful para la gestión de ingredientes, platos y bebidas.
- Sistema de autenticación de usuarios (registro, login y recuperación de contraseña).
- Manejo seguro de contraseñas y recuperación por token.
- Vistas dinámicas con **EJS** para formularios y panel administrativo.
- Subida y manejo de imágenes con **Multer**.
- CORS configurado para integración con frontend Vite.
- Separación profesional de ambientes (`development` y `production`).

---

## 🚀 Tecnologías

- Node.js
- Express.js
- EJS (plantillas)
- MySQL (puedes adaptar para otro motor)
- Multer (carga de imágenes)
- Railway (despliegue recomendado)
- CORS, .env, arquitectura profesional (MVC)

## 📂 Estructura del proyecto

├── controllers/ # Lógica de negocio de rutas
├── models/ # Acceso y lógica de datos (MySQL)
├── routes/ # Rutas Express separadas por dominio
├── utils/ # Utilidades y helpers (conexión DB, assets)
├── views/ # Vistas EJS servidas desde backend
├── uploads/ # Carpeta pública para imágenes subidas (no subir todo en producción)
├── .env.development # Variables de entorno (desarrollo)
├── .env.production # Variables de entorno (producción, no subir a git)
├── package.json
├── server.js

---

## ⚙️ Configuración de variables de entorno

Configura los siguientes archivos según el entorno:

### `.env.development`

NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_local
DB_PASSWORD=tu_password_local
DB_NAME=tu_db_local

### `.env.production` (**NO subir este archivo a Git**)

NODE_ENV=production
PORT=3000
DB_HOST=host-remoto-db
DB_PORT=3306
DB_USER=usuario_db_produccion
DB_PASSWORD=contraseña_db_produccion
DB_NAME=usuario_esrosita

---

En Railway configura estas variables desde el **panel de Variables de Entorno**.

---

## 🛠️ Scripts útiles

- **`npm run dev`**  
  Inicia el backend en modo desarrollo con **nodemon** (hot reload).

- **`npm start`**  
  Inicia el backend en modo producción.

---

## 🚦 Ejecución local

1. **Instala dependencias**
   ```bash
   npm install
   ```
2. **Configura tu archivo .env.development (duplica y adapta el ejemplo anterior)**
3. **Arranca el servidor en desarrollo** npm run dev
4. **El backend estará disponible en http://localhost:3000.**

☁️ Deployment en Railway
Sube tu repo a GitHub.

Crea un nuevo proyecto en Railway → “Deploy from GitHub repo”.

Configura todas tus variables de entorno en Railway (en el panel "Variables").

Railway detecta el script "start" en tu package.json y corre el backend en modo producción.

Sube sólo los archivos necesarios: NO subas uploads privados ni archivos .env.

Cuando Railway finalice el build, tu API estará lista y pública.
Usa la URL proporcionada para conectar tu frontend o pruebas.

---

🔒 Notas de seguridad y buenas prácticas
Nunca subas tus archivos .env ni contraseñas a git.

No subas toda la carpeta /uploads a git:
Sólo incluye imágenes demo si son necesarias para mostrar la app.

Mantén las contraseñas y tokens siempre en variables de entorno.

Depuración (console.log, etc) sólo en desarrollo.

---

📢 Autor
Este backend fue desarrollado por Johana Toledo.
Contacto: toledanadev@gmail.com

---
