// src/model/funkoModel.js

export async function loadFunkoModel(scene, {
    name,
    folder,
    file,
    scale = 0.25,
    rotationY = 180
}) {
    return new Promise((resolve, reject) => {

        BABYLON.SceneLoader.ImportMesh(
            "",
            `./assets/models/${folder}/`,
            file,
            scene,
            (meshes) => {

                const funko = meshes[0];
                funko.name = name;

                funko.scaling = new BABYLON.Vector3(scale, scale, scale);
                funko.rotation = new BABYLON.Vector3(
                    0,
                    BABYLON.Tools.ToRadians(rotationY),
                    0
                );

                funko.setEnabled(false); //  base oculta

                resolve(funko);
            },
            null,
            (_, message) => reject(message)
        );
    });
}
