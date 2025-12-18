// src/room/shelves/shelfSlots.js

export function getGridShelfSlots() {

    const slots = [];

    const columns = 4;
    const rows = 4;

    const xSpacing = 0.45;
    const ySpacing = 0.35;

    const startX = -((columns - 1) * xSpacing) / 2;
    const startY = -((rows - 1) * ySpacing) / 2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {

            slots.push({
                x: startX + col * xSpacing,
                y: startY + row * ySpacing,
                z: 0.15
            });
        }
    }

    return slots;
}

export function getFloatingShelfSlots() {

    const slots = [];

    const shelves = 4;
    const perShelf = 4;

    const xSpacing = 0.45;
    const ySpacing = 0.35;

    const startX = -((perShelf - 1) * xSpacing) / 2;
    const startY = 0.6; // altura de la balda superior

    for (let shelf = 0; shelf < shelves; shelf++) {

        const y = startY - shelf * ySpacing;

        for (let i = 0; i < perShelf; i++) {
            slots.push({
                x: startX + i * xSpacing,
                y,
                z: 0.15
            });
        }
    }

    return slots;
}
