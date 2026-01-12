/**
 * descriptionPanel.js
 * ---------------------------------------------------------
 * Módulo encargado de crear la sección de descripción
 * de un Funko dentro del panel de información.
 * 
 * Esta sección permite mostrar textos largos dentro de un
 * contenedor con scroll vertical.
 */

import { getUITexture } from "./infoFunkoPanel.js";

/**
 * Crea la sección de descripción del Funko.
 * 
 * @param {string} text Texto descriptivo del Funko
 * @returns {BABYLON.GUI.Rectangle} Contenedor GUI con scroll y texto
 */
export function createDescriptionSection(text) {

    function isMobileUI() {
        const ui = getUITexture();
        return ui && ui.getSize().width < 700;
    }

    const isMobile = isMobileUI();


    /**
     * Marco exterior de la sección de descripción.
     */
    const frame = new BABYLON.GUI.Rectangle();
    frame.height = isMobile ? "130px" : "80%";
    frame.width = "90%";
    frame.thickness = 1;
    frame.color = "#333";
    frame.cornerRadius = 10;
    frame.paddingTop = "8px";
    frame.paddingBottom = "8px";
    frame.paddingLeft = "8px";
    frame.paddingRight = "8px";
    

    /**
     * Contenedor con barra de desplazamiento vertical.
     */
    const scroll = new BABYLON.GUI.ScrollViewer();
    scroll.width = "94%";
    scroll.left = "-3%";
    scroll.height = "100%";
    scroll.thickness = 0;
    scroll.barColor = "#ffd54f";
    scroll.background = "transparent";

    // magia anti-clipping
    scroll.paddingRight = "12px";
    scroll._verticalBar.left = "-6px";
    scroll._verticalBar.width = "10px";


    /**
     * Bloque de texto que contiene la descripción.
     */
    const textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = text;
    textBlock.color = "#ddd";
    textBlock.textWrapping = true;
    textBlock.fontSize = isMobile ? "8px" : "16px";
    textBlock.resizeToFit = true;

    scroll.addControl(textBlock);
    frame.addControl(scroll);

    return frame;
}
