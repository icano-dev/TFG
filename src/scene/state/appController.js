import { AppState } from "./appState.js";
import { saveCameraState, restoreCameraState } from "../camera/cameraState.js";
import { playInspectAnimation } from "../camera/inspectAnimation.js";
import { disableUserControls, enableUserControls } from "../camera/controls.js";
import { updateReturnButton } from "../UI/btnReturn.js";
import { enableFunkoRotation } from "../model/funkoRotation.js";
import { showInfoPanel, hideInfoPanel } from "../UI/infoPanel/infoFunkoPanel.js";

export function enterInspect(funko, scene, canvas) {
    if (AppState.transitioning || AppState.mode === "inspect") return;

    AppState.transitioning = true;
    AppState.mode = "inspect";
    AppState.selectedFunko = funko;

    // Guardar estado original del funko (posición, rotación, escala)
    funko.metadata._originalTransform = {
        position: funko.position.clone(),
        rotation: funko.rotationQuaternion
            ? funko.rotationQuaternion.clone()
            : funko.rotation.clone(),
        scaling: funko.scaling.clone()
    };


    saveCameraState(scene.activeCamera);

    scene.activeCamera.detachControl();

    disableUserControls(scene.activeCamera);


    playInspectAnimation(scene, scene.activeCamera, funko, () => {
        AppState.transitioning = false;
        updateReturnButton();
        showInfoPanel(scene, funko);
    });

    enableFunkoRotation(scene);

}

export function exitInspect(scene, canvas) {
    if (AppState.transitioning || AppState.mode !== "inspect") return;

    const funko = AppState.selectedFunko;
    if (funko && funko.metadata._originalTransform) {
        const t = funko.metadata._originalTransform;

        funko.position.copyFrom(t.position);

        if (funko.rotationQuaternion && t.rotation instanceof BABYLON.Quaternion) {
            funko.rotationQuaternion.copyFrom(t.rotation);
        } else {
            funko.rotation.copyFrom(t.rotation);
        }

        funko.scaling.copyFrom(t.scaling);
    }

    AppState.mode = "gallery";
    AppState.selectedFunko = null;

    restoreCameraState(scene.activeCamera);
    scene.activeCamera.attachControl(canvas, true);
    enableUserControls(scene.activeCamera);

    updateReturnButton();
    hideInfoPanel();

}
