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

    function isMobileUI() {
        const ui = getUITexture();
        return ui && ui.getSize().width < 700;
    }

    const isMobile = isMobileUI();


    /**
     * Contenedor vertical de la sección de datos.
     */
    const container = new BABYLON.GUI.StackPanel();
    container.paddingTop = isMobile ? "14px" : "30px";
    container.paddingBottom = isMobile ? "14px" : "30px";
    container.width = "100%";
    container.isVertical = true;

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
    fields.forEach(([label, value]) => {
        container.addControl(createLabelRow(label, value));
    });

    return container;
}
