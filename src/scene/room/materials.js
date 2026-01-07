export function createWallMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("wallMat", scene);
    mat.diffuseTexture = new BABYLON.Texture("./assets/models/habitacion/wall/wall.jpg", scene);
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

export function createDoorMaterial(scene) {
    const mat = new BABYLON.StandardMaterial(`doorMat`, scene);
    mat.diffuseTexture = new BABYLON.Texture("./assets/images/logos/door.png", scene);
    mat.diffuseTexture.hasAlpha = true;
    mat.backFaceCulling = false;

    return mat;
}
