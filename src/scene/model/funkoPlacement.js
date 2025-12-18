// src/model/funkoPlacement.js

import { getGridShelfSlots } from "../room/shelves/shelfSlots.js";

export function placeFunkosOnGridShelf({
    shelf,
    funkoBase,
    slotIndex
}) {

    const slots = getGridShelfSlots();
    const slot = slots[slotIndex];

    if (!slot) {
        console.warn("Slot inexistente:", slotIndex);
        return null;
    }

        const funko = funkoBase.clone(`funko_${funkoBase.name}_${slotIndex}`);
        funko.setEnabled(true);
        funko.parent = shelf;

        funko.position = new BABYLON.Vector3(
            slot.x,
            slot.y,
            slot.z
        );

        return funko
}
