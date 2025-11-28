export function createWallMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("wallMat", scene);
    mat.diffuseTexture = new BABYLON.Texture("./assets/models/habitacion/wall.jpg", scene);
    return mat;
}

export function createFloorMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("floorMat", scene);
    mat.diffuseTexture = new BABYLON.Texture(
        "./assets/models/habitacion/floor/floor.jpg",
        scene
    );
    return mat;
}

export function createCeilingMaterial(scene) {
    console.log("material techo")
    const mat = new BABYLON.StandardMaterial("ceilingMat", scene);
    mat.backFaceCulling = false;
    mat.diffuseColor = new BABYLON.Color3(1, 1, 1); // blanco

    return mat;
}

export function createShelfMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("shelfWood", scene);
    mat.diffuseTexture = new BABYLON.Texture("./assets/models/habitacion/shelf/shelf.jpg", scene);

    return mat;
}
