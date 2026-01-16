/**
 * main.js
 * ---------------------------------------------------------
 * Archivo principal de arranque de la aplicación.
 * 
 * Es el punto de entrada del proyecto. Se encarga de:
 *  - Obtener el canvas HTML donde se renderiza Babylon.js
 *  - Crear el motor gráfico (Engine)
 *  - Crear la escena principal del proyecto
 *  - Iniciar el bucle de renderizado
 *  - Gestionar el redimensionado de la ventana
 * 
 */

import { createScene } from "./scene/createScene.js";

(async () => {

    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    if (!navigator.xr) {
        console.warn("WebXR no disponible en este navegador");
    }

    const scene = await createScene(engine, canvas);

    engine.setHardwareScalingLevel(1 / window.devicePixelRatio);

    engine.runRenderLoop(() => scene.render());

    setTimeout(() => {
        engine.resize();
    }, 100);

    window.addEventListener("resize", () => {
        engine.resize();
        if (scene.activeCamera) {
            scene.activeCamera.fovMode = BABYLON.Camera.FOVMODE_VERTICAL_FIXED;
            scene.activeCamera.fov = BABYLON.Tools.ToRadians(75);
            scene.activeCamera.minZ = 0.05;
            scene.activeCamera.maxZ = 200;
        }
    });

    document.body.addEventListener("click", () => {
        if (screen.orientation?.lock) {
            screen.orientation.lock("landscape").catch(() => { });
        }
    }, { once: true });


})();



