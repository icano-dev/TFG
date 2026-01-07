// src/room/shelves/shelfPlacement.js

import { loadShelfModel } from "./shelfModel.js";

export async function placeShelves(scene, room) {

    // Cargamos estantería base para despues clonarlas
    const smallShelf = await loadShelfModel(scene, "shelf1.glb");
    smallShelf.setEnabled(false); // Hacemos que no se vean
    const bigShelf = await loadShelfModel(scene, "shelf2.glb");
    bigShelf.setEnabled(false);


    // Estanteria MARVEL baja - ( clonada para mejorar el rendimiento )
    const marvelShelfBottom = smallShelf.clone("marvelShelfBottom");
    marvelShelfBottom.parent = room; // La hacemos hija de la habitacion
    marvelShelfBottom.position = new BABYLON.Vector3(1, 0.2, -4.8); // Posicion
    marvelShelfBottom.setEnabled(true); // Esta si la hacemos visible

    // Estanteria MARVEL alta
    const marvelShelfTop = smallShelf.clone("marvelShelfTop");
    marvelShelfTop.parent = room;
    marvelShelfTop.position = new BABYLON.Vector3(1, 0.9, -4.8);
    marvelShelfTop.setEnabled(true);

    // Estanteria DC baja
    const dcShelfBottom = smallShelf.clone("dcShelfBottom");
    dcShelfBottom.parent = room;
    dcShelfBottom.position = new BABYLON.Vector3(-1, 0.2, -4.8);
    dcShelfBottom.setEnabled(true);

    // Estanteria DC alta
    const dcShelfTop = smallShelf.clone("dcShelfTop");
    dcShelfTop.parent = room;
    dcShelfTop.position = new BABYLON.Vector3(-1, 0.9, -4.8);
    dcShelfTop.setEnabled(true);

    // Estanteria Harry Potter
    const hpShelf = bigShelf.clone("hpShelf");
    hpShelf.parent = room;
    hpShelf.position = new BABYLON.Vector3(-2.83, 0.9, -2.8);
    hpShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0);
    hpShelf.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    hpShelf.setEnabled(true);

    // Estanteria Mix
    const mixShelf = bigShelf.clone("mixShelf")
    mixShelf.parent = room;
    mixShelf.position = new BABYLON.Vector3(2.83, 0.9, -2.8);
    mixShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0);
    mixShelf.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    mixShelf.setEnabled(true);



    return { marvelShelfBottom, marvelShelfTop, dcShelfBottom, dcShelfTop, hpShelf, mixShelf };
}
