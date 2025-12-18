import { setupLights } from "./light.js";
import { createRoom } from "./room/room.js";
import { setupCamera } from "./camera/camera.js";
import { playIntroAnimation } from "./camera/introAnimation.js";

export async function createScene(engine, canvas) {
    const scene = new BABYLON.Scene(engine);
    
    console.log("Escena creada");

    // Añadimos la luz
    setupLights(scene);

    // Creamos la habitacion
    const room = await createRoom(scene);

    const camera = setupCamera(scene);

    // Animación de presentación
    playIntroAnimation(scene, camera, canvas);

    return scene;
}
