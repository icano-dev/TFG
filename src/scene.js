export function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    // Cámara
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        8,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // Luz
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0),
        scene
    );

    // Objeto de prueba
    BABYLON.MeshBuilder.CreateBox("box", { size: 5 }, scene);

    return scene;
}
