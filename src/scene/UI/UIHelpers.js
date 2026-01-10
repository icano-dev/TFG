/**
 * UIHelpers.js
 * ---------------------------------------------------------
 * Módulo de funciones auxiliares para la interfaz gráfica (GUI).
 * 
 */

import { getUITexture } from "./infoPanel/infoFunkoPanel.js";

/**
 * Crea una fila de información con formato "Clave : Valor".
 * 
 * @param {string} label Texto de la clave
 * @param {string} value Valor asociado a la clave
 * @returns {BABYLON.GUI.Grid} Fila de información formateada
 */
export function createLabelRow(label, value) {

    const ui = getUITexture();
    const texSize = ui?.getSize?.() || { width: 1920 };
    const isMobile = texSize.width < 700;


    /**
     * Contenedor en forma de grid con dos columnas.
     */
    const row = new BABYLON.GUI.Grid();
    row.height = isMobile ? "28px" : "36px";
    row.paddingTop = isMobile ? "4px" : "8px";
    row.paddingBottom = isMobile ? "4px" : "8px";
    row.width = "100%";

    /**
     * Definición de columnas:
     *  - 40% clave
     *  - 60% valor
     */
    row.addColumnDefinition(isMobile ? 0.45 : 0.4);
    row.addColumnDefinition(isMobile ? 0.55 : 0.6);

    /**
     * Bloque de texto de la clave.
     */
    const key = new BABYLON.GUI.TextBlock();
    key.text = label + ":";
    key.color = "#ffd54f";
    key.fontSize = isMobile ? "15px" : "20px";
    key.paddingRight = isMobile ? "10px" : "20px";
    key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    /**
     * Bloque de texto del valor.
     * Si no hay valor, se muestra "-" por defecto.
     */
    const val = new BABYLON.GUI.TextBlock();
    val.text = value ?? "-";
    val.color = "#ffffff";
    val.fontSize = isMobile ? "20px" : "20px";
    val.paddingLeft = isMobile ? "6px" : "10px";
    val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    /**
     * Inserción de los textos en el grid.
     */
    row.addControl(key, 0, 0);
    row.addControl(val, 0, 1);

    return row;
}
