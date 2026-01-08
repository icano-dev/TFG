/**
 * funkoPlacement.js
 * ---------------------------------------------------------
 * Módulo encargado de posicionar clones de Funkos sobre estanterías.
 * 
 * Se encarga de:
 *  - Obtener los “slots” disponibles de cada tipo de estantería
 *  - Clonar el modelo base del Funko
 *  - Colocar cada Funko en su posición exacta
 */

import { getGridShelfSlots, getFloatingShelfSlots } from "../room/shelves/shelfSlots.js";

/**
 * Coloca un Funko en una estantería de tipo cubos (grid).
 * 
 * @param {Object} options
 * @param {BABYLON.AbstractMesh} options.shelf Estantería destino
 * @param {BABYLON.AbstractMesh} options.funkoBase Modelo base del Funko
 * @param {number} options.slotIndex Índice del slot donde se colocará el Funko
 * 
 * @returns {BABYLON.AbstractMesh|null} Funko colocado o null si no existe el slot
 */
export function placeFunkosOnGridShelf({
    shelf,
    funkoBase,
    slotIndex
}) {

    /**
     * Obtención de todos los slots disponibles de la estantería.
     */
    const slots = getGridShelfSlots();
    const slot = slots[slotIndex];

    /**
     * Control de error si el slot no existe.
     */
    if (!slot) {
        console.warn("Slot inexistente:", slotIndex);
        return null;
    }

    /**
     * Clonación del modelo base del Funko.
     */
    const funko = funkoBase.clone(`funko_${funkoBase.name}_${slotIndex}`);

    /**
     * Activación del Funko clonado.
     */
    funko.setEnabled(true);

    /**
     * Se establece la estantería como nodo padre. 
     * Si se mueve la estanteria, se mueve el funko tambien
     */
    funko.parent = shelf;

    /**
     * Posicionamiento exacto del Funko dentro de la estantería.
     */
    funko.position = new BABYLON.Vector3(
        slot.x,
        slot.y,
        slot.z
    );

    return funko;
}


/**
 * Coloca un Funko en una estantería de tipo flotante.
 * 
 * @param {Object} options
 * @param {BABYLON.AbstractMesh} options.shelf Estantería destino
 * @param {BABYLON.AbstractMesh} options.funkoBase Modelo base del Funko
 * @param {number} options.slotIndex Índice del slot flotante
 * 
 * @returns {BABYLON.AbstractMesh|null} Funko colocado o null si no existe el slot
 */
export function placeFunkosOnFloatingShelf({
    shelf,
    funkoBase,
    slotIndex
}) {

    /**
     * Obtención de slots flotantes disponibles.
     */
    const slots = getFloatingShelfSlots();
    const slot = slots[slotIndex];

    /**
     * Control de error si el slot no existe.
     */
    if (!slot) {
        console.warn("Slot flotante inexistente:", slotIndex);
        return null;
    }

    /**
     * Clonación del modelo base del Funko.
     */
    const funko = funkoBase.clone(`funko_${funkoBase.name}_${slotIndex}`);

    /**
     * Activación del Funko clonado.
     */
    funko.setEnabled(true);

    /**
     * Se establece la estantería como nodo padre.
     */
    funko.parent = shelf;

    /**
     * Posicionamiento exacto del Funko en el espacio flotante.
     */
    funko.position = new BABYLON.Vector3(
        slot.x,
        slot.y,
        slot.z
    );

    return funko;
}
