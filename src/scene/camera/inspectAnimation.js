import { AppState } from "../state/appState.js";

export function playInspectAnimation(scene, camera, funko, onFinish, {
    distance = 0.4,
    duration = 60,
} = {}) {

    // Posición absoluta del Funko
    const funkoPos = funko.getAbsolutePosition();

    // Enfrente del Funko (hacia donde mira)
    const forward = funko.getDirection(BABYLON.Axis.Z).normalize();

    const right = funko.getDirection(BABYLON.Axis.X).normalize();
    const lateralOffset = right.scale(-0.15); //



    // Posición final de la cámara (frontal al Funko)
    const targetCameraPos = funkoPos
        .add(forward.scale(distance))
        .add(lateralOffset);



    // Guardamos valores iniciales
    const startPos = camera.position.clone();
    const startTarget = camera.getTarget().clone();

    // Animación de posición
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

    const offsetTarget = funkoPos.add(lateralOffset);


    // Animación de target
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

    camera.animations = [];
    camera.animations.push(positionAnimation);
    camera.animations.push(targetAnimation);

    scene.beginAnimation(camera, 0, duration, false, 1, () => {
            if (onFinish) onFinish();
    });

}
