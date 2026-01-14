/**
 * dc.js
 * ---------------------------------------------------------
 * Módulo que define la colección DC de Funkos.
 * 
 * Este archivo no contiene lógica, solo datos estructurados
 * que indican qué Funkos se cargan, qué modelo 3D utilizan y
 * en qué posición exacta se colocan dentro de la estantería.
 */

export const dcCollection = [

  {
    id: "aquaman",                 // Identificador único (enlaza con la base de datos JSON)
    file: "aquaman-reducido.glb",   // Archivo GLB del modelo 3D
    shelf: "top",                  // Estantería destino
    slot: 1                        // Posición dentro de la estantería
  },
  {
    id: "batman",
    file: "batman-reducido.glb",
    shelf: "top",
    slot: 3
  },
  {
    id: "flash",
    file: "flash-reducido.glb",
    shelf: "top",
    slot: 6
  },
  {
    id: "superman",
    file: "superman-reducido.glb",
    shelf: "bottom",
    slot: 0
  },
  {
    id: "wonderWoman",
    file: "wonderwoman-reducido.glb",
    shelf: "bottom",
    slot: 5
  }
];
