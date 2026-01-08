/**
 * materials.js
 * ---------------------------------------------------------
 * Módulo centralizado de creación de materiales.
 * 
 * Aquí se definen todos los materiales (texturas) usados en la habitación:
 *  - Paredes
 *  - Suelo
 *  - Techo
 *  - Estanterías
 *  - Puerta
 * 
/**
 * Crea el material de las paredes.
 * 
 * @param {BABYLON.Scene} scene Escena principal
 * @returns {BABYLON.StandardMaterial} Material de pared
 */
export function createWallMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("wallMat", scene);

    /**
     * Textura principal de las paredes.
     */
    mat.diffuseTexture = new BABYLON.Texture("./assets/models/habitacion/wall/wall.jpg", scene);

    return mat;
}

/**
 * Crea el material del suelo.
 * 
 * @param {BABYLON.Scene} scene Escena principal
 * @returns {BABYLON.StandardMaterial} Material de suelo
 */
export function createFloorMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("floorMat", scene);

    /**
     * Textura del pavimento de la habitación.
     */
    mat.diffuseTexture = new BABYLON.Texture(
        "./assets/models/habitacion/floor/floor.jpg",
        scene
    );

    return mat;
}

/**
 * Crea el material del techo.
 * 
 * @param {BABYLON.Scene} scene Escena principal
 * @returns {BABYLON.StandardMaterial} Material del techo
 */
export function createCeilingMaterial(scene) {
    console.log("material techo")

    const mat = new BABYLON.StandardMaterial("ceilingMat", scene);

    /**
     * Desactiva el culling de caras traseras para que el techo
     * sea visible desde el interior.
     */
    mat.backFaceCulling = false;

    return mat;
}

/**
 * Crea el material de las estanterías.
 * 
 * @param {BABYLON.Scene} scene Escena principal
 * @returns {BABYLON.StandardMaterial} Material de estantería
 */
export function createShelfMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("shelfWood", scene);

    /**
     * Textura de madera de las estanterías.
     */
    mat.diffuseTexture = new BABYLON.Texture("./assets/models/habitacion/shelf/shelf.jpg", scene);

    return mat;
}

/**
 * Crea el material de la puerta decorativa.
 * 
 * @param {BABYLON.Scene} scene Escena principal
 * @returns {BABYLON.StandardMaterial} Material de puerta
 */
export function createDoorMaterial(scene) {
    const mat = new BABYLON.StandardMaterial(`doorMat`, scene);

    /**
     * Textura PNG con transparencia usada para la puerta.
     */
    mat.diffuseTexture = new BABYLON.Texture("./assets/images/logos/door.png", scene);
    mat.diffuseTexture.hasAlpha = true;

    /**
     * Desactiva el culling para que la puerta sea visible desde ambos lados.
     */
    mat.backFaceCulling = false;

    return mat;
}
