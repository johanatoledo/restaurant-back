import express from 'express';
import cors from 'cors';
import ingresarRoutes from './routes/ingresarRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();

// Middleware de seguridad (CORS, JSON)
app.use(express.json());
app.use(cors({
  origin: 'http://restaurant-front-ten.vercel.app', 
  credentials: true
}));

// CSP 
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

// Paths necesarios para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Ruta absoluta a la carpeta de build de Vite ===
const distPath = path.join(__dirname, '..', 'front', 'dist'); 

// EJS config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// === Carga el manifest de Vite para assets dinámicos (solo si existe) ===
const manifestPath = path.join(distPath, '.vite', 'manifest.json');
let manifest = {};
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} else {
  manifest = {}; // Evita errores si no existe, permite builds separados
}

// Sirve /uploads
app.use('/uploads', express.static('uploads'));

// Rutas de API (antes de las rutas de páginas)
app.use('/ingresar', ingresarRoutes(manifest));
app.use('/admin', adminRoutes(manifest));
app.use('/menu', menuRoutes(manifest));

// Rutas estáticas Vite
app.get('/', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
app.get('/:page', (req, res, next) => {
  const filePath = path.join(distPath, `${req.params.page}.html`);
  res.sendFile(filePath, err => { if (err) next(); });
});

// 404 fallback (opcional)
app.use((req, res) => {
  res.status(404).sendFile(path.join(distPath, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
