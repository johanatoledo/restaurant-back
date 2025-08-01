/**
 * ingresarRoutes.js
 * Rutas para autenticación de usuarios (registro, recuperación, reseteo de contraseña).
 * Renderiza vistas EJS y pasa los assets procesados por Vite desde el manifest para asegurar el correcto funcionamiento en producción.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */




import express from 'express';
import { registerUser, recuperarUser, resetPassword } from '../controllers/ingresarControllers.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { getMainAssets } from '../utils/manifestAssets.js';

export default function(manifest) {
  const router = express.Router();

  // Compatibilidad para __dirname en ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  /**
   * Vistas de autenticación (dinámicas con EJS y assets de Vite)
   */

  // Renderiza formulario de registro
  router.get('/register', (req, res) => {
    const { mainJs, stylesCss } = getMainAssets(manifest);
    res.render('form-registro', { mainJs, stylesCss });
  });

  // Renderiza formulario de recuperación de contraseña
  router.get('/recuperar', (req, res) => {
    const { mainJs, stylesCss } = getMainAssets(manifest);
    res.render('form-recuperar', { mainJs, stylesCss });
  });

  // Renderiza formulario de reseteo de contraseña (por token)
  router.get('/reset-password', (req, res) => {
    const { mainJs, stylesCss } = getMainAssets(manifest);
    res.render('reset-password', { mainJs, stylesCss });
  });

  /**
   * Endpoints para manejo de autenticación (API POST)
   */
  router.post('/register', registerUser);
  router.post('/recuperar', recuperarUser);
  router.post('/reset-password', resetPassword);

  return router;
}
