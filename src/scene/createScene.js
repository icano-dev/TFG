import { setupLights } from "./light.js";
import { createRoom } from "./room/room.js";
import { setupCamera } from "./camera/camera.js";
import { playIntroAnimation } from "./camera/introAnimation.js";
import { enableFunkoSelection } from "./model/modelInteraction.js";
import { AppState } from "../state/appState.js";
import { disableUserControls } from "./camera/controls.js";
import { playInspectAnimation } from "./camera/inspectAnimation.js";

export async function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    console.log("Escena creada");
    canvas.style.display = "none"

    // Añadimos la luz
    setupLights(scene);

    // Creamos la habitacion
    const { room, allFunkos } = await createRoom(scene);

    enableFunkoSelection(scene, allFunkos, (selectedFunko) => {

        // Si se esta inspeccionando un funko , no se hace nada
        if (AppState.mode === "inspect") return;

        AppState.mode = "inspect";
        AppState.selectedFunko = selectedFunko;

        // Bloqueo de camara
        scene.activeCamera.detachControl();

        // Limpieza de WASD
        disableUserControls(scene.activeCamera);

        playInspectAnimation(
            scene,
            scene.activeCamera,
            selectedFunko
        );


        console.log("Modo:", AppState.mode);
        console.log("Funko que se inspecciona:", AppState.selectedFunko.metadata);
    });



    const camera = setupCamera(scene);

    // Animación de presentación
    playIntroAnimation(scene, camera, canvas);

    await scene.whenReadyAsync()
    canvas.style.display = "block"

    // ---- DEBUG XR ----
    console.log(
        "createDefaultXRExperienceAsync existe:",
        typeof scene.createDefaultXRExperienceAsync
    );


    // ---- XR (solo visualización, sin tocar nada) ----
    try {
        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: []
        });
        console.log("XR activado");
    } catch (e) {
        console.warn("XR no disponible", e);
    }


    return scene;
}
