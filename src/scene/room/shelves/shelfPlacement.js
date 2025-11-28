// src/room/shelves/shelfPlacement.js

import { loadShelfModel } from "./shelfModel.js";

export async function placeShelves(scene, room) {

    // Cargamos una estantería base
    const smallShelf = await loadShelfModel(scene,"estanteria2.glb");
    const bigShelf = await loadShelfModel(scene , "floating_shelf.glb");

    // La hacemos hija de la habitación
    smallShelf.parent = room;
    bigShelf.parent = room;

    // Estanteria 1 ( base )
    smallShelf.position = new BABYLON.Vector3(1, 0.2, -4.8); // Posicion
    smallShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(360), 0); // Rotacion

    // Estanteria 2 ( clonada para mejorar el rendimiento )
    const shelf2 = smallShelf.clone("shelf2");
    shelf2.position = new BABYLON.Vector3(-1, 0.2, -4.8);

    // Estanteria 3
    const shelf3 = smallShelf.clone("shelf3");
    shelf3.position = new BABYLON.Vector3(1, 0.9, -4.8);
    shelf3.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(360), 0);

    // Estanteria 4
    const shelf4 = smallShelf.clone("shelf4");
    shelf4.position = new BABYLON.Vector3(-1, 0.9, -4.8);
    shelf4.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(360), 0);

    // Estanteria 5
    // const shelf5 = bigShelf.clone("shelf5");
    bigShelf.position = new BABYLON.Vector3(2.83, 0.9, -2.8);
    bigShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0);
    bigShelf.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // Estanteria 6
    const shelf6 = bigShelf.clone("shelf6");
    shelf6.position = new BABYLON.Vector3(-2.83, 0.9, -2.8);
    shelf6.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0);
    shelf6.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    return { smallShelf, shelf2, shelf3, shelf4, bigShelf };
}
