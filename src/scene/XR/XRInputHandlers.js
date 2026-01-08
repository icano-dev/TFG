/**
 * XRInputHandlers.js
 * ---------------------------------------------------------
 * Gestiona la selección de objetos mediante rayos VR.
 */

export function setupXRInputHandlers(xr) {

    xr.baseExperience.featuresManager.enableFeature(
        BABYLON.WebXRFeatureName.POINTER_SELECTION,
        "latest",
        {
            xrInput: xr.input,
            enablePointerSelectionOnAllControllers: true,
            preferredHandedness: "right",
            maxPointerDistance: 20
        }
    );
}
