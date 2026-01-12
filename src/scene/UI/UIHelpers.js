export function createLabelRow(label, value, isMobile = false) {

    const row = new BABYLON.GUI.Grid();
    row.height = isMobile ? "32px" : "36px";
    row.paddingTop = isMobile ? "6px" : "8px";
    row.paddingBottom = isMobile ? "6px" : "8px";
    row.width = "100%";

    row.addColumnDefinition(isMobile ? 0.45 : 0.4);
    row.addColumnDefinition(isMobile ? 0.55 : 0.6);

    const key = new BABYLON.GUI.TextBlock();
    key.text = label + ":";
    key.color = "#ffd54f";
    key.fontSize = isMobile ? "18px" : "20px";
    key.paddingRight = isMobile ? "10px" : "20px";
    key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    const val = new BABYLON.GUI.TextBlock();
    val.text = value ?? "-";
    val.color = "#ffffff";
    val.fontSize = isMobile ? "30px" : "20px";
    val.paddingLeft = isMobile ? "6px" : "10px";
    val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    row.addControl(key, 0, 0);
    row.addControl(val, 0, 1);

    return row;
}
