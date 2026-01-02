let popup = null;
let currentImages = [];
let index = 0;

export function createGallerySection(data) {
    const container = new BABYLON.GUI.StackPanel();
    container.paddingTop = "12px";

    const btn = new BABYLON.GUI.TextBlock();
    btn.text = "Ver galería";
    btn.height = "30px";
    btn.color = "#4fc3f7";
    btn.fontSize = "16px";
    btn.isPointerBlocker = true;
    btn.hoverCursor = "pointer";

    btn.onPointerUpObservable.add(() => openGallery(data.images));

    container.addControl(btn);

    if (!popup) createPopup();

    return container;
}

function createPopup() {
    popup = new BABYLON.GUI.Rectangle("galleryPopup");
    popup.width = "420px";
    popup.height = "520px";
    popup.background = "rgba(0,0,0,0.9)";
    popup.thickness = 0;
    popup.isVisible = false;
    popup.zIndex = 999;

    const img = new BABYLON.GUI.Image("galleryImage", "");
    img.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    img.width = "90%";
    img.height = "90%";

    popup._img = img;

    const closeBtn = BABYLON.GUI.Button.CreateSimpleButton("close", "✖");
    closeBtn.width = "40px";
    closeBtn.height = "40px";
    closeBtn.color = "#ffffff";
    closeBtn.background = "#c62828";
    closeBtn.thickness = 0;
    closeBtn.cornerRadius = 20;
    closeBtn.top = "10px";
    closeBtn.left = "-10px";
    closeBtn.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    closeBtn.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    closeBtn.onPointerUpObservable.add(() => popup.isVisible = false);
    popup.addControl(closeBtn);

    popup.addControl(img);

    const left = BABYLON.GUI.Button.CreateSimpleButton("prev", "◀");
    const right = BABYLON.GUI.Button.CreateSimpleButton("next", "▶");

    [left, right].forEach(btn => {
        btn.color = "#ffd54f";
        btn.background = "rgba(0,0,0,0.5)";
        btn.thickness = 0;
        btn.cornerRadius = 25;
    });


    left.width = right.width = "50px";
    left.height = right.height = "50px";

    left.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    right.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    popup.addControl(left);
    popup.addControl(right);

    left.onPointerUpObservable.add(() => change(-1));
    right.onPointerUpObservable.add(() => change(1));

    BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("galleryUI").addControl(popup);
}

function openGallery(images = []) {
    if (!images.length) return;
    currentImages = images;
    index = 0;
    popup._img.source = currentImages[0];
    popup.isVisible = true;
}

function change(dir) {
    index = (index + dir + currentImages.length) % currentImages.length;
    popup._img.source = currentImages[index];
}



