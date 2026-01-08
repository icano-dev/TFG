/**
 * shelfPlacement.js
 * ---------------------------------------------------------
 * Módulo encargado de cargar y colocar todas las estanterías
 * dentro de la habitación.
 * 
 * Utiliza clonación de modelos 3D para optimizar rendimiento:
 * se cargan una vez y se reutilizan múltiples copias.
 */

import { loadShelfModel } from "./shelfModel.js";

/**
 * Carga, clona y posiciona todas las estanterías.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.TransformNode} room Nodo padre de la habitación
 * @returns {Promise<Object>} Objeto con referencias a todas las estanterías creadas
 */
export async function placeShelves(scene, room) {

    /**
     * Carga de los modelos base de estanterías.
     * Estos modelos se usan únicamente como plantilla para clonar.
     */
    const smallShelf = await loadShelfModel(scene, "shelf1.glb");
    smallShelf.setEnabled(false); // Plantilla invisible

    const bigShelf = await loadShelfModel(scene, "shelf2.glb");
    bigShelf.setEnabled(false);

    // ---------------------------------------------------------
    // ESTANTERÍAS MARVEL
    // ---------------------------------------------------------

    /**
     * Estantería Marvel inferior.
     */
    const marvelShelfBottom = smallShelf.clone("marvelShelfBottom");
    marvelShelfBottom.parent = room;
    marvelShelfBottom.position = new BABYLON.Vector3(1, 0.2, -4.8);
    marvelShelfBottom.setEnabled(true);

    /**
     * Estantería Marvel superior.
     */
    const marvelShelfTop = smallShelf.clone("marvelShelfTop");
    marvelShelfTop.parent = room;
    marvelShelfTop.position = new BABYLON.Vector3(1, 0.9, -4.8);
    marvelShelfTop.setEnabled(true);

    // ---------------------------------------------------------
    // ESTANTERÍAS DC
    // ---------------------------------------------------------

    /**
     * Estantería DC inferior.
     */
    const dcShelfBottom = smallShelf.clone("dcShelfBottom");
    dcShelfBottom.parent = room;
    dcShelfBottom.position = new BABYLON.Vector3(-1, 0.2, -4.8);
    dcShelfBottom.setEnabled(true);

    /**
     * Estantería DC superior.
     */
    const dcShelfTop = smallShelf.clone("dcShelfTop");
    dcShelfTop.parent = room;
    dcShelfTop.position = new BABYLON.Vector3(-1, 0.9, -4.8);
    dcShelfTop.setEnabled(true);

    // ---------------------------------------------------------
    // ESTANTERÍA HARRY POTTER
    // ---------------------------------------------------------

    /**
     * Estantería principal de la colección Harry Potter.
     * Se rota y escala para adaptarla al lateral de la sala.
     */
    const hpShelf = bigShelf.clone("hpShelf");
    hpShelf.parent = room;
    hpShelf.position = new BABYLON.Vector3(-2.83, 0.9, -2.8);
    hpShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(90), 0);
    hpShelf.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    hpShelf.setEnabled(true);

    // ---------------------------------------------------------
    // ESTANTERÍA MIX
    // ---------------------------------------------------------

    /**
     * Estantería de la colección variety.
     */
    const varietyShelf = bigShelf.clone("varietyShelf");
    varietyShelf.parent = room;
    varietyShelf.position = new BABYLON.Vector3(2.83, 0.9, -2.8);
    varietyShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(270), 0);
    varietyShelf.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    varietyShelf.setEnabled(true);

    return {
        marvelShelfBottom,
        marvelShelfTop,
        dcShelfBottom,
        dcShelfTop,
        hpShelf,
        varietyShelf
    };
}
