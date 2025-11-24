import { createWall } from "./wall.js";
import { createFloor } from "./floor.js";
import { createCeiling } from "./ceiling.js";
import { createWallMaterial } from "./materials.js";

export function createRoom(scene) {

    console.log("Habitación iniciada");

    const room = new BABYLON.TransformNode("room", scene);

    const width = 10;
    const depth = 10;
    const height = 3;

    const wallMat = createWallMaterial(scene);

    // ---------------------------
    // PAREDES
    // ---------------------------

    const leftWall = createWall(scene, {
        width: depth,
        height: height,
        position: new BABYLON.Vector3(-width / 2, height / 2, 0),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0),
        material: wallMat
    });
    leftWall.parent = room;

    const rightWall = createWall(scene, {
        width: depth,
        height: height,
        position: new BABYLON.Vector3(width / 2, height / 2, 0),
        rotation: new BABYLON.Vector3(0, -Math.PI / 2, 0),
        material: wallMat
    });
    rightWall.parent = room;

    const backWall = createWall(scene, {
        width: width,
        height: height,
        position: new BABYLON.Vector3(0, height / 2, -depth / 2),
        rotation: new BABYLON.Vector3(0, Math.PI, 0),
        material: wallMat
    });
    backWall.parent = room;

    // ---------------------------
    // SUELO
    // ---------------------------

    const floor = createFloor(scene, width, depth);
    floor.parent = room;

    // ---------------------------
    // TECHO
    // ---------------------------

    const ceiling = createCeiling(scene, width, depth, height);
    ceiling.parent = room;

    return room;
}
