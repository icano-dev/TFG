// src/room/shelves/shelfModel.js

import { createShelfMaterial } from "../materials.js";

export function loadShelfModel(scene) {
    return new Promise((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh(
            "",
            "./assets/models/habitacion/",
            "estanteria2.glb",
            scene,
            function (meshes) {
                const shelf = meshes[0]; // raíz del modelo
                shelf.scaling = new BABYLON.Vector3(1, 1, 1);

                shelf.getChildMeshes().forEach(m => m.material = createShelfMaterial(scene));

                resolve(shelf);
            },
            null,
            function (scene, message) {
                reject("Error cargando estantería: " + message);
            }
        );
    });
}
