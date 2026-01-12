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
    const container = new BABYLON.GUI.Grid();
    container.width = "100%"
    container.height = "100%"
    container.paddingTop = "5%"
    container.thickness = 1;              // borde visible
container.color = "red";              // color del borde
container.background = "#ff000033";   // fondo semitransparente

    
    // 70% nombre / 30% subtítulo
    container.addRowDefinition(0.80);
    container.addRowDefinition(0.20);
    container.thik


    /**
     * Texto principal: nombre del Funko.
     */
    const title = new BABYLON.GUI.TextBlock();
    title.text = data.name;
    title.fontSize = isMobile ? "25%" : "60%";
    title.color = "#ffd54f";
    title.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    title.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    /**
     * Texto secundario: colección y número de referencia.
     */
    const subtitle = new BABYLON.GUI.TextBlock();
    subtitle.text = `${data.collection} · #${data.number}`;
    subtitle.fontSize = isMobile ? "20%" : "75%";
    subtitle.color = "#bbb";
    subtitle.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    subtitle.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    container.addControl(title, 0, 0);
    container.addControl(subtitle, 1, 0);

    return container;
}
