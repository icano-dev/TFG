import { setupLights } from "./light.js";
import { createRoom } from "./room/room.js";
import { setupCamera } from "./camera/camera.js";
import { playIntroAnimation } from "./camera/introAnimation.js";
import { enableFunkoSelection } from "./model/modelInteraction.js";

export async function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    console.log("Escena creada");
    canvas.style.display = "none"

    // Añadimos la luz
    setupLights(scene);

    // Creamos la habitacion
    const { room, allFunkos } = await createRoom(scene);

    enableFunkoSelection(scene, allFunkos, (selectedFunko) => {
        console.log("Funko seleccionado:", selectedFunko.name);
        console.log("Metadata:", selectedFunko.metadata);
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
