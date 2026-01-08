/**
 * appState.js
 * ---------------------------------------------------------
 * Clase que representa el estado global de la aplicación.
 * 
 * Centraliza la información necesaria para controlar:
 *  - En qué modo se encuentra la aplicación
 *  - Qué Funko está seleccionado
 *  - Si se está realizando una animacion de cámara o transicion de escena
 */

export class AppState {

    /**
     * Crea una nueva instancia del estado global.
     */
    constructor() {

        /**
         * Modo actual de la aplicación.
         * "gallery" → navegación libre por la sala
         * "inspect" → modo inspección de un Funko
         */
        this.mode = "gallery";

        /**
         * Referencia al Funko actualmente seleccionado.
         */
        this.selectedFunko = null;

        /**
         * Indica si se está produciendo una animacion (transicion).
         * Se usa para bloquear interacciones durante animaciones.
         */
        this.transitioning = false;
    }
}
