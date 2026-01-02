export function createTittle(data) {
    const container = new BABYLON.GUI.StackPanel();
    container.height = "70px";
    container.paddingBottom = "10px";
    container.isVertical = true;

    const title = new BABYLON.GUI.TextBlock();
    title.text = data.name;
    title.fontSize = "26px";
    title.height = "40px";
    title.color = "#ffd54f";
    title.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    const subtitle = new BABYLON.GUI.TextBlock();
    subtitle.text = `${data.collection} · #${data.number}`;
    subtitle.fontSize = "14px";
    subtitle.height = "20px";
    subtitle.color = "#bbb";
    subtitle.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

    container.addControl(title);
    container.addControl(subtitle);

    return container;
}
