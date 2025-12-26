import { AppState } from "../state/appState.js";

let isDragging = false;
let lastPointerX = 0;
let lastPointerY = 0;

const ROTATION_SPEED = 0.005;

export function enableFunkoRotation(scene) {

    scene.onPointerObservable.add((pointerInfo) => {

        if (AppState.mode !== "inspect") return;
        if (!AppState.selectedFunko) return;

        const funko = AppState.selectedFunko;

        switch (pointerInfo.type) {

            case BABYLON.PointerEventTypes.POINTERDOWN:
                isDragging = true;
                lastPointerX = pointerInfo.event.clientX;
                lastPointerY = pointerInfo.event.clientY;
                break;

            case BABYLON.PointerEventTypes.POINTERUP:
                isDragging = false;
                break;

            case BABYLON.PointerEventTypes.POINTERMOVE:
                if (!isDragging) return;

                const deltaX = pointerInfo.event.clientX - lastPointerX;
                const deltaY = pointerInfo.event.clientY - lastPointerY;

                funko.rotation.y -= deltaX * ROTATION_SPEED;
                funko.rotation.x -= deltaY * ROTATION_SPEED;

                lastPointerX = pointerInfo.event.clientX;
                lastPointerY = pointerInfo.event.clientY;
                break;
        }
    });
}
