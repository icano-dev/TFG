// src/room/logos/logoPlacement.js

import { createLogo } from "./logoModel.js";

export function placeLogo(scene, room) {

    // MARVEL
    const marvelLogo = createLogo(scene, {
        name: "marvelLogo",
        imagePath: "./assets/images/logos/Marvel_logo.svg",
        width: 1.2,
        height: 0.45
    });

    marvelLogo.parent = room;
    marvelLogo.position = new BABYLON.Vector3(1, 2, -4.95);
    marvelLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);


    // DC
    const dcLogo = createLogo(scene, {
        name: "dcLogo",
        imagePath: "./assets/images/logos/DC_logo.svg",
        width: 0.65,
        height: 0.65
    });

    dcLogo.parent = room;
    dcLogo.position = new BABYLON.Vector3(-1, 2.05, -4.95);
    dcLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);


    // HARRY POTTER
    const hpLogo = createLogo(scene, {
        name: "hpLogo",
        imagePath: "./assets/images/logos/Harry_Potter_logo.svg",
        width: 1.3,
        height: 0.5
    });

    hpLogo.parent = room;
    hpLogo.position = new BABYLON.Vector3(-2.95, 2, -2.6);
    hpLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0);

    // MIX
    const mixLogo = createLogo(scene, {
        name: "mixLogo",
        imagePath: "./assets/images/logos/mix.svg",
        width: 1.3,
        height: 0.5
    });

    mixLogo.parent = room;
    mixLogo.position = new BABYLON.Vector3(2.95, 2, -3);
    mixLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-270), 0);



}
