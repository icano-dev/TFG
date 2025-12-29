import { exitInspect } from "../state/appController.js";

let uiTexture = null;
let button = null;
let visible = false

function initReturnGUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("returnUI", true, scene);
}

export function createReturnButton(scene) {
    if (!uiTexture) initReturnGUI(scene);
    if (!button) {

        button = BABYLON.GUI.Button.CreateSimpleButton("returnBtn", "Volver");

        button.width = "120px";
        button.height = "50px";
        button.color = "white";
        button.background = "black";

        button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.paddingLeft = "20px";
        button.paddingTop = "20px";

        button.onPointerUpObservable.add(() => {
            exitInspect(scene);
            uiTexture.removeControl(button)
            visible = false
        });
    }
}

export function updateReturnButton() {
    if (!button) return
    if (visible) {
        uiTexture.removeControl(button)
        visible = false
    } else {
        uiTexture.addControl(button)
        visible = true
    }
}