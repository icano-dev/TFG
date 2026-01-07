import { switchToUniversalCamera } from "./switchCamera.js";
import { enableUserControls } from "./controls.js";

export function playIntroAnimation(scene, camera, canvas) {

    console.log("Animación de entrada interior");

    // Empieza JUSTO dentro de la puerta
    camera.position = new BABYLON.Vector3(0, 1.6, 4);
    camera.setTarget(new BABYLON.Vector3(0, 1.6, 0));

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

    scene.beginAnimation(camera, 0, 120, false, 1.0, () => {

        // Corrige posición física real
        const finalPos = camera.position.clone();
        finalPos.y = 1.6; // altura de ojos

        const newCam = switchToUniversalCamera(
            scene,
            canvas,
            finalPos,
            new BABYLON.Vector3(0, 1.6, 0)
        );

        enableUserControls(newCam);
    });
}

