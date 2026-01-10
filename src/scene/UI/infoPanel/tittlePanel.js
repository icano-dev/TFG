/**
 * tittlePanel.js
 * ---------------------------------------------------------
 * Módulo encargado de construir el titulo del panel
 * 
 * Muestra:
 *  - Nombre del Funko
 *  - Colección a la que pertenece
 *  - Número de figura dentro de la colección
 */

import { getUITexture } from "./infoFunkoPanel.js";

/**
 * Crea el bloque de título del panel de información.
 * 
 * @param {Object} data Datos del Funko obtenidos de la base de datos
 * @returns {BABYLON.GUI.StackPanel} Contenedor GUI con el título y subtítulo
 */
export function createTittle(data) {

    function isMobileUI() {
        const ui = getUITexture();
        return ui && ui.getSize().width < 700;
    }

    const isMobile = isMobileUI();

    /**
     * Contenedor vertical del bloque de título.
     */
    const container = new BABYLON.GUI.StackPanel();
    container.height = isMobile ? "55px" : "70px";
    container.paddingBottom = "10px";
    container.isVertical = true;

    /**
     * Texto principal: nombre del Funko.
     */
    const title = new BABYLON.GUI.TextBlock();
    title.text = data.name;
    title.fontSize = isMobile ? "20px" : "35px";
    title.height = "40px";
    title.color = "#ffd54f";
    title.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    /**
     * Texto secundario: colección y número de referencia.
     */
    const subtitle = new BABYLON.GUI.TextBlock();
    subtitle.text = `${data.collection} · #${data.number}`;
    subtitle.fontSize = isMobile ? "12px" : "14px";
    subtitle.height = "20px";
    subtitle.color = "#bbb";
    subtitle.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    container.addControl(title);
    container.addControl(subtitle);

    return container;
}
