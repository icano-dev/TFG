/**
 * floor.js
 * ---------------------------------------------------------
 * Módulo encargado de crear el suelo de la habitación.
 * 
 */

import { createFloorMaterial } from "./materials.js";

/**
 * Crea el suelo de la habitación.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {number} width Ancho total del suelo
 * @param {number} depth Profundidad total del suelo
 * @returns {BABYLON.Mesh} Malla que representa el suelo
 */
export function createFloor(scene, width, depth) {

    /**
     * Creación del suelo como superficie horizontal.
     */
    const floor = BABYLON.MeshBuilder.CreateGround("floor", {
        width,
        height: depth
    }, scene);

    /**
     * Creación y asignación del material del suelo.
     */
    const mat = createFloorMaterial(scene);
    floor.material = mat;

    /**
     * Activación de colisiones para impedir que el jugador caiga
     * fuera de la habitación.
     */
    floor.checkCollisions = true;

    return floor;
}
