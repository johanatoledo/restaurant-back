/**
 * Modelo para platos y bebidas
 * Encapsula operaciones CRUD para la tabla 'platos' y 'bebidas' en la base de datos MySQL.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */



import db, { attachDbLogger } from '../utils/db.js';

/**
 * Inserta un plato y sus ingredientes relacionados en la base de datos.
 * @param {Object} plato - Datos del plato.
 * @param {string|null} imagen - Nombre del archivo de imagen (puede ser null).
 */
export const insertarPlatoConIngredientes = async (plato, imagen) => {
  const conn = await db.getConnection();
  attachDbLogger(conn);
  try {
    await conn.beginTransaction();

    // Ingredientes: array de strings (nombres)
    const nombresIngredientesArray = plato.ingredientes;
    const nombresIngredientes = nombresIngredientesArray.join(', ');

    // Insertar plato principal
    const [platoResult] = await conn.query(
      `INSERT INTO platos (nombre, descripcion, precio, categoria, ingredientes, imagen)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [plato.nombre, plato.descripcion, plato.precio, plato.categoria, nombresIngredientes, imagen]
    );

    // Relacionar ingredientes en tabla intermedia
    const idPlato = platoResult.insertId;
    const placeholders = nombresIngredientesArray.map(() => '?').join(',');
    const [rows] = await conn.query(
      `SELECT id, nombre FROM ingredientes WHERE nombre IN (${placeholders})`,
      nombresIngredientesArray
    );
    const idPorNombre = new Map();
    rows.forEach(row => idPorNombre.set(row.nombre, row.id));
    for (const nombre of nombresIngredientesArray) {
      const idIngrediente = idPorNombre.get(nombre);
      if (idIngrediente) {
        await conn.query(
          `INSERT INTO plato_ingrediente (id_plato, id_ingrediente)
           VALUES (?, ?)`,
          [idPlato, idIngrediente]
        );
      }
    
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
   
    console.error("Error al insertar plato con ingredientes:", err);
    throw err;
  } finally {
    conn.release();
  }
};

/**
 * Inserta una bebida y sus ingredientes relacionados en la base de datos.
 * @param {Object} bebida - Datos de la bebida.
 * @param {string|null} imagen - Nombre del archivo de imagen (puede ser null).
 */
export const insertarBebidaConIngredientes = async (bebida, imagen) => {
  const conn = await db.getConnection();
  attachDbLogger(conn);

  try {
    await conn.beginTransaction();

    const nombresIngredientesArray = bebida.ingredientes;
    const nombresIngredientes = nombresIngredientesArray.join(', ');

    const [bebidaResult] = await conn.query(
      `INSERT INTO bebidas (nombre, descripcion, precio, categoria, ingredientes, imagen)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [bebida.nombre, bebida.descripcion, bebida.precio, bebida.categoria, nombresIngredientes, imagen]
    );

    const idBebida = bebidaResult.insertId;
    const placeholders = nombresIngredientesArray.map(() => '?').join(',');
    const [rows] = await conn.query(
      `SELECT id, nombre FROM ingredientes WHERE nombre IN (${placeholders})`,
      nombresIngredientesArray
    );
    const idPorNombre = new Map();
    rows.forEach(row => idPorNombre.set(row.nombre, row.id));
    for (const nombre of nombresIngredientesArray) {
      const idIngrediente = idPorNombre.get(nombre);
      if (idIngrediente) {
        await conn.query(
          `INSERT INTO bebida_ingrediente (bebida_id, ingrediente_id)
           VALUES (?, ?)`,
          [idBebida, idIngrediente]
        );
      }
     
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    console.error("Error al insertar bebida con ingredientes:", err);
    throw err;
  } finally {
    conn.release();
  }
};

/**
 * Obtiene todos los ingredientes de la base de datos.
 */
export const obtenerTodosLosIngredientes = async () => {
  const [rows] = await db.query(
    `SELECT id, nombre, calorias, es_vegano, contiene_gluten, es_citrico FROM ingredientes`
  );
  return rows;
};

/**
 * Obtiene todas las bebidas con sus ingredientes de la base de datos.
 */
export const obtenerTodasLasBebidas = async () => {
  const [rows] = await db.query(`
    SELECT b.id, b.nombre, b.descripcion, b.precio, b.categoria, b.imagen,
      GROUP_CONCAT(i.nombre ORDER BY i.nombre SEPARATOR ', ') AS ingredientes
    FROM bebidas b
    LEFT JOIN bebida_ingrediente bi ON bi.bebida_id = b.id
    LEFT JOIN ingredientes i ON bi.ingrediente_id = i.id
    GROUP BY b.id
  `);
  return rows;
};

/**
 * Obtiene todos los platos con sus ingredientes de la base de datos.
 */
export const obtenerTodosLosPlatos = async () => {
  const [rows] = await db.query(`
    SELECT p.id, p.nombre, p.descripcion, p.precio, p.categoria, p.imagen,
      GROUP_CONCAT(i.nombre ORDER BY i.nombre SEPARATOR ', ') AS ingredientes
    FROM platos p
    LEFT JOIN plato_ingrediente pi ON pi.id_plato = p.id
    LEFT JOIN ingredientes i ON pi.id_ingrediente = i.id
    GROUP BY p.id
  `);
  return rows;
};

/**
 * Elimina una bebida por su ID.
 */
export const eliminarBebidaPorId = async (id) => {
  const query = `DELETE FROM bebidas WHERE id = ?`;
  await db.execute(query, [id]);
};

/**
 * Elimina un plato por su ID.
 */
export const eliminarPlatoPorId = async (id) => {
  const query = `DELETE FROM platos WHERE id = ?`;
  await db.execute(query, [id]);
};
