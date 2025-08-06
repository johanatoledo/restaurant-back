import express from 'express';
import cors from 'cors';
import ingresarRoutes from './routes/ingresarRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; 
const allowedOrigins = [
  'https://restaurant-front-ten.vercel.app',
  'https://restaurant-front-git-main-johana-toledos-projects.vercel.app',
  'http://localhost:5173'
];

// Configura CORS solo para el frontend de Vercel y local
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Seguridad básica CSP
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://translate.googleapis.com https://www.gstatic.com; " +
    "img-src 'self' https: blob: data:; " +
    "media-src 'self' blob: data:; " +
    "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; " +
    "connect-src 'self' https://restaurant-front-ten.vercel.app https://restaurant-back-production.up.railway.app;"
  );
  next();
});

// Middleware para JSON
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Ruta absoluta a la carpeta de build de Vite ===
const distPath = path.join(__dirname, '..', 'front', 'dist');
app.use(express.static(distPath));


//  EJS para admin interno (opcional)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/uploads', express.static('uploads'));


// ---- Rutas solo API o panel interno ----

// Rutas de API (prefix /api recomendado para claridad)
app.use('/api/ingresar', ingresarRoutes(frontendUrl));
app.use('/api/admin', adminRoutes(frontendUrl,BACKEND_URL));
app.use('/api/menu', menuRoutes(frontendUrl));


// Manejo de 404 API JSON
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
