/**
 * funkoDataManager.js
 * ---------------------------------------------------------
 * Módulo encargado de cargar, clonar y posicionar todos los Funkos
 * de cada colección dentro de la habitación.
 * 
 * Centraliza:
 *  - La carga de modelos GLB
 *  - La reutilización de modelos base mediante caché
 *  - La colocación automática en estanterías
 *  - La asignación de metadatos para interacción
 */

import { loadFunkoModel } from "./funkoModel.js";
import { placeFunkosOnGridShelf, placeFunkosOnFloatingShelf } from "./funkoPlacement.js";

/**
 * Carga y posiciona una colección completa de Funkos.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {Object} options Configuración de la colección
 * @param {Array<Object>} options.collection Array de Funkos a cargar
 * @param {string} options.folder Carpeta donde se encuentran los modelos GLB
 * @param {Object} options.shelfMap Mapa de estanterías disponibles
 * @param {string} options.placementType Tipo de colocación ("grid" | "floating")
 * @param {number} options.scale Escala base por defecto de los Funkos
 * @param {number} options.rotationY Rotación base por defecto en el eje Y
 * 
 * @returns {Promise<BABYLON.AbstractMesh[]>} Array de Funkos colocados en la escena
 */
export async function setupCollection(scene, {
    collection,
    folder,
    shelfMap,
    placementType = "grid",
    scale = 0.13,
    rotationY = 180
}) {

    /**
     * Array donde se almacenan los Funkos colocados.
     */
    const placedFunkos = [];

    /**
     * Caché de modelos base para evitar cargas duplicadas.
     * Cada modelo se carga una sola vez y luego se clona.
     */
    const modelCache = new Map();

    /**
     * Promesas de carga y colocación de cada Funko.
     */
    const funkoPromises = collection.map(async (funko) => {

        /**
         * Obtención del modelo base desde caché o carga inicial.
         */
        let baseModel = modelCache.get(funko.file);

        if (!baseModel) {
            baseModel = await loadFunkoModel(scene, {
                name: `${funko.id}Base`,
                folder,
                file: funko.file,
                scale: funko.scale ?? scale,
                rotationY: funko.rotationY ?? rotationY,
            });

            modelCache.set(funko.file, baseModel);
        }

        /**
         * Selección de la estantería destino del Funko.
         */
        const shelf = shelfMap[funko.shelf];

        if (!shelf) {
            console.warn(`Estanteria de nombre: "${funko.shelf}" no existe para`, funko.id);
            return;
        }

        let placedFunko = null;

        /**
         * Colocación según tipo de estantería.
         */
        if (placementType === "grid") {
            placedFunko = placeFunkosOnGridShelf({
                shelf,
                funkoBase: baseModel,
                slotIndex: funko.slot
            });
        } else if (placementType === "floating") {
            placedFunko = placeFunkosOnFloatingShelf({
                shelf,
                funkoBase: baseModel,
                slotIndex: funko.slot
            });
        }

        /**
         * Asignación de metadatos y almacenamiento del Funko colocado.
         */
        if (placedFunko) {
            placedFunko.metadata = {
                ...funko,
                collectionFolder: folder
            };

            placedFunkos.push(placedFunko);
        }
    });

    /**
     * Espera a que todos los Funkos estén cargados y colocados.
     */
    await Promise.all(funkoPromises);

    return placedFunkos;
}
