export function setupCamera(scene) {

    const camera = new BABYLON.FreeCamera(
        "introCamera",
        new BABYLON.Vector3(0, 1.6, 12), // lejos
        scene
    );

    camera.setTarget(new BABYLON.Vector3(0, 1.6, 0));

    // No activar controles
    camera.attachControl = () => {}; // neutralizar por si acaso

    console.log("FreeCamera de intro creada");

    return camera;
}
