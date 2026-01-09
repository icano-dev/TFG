/**
 * room.js
 * ---------------------------------------------------------
 * Módulo encargado de construir la habitación 3D principal.
 * 
 * En este archivo se crean:
 *  - Las paredes, suelo y techo
 *  - La puerta decorativa de entrada
 *  - Las estanterías
 *  - Los logos decorativos
 *  - La carga y distribución de los Funkos por colecciones
 * 
 * Todo el contenido de la sala es hijo del nodo padre `room`.
 */

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
import { varietyCollection } from "../model/data/variety.js";

/**
 * Construye la habitación completa y carga todos los Funkos.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @returns {Promise<Object>} Objeto con el nodo de la sala y todos los Funkos cargados
 */
export async function createRoom(scene) {

    console.log("Habitación iniciada");

    /**
     * Nodo raíz de la habitación. ( padre )
     */
    const room = new BABYLON.TransformNode("room", scene);

    /**
     * Material común para todas las paredes.
     */
    const wallMat = createWallMaterial(scene);

    // ---------------------------
    // PAREDES
    // ---------------------------

    /**
     * Pared izquierda de la sala.
     */
    const leftWall = createWall(scene, {
        width: 10, // Ancho
        height: 3, // Alto
        thickness: 0.1, // Grosor
        position: new BABYLON.Vector3(-3, 1.5, 0), // Posicion
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0), // Rotacion
        material: wallMat // Asignamos el material creado anteriormente
    });
    leftWall.parent = room; // Hijo de room

    /**
     * Pared derecha de la sala.
     */
    const rightWall = createWall(scene, {
        width: 10,
        height: 3,
        thickness: 0.1,
        position: new BABYLON.Vector3(3, 1.5, 0),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0),
        material: wallMat
    });
    rightWall.parent = room;

    /**
     * Pared trasera de la sala.
     */
    const backWall = createWall(scene, {
        width: 6,
        height: 3,
        thickness: 0.1,
        position: new BABYLON.Vector3(0, 1.5, -5),
        rotation: new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0),
        material: wallMat
    });
    backWall.parent = room;

    /**
     * Pared frontal de la sala.
     */
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

    /**
     * Puerta decorativa de entrada.
     */
    const door = createDoor(scene, {
        name: "door",
        width: 1.2,
        height: 2
    });

    door.parent = room;
    door.position = new BABYLON.Vector3(0, 1, 4.94);
    door.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);

    // ---------------------------
    // SUELO
    // ---------------------------

    /**
     * Suelo de la sala.
     */
    const floor = createFloor(scene, 6, 10);
    floor.parent = room;

    // ---------------------------
    // TECHO
    // ---------------------------

    /**
     * Techo de la sala.
     */
    const ceiling = createCeiling(scene, 6, 10, 3);
    ceiling.parent = room;

    //----------------------------
    // ESTANTERÍAS
    //----------------------------

    /**
     * Colocación y carga de todas las estanterías.
     */
    const shelves = await placeShelves(scene, room);

    //----------------------------
    // LOGOS
    //----------------------------

    /**
     * Colocación de los logos decorativos en la sala.
     */
    placeLogo(scene, room);

    //----------------------------
    // CARGA DE COLECCIONES FUNKO
    //----------------------------

    /**
     * Colección Marvel.
     */
    const marvelFunkos = await setupCollection(scene, {
        collection: marvelCollection,
        folder: "marvel",
        shelfMap: {
            top: shelves.marvelShelfTop,
            bottom: shelves.marvelShelfBottom
        },
        placementType: "grid"
    });

    /**
     * Colección DC.
     */
    const dcFunkos = await setupCollection(scene, {
        collection: dcCollection,
        folder: "dc",
        shelfMap: {
            top: shelves.dcShelfTop,
            bottom: shelves.dcShelfBottom
        },
        placementType: "grid"
    });

    /**
     * Colección Harry Potter.
     */
    const hpFunkos = await setupCollection(scene, {
        collection: hpCollection,
        folder: "Harry-Potter",
        shelfMap: {
            main: shelves.hpShelf
        },
        placementType: "floating"
    });

    /**
     * Colección Variety.
     */
    const varietyFunkos = await setupCollection(scene, {
        collection: varietyCollection,
        folder: "variety",
        shelfMap: {
            main: shelves.varietyShelf
        },
        placementType: "floating"
    });

    /**
     * Unificación de todas las colecciones en un único array.
     */
    const allFunkos = [
        ...marvelFunkos,
        ...dcFunkos,
        ...hpFunkos,
        ...varietyFunkos
    ];

    return {
        room,
        allFunkos
    };
}
