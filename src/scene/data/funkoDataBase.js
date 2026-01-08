/**
 * funkoDataBase.js
 * ---------------------------------------------------------
 * Módulo encargado de cargar y proporcionar acceso a la base de datos
 * local de Funkos del proyecto.
 * 
 * La información se obtiene desde un archivo JSON externo y se mantiene
 * en memoria para permitir búsquedas rápidas por identificador.
 */

/**
 * Array interno donde se almacenan los Funkos cargados desde el JSON.
 */
let funkos = [];

/**
 * Carga la base de datos de Funkos desde el archivo JSON.
 * 
 * Debe ejecutarse antes de utilizar cualquier función de consulta.
 */
export async function loadFunkoDatabase() {

    /**
     * Petición al archivo JSON local que contiene la información de Funkos.
     */
    const res = await fetch(
        "./src/scene/data/funkos.json"
    );

    /**
     * Conversión del contenido del JSON a objetos JavaScript.
     */
    funkos = await res.json();
}

/**
 * Devuelve los datos de un Funko por su identificador único.
 * 
 * @param {string|number} id Identificador del Funko
 * @returns {Object|undefined} Objeto con la información del Funko o undefined si no existe
 */
export function getFunkoById(id) {
    return funkos.find(f => f.id === id);
}
