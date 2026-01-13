/**
 * introAnimation.js
 * ---------------------------------------------------------
 * Gestiona la animación inicial de entrada del usuario a la galería.
 * 
 * Simula el desplazamiento desde la puerta hasta la posición inicial
 * del jugador y sustituye la cámara temporal por la cámara definitiva.
 */

import { switchToUniversalCamera } from "./switchCamera.js";
import { enableUserControls } from "./controls.js";
import { PLAYER_PHYSICS } from "./switchCamera.js";

/**
 * Ejecuta la animación de entrada al interior de la sala.
 *
 * @param {BABYLON.Scene} scene Escena Babylon principal.
 * @param {BABYLON.Camera} camera Cámara temporal de la intro.
 * @param {HTMLCanvasElement} canvas Canvas de renderizado.
 * @param {Function} onFinish Callback ejecutado cuando la animación finaliza.
 */
export function playIntroAnimation(scene, camera, canvas, onFinish) {

    console.log("Animación de entrada interior");

    /**
     * Altura real de los ojos del jugador.
     */
    const eyeHeight = PLAYER_PHYSICS.offset.y;

    /**
     * Posición inicial de la cámara justo en la entrada.
     */
    camera.position = new BABYLON.Vector3(0, eyeHeight, 4);
    camera.setTarget(new BABYLON.Vector3(0, eyeHeight, 0));

    /**
     * Animación de avance recto hacia el interior (eje Z).
     */
    const anim = new BABYLON.Animation(
        "enterInterior",
        "position.z",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    anim.setKeys([
        { frame: 0, value: 4 },
        { frame: 120, value: 2 }
    ]);

    camera.animations = [];
    camera.animations.push(anim);

    /**
     * Inicio de la animación.
     * Al finalizar:
     *  - Se ajusta la altura real según el suelo
     *  - Se crea la cámara definitiva
     *  - Se activan los controles del jugador
     */
    scene.beginAnimation(camera, 0, 120, false, 1.0, () => {

        /**
         * Raycast hacia abajo para localizar el suelo.
         */
        const ray = new BABYLON.Ray(camera.position, BABYLON.Vector3.Down(), 5);
        const hit = scene.pickWithRay(ray, m => m.checkCollisions);

        const groundY = hit?.pickedPoint?.y ?? 0;

        /**
         * Posición final real del jugador sobre el suelo.
         */
        const finalPos = new BABYLON.Vector3(
            camera.position.x,
            groundY + PLAYER_PHYSICS.offset.y,
            camera.position.z
        );

        /**
         * Mirar hacia adelante de orientación inicial.
         */
        const forwardTarget = finalPos.add(new BABYLON.Vector3(0, 0, -1));

        /**
         * Sustitución por la cámara definitiva del jugador.
         */
        const newCam = switchToUniversalCamera(
            scene,
            canvas,
            finalPos,
            forwardTarget
        );

        /**
         * Activación de controles de movimiento.
         */
        enableUserControls(newCam);

        /**
         * Callback para activar interacciones (selección de Funkos).
         */
        if (onFinish) onFinish();
    });
}
