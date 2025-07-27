/**
 * Modelo Ingrediente
 * Encapsula operaciones CRUD para la tabla 'ingredientes' en la base de datos MySQL.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import db from '../utils/db.js'; // Importa la conexión a la base de datos

const Ingrediente = {
  /**
   * Inserta un nuevo ingrediente en la base de datos.
   * @param {Object} params - Objeto con los datos del ingrediente.
   * @param {string} params.nombre - Nombre del ingrediente.
   * @param {number} params.calorias - Cantidad de calorías.
   * @param {string} params.esVegano - 'Si' o 'No'.
   * @param {string} params.contieneGluten - 'Si' o 'No'.
   * @param {string} params.esCitrico - 'Si' o 'No'.
   * @returns {Promise<Object>} Resultado de la inserción.
   */
  insertar: async ({ nombre, calorias, esVegano, contieneGluten, esCitrico }) => {
    const query = `
      INSERT INTO ingredientes (nombre, calorias, es_vegano, contiene_gluten, es_citrico)
      VALUES (?, ?, ?, ?, ?)
    `;
    const valores = [nombre, calorias, esVegano, contieneGluten, esCitrico];
    const [resultado] = await db.execute(query, valores);
    return resultado;
  },

  /**
   * Elimina un ingrediente por su ID.
   * @param {number} id - ID del ingrediente a eliminar.
   * @returns {Promise<void>}
   */
  eliminarPorId: async (id) => {
    const query = `DELETE FROM ingredientes WHERE id = ?`;
    await db.execute(query, [id]);
  }
};

export default Ingrediente;
