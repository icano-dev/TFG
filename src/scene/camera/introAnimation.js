/**
 * introAnimation.js
 * ---------------------------------------------------------
 * Módulo encargado de reproducir la animación de entrada inicial
 * a la habitación.
 * 
 * Simula el movimiento del usuario entrando por la puerta y
 * colocándolo en la posición inicial desde la que puede empezar
 * a moverse libremente por la galería.
 */

import { switchToUniversalCamera } from "./switchCamera.js";
import { enableUserControls } from "./controls.js";

/**
 * Reproduce la animación de entrada al interior de la sala.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.Camera} camera Cámara temporal usada durante la intro
 * @param {HTMLCanvasElement} canvas Canvas de renderizado
 */
export function playIntroAnimation(scene, camera, canvas, onFinish) {

    console.log("Animación de entrada interior");

    /**
     * Posicionamiento inicial de la cámara justo dentro de la puerta.
     * Esta será la posición de partida de la animación.
     */
    camera.position = new BABYLON.Vector3(0, 1.6, 4);
    camera.setTarget(new BABYLON.Vector3(0, 1.6, 0));

    /**
     * Definición de la animación que desplaza la cámara hacia el interior.
     * Se anima únicamente el eje Z para simular el avance recto.
     */
    const anim = new BABYLON.Animation(
        "enterInterior",
        "position.z",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    /**
     * Claves de animación: desde la puerta hasta el interior de la sala.
     */
    anim.setKeys([
        { frame: 0, value: 4 },
        { frame: 120, value: 2 }
    ]);

    /**
     * Registro de la animación en la cámara.
     */
    camera.animations = [];
    camera.animations.push(anim);

    /**
     * Inicio de la animación de entrada.
     * 
     * Al finalizar:
     *  - Se obtiene la posición final real de la cámara
     *  - Se crea la cámara definitiva con colisiones
     *  - Se activan los controles de usuario
     */
    scene.beginAnimation(camera, 0, 120, false, 1.0, () => {

        // Corrección de la posición física final
        const finalPos = camera.position.clone();
        finalPos.y = 1.6; // altura de los ojos del usuario

        /**
         * Sustitución de la cámara temporal por la cámara definitiva.
         */
        const newCam = switchToUniversalCamera(
            scene,
            canvas,
            finalPos,
            new BABYLON.Vector3(0, 1.6, 0)
        );

        /**
         * Activación de los controles de navegación del usuario.
         */
        enableUserControls(newCam);

        if (onFinish) onFinish();
    });
}
