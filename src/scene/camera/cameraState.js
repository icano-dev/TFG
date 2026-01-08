/**
 * cameraState.js
 * ---------------------------------------------------------
 * Módulo encargado de almacenar y restaurar el estado de la cámara.
 * 
 * Permite guardar la posición y orientación de la cámara antes de
 * realizar animaciones (como el modo inspección) y restaurarla
 * posteriormente para volver al punto exacto donde estaba el usuario.
 */

/**
 * Variable privada donde se almacena el estado guardado de la cámara.
 */
let savedCameraState = null;

/**
 * Guarda el estado actual de la cámara.
 * 
 * @param {BABYLON.Camera} camera Cámara activa de la escena
 */
export function saveCameraState(camera) {

    /**
     * Se almacenan tanto la posición como el objetivo (target) de la cámara.
     */
    savedCameraState = {
        position: camera.position.clone(),
        target: camera.getTarget().clone()
    };
}

/**
 * Restaura el estado previamente guardado de la cámara.
 * 
 * @param {BABYLON.Camera} camera Cámara activa de la escena
 */
export function restoreCameraState(camera) {

    /**
     * Control de seguridad si no hay ningún estado guardado.
     */
    if (!savedCameraState) return;

    camera.position.copyFrom(savedCameraState.position);
    camera.setTarget(savedCameraState.target);
}
