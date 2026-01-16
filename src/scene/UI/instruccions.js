/**
 * instructionsPanel.js
 * ---------------------------------------------------------
 * HUD de ayuda contextual (PC / móvil / XR) que cambia según modo:
 *  - gallery
 *  - inspect
 *  - galleryPopup (opcional)
 */

let uiTexture = null;
let container = null;
let textBlock = null;
let visible = false;
let keyBlock = null;

// Estado actual (por si llamas varias veces)
let currentMode = "gallery";
let currentInput = "desktop";

/**
 * Detecta tipo de input de forma simple.
 */
function detectInput(scene) {
    const isXR =
        scene?.activeCamera &&
        (scene.activeCamera.getClassName?.() === "WebXRCamera" ||
            scene.activeCamera.getClassName?.().toLowerCase().includes("xr"));

    if (isXR) return "xr";

    const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

    return isTouch ? "mobile" : "desktop";
}

/**
 * Textos según modo + input
 */
function getHelpText(mode, input) {
    const MAP = {
        gallery: {
            desktop: "Moverse: WASD\nMirar: Mantener clic + raton\nSeleccionar: clic",
            mobile: "Moverse: joystick izquierdo\nMirar: joystick derecho\nSeleccionar: tocar",
            xr: ""
        },
        inspect: {
            desktop: "Rotar Funko: mantén clic y arrastra\nSalir: ESC o botón Volver",
            mobile: "Rotar Funko: Toca y arrastra\nSalir: botón Volver",
            xr: "Salir: botón Volver"
        },
        galleryPopup: {
            desktop: "Cambiar imagen: ◀ ▶\nCerrar: ✖",
            mobile: "Cambiar imagen: toca ◀ ▶\nCerrar: ✖",
            xr: ""
        }
    };

    return MAP[mode]?.[input] ?? "";
}

/**
 * Crea la UI base (una sola vez).
 */
function initUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "instructionsUI",
        true,
        scene
    );

    container = new BABYLON.GUI.Rectangle("instructionsContainer");
    container.width = "25%";
    container.height = "10%";
    container.thickness = 2;
    container.cornerRadius = 20;
    container.color = "#ffd54f";
    container.background = "#1b1b1b";
    container.isPointerBlocker = false;
    container.zIndex = 50;

    container.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    container.paddingLeft = "1%";
    container.paddingBottom = "1%";

    const grid = new BABYLON.GUI.Grid();
    grid.width = "100%";
    grid.height = "100%";
    grid.addColumnDefinition(0.35);
    grid.addColumnDefinition(0.65);

    container.addControl(grid);

    keyBlock = new BABYLON.GUI.TextBlock();
    keyBlock.color = "#ffd54f";
    keyBlock.fontSize = "22%";
    keyBlock.textWrapping = true;
    keyBlock.resizeToFit = true;
    keyBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    keyBlock.paddingRight = "4%";

    textBlock = new BABYLON.GUI.TextBlock();
    textBlock.color = "#ffffff";
    textBlock.fontSize = "22%";
    textBlock.textWrapping = true;
    textBlock.resizeToFit = true;
    textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    textBlock.paddingLeft = "4%";

    grid.addControl(keyBlock, 0, 0);
    grid.addControl(textBlock, 0, 1);


    const isMobile =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;

    if (isMobile) {
        container.width = "40%";
        container.height = "20%";
        container.paddingLeft = "2%";
        container.paddingBottom = "2%";
    }

}

/**
 * Inicializa el HUD.
 */
export function initInstructions(scene) {
    if (!uiTexture) initUI(scene);
    showInstructions(scene, true);
    setInstructions(scene, "gallery");
}

/**
 * Cambia el modo de instrucciones.
 */
export function setInstructions(scene, mode) {
    if (!uiTexture) initUI(scene);

    currentMode = mode;
    currentInput = detectInput(scene);

    const txt = getHelpText(currentMode, currentInput);

    if (!txt || txt.trim() === "") {
        showInstructions(scene, false);
        return;
    }

    const lines = txt.split("\n");
    keyBlock.text = lines.map(l => l.split(":")[0] + ":").join("\n");
    textBlock.text = lines.map(l => l.split(":").slice(1).join(":").trim()).join("\n");


    showInstructions(scene, true);
}

/**
 * Muestra u oculta el HUD.
 */
export function showInstructions(scene, shouldShow) {
    if (!uiTexture) initUI(scene);

    if (shouldShow && !visible) {
        uiTexture.addControl(container);
        visible = true;
    } else if (!shouldShow && visible) {
        uiTexture.removeControl(container);
        visible = false;
    }
}
