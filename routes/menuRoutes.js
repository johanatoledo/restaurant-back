/**
 * menuRoutes.js
 * Rutas relacionadas al menú público del restaurante (platos y bebidas).
 *Renderiza vistas EJS y expone endpoints de API para consumo desde el frontend.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */



import express from 'express';
import { platosPorCategoria, bebidasPorTipo } from '../controllers/menuController.js';



export default function(frontendUrl) {
  const router = express.Router();



  // Renderiza menú de platos (usa EJS y assets procesados)
  router.get('/menuPlatos', (req, res) => {
    res.render('menu', { frontendUrl });
  });

  // Renderiza menú de bebidas (usa EJS y assets procesados)
  router.get('/menuBebidas', (req, res) => {
    res.render('menuBebidas', { frontendUrl });
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
