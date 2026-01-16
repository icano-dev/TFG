/**
 * galleryPanel.js
 * ---------------------------------------------------------
 * Módulo encargado de mostrar una galería de imágenes de cada Funko
 * dentro del panel de información.
 * 
 * Permite al usuario:
 *  - Abrir una ventana emergente (popup)
 *  - Navegar entre imágenes con botones
 *  - Cerrar la galería cuando desee
 */
import { getUITexture } from "./infoFunkoPanel.js";
import { setInstructions } from "../instruccions.js";

let popup = null;
let currentImages = [];
let index = 0;

/**
 * Crea la sección "Ver galería" dentro del panel de información.
 * 
 * @param {Object} data Datos del Funko (incluye array de imágenes)
 * @returns {BABYLON.GUI.StackPanel} Contenedor GUI con el botón de galería
 */
export function createGallerySection(data) {

    /**
     * Contenedor vertical del botón de galería.
     */
    const container = new BABYLON.GUI.Rectangle();
    container.width = "100%";
    container.height = "100%";
    container.thickness = 0;
    container.paddingTop = "5%"

    /**
     * Texto clicable que actúa como botón.
     */
    const btn = new BABYLON.GUI.TextBlock();
    btn.text = "Ver galería";
    btn.height = "100%";
    btn.width = "100%"
    btn.color = "#4fc3f7";
    btn.fontSize = "30%";
    btn.isPointerBlocker = true;
    btn.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    btn.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    btn.hoverCursor = "pointer";

    /**
     * Al hacer clic se abre la galería con las imágenes del Funko.
     */
    btn.onPointerUpObservable.add(() => openGallery(data.images));

    container.addControl(btn);

    /**
     * Inicializa el popup si aún no existe.
     */
    if (!popup) createPopup();

    return container;
}

/**
 * Crea el popup flotante de la galería.
 */
function createPopup() {

    /**
     * Contenedor principal del popup.
     */

    popup = new BABYLON.GUI.Rectangle("galleryPopup");
    popup.width = "30%";
    popup.height = "80%";
    popup.background = "rgba(0,0,0,0.9)";
    popup.thickness = 0;
    popup.isVisible = false;
    popup.zIndex = 999;

    /**
     * Imagen central de la galería.
     */
    const img = new BABYLON.GUI.Image("galleryImage", "");
    img.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    img.width = "90%";
    img.height = "90%";
    img.isPointerBlocker = false;

    popup._img = img;

    /**
     * Botón de cierre del popup.
     */
    const closeBtn = BABYLON.GUI.Button.CreateSimpleButton("close", "✖");
    closeBtn.width = "10%";
    closeBtn.height = "8%";
    closeBtn.color = "#ffffff";
    closeBtn.background = "#c62828";
    closeBtn.thickness = 0;
    closeBtn.cornerRadius = 20;
    closeBtn.top = "2%";
    closeBtn.left = "-2%";
    closeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    closeBtn.onPointerUpObservable.add(() => closeGallery());

    /**
     * Botones de navegación izquierda/derecha.
     */
    const left = BABYLON.GUI.Button.CreateSimpleButton("prev", "◀");
    const right = BABYLON.GUI.Button.CreateSimpleButton("next", "▶");

    [left, right].forEach(btn => {
        btn.width = "12%";
        btn.height = "10%";
        btn.color = "#ffd54f";
        btn.background = "rgba(0,0,0,0.5)";
        btn.thickness = 0;
        btn.cornerRadius = 25;
    });

    left.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    right.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    left.onPointerUpObservable.add(() => change(-1)); // Cambio de imagen a cada boton
    right.onPointerUpObservable.add(() => change(1));

    popup.addControl(img);
    popup.addControl(closeBtn);
    popup.addControl(left);
    popup.addControl(right);

    /**
     * Inserción del popup en la GUI global.
     */
    getUITexture().addControl(popup);
}

/**
 * Abre la galería con las imágenes indicadas.
 * 
 * @param {string[]} images Array de rutas de imágenes
 */
function openGallery(images = []) {
    if (!images.length) return;

    setInstructions(getUITexture()._hostScene, "galleryPopup");

    currentImages = images;
    index = 0;
    popup._img.source = currentImages[0];
    popup.isVisible = true;
}

/**
 * Cambia la imagen mostrada.
 * 
 * @param {number} dir Dirección del cambio (-1 anterior, +1 siguiente)
 */
function change(dir) {
    index = (index + dir + currentImages.length) % currentImages.length;
    popup._img.source = currentImages[index];
}

/**
 * Cierra la galería si está abierta.
 */
export function closeGallery() {
    if (!popup) return;
    popup.isVisible = false;

    setInstructions(getUITexture()._hostScene, "inspect");
}
