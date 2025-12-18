// src/room/shelves/shelfSlots.js

export function getGridShelfSlots() {

    const slots = [];

    const columns = 4;
    const rows = 2;

    const xSpacing = 0.3;
    const ySpacing = 0.3;

    const xOffset = 0;

    const startX = -((columns - 1) * xSpacing) / 2;

    const baseHeight = 0.18; // ALTURA DE LA PRIMERA BALDA

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {

            slots.push({
                x: startX + col * xSpacing + xOffset,
                y: baseHeight + (rows - 1 - row) * ySpacing,
                z: -0.1
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
