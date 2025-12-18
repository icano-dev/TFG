import { createWall } from "./wall.js";
import { createFloor } from "./floor.js";
import { createCeiling } from "./ceiling.js";
import { createWallMaterial } from "./materials.js";
import { placeShelves } from "./shelves/shelfPlacement.js";
import { placeLogo } from "./logos/logoPlacement.js";
import { loadFunkoModel } from "../model/funkoModel.js";
import { placeFunkosOnGridShelf } from "../model/funkoPlacement.js";


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
    const shelves = await placeShelves(scene, room);

    //----------------------------
    // LOGOS
    // ---------------------------
    placeLogo(scene, room);

    const capitanAmericaBase = await loadFunkoModel(scene, {
        name: "captanAmericaBase",
        folder: "marvel",
        file: "capitanAmericaReducido.glb",
        scale: 0.13,
        rotationY: 180
    });

    const hulkBase = await loadFunkoModel(scene, {
        name: "hulkBase",
        folder: "marvel",
        file: "hulkReducido.glb",
        scale: 0.13,
        rotationY: 180
    });
    
    const ironmanBase = await loadFunkoModel(scene, {
        name: "ironmanBase",
        folder: "marvel",
        file: "IronmanReducido.glb",
        scale: 0.13,
        rotationY: 180
    });

    const thorBase = await loadFunkoModel(scene, {
        name: "thorBase",
        folder: "marvel",
        file: "thorReducido.glb",
        scale: 0.13,
        rotationY: 180
    });

    const spidermanBase = await loadFunkoModel(scene, {
        name: "spidermanBase",
        folder: "marvel",
        file: "spidermanReducido.glb",
        scale: 0.13,
        rotationY: 180
    });

    placeFunkosOnGridShelf({
        shelf: shelves.marvelShelfTop,
        funkoBase: capitanAmericaBase,
        slotIndex: 0
    });

    placeFunkosOnGridShelf({
        shelf: shelves.marvelShelfTop,
        funkoBase: hulkBase,
        slotIndex: 1
    });

    placeFunkosOnGridShelf({
        shelf: shelves.marvelShelfTop,
        funkoBase: ironmanBase,
        slotIndex: 2
    });

    placeFunkosOnGridShelf({
        shelf: shelves.marvelShelfTop,
        funkoBase: thorBase,
        slotIndex: 3
    });

    placeFunkosOnGridShelf({
        shelf: shelves.marvelShelfTop,
        funkoBase: spidermanBase,
        slotIndex: 4
    });


    return room;
}
