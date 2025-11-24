import { createWallMaterial } from "./materials.js";

export function createCeiling(scene, width, depth, height) {
    const ceiling = BABYLON.MeshBuilder.CreatePlane("ceiling", {
        width,
        height: depth,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    // Lo subimos a la altura del techo
    ceiling.position = new BABYLON.Vector3(0, height, 0);

    // Rotar para poner horizontal y cara hacia abajo
    ceiling.rotation.x = Math.PI / 2;   // tumbar plane
    ceiling.rotation.z = Math.PI;       // cara hacia abajo

    const mat = createWallMaterial(scene);
    ceiling.material = mat;

    return ceiling;
}
