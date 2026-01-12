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
import { PLAYER_PHYSICS } from "./switchCamera.js";

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
    const eyeHeight = PLAYER_PHYSICS.offset.y;   // 0.8

    camera.position = new BABYLON.Vector3(0, eyeHeight, 4);
    camera.setTarget(new BABYLON.Vector3(0, eyeHeight, 0));

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

        // Raycast al suelo
        const ray = new BABYLON.Ray(camera.position, BABYLON.Vector3.Down(), 5);
        const hit = scene.pickWithRay(ray, m => m.checkCollisions);

        const groundY = hit?.pickedPoint?.y ?? 0;

        const finalPos = new BABYLON.Vector3(
            camera.position.x,
            groundY + PLAYER_PHYSICS.offset.y,          // altura real del jugador
            camera.position.z
        );

        const forwardTarget = finalPos.add(new BABYLON.Vector3(0, 0, -1));

        const newCam = switchToUniversalCamera(
            scene,
            canvas,
            finalPos,
            forwardTarget
        );

        enableUserControls(newCam);
    });

}
