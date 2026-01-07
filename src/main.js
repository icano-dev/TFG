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

/**
 * Canvas HTML donde Babylon renderiza la escena 3D.
 */
const canvas = document.getElementById("renderCanvas");

/**
 * Motor gráfico de Babylon.
 * El segundo parámetro activa el antialiasing para suavizar bordes.
 */
const engine = new BABYLON.Engine(canvas, true);

/**
 * Creación de la escena principal.
 */
const scene = await createScene(engine, canvas);

/**
 * Bucle de renderizado.
 * Babylon llama a esta función aproximadamente 60 veces por segundo.
 * En cada iteración se vuelve a dibujar la escena completa.
 */
engine.runRenderLoop(() => {
    scene.render();
});

/**
 * Evento que se dispara cuando cambia el tamaño de la ventana.
 * Se reajusta el motor para que el canvas mantenga la proporción
 * y no se deforme la escena.
 */
window.addEventListener("resize", () => {
    engine.resize();
});
