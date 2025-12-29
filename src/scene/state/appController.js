import { AppState } from "./appState.js";
import { saveCameraState, restoreCameraState } from "../camera/cameraState.js";
import { playInspectAnimation } from "../camera/inspectAnimation.js";
import { disableUserControls, enableUserControls } from "../camera/controls.js";
import { updateReturnButton } from "../UI/btnReturn.js";
import { enableFunkoRotation } from "../model/funkoRotation.js";

export function enterInspect(funko, scene, canvas) {
    if (AppState.transitioning || AppState.mode === "inspect") return;

    AppState.transitioning = true;
    AppState.mode = "inspect";
    AppState.selectedFunko = funko;

    saveCameraState(scene.activeCamera);

    scene.activeCamera.detachControl();

    disableUserControls(scene.activeCamera);


    playInspectAnimation(scene, scene.activeCamera, funko, () => {
        AppState.transitioning = false;
        updateReturnButton();
    });

    enableFunkoRotation(scene);

}

export function exitInspect(scene, canvas) {
    if (AppState.transitioning || AppState.mode !== "inspect") return;

    AppState.mode = "gallery";
    AppState.selectedFunko = null;

    restoreCameraState(scene.activeCamera);
    scene.activeCamera.attachControl(canvas, true);
    enableUserControls(scene.activeCamera);

    updateReturnButton();

}
