export function switchToUniversalCamera(scene, canvas, position, target) {
    
    const newCam = new BABYLON.UniversalCamera(
        "playerCamera",
        position.clone(),
        scene
    );

    newCam.minZ = 0.01; // Valor para la inspeccion cercana del funko

    newCam.setTarget(target.clone());
    newCam.attachControl(canvas, true);

    console.log("Cambiado a UniversalCamera");

    // Desactivar la cámara vieja
    scene.activeCamera.dispose();

    // Activar la nueva
    scene.activeCamera = newCam;

    return newCam;
}
