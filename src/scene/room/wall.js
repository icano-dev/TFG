/**
 * wall.js
 * ---------------------------------------------------------
 * Módulo encargado de crear paredes físicas para la habitación.
 * 
/**
 * Crea una pared genérica.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon donde se crea la pared
 * @param {Object} options Objeto de configuración de la pared
 * @param {number} options.width Ancho de la pared
 * @param {number} options.height Altura de la pared
 * @param {number} options.thickness Grosor físico de la pared (profundidad)
 * @param {BABYLON.Vector3} options.position Posición 3D de la pared
 * @param {BABYLON.Vector3} options.rotation Rotación de la pared
 * @param {BABYLON.Material|null} options.material Material asignado a la pared
 * 
 * @returns {BABYLON.Mesh} Malla 3D que representa la pared
 */
export function createWall(scene, {
    width = 5,
    height = 3,
    thickness = 0.1,
    position = new BABYLON.Vector3(0, 0, 0),
    rotation = new BABYLON.Vector3(0, 0, 0),
    material = null

} = {}) {

    /**
     * Creación de la malla de la pared como una caja fina.
     */
    const wall = BABYLON.MeshBuilder.CreateBox("wall", {
        width,
        height,
        depth: thickness,
    }, scene);

    /**
     * Posicionamiento espacial de la pared.
     */
    wall.position = position;
    wall.rotation = rotation;

    /**
     * Activación de colisiones para impedir que el usuario atraviese la pared.
     */
    wall.checkCollisions = true;

    /**
     * Asignación opcional del material de la pared.
     */
    if (material) {
        wall.material = material;
    }

    return wall;
}
