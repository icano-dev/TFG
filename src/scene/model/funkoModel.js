/**
 * funkoModel.js
 * ---------------------------------------------------------
 * Módulo encargado de cargar los modelos 3D base de los Funkos.
 * 
 * Cada modelo se carga una sola vez y se reutiliza mediante clonación
 * para optimizar rendimiento y tiempos de carga.
 */

/**
 * Carga un modelo 3D GLB de Funko Pop.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {Object} options Configuración del modelo
 * @param {string} options.name Nombre interno de la malla
 * @param {string} options.folder Carpeta donde se encuentra el modelo
 * @param {string} options.file Nombre del archivo GLB
 * @param {number} options.scale Escala del Funko
 * @param {number} options.rotationY Rotación inicial en el eje Y
 * 
 * @returns {Promise<BABYLON.AbstractMesh>} Malla base del Funko cargado
 */
export async function loadFunkoModel(scene, {
    name,
    folder,
    file,
    scale = 0.13,
    rotationY = 180
}) {

    return new Promise((resolve, reject) => {

        /**
         * Importación del modelo GLB desde el sistema de archivos.
         */
        BABYLON.SceneLoader.ImportMesh(
            "",
            `./assets/models/${folder}/`,
            file,
            scene,

            /**
             * Callback ejecutado cuando el modelo se carga correctamente.
             */
            (meshes) => {

                /**
                 * La primera malla es la raíz del modelo.
                 */
                const funko = meshes[0];
                funko.name = name;

                /**
                 * Ajuste de escala del modelo.
                 */
                funko.scaling = new BABYLON.Vector3(scale, scale, scale);

                /**
                 * Rotación inicial del Funko sobre el eje Y.
                 */
                funko.rotation = new BABYLON.Vector3(
                    0,
                    BABYLON.Tools.ToRadians(rotationY),
                    0
                );

                /**
                 * El modelo base se mantiene oculto y se utiliza
                 * como plantilla para crear clones.
                 */
                funko.setEnabled(false);

                resolve(funko);
            },
            null,

            /**
             * Callback ejecutado en caso de error de carga.
             */
            (_, message) => reject(message)
        );
    });
}
