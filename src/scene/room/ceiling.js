/**
 * ceiling.js
 * ---------------------------------------------------------
 * Módulo encargado de crear el techo de la habitación.
 * 
 */

import { createCeilingMaterial } from "./materials.js";

/**
 * Crea el techo de la habitación.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {number} width Ancho total del techo
 * @param {number} depth Profundidad total del techo
 * @param {number} height Altura a la que se coloca el techo
 * @returns {BABYLON.Mesh} Malla que representa el techo
 */
export function createCeiling(scene, width, depth, height) {

    /**
     * Creación del techo como una superficie horizontal.
     * Se utiliza doble orientación para que sea visible desde abajo.
     */
    const ceiling = BABYLON.MeshBuilder.CreateGround("ceiling", {
        width,
        height: depth,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    /**
     * Posicionamiento vertical del techo.
     * Se eleva hasta la altura definida por el parámetro 'height'.
     */
    ceiling.position = new BABYLON.Vector3(0, height, 0);

    /**
     * Activación de colisiones para impedir que el jugador atraviese el techo.
     */
    ceiling.checkCollisions = true;

    /**
     * Creación y asignación del material del techo.
     */
    const mat = createCeilingMaterial(scene);
    ceiling.material = mat;

    return ceiling;
}
