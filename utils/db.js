// utils/db.js
// Configuración y exportación del pool de conexiones MySQL usando variables de entorno (.env).
// Incluye utilidad para loguear queries en desarrollo.

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Determina el entorno y carga el archivo .env correspondiente
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

dotenv.config({ path: envFile });

// Pool de conexiones MySQL, configurable vía variables de entorno
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Adjunta logs de queries SOLO en entorno de desarrollo
function attachDbLogger(conn) {
  if (process.env.NODE_ENV !== 'production') {
    ['query', 'execute'].forEach(cmd => {
      const original = conn[cmd];
      conn[cmd] = async function(sql, values) {
        console.log('➡️ SQL:', sql);
        console.log('📥 Params:', values);
        const result = await original.call(this, sql, values);
        console.log('✅ Resultados:', result[0]);
        console.log('--------------------------------------');
        return result;
      };
    });
  }
}

export default db;
export { attachDbLogger };
