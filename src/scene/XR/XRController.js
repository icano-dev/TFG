/**
 * XRControllers.js
 * ---------------------------------------------------------
 * Configura el comportamiento físico de los mandos VR.
 */

export function setupXRControllers(xr) {

    if (!xr) return;

    xr.input.onControllerAddedObservable.add((controller) => {

        controller.onMotionControllerInitObservable.add((motionController) => {

            if (motionController.rootMesh) {
                motionController.rootMesh.rotationQuaternion = null;
            }
        });
    });
}

