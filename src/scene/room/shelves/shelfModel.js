// src/room/shelves/shelfModel.js

import { createShelfMaterial } from "../materials.js";

export function loadShelfModel(scene, filename) {
    return new Promise((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh(
            "",
            "./assets/models/habitacion/",
            filename,
            scene,
            function (meshes) {
                const shelf = meshes[0]; // raíz del modelo
                console.log(shelf.getChildMeshes());
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
