/**
 * UIHelpers.js
 * ---------------------------------------------------------
 * Módulo de funciones auxiliares para la interfaz gráfica (GUI).
 * 
 */

/**
 * Crea una fila de información con formato "Clave : Valor".
 * 
 * @param {string} label Texto de la clave
 * @param {string} value Valor asociado a la clave
 * @returns {BABYLON.GUI.Grid} Fila de información formateada
 */
export function createLabelRow(label, value) {

    /**
     * Contenedor en forma de grid con dos columnas.
     */
    const row = new BABYLON.GUI.Grid();
    row.height = "36px";
    row.paddingTop = "8px";
    row.paddingBottom = "8px";
    row.width = "100%";

    /**
     * Definición de columnas:
     *  - 40% clave
     *  - 60% valor
     */
    row.addColumnDefinition(0.4);
    row.addColumnDefinition(0.6);

    /**
     * Bloque de texto de la clave.
     */
    const key = new BABYLON.GUI.TextBlock();
    key.text = label + ":";
    key.color = "#ffd54f";
    key.paddingRight = "20px";
    key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    /**
     * Bloque de texto del valor.
     * Si no hay valor, se muestra "-" por defecto.
     */
    const val = new BABYLON.GUI.TextBlock();
    val.text = value ?? "-";
    val.color = "#ffffff";
    val.paddingLeft = "10px";
    val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    /**
     * Inserción de los textos en el grid.
     */
    row.addControl(key, 0, 0);
    row.addControl(val, 0, 1);

    return row;
}
