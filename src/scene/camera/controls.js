let controlsEnabled = true;


export function enableUserControls(camera) {

    // Movimiento WASD
    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    camera.speed = 0.15;

    // Sensibilidad de ratón
    camera.angularSensibility = 5000;

    console.log("Controles activados");
}

export function disableUserControls(camera) {
    
    // Limpia WASD
    camera.keysUp = [];
    camera.keysDown = [];
    camera.keysLeft = [];
    camera.keysRight = [];

    // Opcional: por seguridad, anula movimiento
    camera.speed = 0;

    console.log("Controles desactivados");
}

