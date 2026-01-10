/**
 * XRHelpers.js
 * ---------------------------------------------------------
 * Inicializa el sistema XR base (cámara, físicas y locomoción).
 */

export async function initXR(scene) {

    if (!BABYLON.WebXRDefaultExperience) {
        console.warn("WebXR no disponible en este navegador");
        return null;
    }

    let xr;
    try {
        xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: scene.meshes.filter(m => m.name === "floor")
        });
    } catch (e) {
        console.warn("XR no pudo inicializarse:", e);
        return null;
    }

    if (!xr || !xr.baseExperience) {
        console.warn("XR bloqueado por el navegador");
        return null;
    }

    const xrCam = xr.baseExperience.camera;

    xrCam.checkCollisions = true;
    xrCam.applyGravity = true;
    xrCam.ellipsoid = new BABYLON.Vector3(0.5, 0.8, 0.5);
    xrCam.ellipsoidOffset = new BABYLON.Vector3(0, 0.8, 0);

    xr.baseExperience.sessionManager.onXRSessionInit.add(() => {

        xr.baseExperience.featuresManager.disableFeature(
            BABYLON.WebXRFeatureName.TELEPORTATION
        );

        xr.baseExperience.featuresManager.enableFeature(
            BABYLON.WebXRFeatureName.MOVEMENT,
            "latest",
            {
                xrInput: xr.input,
                movementEnabled: true,
                movementSpeed: 0.02,
                rotationEnabled: true,
                rotationSpeed: 0.05,
                enableVerticalMovement: true
            }
        );
    });

    console.log("XR listo");
    return xr;
}

