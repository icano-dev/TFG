/**
 * infoFunkoPanel.js
 * ---------------------------------------------------------
 * Módulo encargado de crear y mostrar el panel lateral de información
 * de cada Funko cuando el usuario entra en modo inspección.
 * 
 */

import { getFunkoById } from "../../data/funkoDataBase.js";
import { createTittle } from "./tittlePanel.js";
import { createDataSection } from "./dataPanel.js";
import { createGallerySection } from "./galleryPanel.js";
import { createDescriptionSection } from "./descriptionPanel.js";

/**
 * Textura GUI donde se renderiza el panel.
 */
let uiTexture = null;

/**
 * Panel principal de información.
 */
let panel = null;

/**
 * Indica si el panel está visible actualmente.
 */
let visible = false;

/**
 * Inicializa la interfaz gráfica del panel.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 */
function initUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("infoPanelUI", true, scene);
}

/**
 * Muestra el panel de información del Funko seleccionado.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.AbstractMesh} funko Funko seleccionado
 */
export function showInfoPanel(scene, funko) {

    /**
     * Inicialización de la interfaz si aún no existe.
     */
    if (!uiTexture) initUI(scene);

    /**
     * Creación del panel si aún no existe.
     */
    if (!panel) createPanel();

    /**
     * Obtención de los datos del Funko desde la base de datos.
     */
    const data = getFunkoById(funko.metadata.id);
    if (!data) return;

    /**
     * Limpia el contenido previo del panel.
     */
    panel._content.clearControls();

    /**
     * Construcción de las secciones del panel.
     */
    panel._content.addControl(createTittle(data)); // Titulo
    panel._content.addControl(createDataSection(data)); // Datos
    panel._content.addControl(createDescriptionSection(data.description)); // Descripcion
    panel._content.addControl(createGallerySection(data)); // Galeria de imagenes

    /**
     * Muestra el panel si aún no estaba visible.
     */
    if (!visible) {
        uiTexture.addControl(panel);
        visible = true;
    }
}

/**
 * Funcion que oculta el panel de información.
 */
export function hideInfoPanel() {
    if (panel && visible) {
        uiTexture.removeControl(panel);
        visible = false;
    }
}

/**
 * Crea el panel base de la interfaz.
 */
function createPanel() {

    /**
     * Contenedor principal del panel.
     */
    panel = new BABYLON.GUI.Rectangle("infoPanel");
    panel.width = "380px";
    panel.height = "520px";
    panel.cornerRadius = 20;
    panel.thickness = 2;
    panel.color = "#ffd54f";
    panel.background = "#1b1b1b";
    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    panel.left = "-150px";

    /**
     * Contenedor vertical para las secciones internas.
     */
    const stack = new BABYLON.GUI.StackPanel();
    stack.paddingTop = "20px";
    stack.paddingLeft = "20px";
    stack.paddingRight = "20px";
    stack.isVertical = true;
    stack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    panel._content = stack;
    panel.addControl(stack);
}
