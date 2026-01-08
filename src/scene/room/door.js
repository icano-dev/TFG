/**
 * door.js
 * ---------------------------------------------------------
 * Módulo encargado de crear la puerta de la habitación.
 * 
 */

import { createDoorMaterial } from "./materials.js";

/**
 * Crea una puerta decorativa plana.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {Object} options Objeto de configuración de la puerta
 * @param {string} options.name Nombre de la malla
 * @param {number} options.width Ancho de la puerta
 * @param {number} options.height Altura de la puerta
 * 
 * @returns {BABYLON.Mesh} Malla que representa la puerta decorativa
 */
export function createDoor(scene, {
    name = "door",
    width = 1.4,
    height = 2.2
}) {

    /**
     * Creación de la puerta como un plano 2D dentro de la escena 3D.
     */
    const door = BABYLON.MeshBuilder.CreatePlane(name, {
        width,
        height
    }, scene);

    /**
     * Asignación del material con textura PNG transparente.
     */
    const mat = createDoorMaterial(scene);
    door.material = mat;

    return door;
}
