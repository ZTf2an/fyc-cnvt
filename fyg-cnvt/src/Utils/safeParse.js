/**
 * Intenta parsear un string JSON de forma segura para evitar crashes en la aplicación.
 * 
 * @param {string} jsonString - El string en formato JSON que se desea convertir.
 * @param {*} [fallback=null] - Valor de respaldo a retornar si el string es undefined o malformado.
 * @returns {*} El objeto JavaScript parseado, o el valor de fallback en caso de error.
 */

export function safeParse(jsonString, fallback = null , log = false) {
  // 1. Previene el crash si llega undefined, null o un string vacío
  if (!jsonString) return fallback;
  if (Array.isArray(jsonString)) return jsonString;

  try {
    // 2. Intenta parsear el string
    return JSON.parse(jsonString);
  } catch (error) {
    // log && console.log("Se retrna el valor de: ", jsonString)
    // 3. Si el JSON está malformado, atrapa el error silenciosamente
    return fallback;
  }
}