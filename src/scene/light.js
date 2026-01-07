export function setupLights(scene) {

    // Luz ambiental
    const ambient = new BABYLON.HemisphericLight(
        "ambLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambient.intensity = 0.55;

    // Bombilla interior
    const lamp = new BABYLON.PointLight(
        "lampLight",
        new BABYLON.Vector3(0, 2.7, 0),
        scene
    );
    lamp.intensity = 0.45;
    lamp.radius = 6;
    lamp.specular = new BABYLON.Color3(0.2, 0.2, 0.2); // evita manchones blancos

    return { ambient, lamp };
}
