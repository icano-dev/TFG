export function enableFunkoSelection(scene, funkos, onSelect) {

    funkos.forEach(funkoRoot => {

        // Incluimos el root + todos sus hijos
        const pickableMeshes = [
            funkoRoot,
            ...funkoRoot.getChildMeshes()
        ];

        pickableMeshes.forEach(mesh => {

            mesh.isPickable = true;

            mesh.actionManager = new BABYLON.ActionManager(scene);

            mesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPickTrigger,
                    () => {
                        onSelect(funkoRoot);
                    }
                )
            );
        });
    });

}
