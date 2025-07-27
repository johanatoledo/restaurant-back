// Modelo (esquema) de usuario con funciones para registro, login, y recuperación.
// Utiliza bcrypt para hashing seguro y crypto para generación de tokens.

import db from '../utils/db.js';        // Conexión a MySQL
import bcrypt from 'bcryptjs';          // Para encriptar contraseñas
import crypto from 'crypto';            // Para tokens de recuperación
import dayjs from 'dayjs';              // Fechas manejables

const User = {
  /**
   * Busca un usuario por email (case insensitive).
   * @param {string} email - Email del usuario.
   * @returns {Promise<Object|undefined>} - Objeto de usuario o undefined si no existe.
   */
  async findByEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await db.execute('SELECT * FROM users WHERE LOWER(email) = ?', [normalizedEmail]);
    return rows[0]; // Puede ser undefined si no encuentra coincidencia
  },

  /**
   * Crea un nuevo usuario con contraseña hasheada.
   * @param {Object} param0 - Objeto con nombre, email y password.
   * @returns {Promise<Object>} - Objeto del usuario creado (sin password).
   */
  async create({ nombre, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10); // Seguridad
    const [result] = await db.execute(
      'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword]
    );
    return { id: result.insertId, nombre, email };
  },

  /**
   * Valida las credenciales (login).
   * @param {string} email 
   * @param {string} plainPassword 
   * @returns {Promise<Object|null>} - Usuario si es válido, null si no.
   */
  async validateCredentials(email, plainPassword) {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(plainPassword, user.password);
    return match ? user : null;
  },

  /**
   * Genera y almacena un token de recuperación de contraseña.
   * @param {string} email - Email del usuario.
   * @returns {Promise<string>} - Token generado.
   */
  async setResetToken(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const token = crypto.randomBytes(32).toString('hex');
    const expires = dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss');
    await db.execute(
      'UPDATE users SET reset_token = ?, reset_expires = ? WHERE LOWER(email) = ?',
      [token, expires, normalizedEmail]
    );
    return token;
  },

  /**
   * Cambia la contraseña del usuario si el token es válido.
   * @param {string} token - Token de recuperación.
   * @param {string} newPassword - Nueva contraseña en texto plano.
   * @returns {Promise<boolean>} - true si fue exitosa, false si no.
   */
  async updatePasswordByToken(token, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.execute(
      'UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE reset_token = ?',
      [hashedPassword, token]
    );
    return result.affectedRows > 0;
  }
};

export default User;
