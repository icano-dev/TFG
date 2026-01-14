/**
 * appController.js
 * ---------------------------------------------------------
 * Módulo encargado de gestionar la transición entre los modos
 * "gallery" (navegación libre) y "inspect" (inspección de Funkos).
 * 
 * Controla:
 *  - El cambio de estado de la aplicación
 *  - La animación de cámara
 *  - El bloqueo/desbloqueo de controles
 *  - La activación de paneles de información
 *  - La restauración del Funko y la cámara
 */

import { AppState } from "./appState.js";
import { saveCameraState, restoreCameraState } from "../camera/cameraState.js";
import { playInspectAnimation } from "../camera/inspectAnimation.js";
import { disableUserControls, enableUserControls } from "../camera/controls.js";
import { updateReturnButton } from "../UI/btnReturn.js";
import { enableFunkoRotation } from "../model/funkoRotation.js";
import { showInfoPanel, hideInfoPanel } from "../UI/infoPanel/infoFunkoPanel.js";
import { setInstructions } from "../UI/instruccions.js";

/**
 * Entra en modo inspección para un Funko concreto.
 * 
 * @param {BABYLON.AbstractMesh} funko Funko seleccionado
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {HTMLCanvasElement} canvas Canvas de renderizado
 */
export function enterInspect(funko, scene, canvas) {

    /**
     * Bloqueo si ya se está en modo inspección o animacion (transicion).
     */
    if (AppState.transitioning || AppState.mode === "inspect") return;

    AppState.transitioning = true;
    AppState.mode = "inspect";
    AppState.selectedFunko = funko;

    /**
     * Guardado del estado original del Funko (posición, rotación y escala).
     * Para despues restaurarlo
     */
    funko.metadata._originalTransform = {
        position: funko.position.clone(),
        rotation: funko.rotationQuaternion
            ? funko.rotationQuaternion.clone()
            : funko.rotation.clone(),
        scaling: funko.scaling.clone()
    };

    /**
     * Guardado del estado de la cámara antes de la animación.
     */
    saveCameraState(scene.activeCamera);

    /**
     * Se desactivan los controles del usuario durante la animación.
     */
    scene.activeCamera.detachControl();
    disableUserControls(scene.activeCamera);

    /**
     * Reproducción de la animación de acercamiento al Funko.
     */
    playInspectAnimation(scene, scene.activeCamera, funko, () => {
        AppState.transitioning = false;
        updateReturnButton(); // Se crea el boton "Volver"
        showInfoPanel(scene, funko); // Se muestra el panel de informacion
        setInstructions(scene, "inspect");
    });

    /**
     * Habilita la rotación manual del Funko.
     */
    enableFunkoRotation(scene);
}

/**
 * Sale del modo inspección y restaura el estado original.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {HTMLCanvasElement} canvas Canvas de renderizado
 */
export function exitInspect(scene, canvas) {

    /**
     * Bloqueo si no se está en modo inspección o se está en transición.
     */
    if (AppState.transitioning || AppState.mode !== "inspect") return;

    const funko = AppState.selectedFunko;

    /**
     * Restauración del estado original del Funko.
     */
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

    /**
     * Restauración del estado global.
     */
    AppState.mode = "gallery";
    AppState.selectedFunko = null;

    /**
     * Restauración de la cámara y los controles.
     */
    restoreCameraState(scene.activeCamera);
    scene.activeCamera.attachControl(canvas, true);
    enableUserControls(scene.activeCamera);

    /**
     * Actualización de la interfaz.
     */
    updateReturnButton(); // Desaparece el boton
    hideInfoPanel(); // Desaparece el panel de informacion

    setInstructions(scene, "gallery");
}
