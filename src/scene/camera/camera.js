/**
 * camera.js
 * ---------------------------------------------------------
 * Módulo encargado de crear la cámara inicial de la aplicación.
 * 
 * Esta cámara se utiliza exclusivamente para la animación de
 * entrada a la sala (intro). No permite interacción del usuario.
 */

/**
 * Crea la cámara inicial de introducción.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @returns {BABYLON.FreeCamera} Cámara utilizada durante la intro
 */
export function setupCamera(scene) {

    /**
     * Creación de una FreeCamera posicionada fuera de la habitación.
     * Desde esta posición se realiza la animación de entrada.
     */
    const camera = new BABYLON.FreeCamera(
        "introCamera",
        new BABYLON.Vector3(0, 1.6, 12), // posición inicial lejana
        scene
    );

    /**
     * La cámara apunta al centro de la habitación.
     */
    camera.setTarget(new BABYLON.Vector3(0, 1.6, 0));

    /**
     * Neutralización de los controles de usuario.
     * Esta cámara no permite interacción manual.
     */
    camera.attachControl = () => { };

    console.log("FreeCamera de intro creada");

    return camera;
}
