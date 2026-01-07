export function switchToUniversalCamera(scene, canvas, position, target) {

    const newCam = new BABYLON.UniversalCamera(
        "playerCamera",
        position.clone(),
        scene
    );

    newCam.applyGravity = true;
    newCam.checkCollisions = true;

    // Tamaño del jugador
    newCam.ellipsoid = new BABYLON.Vector3(0.5, 0.8, 0.5);
    newCam.ellipsoidOffset = new BABYLON.Vector3(0, 0.8, 0);

    newCam.minZ = 0.01; // Valor para la inspeccion cercana del funko

    newCam.setTarget(target.clone());
    newCam.attachControl(canvas, true);

    console.log("Cambiado a UniversalCamera");

    // Desactivar la cámara vieja
    scene.activeCamera.dispose();

    // Activar la nueva
    scene.activeCamera = newCam;

    newCam._needMoveForGravity = false;
    newCam._needMoveForCollisions = false;

    return newCam;
}
