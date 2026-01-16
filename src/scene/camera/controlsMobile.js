/**
 * controlsMobile.js
 * ---------------------------------------------------------
 * Controles móviles ESTABLES para TU proyecto:
 *  - Dedo IZQUIERDO  → mover (WASD táctil)
 *  - Dedo DERECHO    → mirar (rotar cámara)
 *  - Respeta colisiones y evita "teleports azules"
 */

let mobileControlsEnabled = true;

export function enableMobileJoysticks(scene, camera, joysticks) {

    const isMobile =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

    if (!isMobile) return;

    mobileControlsEnabled = true;

    console.log("Activando controles móviles seguros (multi-touch)");

    // === CLAVE: desactivar COMPLETAMENTE el touch nativo de Babylon ===
    if (camera.inputs?.attached?.touch) {
        camera.inputs.attached.touch.detachControl();
    }

    const speed = 3;            // velocidad cómoda en tu sala
    const rotateSpeed = 0.003;  // sensibilidad de cámara

    let moveTouchId = null;   // dedo izquierdo
    let lookTouchId = null;   // dedo derecho

    let moveStartX = 0;
    let moveStartY = 0;

    let lastLookX = 0;
    let lastLookY = 0;

    // Centro "real" del joystick derecho (para el punto visual)
    let lookStartX = 0;
    let lookStartY = 0;

    const halfWidth = () => window.innerWidth / 2;

    // ================= TOUCH START =================
    window.addEventListener("touchstart", (e) => {

        for (const t of e.changedTouches) {

            if (t.clientX < halfWidth() && moveTouchId === null) {
                // Dedo izquierdo → mover
                moveTouchId = t.identifier;
                moveStartX = t.clientX;
                moveStartY = t.clientY;
            }
            else if (t.clientX >= halfWidth() && lookTouchId === null) {
                // Dedo derecho → mirar
                lookTouchId = t.identifier;

                // Centro "real" para el punto del joystick derecho
                lookStartX = t.clientX;
                lookStartY = t.clientY;

                // Para la rotación suave usamos delta por frames
                lastLookX = t.clientX;
                lastLookY = t.clientY;
            }
        }
    });

    // ================= TOUCH MOVE =================
    window.addEventListener("touchmove", (e) => {

        if (!mobileControlsEnabled) return;

        const delta = scene.getEngine().getDeltaTime() / 1000;

        for (const t of e.touches) {

            // --------- MOVIMIENTO (IZQUIERDA) ---------
            if (t.identifier === moveTouchId) {

                let dx = (t.clientX - moveStartX) / (halfWidth() / 2);
                let dy = (t.clientY - moveStartY) / (window.innerHeight / 2);

                // Limitar a círculo de joystick
                const mag = Math.sqrt(dx * dx + dy * dy);
                if (mag > 1) { dx /= mag; dy /= mag; }

                // Mover el botoncito del joystick visual (izquierdo)
                if (joysticks) {
                    joysticks.leftInner.left = `${dx * 40}px`;
                    joysticks.leftInner.top = `${dy * 40}px`;
                }

                const forward = camera.getDirection(BABYLON.Axis.Z);
                const right = camera.getDirection(BABYLON.Axis.X);

                forward.y = 0;
                right.y = 0;
                forward.normalize();
                right.normalize();

                const move = new BABYLON.Vector3();
                move.addInPlace(forward.scale(-dy * speed));
                move.addInPlace(right.scale(dx * speed));

                // === MICRO-PASOS CON COLISIONES REALES ===
                const step = move.scale(delta * 0.25);

                for (let i = 0; i < 4; i++) {

                    const rayOrigin = camera.position.clone();
                    const rayDir = step.clone().normalize();

                    const ray = new BABYLON.Ray(rayOrigin, rayDir, 0.25);
                    const hit = scene.pickWithRay(ray, m => m.checkCollisions);

                    if (!hit.pickedMesh) {
                        camera.position.addInPlace(step);
                    } else {
                        break; // paramos al chocar con pared
                    }
                }
            }

            // --------- MIRAR (DERECHA) ---------
            if (t.identifier === lookTouchId) {

                const deltaX = t.clientX - lastLookX;
                const deltaY = t.clientY - lastLookY;

                // Punto visual del joystick derecho (modo "real", como el izquierdo)
                if (joysticks) {
                    let rdx = (t.clientX - lookStartX) / (halfWidth() / 2);
                    let rdy = (t.clientY - lookStartY) / (window.innerHeight / 2);

                    const rmag = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (rmag > 1) { rdx /= rmag; rdy /= rmag; }

                    joysticks.rightInner.left = `${rdx * 40}px`;
                    joysticks.rightInner.top = `${rdy * 40}px`;
                }

                // Rotación suave con delta por frames
                camera.rotation.y += deltaX * rotateSpeed;
                camera.rotation.x += deltaY * rotateSpeed;

                camera.rotation.x = BABYLON.Scalar.Clamp(
                    camera.rotation.x,
                    -Math.PI / 2.2,
                    Math.PI / 2.2
                );

                lastLookX = t.clientX;
                lastLookY = t.clientY;
            }
        }
    });

    // ================= TOUCH END =================
    window.addEventListener("touchend", (e) => {

        for (const t of e.changedTouches) {
            if (t.identifier === moveTouchId) moveTouchId = null;

            if (t.identifier === lookTouchId) {
                lookTouchId = null;
                lookStartX = 0;
                lookStartY = 0;
            }
        }

        // Centrar los joysticks visuales al soltar
        if (joysticks) {
            joysticks.leftInner.left = "0px";
            joysticks.leftInner.top = "0px";
            joysticks.rightInner.left = "0px";
            joysticks.rightInner.top = "0px";
        }
    });
}

export function pauseMobileControls() {
    mobileControlsEnabled = false;
    console.log("Controles móviles PAUSADOS (modo inspect)");
}

export function resumeMobileControls(camera) {
    mobileControlsEnabled = true;

    // Asegurar que Babylon no reengancha su touch nativo al volver a gallery
    if (camera?.inputs?.attached?.touch) {
        camera.inputs.attached.touch.detachControl();
    }

    console.log("Controles móviles REACTIVADOS (modo gallery)");
}
