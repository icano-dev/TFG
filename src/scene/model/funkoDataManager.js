import { loadFunkoModel } from "./funkoModel.js";
import { placeFunkosOnGridShelf, placeFunkosOnFloatingShelf } from "./funkoPlacement.js";

export async function setupCollection(scene, {
    collection,
    folder,
    shelfMap,
    placementType = "grid",
    scale = 0.13,
    rotationY = 180
}) {

    const modelCache = new Map();

    for (const funko of collection) {

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

        const shelf = shelfMap[funko.shelf];

        if (!shelf) {
            console.warn(`Shelf "${funko.shelf}" no existe para`, funko.id);
            continue;
        }

        if (placementType === "grid") {
            placeFunkosOnGridShelf({
                shelf,
                funkoBase: baseModel,
                slotIndex: funko.slot
            });
        } else if (placementType === "floating") {
            placeFunkosOnFloatingShelf({
                shelf,
                funkoBase: baseModel,
                slotIndex: funko.slot
            });
        }
    }
}
