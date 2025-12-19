// src/room/shelves/shelfSlots.js

export function getGridShelfSlots() {

    const slots = [];

    const columns = 4;
    const rows = 2;

    const xSpacing = 0.3;
    const ySpacing = 0.32;

    const startX = -((columns - 1) * xSpacing) / 2;

    const baseHeight = 0.17; // ALTURA DE LA PRIMERA BALDA

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {

            slots.push({
                x: startX + col * xSpacing,
                y: baseHeight + (rows - 1 - row) * ySpacing,
                z: -0.1
            });
        }
    }

    return slots;
}


export function getFloatingShelfSlots() {

    const slots = [];

    const columns = 4;
    const rows = 4;

    const xSpacing = 0.85;
    const ySpacing = 0.65;

    const startX = -((columns - 1) * xSpacing) / 2;

    const baseHeight = 0.83; // balda superior

    for (let row = 0; row < rows; row++) {

        const y = baseHeight - row * ySpacing;

        for (let col = 0; col < columns; col++) {


            slots.push({
                x: startX + (columns - 1 - col) * xSpacing - 0.4,
                y,
                z: 0.15
            });
        }
    }

    return slots;
}
