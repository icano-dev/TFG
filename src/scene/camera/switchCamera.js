/**
 * switchCamera.js
 * ---------------------------------------------------------
 * Módulo encargado de sustituir la cámara temporal de la intro
 * por la cámara definitiva del jugador.
 * 
 * La nueva cámara es una UniversalCamera con:
 *  - Gravedad
 *  - Colisiones
 *  - Tamaño físico de jugador (elipsoide)
 *  - Controles de movimiento activados
 */

/**
 * Sustituye la cámara activa por una cámara para moverse.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {HTMLCanvasElement} canvas Canvas de renderizado
 * @param {BABYLON.Vector3} position Posición inicial del jugador
 * @param {BABYLON.Vector3} target Punto hacia el que mirará la cámara
 * 
 * @returns {BABYLON.UniversalCamera} Cámara definitiva del jugador
 */
export function switchToUniversalCamera(scene, canvas, position, target) {

    /**
     * Creación de la cámara del jugador.
     */
    const newCam = new BABYLON.UniversalCamera(
        "playerCamera",
        position.clone(),
        scene
    );

    /**
     * Activación de gravedad y colisiones físicas.
     */
    newCam.applyGravity = true;
    newCam.checkCollisions = true;

    /**
     * Definición del tamaño físico del jugador.
     * Se utiliza un elipsoide de colisión que simula el cuerpo.
     */
    newCam.ellipsoid = new BABYLON.Vector3(0.5, 0.8, 0.5);
    newCam.ellipsoidOffset = new BABYLON.Vector3(0, 0.8, 0);

    /**
     * Distancia mínima de visión.
     * Permite acercarse mucho a los Funkos en modo inspección.
     */
    newCam.minZ = 0.01;

    /**
     * Orientación inicial de la cámara.
     */
    newCam.setTarget(target.clone());

    /**
     * Activación de controles de ratón y teclado.
     */
    newCam.attachControl(canvas, true);

    console.log("Cambiado a UniversalCamera");

    /**
     * Eliminación de la cámara anterior (intro).
     */
    scene.activeCamera.dispose();

    /**
     * Activación de la nueva cámara como cámara principal.
     */
    scene.activeCamera = newCam;

    /**
     * Desactivación de los primeros ajustes automáticos de colisión
     * y gravedad para evitar desplazamientos inesperados al crearla.
     */
    newCam._needMoveForGravity = false;
    newCam._needMoveForCollisions = false;

    return newCam;
}
