import { switchToUniversalCamera } from "./switchCamera.js";
import { enableUserControls } from "./controls.js";

export function playIntroAnimation(scene, camera, canvas) {

    console.log("Animación de zoom-in iniciada");

    const anim = new BABYLON.Animation(
        "zoomIn",
        "position.z",
        60,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    anim.setKeys([
        { frame: 0, value: camera.position.z },
        { frame: 120, value: 2 } // acercarse hasta z = 2
    ]);

    camera.animations.push(anim);

    scene.beginAnimation(camera, 0, 120, false, 1.0, () => {
        console.log("Animación terminada, cambiando cámara...");

        const newCam = switchToUniversalCamera(
            scene,
            canvas,
            camera.position,
            new BABYLON.Vector3(0, 1.6, 0)
        );

        enableUserControls(newCam);
    });

}
