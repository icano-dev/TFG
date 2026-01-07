import { createDoorMaterial } from "./materials.js";

export function createDoor(scene, {
    name = "door",
    width = 1.4,
    height = 2.2
}) {

    const door = BABYLON.MeshBuilder.CreatePlane(name, {
        width,
        height
    }, scene);

    const mat = createDoorMaterial(scene);
    door.material = mat;

    return door;
}
