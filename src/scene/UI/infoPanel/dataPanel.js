import { createLabelRow } from "../UIHelpers.js";

export function createDataSection(data) {
    const container = new BABYLON.GUI.StackPanel();
    container.paddingTop = "30px";
    container.paddingBottom = "30px";
    container.width = "100%";
    container.isVertical = true;

    const fields = [
        ["Colección", data.collection],
        ["Número", data.number],
        ["Año", data.year],
        ["Rareza", data.rarity],
        ["Variantes", data.Variants],
    ];

    fields.forEach(([label, value]) => {
        container.addControl(createLabelRow(label, value));
    });

    return container;
}
