export function createMobileJoysticksUI(scene) {

    const ui = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
        "joystickUI",
        true,
        scene
    );

    ui.layer.zIndex = 200;

    // ===== JOYSTICK IZQUIERDO (MOVIMIENTO) =====
    const leftCircle = new BABYLON.GUI.Ellipse();
    leftCircle.width = "10%";
    leftCircle.height = "25%";
    leftCircle.thickness = 2;
    leftCircle.color = "white";
    leftCircle.background = "rgba(255,255,255,0.08)";
    leftCircle.left = "5%";
    leftCircle.top = "-22%";
    leftCircle.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    leftCircle.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    ui.addControl(leftCircle);

    const leftInner = new BABYLON.GUI.Ellipse();
    leftInner.width = "40%";
    leftInner.height = "40%";
    leftInner.thickness = 0;
    leftInner.background = "rgba(255,255,255,0.35)";
    leftCircle.addControl(leftInner);

    // ===== JOYSTICK DERECHO (MIRAR) =====
    const rightCircle = new BABYLON.GUI.Ellipse();
    rightCircle.width = "10%";
    rightCircle.height = "25%";
    rightCircle.thickness = 2;
    rightCircle.color = "white";
    rightCircle.background = "rgba(255,255,255,0.08)";
    rightCircle.left = "-5%";
    rightCircle.top = "-22%";
    rightCircle.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rightCircle.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

    ui.addControl(rightCircle);

    const rightInner = new BABYLON.GUI.Ellipse();
    rightInner.width = "40%";
    rightInner.height = "40%";
    rightInner.thickness = 0;
    rightInner.background = "rgba(255,255,255,0.35)";
    rightCircle.addControl(rightInner);

    leftCircle.isPointerBlocker = false;
    rightCircle.isPointerBlocker = false;


    return { ui, leftCircle, leftInner, rightCircle, rightInner };
}

export function hideJoysticks(joysticks) {
    if (joysticks?.ui?.rootContainer) {
        joysticks.ui.rootContainer.isVisible = false;
    }
}

export function showJoysticks(joysticks) {
    if (joysticks?.ui?.rootContainer) {
        joysticks.ui.rootContainer.isVisible = true;
    }
}


