/**
 * shelfModel.js
 * ---------------------------------------------------------
 * Módulo encargado de cargar los modelos 3D base de estanterías.
 * 
 * Los modelos se cargan una sola vez y se utilizan como plantilla
 * para ser clonados posteriormente en la escena.
 * 
 * Esto permite optimizar el rendimiento y reducir tiempos de carga.
 */

import { createShelfMaterial } from "../materials.js";

/**
 * Carga un modelo de estantería desde disco.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {string} filename Nombre del archivo GLB a cargar
 * @returns {Promise<BABYLON.AbstractMesh>} Malla raíz de la estantería cargada
 */
export function loadShelfModel(scene, filename) {

    return new Promise((resolve, reject) => {

        /**
         * Carga asíncrona del modelo GLB.
         */
        BABYLON.SceneLoader.ImportMesh(
            "",
            "./assets/models/habitacion/shelf/",
            filename,
            scene,

            /**
             * Callback ejecutado cuando el modelo se carga correctamente.
             * @param {BABYLON.AbstractMesh[]} meshes Mallas cargadas del modelo
             */
            function (meshes) {

                /**
                 * La primera malla es la raíz del modelo importado.
                 */
                const shelf = meshes[0];

                /**
                 * Escalado del modelo.
                 */
                shelf.scaling = new BABYLON.Vector3(1, 1, 1);

                /**
                 * Activación de colisiones para impedir que el jugador atraviese la estantería.
                 */
                shelf.checkCollisions = true;

                /**
                 * Aplicación de material solo a las estanterías pequeñas.
                 * Las estanterías grandes (shelf2) ya traen su propio material.
                 */
                if (!filename.includes("shelf2")) {
                    const shelfMat = createShelfMaterial(scene);
                    shelf.getChildMeshes().forEach(m => m.material = shelfMat);
                }

                resolve(shelf);
            },

            null,

            /**
             * Callback ejecutado en caso de error de carga.
             * @param {string} message Mensaje de error
             */
            function (message) {
                reject("Error cargando estantería: " + message);
            }
        );
    });
}
