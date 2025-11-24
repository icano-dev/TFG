export function createWallMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("wallMat", scene);
    mat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.9); // gris claro
    return mat;
}

export function createFloorMaterial(scene) {
    const mat = new BABYLON.StandardMaterial("floorMat", scene);
    mat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    return mat;
}
