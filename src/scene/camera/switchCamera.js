/**
 * switchCamera.js
 * ---------------------------------------------------------
 * Gestiona la sustitución de la cámara temporal de la intro
 * por la cámara definitiva del jugador.
 * 
 * La cámara creada incluye físicas, colisiones y controles de usuario.
 */

/**
 * Configuración física del jugador.
 */
export const PLAYER_PHYSICS = {
    ellipsoid: new BABYLON.Vector3(0.5, 0.8, 0.5),
    offset: new BABYLON.Vector3(0, 0.8, 0)
};

/**
 * Sustituye la cámara activa por una UniversalCamera con físicas.
 *
 * @param {BABYLON.Scene} scene Escena principal.
 * @param {HTMLCanvasElement} canvas Canvas de renderizado.
 * @param {BABYLON.Vector3} position Posición inicial del jugador.
 * @param {BABYLON.Vector3} target Vector de orientación inicial.
 * @returns {BABYLON.UniversalCamera} Cámara definitiva del jugador.
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
     * Activación de físicas y colisiones.
     */
    newCam.applyGravity = true;
    newCam.checkCollisions = true;
    newCam.ellipsoid = PLAYER_PHYSICS.ellipsoid.clone();
    newCam.ellipsoidOffset = PLAYER_PHYSICS.offset.clone();

    /**
     * Permite acercarse mucho a los Funkos en modo inspección.
     */
    newCam.minZ = 0.01;

    /**
     * Orientación inicial. ( Mira hacia adelante )
     */
    newCam.setTarget(target.clone());

    /**
     * Sustitución de la cámara activa.
     */
    const oldCam = scene.activeCamera;
    scene.activeCamera = newCam;
    oldCam.dispose();

    /**
     * Evita micro-ajustes automáticos de Babylon que pueden romper el picking.
     */
    newCam._needMoveForGravity = false;
    newCam._needMoveForCollisions = false;

    /**
     * Registro de controles de usuario.
     */
    newCam.detachControl();
    newCam.attachControl(canvas, true);

    console.log("Cámara de jugador activada");

    return newCam;
}
