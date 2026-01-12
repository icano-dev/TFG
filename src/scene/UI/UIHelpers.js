export function createLabelRow(label, value) {

    const row = new BABYLON.GUI.Grid();
    row.height = "100%";
    row.width = "100%";

    row.addColumnDefinition(0.4);
    row.addColumnDefinition(0.6);

    const key = new BABYLON.GUI.TextBlock();
    key.text = label + ":";
    key.color = "#ffd54f";
    key.fontSize = "60%";
    key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    key.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    const val = new BABYLON.GUI.TextBlock();
    val.text = value ?? "-";
    val.color = "#ffffff";
    val.fontSize = "60%";
    val.paddingLeft = "15%";
    val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    val.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    row.addControl(key, 0, 0);
    row.addControl(val, 0, 1);

    return row;
}
