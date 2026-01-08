/**
 * controls.js
 * ---------------------------------------------------------
 * Módulo encargado de habilitar y deshabilitar los controles
 * de movimiento del usuario.
 * 
 * Permite controlar la navegación libre por la sala utilizando:
 *  - Teclas WASD para desplazamiento
 *  - Movimiento del ratón para rotación de cámara
 */

/**
 * Activa los controles de usuario sobre la cámara.
 * 
 * @param {BABYLON.Camera} camera Cámara activa de la escena
 */
export function enableUserControls(camera) {

    /**
     * Asignación de teclas WASD para el desplazamiento.
     */
    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    /**
     * Velocidad de desplazamiento del usuario.
     */
    camera.speed = 0.15;

    /**
     * Sensibilidad del ratón para la rotación de cámara.
     */
    camera.angularSensibility = 5000;

    console.log("Controles activados");
}

/**
 * Desactiva los controles de usuario.
 * 
 * @param {BABYLON.Camera} camera Cámara activa de la escena
 */
export function disableUserControls(camera) {

    /**
     * Limpia la asignación de teclas WASD.
     */
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];

    /**
     * Se anula el movimiento de la cámara.
     */
    camera.speed = 0;

    console.log("Controles desactivados");
}
