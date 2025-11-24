// Crea una pared genérica: width = ancho, height = alto, position = posición, rotation = rotación
export function createWall(scene, {
    width = 5,
    height = 3,
    position = new BABYLON.Vector3(0, 0, 0),
    rotation = new BABYLON.Vector3(0, 0, 0),
    material = null
    
} = {}) {

    const wall = BABYLON.MeshBuilder.CreatePlane("wall", {
        width,
        height,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    wall.position = position;
    wall.rotation = rotation;

    if (material) {
        wall.material = material;
    }

    return wall;
}
