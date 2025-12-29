let savedCameraState = null;

export function saveCameraState(camera) {
    savedCameraState = {
        position: camera.position.clone(),
        target: camera.getTarget().clone()
    };
}

export function restoreCameraState(camera) {
    if (!savedCameraState) return;

    camera.position.copyFrom(savedCameraState.position);
    camera.setTarget(savedCameraState.target);
}
