import { getFunkoById } from "../../data/funkoDataBase.js";
import { createTittle } from "./tittlePanel.js";
import { createDataSection } from "./dataPanel.js";
import { createGallerySection } from "./galleryPanel.js";
import { createDescriptionSection } from "./descriptionPanel.js";

let uiTexture = null;
let panel = null;
let visible = false;

function initUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("infoPanelUI", true, scene);
}

export function showInfoPanel(scene, funko) {
    if (!uiTexture) initUI(scene);
    if (!panel) createPanel();

    const data = getFunkoById(funko.metadata.id);
    console.log("metadata.id =", funko?.metadata?.id);
    console.log("data =", data);
    if (!data) return;

    panel._content.clearControls();

    panel._content.addControl(createTittle(data));
    panel._content.addControl(createDataSection(data));
    panel._content.addControl(createDescriptionSection(data.description));
    panel._content.addControl(createGallerySection(data));

    if (!visible) {
        uiTexture.addControl(panel);
        visible = true;
    }
    console.log("DATA:", data);

}

export function hideInfoPanel() {
    if (panel && visible) {
        uiTexture.removeControl(panel);
        visible = false;
    }
}

function createPanel() {
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

    const stack = new BABYLON.GUI.StackPanel();
    stack.paddingTop = "20px";
    stack.paddingLeft = "20px";
    stack.paddingRight = "20px";
    stack.isVertical = true;
    stack.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    panel._content = stack;
    panel.addControl(stack);
}
