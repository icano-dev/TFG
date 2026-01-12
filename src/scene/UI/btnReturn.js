/**
 * btnReturn.js
 * ---------------------------------------------------------
 * Módulo encargado de crear y controlar el botón “Volver”.
 * 
 * Este botón permite salir del modo inspección y regresar
 * a la navegación libre por la galería.
 * 
 * Incluye también soporte para la tecla ESC como método alternativo.
 */

import { exitInspect } from "../state/appController.js";
import { closeGallery } from "./infoPanel/galleryPanel.js";

/**
 * Textura de interfaz gráfica (GUI) de Babylon.
 */
let uiTexture = null;

/**
 * Referencia al botón “Volver”.
 */
let button = null;

/**
 * Indica si el botón está actualmente visible.
 */
let visible = false;

/**
 * Controla si el listener de la tecla ESC ya ha sido añadido.
 */
let escListener = false;

/**
 * Inicializa la interfaz gráfica del boton.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 */
function initReturnGUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("returnUI", true, scene);
}

/**
 * Función que ejecuta el retorno a la galería principal.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 */
function goBack(scene) {

    /**
     * Cierra el panel de información de la galería.
     */
    closeGallery();

    /**
     * Sale del modo inspección y restaura la cámara.
     */
    exitInspect(scene);

    /**
     * Oculta el botón de "Volver".
     */
    uiTexture.removeControl(button);
    visible = false;
}

/**
 * Crea el botón “Volver” si aún no existe.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 */
export function createReturnButton(scene) {

    /**
     * Inicialización de la GUI si aún no existe.
     */
    if (!uiTexture) initReturnGUI(scene);

    /**
     * Creación del botón solo una vez.
     */
    if (!button) {

        button = BABYLON.GUI.Button.CreateSimpleButton("returnBtn", "Volver");

        // Estilos visuales del botón
        button.width = "12%";
        button.height = "8%";
        button.color = "white";
        button.background = "black";

        // Posición en la esquina superior izquierda
        button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.paddingLeft = "3%";
        button.paddingTop = "3%";

        /**
         * Evento de clic del botón.
         */
        button.onPointerUpObservable.add(() => {
            goBack(scene);
        });
    }

    /**
     * Listener global de la tecla ESC.
     * Solo se registra una vez.
     */
    if (!escListener) {
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && visible) {
                goBack(scene);
            }
        });
        escListener = true;
    }
}

/**
 * Alterna la visibilidad del botón “Volver”.
 * Cada vez que se llame a la funcion se vera y se dejara de ver.
 */
export function updateReturnButton() {
    if (!button) return;

    if (visible) {
        uiTexture.removeControl(button);
        visible = false;
    } else {
        uiTexture.addControl(button);
        visible = true;
    }
}
