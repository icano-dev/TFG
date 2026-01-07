import { setupLights } from "./light.js";
import { createRoom } from "./room/room.js";
import { setupCamera } from "./camera/camera.js";
import { playIntroAnimation } from "./camera/introAnimation.js";
import { enableFunkoSelection } from "./model/modelInteraction.js";
import { enterInspect } from "./state/appController.js";
import { createReturnButton } from "./UI/btnReturn.js";
import { loadFunkoDatabase } from "./data/funkoDataBase.js";

export async function createScene(engine, canvas) {

    const loadingScreen = document.getElementById("loadingScreen");

    const scene = new BABYLON.Scene(engine);

    scene.collisionsEnabled = true;


    // Mostrar pantalla de carga
    loadingScreen.style.display = "flex";
    loadingScreen.style.opacity = "1";
    loadingScreen.style.pointerEvents = "all";

    // Luces
    setupLights(scene);

    // Habitación + Funkos (esto es lo que más tarda)
    const { room, allFunkos } = await createRoom(scene);

    // Interacción
    enableFunkoSelection(scene, allFunkos, funko => {
        enterInspect(funko, scene, canvas);
    });

    // Cámara
    const camera = setupCamera(scene);

    // Intro
    playIntroAnimation(scene, camera, canvas);

    // Base de datos Funkos
    await loadFunkoDatabase();

    // Esperamos a que Babylon tenga todo listo
    await scene.whenReadyAsync();

    // Ocultamos loader con fade
    loadingScreen.style.opacity = "0";
    loadingScreen.style.pointerEvents = "none";

    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 600);

    console.log("Escena creada");

    createReturnButton(scene, canvas);

    return scene;
}

