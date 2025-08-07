/**
 * adminControllers.js
 * Controlador principal para rutas relacionadas a la administración de ingredientes, platos y bebidas.
 * Gestiona CRUD de cada entidad, utilizando los modelos y servicios correspondientes.
 * 
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import Ingrediente from '../models/ingredientes.js';
import {
  insertarPlatoConIngredientes, obtenerTodosLosIngredientes,
  insertarBebidaConIngredientes, obtenerTodasLasBebidas, eliminarBebidaPorId,
  obtenerTodosLosPlatos, eliminarPlatoPorId
} from '../models/platoBebida.js';


/**
 * Guarda un nuevo ingrediente en la base de datos.
 * Validaciones básicas antes de insertar.
 */
export async function guardarIngrediente(req, res) {
  try {
    const { nombre, calorias, esVegano, contieneGluten, esCitrico } = req.body;

    // Validaciones
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ message: 'Nombre inválido' });
    }
    if (isNaN(calorias) || calorias < 0) {
      return res.status(400).json({ message: 'Calorías inválidas' });
    }

    // Inserción en la BD
    const resultado = await Ingrediente.insertar({
      nombre,
      calorias,
      esVegano: esVegano ? 'Si' : 'No',
      contieneGluten: contieneGluten ? 'Si' : 'No',
      esCitrico: esCitrico ? 'Si' : 'No'
    });

    res.status(201).json({ message: 'Ingrediente guardado correctamente', id: resultado.insertId });
  } catch (error) {
    console.error('Error al guardar ingrediente:', error);
    res.status(500).json({ message: 'Error al guardar el ingrediente' });
  }
}

/**
 * Elimina un ingrediente por ID.
 */
export const eliminarIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    await Ingrediente.eliminarPorId(id);
    res.status(200).json({ message: 'Ingrediente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar ingrediente:', error);
    res.status(500).json({ message: 'Error al eliminar el ingrediente' });
  }
};

/**
 * Guarda un nuevo plato junto con sus ingredientes.
 * Espera recibir la info del plato en formato JSON en req.body.plato y una imagen (opcional).
 */
export const guardarPlato = async (req, res) => {
  try {
    const { plato } = req.body;
    const datosPlato = JSON.parse(plato);
    const imagen = req.file?.filename || null;

    await insertarPlatoConIngredientes(datosPlato, imagen);

    res.status(200).json({ message: 'Plato guardado exitosamente' });
  } catch (err) {
    console.error("Error al guardar plato:", err);
    res.status(500).json({ message: 'Error interno al guardar el plato' });
  }
};

/**
 * Elimina un plato por ID.
 */
export const eliminarPlato = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarPlatoPorId(id);
    res.status(200).json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar plato:', error);
    res.status(500).json({ message: 'Error al eliminar el plato' });
  }
};

/**
 * Guarda una nueva bebida junto con sus ingredientes.
 * Espera recibir la info de la bebida en req.body.bebida (string JSON) y una imagen (opcional).
 */
export const guardarBebida = async (req, res) => {
  try {
    const { bebida } = req.body;
    const datosBebida = JSON.parse(bebida);
    const imagen = req.file?.filename || null;

    await insertarBebidaConIngredientes(datosBebida, imagen);

    res.status(200).json({ message: 'Bebida guardada exitosamente' });
  } catch (err) {
    console.error("Error al guardar bebida:", err);
    res.status(500).json({ message: 'Error interno al guardar la bebida' });
  }
};

/**
 * Elimina una bebida por ID.
 */
export const eliminarBebida = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarBebidaPorId(id);
    res.status(200).json({ message: 'Bebida eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar bebida:', error);
    res.status(500).json({ message: 'Error al eliminar la bebida' });
  }
};

/**
 * Devuelve la lista de ingredientes registrados en la base de datos.
 */
export const obtenerIngredientes = async (req, res) => {
  try {
    const ingredientes = await obtenerTodosLosIngredientes();
    res.status(200).json(ingredientes);
  } catch (error) {
    console.error("Error al obtener ingredientes:", error);
    res.status(500).json({ message: "Error al obtener ingredientes" });
  }
};

/**
 * Devuelve la lista de bebidas registradas en la base de datos.
 */
export const obtenerBebidas = async (req, res) => {
  try {
    const bebidas = await obtenerTodasLasBebidas();
    res.status(200).json(bebidas);
  } catch (error) {
    console.error("Error al obtener la lista de bebidas:", error);
    res.status(500).json({ message: "Error al obtener la lista de bebidas" });
  }
};

/**
 * Devuelve la lista de platos registrados en la base de datos.
 */
export const obtenerPlatos = async (req, res) => {
  try {
    const platos = await obtenerTodosLosPlatos();
    res.status(200).json(platos);
  } catch (error) {
    console.error("Error al obtener la lista de platos guardados:", error);
    res.status(500).json({ message: "Error al obtener la lista de platos guardados" });
  }
};
