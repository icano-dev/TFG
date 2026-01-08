/**
 * shelfSlots.js
 * ---------------------------------------------------------
 * Módulo encargado de definir las posiciones (“slots”) donde se
 * colocan los Funkos dentro de cada tipo de estantería.
 * 
 * Estos slots actúan como una posicion invisible que permite
 * colocar automáticamente las figuras sin tener que posicionarlas
 * manualmente una a una.
 */

/**
 * Devuelve los slots de una estantería de tipo cubo (grid).
 * 
 * Se utiliza para las colecciones Marvel y DC.
 * 
 * @returns {Array<Object>} Array de posiciones {x, y, z}
 */
export function getGridShelfSlots() {

    /**
     * Array donde se almacenan los slots calculados.
     */
    const slots = [];

    /**
     * Número de columnas y filas de la estantería.
     */
    const columns = 4;
    const rows = 2;

    /**
     * Separación horizontal y vertical entre Funkos.
     */
    const xSpacing = 0.3;
    const ySpacing = 0.32;

    /**
     * Posición X inicial para centrar la posicion en el primer cubo.
     */
    const startX = -((columns - 1) * xSpacing) / 2;

    /**
     * Altura de la primera balda.
     */
    const baseHeight = 0.17;

    /**
     * Generación de la rejilla de slots.
     */
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {

            slots.push({
                x: startX + col * xSpacing,
                y: baseHeight + (rows - 1 - row) * ySpacing,
                z: -0.1
            });
        }
    }

    return slots;
}


/**
 * Devuelve los slots de una estantería flotante.
 * 
 * Se utiliza para las colecciones Harry Potter y Variety.
 * 
 * @returns {Array<Object>} Array de posiciones {x, y, z}
 */
export function getFloatingShelfSlots() {

    /**
     * Array donde se almacenan los slots calculados.
     */
    const slots = [];

    /**
     * Número de columnas y filas.
     */
    const columns = 4;
    const rows = 4;

    /**
     * Separación horizontal y vertical entre Funkos.
     */
    const xSpacing = 0.85;
    const ySpacing = 0.65;

    /**
     * Posición X inicial para centrar la posicion.
     */
    const startX = -((columns - 1) * xSpacing) / 2;

    /**
     * Altura de la balda superior.
     */
    const baseHeight = 0.85;

    /**
     * Generación de slots flotantes de arriba hacia abajo.
     */
    for (let row = 0; row < rows; row++) {

        const y = baseHeight - row * ySpacing;

        for (let col = 0; col < columns; col++) {

            slots.push({
                x: startX + (columns - 1 - col) * xSpacing - 0.4,
                y,
                z: 0.15
            });
        }
    }

    return slots;
}
