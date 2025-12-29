import { AppState } from "../state/appState.js";
import { exitInspect } from "../state/appController.js";

let btn = null;

export function createReturnButton(scene, canvas) {
    btn = document.getElementById("exitInspectBtn");
    updateReturnButton(scene, canvas);

    btn.addEventListener("click", () => {
        exitInspect(scene, canvas);
    });
}

export function updateReturnButton(scene, canvas) {
    if (!btn) return;

    if (AppState.mode === "inspect" && !AppState.transitioning) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}