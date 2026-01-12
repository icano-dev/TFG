/**
 * dataPanel.js
 * ---------------------------------------------------------
 * Módulo encargado de crear la sección de datos del Funko dentro del panel de información.
 * 
 * Muestra los campos:
 *  - Colección
 *  - Número
 *  - Año
 *  - Rareza
 *  - Variantes
 */

import { getUITexture } from "./infoFunkoPanel.js";
import { createLabelRow } from "../UIHelpers.js";

/**
 * Crea la sección de datos del panel de información.
 * 
 * @param {Object} data Datos del Funko obtenidos de la base de datos
 * @returns {BABYLON.GUI.StackPanel} Contenedor GUI con los campos de información
 */
export function createDataSection(data) {
    /**
     * Contenedor vertical de la sección de datos.
     */
    const container = new BABYLON.GUI.Grid();
    container.width = "100%";
    container.height = "100%";
    container.paddingTop = "5%"

    container.addRowDefinition(0.20);
    container.addRowDefinition(0.20);
    container.addRowDefinition(0.20);
    container.addRowDefinition(0.20);
    container.addRowDefinition(0.20);


    /**
     * Campos de datos que se mostrarán en el panel.
     */
    const fields = [
        ["Colección", data.collection],
        ["Número", data.number],
        ["Año", data.year],
        ["Rareza", data.rarity],
        ["Variantes", data.Variants],
    ];

    /**
     * Creación de cada fila de datos.
     */
    fields.forEach(([label, value], i) => {
        container.addControl(createLabelRow(label, value), i, 0);
    });

    return container;
}
