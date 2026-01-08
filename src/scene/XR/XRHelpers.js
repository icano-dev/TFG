/**
 * XRHelpers.js
 * ---------------------------------------------------------
 * Inicializa el sistema XR base (cámara, físicas y locomoción).
 */

export async function initXR(scene) {

    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: scene.meshes.filter(m => m.name === "floor")
    });

    const xrCam = xr.baseExperience.camera;

    // Físicas reales
    xrCam.checkCollisions = true;
    xrCam.applyGravity = true;
    xrCam.ellipsoid = new BABYLON.Vector3(0.5, 0.8, 0.5);
    xrCam.ellipsoidOffset = new BABYLON.Vector3(0, 0.8, 0);

    // Al iniciar sesión XR configuramos locomoción
    xr.baseExperience.sessionManager.onXRSessionInit.add(() => {

        // Quitamos teletransporte
        xr.baseExperience.featuresManager.disableFeature(
            BABYLON.WebXRFeatureName.TELEPORTATION
        );

        // Activamos locomoción suave
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

    console.log("XR base listo");
    return xr;
}
