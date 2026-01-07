/**
 * light.js
 * ---------------------------------------------------------
 * Módulo encargado de definir y configurar la iluminación
 * general de la habitación 3D.
 * 
 * Se utiliza :
 *  - Una luz ambiental uniforme (HemisphericLight)
 *  - Una luz puntual simulando una bombilla de techo (PointLight)
 * 
 */

/**
 * Configura las luces principales de la escena.
 * 
 * @param {BABYLON.Scene} scene Escena principal Babylon
 * @returns {Object} Objeto con las luces creadas
 */
export function setupLights(scene) {

    /**
     * Luz ambiental hemisférica.
     * Iluminación uniforme a toda la escena.
     */
    const ambient = new BABYLON.HemisphericLight(
        "ambLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambient.intensity = 0.55; // Intensidad de la luz

    /**
     * Luz puntual situada en el techo.
     * Simula una bombilla central que ilumina la sala.
     */
    const lamp = new BABYLON.PointLight(
        "lampLight",
        new BABYLON.Vector3(0, 2.7, 0),
        scene
    );
    lamp.intensity = 0.45;

    /**
     * Radio de influencia de la luz.
     * Limita la distancia a la que afecta
     */
    lamp.radius = 6;

    /**
     * Evita reflejos en paredes y techos
     */
    lamp.specular = new BABYLON.Color3(0.2, 0.2, 0.2);

    return { ambient, lamp };
}
