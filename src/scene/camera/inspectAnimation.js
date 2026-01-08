/**
 * inspectAnimation.js
 * ---------------------------------------------------------
 * Módulo encargado de animar la cámara hacia un Funko cuando el
 * usuario entra en modo inspección.
 * 
 * Calcula una posición frontal al Funko y realiza una animación
 * suave tanto de posición como de orientación (target).
 */

/**
 * Reproduce la animación de acercamiento de la cámara al Funko.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.Camera} camera Cámara activa
 * @param {BABYLON.AbstractMesh} funko Funko seleccionado
 * @param {Function} onFinish Función callback al finalizar la animación
 * @param {Object} options Opciones de configuración
 * @param {number} options.distance Distancia frontal al Funko
 * @param {number} options.duration Duración de la animación (en frames)
 */
export function playInspectAnimation(scene, camera, funko, onFinish, {
    distance = 0.4,
    duration = 60,
} = {}) {

    /**
     * Posición absoluta del Funko dentro de la escena.
     */
    const funkoPos = funko.getAbsolutePosition();

    /**
     * Vector frontal del Funko (dirección hacia donde mira).
     */
    const forward = funko.getDirection(BABYLON.Axis.Z).normalize();

    /**
     * Vector lateral del Funko.
     */
    const right = funko.getDirection(BABYLON.Axis.X).normalize();
    const lateralOffset = right.scale(-0.15);

    /**
     * Posición final de la cámara frente al Funko, con ligero desplazamiento lateral.
     */
    const targetCameraPos = funkoPos
        .add(forward.scale(distance))
        .add(lateralOffset);

    /**
     * Guardado de la posición y objetivo iniciales de la cámara.
     * Para cuando salgas restaurarlo
     */
    const startPos = camera.position.clone();
    const startTarget = camera.getTarget().clone();

    /**
     * Animación de la posición de la cámara.
     */
    const positionAnimation = new BABYLON.Animation(
        "inspectCamPos",
        "position",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    positionAnimation.setKeys([
        { frame: 0, value: startPos },
        { frame: duration, value: targetCameraPos }
    ]);

    /**
     * Posición objetivo de la cámara (ligeramente desplazada lateralmente).
     */
    const offsetTarget = funkoPos.add(lateralOffset);

    /**
     * Animación del punto de mira (target) de la cámara.
     */
    const targetAnimation = new BABYLON.Animation(
        "inspectCamTarget",
        "target",
        60,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    targetAnimation.setKeys([
        { frame: 0, value: startTarget },
        { frame: duration, value: offsetTarget }
    ]);

    /**
     * Registro de las animaciones en la cámara.
     */
    camera.animations = [];
    camera.animations.push(positionAnimation);
    camera.animations.push(targetAnimation);

    /**
    * Inicia la reproducción de las animaciones asociadas a la cámara.
    * 
    * Se reproducen simultáneamente la animación de posición y la animación
    * del punto de mira (target), desplazando suavemente la cámara desde su
    * estado actual hasta la posición frontal del Funko.
    * 
    * La animación se ejecuta una sola vez y, al finalizar, se ejecuta una
    * función callback que activa la interfaz de inspección.
    */
    scene.beginAnimation(camera, 0, duration, false, 1, () => {
        if (onFinish) onFinish();
    });
}
