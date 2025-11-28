import { createWall } from "./wall.js";
import { createFloor } from "./floor.js";
import { createCeiling } from "./ceiling.js";
import { createWallMaterial } from "./materials.js";
import { placeShelves } from "./shelves/shelfPlacement.js";
import { placeLogo } from "./logos/logoPlacement.js";


export async function createRoom(scene) {

    console.log("Habitación iniciada");

    const room = new BABYLON.TransformNode("room", scene);


    const wallMat = createWallMaterial(scene);

    // ---------------------------
    // PAREDES
    // ---------------------------

    const leftWall = createWall(scene, {
        width: 10,
        height: 3,
        position: new BABYLON.Vector3(-3, 1.5, 0),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0),
        material: wallMat
    });
    leftWall.parent = room;

    const rightWall = createWall(scene, {
        width: 10,
        height: 3,
        position: new BABYLON.Vector3(3, 1.5, 0),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0),
        material: wallMat
    });
    rightWall.parent = room;

    const backWall = createWall(scene, {
        width: 6,
        height: 3,
        position: new BABYLON.Vector3(0, 1.5, -5),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0),
        material: wallMat
    });
    backWall.parent = room;

    // ---------------------------
    // SUELO
    // ---------------------------

    const floor = createFloor(scene, 6, 10);
    floor.parent = room;

    // ---------------------------
    // TECHO
    // ---------------------------

    const ceiling = createCeiling(scene, 6, 10, 3);
    ceiling.parent = room;

    //----------------------------
    // ESTANTERIAS
    // ---------------------------
    await placeShelves(scene, room);
    await placeLogo(scene, room)


    return room;
}
