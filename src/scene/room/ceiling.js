import { createCeilingMaterial } from "./materials.js";

export function createCeiling(scene, width, depth, height) {
    const ceiling = BABYLON.MeshBuilder.CreateGround("ceiling", {
        width,
        height: depth,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    // Lo subimos a la altura del techo
    ceiling.position = new BABYLON.Vector3(0, height, 0);

    const mat = createCeilingMaterial(scene);
    ceiling.material = mat;

    return ceiling;
}
