// src/room/shelves/shelfPlacement.js

import { loadShelfModel } from "./shelfModel.js";

export async function placeShelves(scene, room) {

    // 1️⃣ cargamos una estantería base
    const baseShelf = await loadShelfModel(scene);

    // 2️⃣ La hacemos hija de la habitación
    baseShelf.parent = room;

    // 3️⃣ La colocamos EN LA PARED que quieras:
    // Ejemplo: pared derecha (X=7)
    baseShelf.position = new BABYLON.Vector3(6.2, 0.9, 4);
    baseShelf.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(360), 0);

    // // 4️⃣ Si quieres DUPLICAR:
    // const shelf2 = baseShelf.clone("shelf2");
    // shelf2.position = new BABYLON.Vector3(6.5, 0, -2);

    // 5️⃣ Si quieres estanterías en otra pared:
    const shelf3 = baseShelf.clone("shelf3");
    shelf3.position = new BABYLON.Vector3(-6.5, 0, 0);
    shelf3.rotation = new BABYLON.Vector3(0, BABYLON.Tools.ToRadians(-90), 0);

    return { baseShelf, shelf2, shelf3 };
}
