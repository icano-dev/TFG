
export function loadLogoModel(scene, filename) {
    return new Promise((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh(
            "",
            "./assets/models/logos/",
            filename,
            scene,
            function (meshes) {
                const logo = meshes[0]; // raíz del modelo
                console.log(logo.getChildMeshes());
                logo.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);


                
                resolve(logo);
            },
            null,
            function (scene, message) {
                reject("Error cargando logo: " + message);
            }
        );
    });
}
