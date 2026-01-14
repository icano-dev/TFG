/**
 * createScene.js
 * ---------------------------------------------------------
 * Módulo encargado de construir y configurar la escena 3D principal.
 * 
 * Aquí se realiza la inicialización completa del entorno:
 *  - Creación de la escena Babylon
 *  - Activación de colisiones
 *  - Configuración de luces
 *  - Construcción de la habitación 3D
 *  - Carga de modelos Funko
 *  - Preparación de la cámara
 *  - Lanzamiento de la animación de entrada
 *  - Inicialización de interacciones y controles
 *  - Gestión de la pantalla de carga
 */

import { setupLights } from "./light.js";
import { createRoom } from "./room/room.js";
import { setupCamera } from "./camera/camera.js";
import { playIntroAnimation } from "./camera/introAnimation.js";
import { enableFunkoSelection } from "./model/modelInteraction.js";
import { enterInspect } from "./state/appController.js";
import { createReturnButton } from "./UI/btnReturn.js";
import { loadFunkoDatabase } from "./data/funkoDataBase.js";
import { initXR } from "./XR/XRHelpers.js";
import { setupXRControllers } from "./XR/XRController.js";
import { setupXRInputHandlers } from "./XR/XRInputHandlers.js";
import { initInstructions, showInstructions } from "./UI/instruccions.js";

/**
 * Crea y configura la escena principal del proyecto.
 * 
 * @param {BABYLON.Engine} engine Motor gráfico Babylon.js
 * @param {HTMLCanvasElement} canvas Canvas HTML de renderizado
 * @returns {Promise<BABYLON.Scene>} Escena completamente inicializada
 */
export async function createScene(engine, canvas) {

    /**
     * Referencia al elemento HTML que actúa como pantalla de carga.
     */
    const loadingScreen = document.getElementById("loadingScreen");

    /**
     * Creación de la escena principal Babylon.
     */
    const scene = new BABYLON.Scene(engine);

    /**
     * Sistema de colisiones para toda la escena.
     */
    scene.collisionsEnabled = true;

    // Mostrar pantalla de carga
    loadingScreen.style.display = "flex";
    loadingScreen.style.opacity = "1";
    loadingScreen.style.pointerEvents = "all";

    /**
     * Configuración de luces del entorno.
     */
    setupLights(scene);

    /**
     * Construcción de la habitación y carga de los Funkos.
     */
    const { room, allFunkos } = await createRoom(scene);



    /**
     * Creación de la cámara inicial.
     */
    const camera = setupCamera(scene);

    /**
     * Reproducción de la animación de entrada a la sala.
     */
    playIntroAnimation(scene, camera, canvas, () => {

        /**
        * Inicialización del sistema de interacción con Funkos.
        * Unicamente cuando acabe la animacion, para evitar bugs.
        */
        enableFunkoSelection(scene, allFunkos, funko => {
            enterInspect(funko, scene, canvas);
        });
    });

    /**
     * Carga de la base de datos local de Funkos.
     */
    await loadFunkoDatabase();

    /**
     * Espera a que Babylon tenga todos los recursos preparados.
     */
    await scene.whenReadyAsync();

    // Ocultamos loader con efecto fade
    loadingScreen.style.opacity = "0";
    loadingScreen.style.pointerEvents = "none";

    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 600);

    console.log("Escena creada");

    /**
     * Creación del botón de retorno desde el modo inspección.
     */
    createReturnButton(scene, canvas);

    initInstructions(scene);
    showInstructions(scene, false);

    /**
     * Iniciamos modo XR
     */
    const xr = await initXR(scene);

    if (xr) {
        setupXRControllers(xr);
        setupXRInputHandlers(xr);
        console.log("XR activado");
    } else {
        console.log("XR no disponible – modo pantalla");
    }



    return scene;
}
