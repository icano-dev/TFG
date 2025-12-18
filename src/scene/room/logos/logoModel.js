// src/room/logos/logoModel.js

export function createLogo(scene, {
    name,
    imagePath,
    width = 1,
    height = 0.4
}) {

    // Plano del logo
    const logo = BABYLON.MeshBuilder.CreatePlane(name, {
        width,
        height
    }, scene);

    // Material del logo
    const mat = new BABYLON.StandardMaterial(`${name}Mat`, scene);
    mat.diffuseTexture = new BABYLON.Texture(imagePath, scene);
    mat.diffuseTexture.hasAlpha = true;
    mat.backFaceCulling = false;

    logo.material = mat;

    return logo;
}
