/**
 * logoModel.js
 * ---------------------------------------------------------
 * Módulo encargado de crear los logos decorativos de las colecciones.
 * 
 */

/**
 * Crea un logo decorativo.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {Object} options Objeto de configuración del logo
 * @param {string} options.name Nombre de la malla del logo
 * @param {string} options.imagePath Ruta de la textura del logo
 * @param {number} options.width Ancho del logo
 * @param {number} options.height Altura del logo
 * 
 * @returns {BABYLON.Mesh} Malla que representa el logo decorativo
 */
export function createLogo(scene, {
    name,
    imagePath,
    width = 1,
    height = 0.4
}) {

    /**
     * Creación del plano que representa el logo.
     */
    const logo = BABYLON.MeshBuilder.CreatePlane(name, {
        width,
        height
    }, scene);

    /**
     * Creación del material del logo.
     */
    const mat = new BABYLON.StandardMaterial(`${name}Mat`, scene);

    /**
     * Textura del logo.
     */
    mat.diffuseTexture = new BABYLON.Texture(imagePath, scene);
    mat.diffuseTexture.hasAlpha = true; // Transparencias para verlo bien

    /**
     * Desactiva el culling de caras traseras para que el logo sea visible
     * desde ambos lados.
     */
    mat.backFaceCulling = false;

    logo.material = mat;

    return logo;
}
