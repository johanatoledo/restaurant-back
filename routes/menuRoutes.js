/**
 * menuRoutes.js
 * Rutas relacionadas al menú público del restaurante (platos y bebidas).
 *Renderiza vistas EJS y expone endpoints de API para consumo desde el frontend.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */



import express from 'express';
import { platosPorCategoria, bebidasPorTipo } from '../controllers/menuController.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { getMainAssets } from '../utils/manifestAssets.js'; 

export default function(manifest) {
  const router = express.Router();

  // Compatibilidad para __dirname en ES Modules
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const distPath = path.join(__dirname, '..', '..', 'front', 'dist');

  /**
   * Vistas principales del menú (HTML estático de Vite o EJS para assets dinámicos)
   */

  // Página principal del menú (puede ser estática, generada por Vite)
  router.get('/', (req, res) => {
    const formPath = path.join(distPath, 'menu.html');
    res.sendFile(formPath);
  });

  // Renderiza menú de platos (usa EJS y assets procesados)
  router.get('/menuPlatos', (req, res) => {
    const { mainJs, stylesCss } = getMainAssets(manifest);
    res.render('menu', { mainJs, stylesCss });
  });

  // Renderiza menú de bebidas (usa EJS y assets procesados)
  router.get('/menuBebidas', (req, res) => {
    const { mainJs, stylesCss } = getMainAssets(manifest);
    res.render('menuBebidas', { mainJs, stylesCss });
  });

  /**
   * Endpoints de API REST para obtener datos del menú
   */

  // API: Devuelve lista de platos filtrada por categoría
  router.get('/platos', platosPorCategoria);

  // API: Devuelve lista de bebidas filtrada por tipo/categoría
  router.get('/bebidas', bebidasPorTipo);

  return router;
}
