export function setupLights(scene) {

    // Luz ambiental
    const ambient = new BABYLON.HemisphericLight(
        "ambLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambient.intensity = 0.7;

    // Bombilla interior
    const lamp = new BABYLON.PointLight(
        "lampLight",
        new BABYLON.Vector3(0, 2.5, 0),
        scene
    );
    lamp.intensity = 0.4;

    return { ambient, lamp };
}
