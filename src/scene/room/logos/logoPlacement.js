/**
 * logoPlacement.js
 * ---------------------------------------------------------
 * Módulo encargado de colocar los logos decorativos de cada colección
 * dentro de la habitación.
 * 
 */

import { createLogo } from "./logoModel.js";

/**
 * Coloca todos los logos decorativos en la habitación.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.TransformNode} room Nodo padre de la habitación
 */
export function placeLogo(scene, room) {

    /**
     * Logo de la colección Marvel.
     */
    const marvelLogo = createLogo(scene, {
        name: "marvelLogo",
        imagePath: "./assets/images/logos/marvel-logo.svg",
        width: 1.2,
        height: 0.45
    });

    marvelLogo.parent = room;
    marvelLogo.position = new BABYLON.Vector3(1, 2, -4.94);
    marvelLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);


    /**
     * Logo de la colección DC.
     */
    const dcLogo = createLogo(scene, {
        name: "dcLogo",
        imagePath: "./assets/images/logos/dc-logo.svg",
        width: 0.65,
        height: 0.65
    });

    dcLogo.parent = room;
    dcLogo.position = new BABYLON.Vector3(-1, 2.05, -4.94);
    dcLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(180), 0);


    /**
     * Logo de la colección Harry Potter.
     */
    const hpLogo = createLogo(scene, {
        name: "hpLogo",
        imagePath: "./assets/images/logos/harry-potter-logo.svg",
        width: 1.3,
        height: 0.5
    });

    hpLogo.parent = room;
    hpLogo.position = new BABYLON.Vector3(-2.94, 2, -2.6);
    hpLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0);


    /**
     * Logo de la colección Variety.
     */
    const varietyLogo = createLogo(scene, {
        name: "varietyLogo",
        imagePath: "./assets/images/logos/variety-logo.svg",
        width: 1.5,
        height: 0.8
    });

    varietyLogo.parent = room;
    varietyLogo.position = new BABYLON.Vector3(2.94, 2, -3);
    varietyLogo.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-270), 0);
}
