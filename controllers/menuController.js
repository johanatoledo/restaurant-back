/**
 * menuController.js
 * Controlador para mostrar menú público filtrando platos y bebidas por categoría.
 * Usa axios para comunicarse internamente con el backend admin.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import axios from 'axios';

const API_BASE = process.env.BACKEND_URL || 'http://localhost:3000';
const API=`${API_BASE}/api`;

/**
 * Filtra platos por categoría.
 * Consulta internamente /admin/listaPlatos y filtra en base al query param 'categoria'.
 * @route GET /menu/platos?categoria=Plato%20Peruano
 */
export async function platosPorCategoria(req, res) {
  try {
    const { categoria } = req.query;

    // Llama al endpoint interno para obtener todos los platos
    const response = await axios.get(`${API}/admin/listaPlatos`);
    const platos = response.data;

    // Filtra por categoría
    const filtrados = platos.filter(p => p.categoria === categoria);

    res.json(filtrados);
  } catch (err) {
    console.error("Error en platosPorCategoria:", err);
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

    // Llama al endpoint interno para obtener todas las bebidas
    const response = await axios.get(`${API}/admin/listaBebidas`);
    const bebidas = response.data;

    // Filtra por categoría
    const filtrados = bebidas.filter(b => b.categoria === categoria);

    res.json(filtrados);
  } catch (err) {
    console.error("Error en bebidasPorTipo:", err);
    res.status(500).json({ error: 'Error al obtener las bebidas por tipo' });
  }
}
