export function createLabelRow(label, value) {

    const row = new BABYLON.GUI.Grid();
    row.height = "36px";
    row.paddingTop = "8px";
    row.paddingBottom = "8px";
    row.width = "100%";

    row.addColumnDefinition(0.4);
    row.addColumnDefinition(0.6);

    const key = new BABYLON.GUI.TextBlock();
    key.text = label + ":";
    key.color = "#ffd54f";
    key.paddingRight = "20px";
    key.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

    const val = new BABYLON.GUI.TextBlock();
    val.text = value ?? "-";
    val.color = "#ffffff";
    val.paddingLeft = "10px";
    val.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    row.addControl(key, 0, 0);
    row.addControl(val, 0, 1);

    return row;
}
