// Configuración de luces para la escena
export function setupLights(scene) {
    // Luz ambiental suave
    const ambient = new BABYLON.HemisphericLight(
        "luzAmbiental",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambient.intensity = 0.7;

    return { ambient };
}
