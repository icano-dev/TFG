import { createFloorMaterial } from "./materials.js";

export function createFloor(scene, width, depth) {
    const floor = BABYLON.MeshBuilder.CreateGround("floor", {
        width,
        height: depth
    }, scene);

    const mat = createFloorMaterial(scene);
    floor.material = mat;

    floor.checkCollisions = true;

    return floor;
}
