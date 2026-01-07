import { createWall } from "./wall.js";
import { createFloor } from "./floor.js";
import { createCeiling } from "./ceiling.js";
import { createDoor } from "./door.js";
import { createWallMaterial } from "./materials.js";
import { placeShelves } from "./shelves/shelfPlacement.js";
import { placeLogo } from "./logos/logoPlacement.js";
import { setupCollection } from "../model/funkoDataManager.js";
import { marvelCollection } from "../model/data/marvel.js";
import { dcCollection } from "../model/data/dc.js";
import { hpCollection } from "../model/data/harryPotter.js";
import { mixCollection } from "../model/data/mix.js";


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
        thickness: 0.1,
        position: new BABYLON.Vector3(-3, 1.5, 0),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0),
        material: wallMat
    });
    leftWall.parent = room;

    const rightWall = createWall(scene, {
        width: 10,
        height: 3,
        thickness: 0.1,
        position: new BABYLON.Vector3(3, 1.5, 0),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0),
        material: wallMat
    });
    rightWall.parent = room;

    const backWall = createWall(scene, {
        width: 6,
        height: 3,
        thickness: 0.1,
        position: new BABYLON.Vector3(0, 1.5, -5),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0),
        material: wallMat
    });
    backWall.parent = room;

    const frontWall = createWall(scene, {
        width: 6,
        height: 3,
        thickness: 0.1,
        position: new BABYLON.Vector3(0, 1.5, 5),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0),
        material: wallMat
    });
    frontWall.parent = room;

    // ---------------------------
    // PUERTA 
    // ---------------------------

    const fakeDoor = createDoor(scene, {
        name: "door",
        width: 1.2,
        height: 2
    });

    fakeDoor.parent = room;
    fakeDoor.position = new BABYLON.Vector3(0, 1, 4.94);
    fakeDoor.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);


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
    const shelves = await placeShelves(scene, room);

    //----------------------------
    // LOGOS
    // ---------------------------
    placeLogo(scene, room);

    //----------------------------
    // LLamadas a las colecciones de funkos ( pasando nombre, carpeta, estanteria y tipo de estanteria )
    //----------------------------

    const marvelFunkos = await setupCollection(scene, {
        collection: marvelCollection,
        folder: "marvel",
        shelfMap: {
            top: shelves.marvelShelfTop,
            bottom: shelves.marvelShelfBottom
        },
        placementType: "grid"
    });

    const dcFunkos = await setupCollection(scene, {
        collection: dcCollection,
        folder: "dc",
        shelfMap: {
            top: shelves.dcShelfTop,
            bottom: shelves.dcShelfBottom
        },
        placementType: "grid"
    });

    const hpFunkos = await setupCollection(scene, {
        collection: hpCollection,
        folder: "Harry Potter",
        shelfMap: {
            main: shelves.hpShelf
        },
        placementType: "floating"
    });

    const mixFunkos = await setupCollection(scene, {
        collection: mixCollection,
        folder: "mix",
        shelfMap: {
            main: shelves.mixShelf
        },
        placementType: "floating"
    });

    const allFunkos = [
        ...marvelFunkos,
        ...dcFunkos,
        ...hpFunkos,
        ...mixFunkos
    ];



    return {
        room,
        allFunkos
    };
}
