/**
 * modelInteraction.js
 * ---------------------------------------------------------
 * Módulo encargado de habilitar la selección de Funkos mediante
 * interacción del usuario (clic de ratón).
 * 
 * Permite detectar qué figura ha sido pulsada y activar el
 * modo de inspección.
 */

import { AppState } from "../state/appState.js";

/**
 * Activa la selección de Funkos en la escena.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 * @param {BABYLON.AbstractMesh[]} funkos Array de Funkos colocados
 * @param {Function} onSelect Función que se ejecuta al seleccionar un Funko
 */
export function enableFunkoSelection(scene, funkos, onSelect) {

    /**
     * Recorre todos los Funkos colocados en la escena.
     */
    funkos.forEach(funkoRoot => {

        /**
         * Se incluyen tanto la malla raíz como todas sus submallas,
         * permitiendo que cualquier parte del Funko sea clicable.
         */
        const pickableMeshes = [
            funkoRoot,
            ...funkoRoot.getChildMeshes()
        ];

        pickableMeshes.forEach(mesh => {

            /**
             * Activa la posibilidad de que la malla (funko) sea seleccionada.
             */
            mesh.isPickable = true;

            /**
             * Cada malla tiene su propio ActionManager para gestionar eventos.
             */
            mesh.actionManager = new BABYLON.ActionManager(scene);

            /**
             * Registro de la acción de selección (clic).
             * Solo se ejecuta si la aplicación no está ya en modo inspección
             * ni en proceso de transición (animación)
             */
            mesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {
                        if (AppState.mode === "inspect" || AppState.transitioning) return;
                        onSelect(funkoRoot);
                    }
                )
            );
        });
    });
}
