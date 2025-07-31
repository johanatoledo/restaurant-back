// utils/manifestAssets.js
// Utilidad para extraer los archivos principales de JS y CSS del manifest generado por Vite
// Esto permite inyectar los assets correctos con hash en las vistas EJS del backend.

/**
 * Obtiene las rutas de los archivos JS y CSS principales ("main") desde el manifest de Vite.
 * 
 * @param {Object} manifest - Objeto manifest generado por Vite tras el build.
 * @returns {Object} - Contiene mainJs y stylesCss con las rutas relativas a /dist.
 */

export function getMainAssets(manifest) {
  // Busca la clave del primer chunk principal de JS (que contenga 'main' y termine en .js)
  const jsKey = Object.keys(manifest).find(key => key.endsWith('.js') && key.includes('main'));
  
  // Busca la clave del primer chunk principal de CSS (que contenga 'main' y termine en .css)
  const cssKey = Object.keys(manifest).find(key => key.endsWith('.css') && key.includes('main'));

  return {
    mainJs: jsKey ? manifest[jsKey].file : '',     // Ruta del bundle JS principal
    stylesCss: cssKey ? manifest[cssKey].file : '' // Ruta del CSS principal
  };
}

