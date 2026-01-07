// Crea una pared genérica: width = ancho, height = alto, position = posición, rotation = rotación
export function createWall(scene, {
    width = 5,
    height = 3,
    thickness = 0.1,
    position = new BABYLON.Vector3(0, 0, 0),
    rotation = new BABYLON.Vector3(0, 0, 0),
    material = null

} = {}) {

    const wall = BABYLON.MeshBuilder.CreateBox("wall", {
        width,
        height,
        depth: thickness,
    }, scene);

    wall.position = position;
    wall.rotation = rotation;

    wall.checkCollisions = true;

    if (material) {
        wall.material = material;
    }

    return wall;
}
