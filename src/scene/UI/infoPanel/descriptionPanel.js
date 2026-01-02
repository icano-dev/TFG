export function createDescriptionSection(text) {

    const frame = new BABYLON.GUI.Rectangle();
    frame.height = "120px";
    frame.width = "90%";
    frame.thickness = 1;
    frame.color = "#333";
    frame.cornerRadius = 10;
    frame.paddingTop = "8px";
    frame.paddingBottom = "8px";
    frame.paddingLeft = "8px";
    frame.paddingRight = "8px";

    const scroll = new BABYLON.GUI.ScrollViewer();
    scroll.width = "100%";
    scroll.height = "100%";
    scroll.thickness = 0;
    scroll.barColor = "#ffd54f";
    scroll.background = "transparent";

    const textBlock = new BABYLON.GUI.TextBlock();
    textBlock.text = text;
    textBlock.color = "#ddd";
    textBlock.textWrapping = true;
    textBlock.fontSize = "13px";
    textBlock.resizeToFit = true;

    scroll.addControl(textBlock);
    frame.addControl(scroll);

    return frame;
}
