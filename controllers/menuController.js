/**
 * menuController.js
 * Controlador para mostrar menú público filtrando platos y bebidas por categoría.
 * Usa axios para comunicarse internamente con el backend admin.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import axios from 'axios';
import { obtenerTodosLosPlatos, obtenerTodasLasBebidas } from '../models/platoBebida.js';


/**
 * Filtra platos por categoría.
 * Consulta internamente /admin/listaPlatos y filtra en base al query param 'categoria'.
 * @route GET /menu/platos?categoria=Plato%20Peruano
 */
export async function platosPorCategoria(req, res) {
   try {
    const { categoria } = req.query;
    const platos = await obtenerTodosLosPlatos();
    const filtrados = platos.filter(p => p.categoria === categoria);
    res.json(filtrados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los platos por categoría' });
  }
}

/**
 * Filtra bebidas por tipo/categoría.
 * Consulta internamente /admin/listaBebidas y filtra en base al query param 'categoria'.
 * @route GET /menu/bebidas?categoria=Jugos%20Naturales
 */
export async function bebidasPorTipo(req, res) {
   try {
    const { categoria } = req.query;
    const bebidas = await obtenerTodasLasBebidas();
    const filtrados = bebidas.filter(b => b.categoria === categoria);
    res.json(filtrados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las bebidas por categoría' });
  }
}
