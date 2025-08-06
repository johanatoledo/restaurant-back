/**
 * adminRoutes.js
 * Rutas administrativas para la gestión de ingredientes, platos y bebidas.
 * Inyecta los assets (JS y CSS) de Vite a las vistas EJS usando el manifest generado.
 * Incluye endpoints para CRUD de recursos y subida de imágenes vía Multer.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import express from 'express';
import { loginUser } from '../controllers/loginController.js';
import {
  guardarIngrediente, eliminarIngrediente,
  guardarPlato, obtenerIngredientes, obtenerBebidas, guardarBebida,
  eliminarBebida, obtenerPlatos, eliminarPlato
} from '../controllers/adminControllers.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';


export default function(frontendUrl,BACKEND_URL) {
  const router = express.Router();

  // Para compatibilidad ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  

  // Configuración de Multer para almacenamiento de imágenes en /uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });

 
  router.get('/editarMenu', (req, res) => {
    res.render('editar_ingredientes', { frontendUrl });
  });

  router.get('/ingredientes', (req, res) => {
    res.render('ingredientes', { frontendUrl,BACKEND_URL });
  });

  router.get('/platos', (req, res) => {
    res.render('platos', { frontendUrl });
  });

  router.get('/bebidas', (req, res) => {
    res.render('bebidas', { frontendUrl , BACKEND_URL });
  });

  router.get('/login', (req, res) => {
    res.render('login', { frontendUrl });
  });

  /**
   * API y endpoints de manejo de datos (CRUD)
   */
  router.post('/ingredientes', guardarIngrediente);
  router.delete('/ingredientes/:id', eliminarIngrediente);

  router.post('/login', loginUser);

  router.get('/listaIngredientes', obtenerIngredientes);
  router.get('/listaBebidas', obtenerBebidas);
  router.get('/listaPlatos', obtenerPlatos);

  router.delete('/bebidas/:id', eliminarBebida);
  router.delete('/platos/:id', eliminarPlato);

  // Endpoints para subida de archivos (imágenes) asociados a platos y bebidas
  router.post('/platos', upload.single('imagen'), guardarPlato);
  router.post('/bebidas', upload.single('imagen'), guardarBebida);

  return router;
}
