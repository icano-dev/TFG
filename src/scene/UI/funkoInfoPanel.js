let uiTexture = null;
let panel = null;
let visible = false;

function initPanelGUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("funkoPanelUI", true, scene);
}

export function createFunkoPanel(scene) {
    if (!uiTexture) initPanelGUI(scene);
    if (panel) return;

    panel = new BABYLON.GUI.Rectangle("funkoPanel");
    panel.width = "360px";
    panel.height = "500px";
    panel.cornerRadius = 12;
    panel.color = "white";
    panel.thickness = 1;
    panel.background = "rgba(20,20,20,0.85)";

    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    panel.left = "-150px";

    const stack = new BABYLON.GUI.StackPanel();
    stack.paddingTop = "20px";
    stack.paddingLeft = "20px";
    stack.paddingRight = "20px";
    stack.isVertical = true;

    panel.addControl(stack);
    panel._content = stack;   // ← guardamos referencia

}

export function fillFunkoPanel(funko) {
    if (!panel || !panel._content) return;

    const content = panel._content;
    content.clearControls();

    const title = new BABYLON.GUI.TextBlock();
    title.text = funko.metadata.name;
    title.fontSize = "24px";
    title.height = "40px";
    title.color = "white";
    content.addControl(title);

    const fields = [
        ["Colección", funko.metadata.collection],
        ["Número", funko.metadata.number],
        ["Año", funko.metadata.year],
        ["Rareza", funko.metadata.rarity],
    ];

    fields.forEach(([label, value]) => {
        const t = new BABYLON.GUI.TextBlock();
        t.text = `${label}: ${value}`;
        t.height = "28px";
        t.color = "#ccc";
        content.addControl(t);
    });

    const desc = new BABYLON.GUI.TextBlock();
    desc.text = funko.metadata.description;
    desc.textWrapping = true;
    desc.height = "160px";
    desc.color = "#aaa";
    content.addControl(desc);
}


export function showFunkoPanel(scene, funko) {
    if (!panel) createFunkoPanel(scene);
    fillFunkoPanel(funko);

    if (!visible) {
        uiTexture.addControl(panel);
        visible = true;
    }
}

export function hideFunkoPanel() {
    if (!uiTexture || !panel || !visible) return;

    uiTexture.removeControl(panel);
    visible = false;
}
