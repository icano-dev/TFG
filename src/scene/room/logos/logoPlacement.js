// src/room/shelves/shelfPlacement.js

import { loadLogoModel } from "./logoModel.js";

export async function placeLogo(scene, room) {

    // Cargamos una estantería base
    const marvelLogo = await loadLogoModel(scene,"marvel.glb");
    const dcLogo = await loadLogoModel(scene,"dc.glb");

    // Lo hacemos hijo de la habitacion
    marvelLogo.parent = room;
    dcLogo.parent = room;

    // Logo de marvel
    marvelLogo.position = new BABYLON.Vector3(1, 2, -4.95); // Posicion
    marvelLogo.scaling = new BABYLON.Vector3(-0.01,0.01,0.01)
    marvelLogo.rotation = new BABYLON.Vector3(0, 0, BABYLON.Tools.ToRadians(360)); // Rotacion

    // Logo de dc
    dcLogo.position = new BABYLON.Vector3(-1, 2, -4.95); // Posicion
    dcLogo.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02)
    dcLogo.rotation = new BABYLON.Vector3(0, 0, BABYLON.Tools.ToRadians(180)); // Rotacion

 

    return { marvelLogo };
}
