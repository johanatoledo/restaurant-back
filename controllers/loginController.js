/**
 * loginController.js
 * Controlador para la autenticación (inicio de sesión) de usuarios.
 * Autor: Johana Toledo
 * Fecha: 2025-07-27
 */

import userService from '../models/User.js';

/**
 * Inicia sesión de usuario validando credenciales.
 * - Verifica email y password.
 * - Devuelve el usuario si las credenciales son correctas.
 * - (Recomendado para producción: aquí puedes emitir un JWT y setear cookies seguras)
 */
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    // Valida credenciales con el servicio de usuario
    const user = await userService.validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    // En producción: Aquí deberías emitir un token JWT o una cookie de sesión
    res.status(200).json({ message: "Inicio de sesión exitoso", user });

  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error del servidor al iniciar sesión" });
  }
}
