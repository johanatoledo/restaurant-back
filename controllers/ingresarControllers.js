/**
 * ingresarControllers.js
 * Lógica de autenticación: registro, recuperación de contraseña y reseteo de password.
 * Utiliza el servicio de usuarios (userService) para manipular la base de datos de usuarios.
 * 
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import userService from '../models/User.js';
const API_BASE = 'restaurant-back.railway.internal' || 'http://localhost:3000';
const API=`${API_BASE}/api`;

/**
 * Registro de un nuevo usuario.
 * Valida los campos, asegura unicidad de correo, y almacena el nuevo usuario.
 */
export async function registerUser(req, res) {
  try {
    const { nombre, email, password } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !password || password.length < 4) {
      return res.status(400).json({
        message: "Datos inválidos. Todos los campos son obligatorios y la contraseña debe tener al menos 4 caracteres."
      });
    }

    // Validación de dominio de correo
    const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Solo se permiten correos de gmail, hotmail u outlook"
      });
    }

    // Verificar si el correo ya existe
    const exists = await userService.findByEmail(email);
    if (exists) {
      return res.status(409).json({ message: "Este correo ya está registrado." });
    }

    // Crear usuario
    const newUser = await userService.create({ nombre, email, password });
    res.status(201).json({ message: "Registro exitoso", user: newUser });

  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error del servidor al registrar usuario" });
  }
}

/**
 * Proceso de recuperación de contraseña.
 * Verifica el correo y genera un token único para resetear la contraseña.
 * (Debe integrarse con un sistema de emails en producción real)
 */
export async function recuperarUser(req, res) {
  try {
    const { email } = req.body;

    // Buscar usuario por email
    const user = await userService.findByEmail(email.trim().toLowerCase());
    if (!user || user.email !== email) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    // Generar token de recuperación
    const token = await userService.setResetToken(email);
    const resetLink = `${API}/ingresar/reset-password?token=${token}`;

    // Enviar email real aquí (TODO: integrar con nodemailer o similar)
    console.log("Enlace de recuperación:", resetLink);

    // Por motivos de desarrollo, devolvemos el token en la respuesta
    res.status(200).json({
      message: "Correo de recuperación enviado",
      token: token // Importante: ¡No devolver en producción!
    });

  } catch (error) {
    console.error("Error en recuperarUser:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

/**
 * Cambia la contraseña de un usuario utilizando el token de recuperación.
 * Elimina o invalida el token después del uso.
 */
export async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;
    if (!token || !password || password.length < 4) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    // Actualiza la contraseña si el token es válido
    const success = await userService.updatePasswordByToken(token, password);
    if (success) {
      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } else {
      res.status(400).json({ message: "Token inválido o expirado" });
    }
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}
