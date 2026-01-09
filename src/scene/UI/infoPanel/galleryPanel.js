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
    const container = new BABYLON.GUI.StackPanel();
    container.paddingTop = "12px";

    /**
     * Texto clicable que actúa como botón.
     */
    const btn = new BABYLON.GUI.TextBlock();
    btn.text = "Ver galería";
    btn.height = "30px";
    btn.color = "#4fc3f7";
    btn.fontSize = "16px";
    btn.isPointerBlocker = true;
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

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        popup.scaleX = 1.4;
        popup.scaleY = 1.4;
    }

    popup.width = "420px";
    popup.height = "520px";
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
    closeBtn.width = "40px";
    closeBtn.height = "40px";
    closeBtn.color = "#ffffff";
    closeBtn.background = "#c62828";
    closeBtn.thickness = 0;
    closeBtn.cornerRadius = 20;
    closeBtn.top = "10px";
    closeBtn.left = "-10px";
    closeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    closeBtn.onPointerUpObservable.add(() => popup.isVisible = false);

    popup.addControl(img);
    popup.addControl(closeBtn);

    /**
     * Botones de navegación izquierda/derecha.
     */
    const left = BABYLON.GUI.Button.CreateSimpleButton("prev", "◀");
    const right = BABYLON.GUI.Button.CreateSimpleButton("next", "▶");

    [left, right].forEach(btn => {
        btn.color = "#ffd54f";
        btn.background = "rgba(0,0,0,0.5)";
        btn.thickness = 0;
        btn.cornerRadius = 25;
    });

    left.width = right.width = "50px";
    left.height = right.height = "50px";

    left.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    right.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    popup.addControl(left);
    popup.addControl(right);

    left.onPointerUpObservable.add(() => change(-1)); // Cambio de imagen a cada boton
    right.onPointerUpObservable.add(() => change(1));

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
}
