/**
 * funkoRotation.js
 * ---------------------------------------------------------
 * Módulo encargado de permitir la rotación manual de un Funko
 * cuando el usuario se encuentra en modo inspección.
 * 
 * El usuario puede hacer clic y arrastrar con el ratón para girar
 * la figura en los ejes X e Y, permitiendo observarla desde
 * cualquier ángulo.
 */

import { AppState } from "../state/appState.js";

/**
 * Indica si el usuario está arrastrando el ratón.
 */
let isDragging = false;

/**
 * Últimas posiciones conocidas del puntero.
 */
let lastPointerX = 0;
let lastPointerY = 0;

/**
 * Velocidad de rotación del Funko.
 * Cuanto mayor sea el valor, más rápido gira.
 */
const ROTATION_SPEED = 0.005;

/**
 * Habilita el sistema de rotación interactiva de Funkos.
 * 
 * @param {BABYLON.Scene} scene Escena Babylon principal
 */
export function enableFunkoRotation(scene) {

    /**
     * Se añade un observador de eventos de puntero a la escena.
     */
    scene.onPointerObservable.add((pointerInfo) => {

        /**
         * La rotación solo se permite si la aplicación está en modo inspección
         * y existe un Funko actualmente seleccionado.
         */
        if (AppState.mode !== "inspect") return;
        if (!AppState.selectedFunko) return;

        const funko = AppState.selectedFunko;

        switch (pointerInfo.type) {

            /**
             * El usuario presiona el botón del ratón: comienza el arrastre.
             */
            case BABYLON.PointerEventTypes.POINTERDOWN:
                isDragging = true;
                lastPointerX = pointerInfo.event.clientX;
                lastPointerY = pointerInfo.event.clientY;
                break;

            /**
             * El usuario suelta el botón del ratón: finaliza el arrastre.
             */
            case BABYLON.PointerEventTypes.POINTERUP:
                isDragging = false;
                break;

            /**
             * El usuario mueve el ratón mientras mantiene pulsado:
             * se calcula la diferencia de movimiento y se aplica la rotación.
             */
            case BABYLON.PointerEventTypes.POINTERMOVE:
                if (!isDragging) return;

                const deltaX = pointerInfo.event.clientX - lastPointerX;
                const deltaY = pointerInfo.event.clientY - lastPointerY;

                /**
                 * Rotación del Funko en los ejes Y y X.
                 */
                funko.rotation.y -= deltaX * ROTATION_SPEED;
                funko.rotation.x -= deltaY * ROTATION_SPEED;

                lastPointerX = pointerInfo.event.clientX;
                lastPointerY = pointerInfo.event.clientY;
                break;
        }
    });
}
