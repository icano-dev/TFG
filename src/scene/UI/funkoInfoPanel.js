import { getFunkoById } from "../data/funkoDataBase.js";

let uiTexture = null;
let panel = null;
let visible = false;
let imagePopup = null;
let popupVisible = false;
let currentImages = [];
let currentImageIndex = 0;



function initPanelGUI(scene) {
    uiTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("funkoPanelUI", true, scene);
}

export function createFunkoPanel(scene) {
    if (!uiTexture) initPanelGUI(scene);
    if (panel) return;

    panel = new BABYLON.GUI.Rectangle("funkoPanel");
    panel.width = "360px";
    panel.height = "500px";
    panel.cornerRadius = 18;
    panel.thickness = 2;
    panel.color = "#919191ff";
    panel.background = "linear-gradient(180deg, #1b1b1b, #2b2b2b)";

    panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    panel.left = "-150px";

    const stack = new BABYLON.GUI.StackPanel();
    stack.paddingTop = "80px";
    stack.paddingLeft = "20px";
    stack.paddingRight = "20px";
    stack.isVertical = true;

    panel.addControl(stack);
    panel._content = stack; 

}

export function fillFunkoPanel(funko) {

    if (!panel || !panel._content) return;

    const data = getFunkoById(funko.metadata.id);
    if (!data) return;

    const content = panel._content;
    panel._content.isVertical = true;
    panel._content.height = "100%";
    panel._content.width = "100%";

    content.clearControls();

    const title = new BABYLON.GUI.TextBlock();
    title.text = data.name;
    title.fontSize = "30px";
    title.height = "60px";
    title.color = "#ffd54f";
    content.addControl(title);

    const fields = [
        ["Colección", data.collection],
        ["Número", data.number],
        ["Año", data.year],
        ["Rareza", data.rarity],
        ["Variantes", data.Variants],
    ];

    fields.forEach(([label, value]) => {

        const row = new BABYLON.GUI.StackPanel();
        row.isVertical = false;
        row.height = "30px";
        row.paddingTop = "4px";
        row.paddingBottom = "4px";

        const key = new BABYLON.GUI.TextBlock();
        key.text = label + ": ";
        key.color = "#000000ff";
        key.width = "140px";
        key.paddingRight = "5px";
        key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        const val = new BABYLON.GUI.TextBlock();
        val.text = value;
        val.color = "#ffffff";
        val.width = "160px";
        val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        row.addControl(key);
        row.addControl(val);
        content.addControl(row);
    });


    const desc = new BABYLON.GUI.TextBlock();
    desc.text = data.description;
    desc.textWrapping = true;
    desc.color = "#bbb";
    desc.resizeToFit = true;
    desc.paddingTop = "12px";
    desc.paddingBottom = "12px";
    content.addControl(desc);


    createImagePopup();

    const link = new BABYLON.GUI.TextBlock();
    link.text = "🔍 Ver galería";
    link.color = "#4fc3f7";
    link.height = "30px";
    link.fontSize = "16px";
    link.paddingTop = "12px";
    link.isPointerBlocker = true;
    link.hoverCursor = "pointer";


    link.onPointerUpObservable.add(() => {
        currentImages = data.images;
        currentImageIndex = 0;
        imagePopup._img.source = currentImages[0];
        imagePopup.isVisible = true;
    });


    content.addControl(link);


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

function createImagePopup() {
    if (imagePopup) return;

    imagePopup = new BABYLON.GUI.Rectangle("imagePopup");
    imagePopup.width = "70%";
    imagePopup.height = "80%";
    imagePopup.background = "rgba(0,0,0,0.85)";
    imagePopup.thickness = 0;
    imagePopup.isVisible = false;
    imagePopup.zIndex = 1000;

    const img = new BABYLON.GUI.Image("popupImage", "");
    img.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    img.width = "90%";
    img.height = "90%";

    imagePopup._img = img;
    imagePopup.addControl(img);

    uiTexture.addControl(imagePopup);

    imagePopup.onPointerUpObservable.add(() => {
        imagePopup.isVisible = false;
        popupVisible = false;
    });

    const leftBtn = BABYLON.GUI.Button.CreateSimpleButton("prevImg", "◀");
    leftBtn.width = "50px";
    leftBtn.height = "50px";
    leftBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    const rightBtn = BABYLON.GUI.Button.CreateSimpleButton("nextImg", "▶");
    rightBtn.width = "50px";
    rightBtn.height = "50px";
    rightBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    imagePopup.addControl(leftBtn);
    imagePopup.addControl(rightBtn);

    leftBtn.onPointerUpObservable.add(() => changeImage(-1));
    rightBtn.onPointerUpObservable.add(() => changeImage(1));

    function changeImage(dir) {
        if (!currentImages.length) return;
        currentImageIndex = (currentImageIndex + dir + currentImages.length) % currentImages.length;
        imagePopup._img.source = currentImages[currentImageIndex];
    }

}

