/**
 * harryPotter.js
 * ---------------------------------------------------------
 * Módulo que define la colección de Funkos de Harry Potter.
 * 
 * Este archivo actúa como un “mapa de colocación” que indica:
 *  - Qué figuras se cargan
 *  - Qué modelo 3D utiliza cada una
 *  - En qué estantería se coloca
 *  - En qué posición exacta (slot)
 *  - Qué escala y orientación se aplica
 */

export const hpCollection = [

  {
    id: "HarryPotter",                    // Identificador (enlaza con la base de datos)
    file: "harry-potter-reducido.glb",     // Modelo 3D
    shelf: "main",                       // Estantería destino
    slot: 1,                             // Slot dentro de la estantería
    scale: 0.25,                         // Escala específica para este Funko
    rotationY: 0                         // Rotación inicial (en grados)
  },
  {
    id: "Hermione",
    file: "hermione-reducido.glb",
    shelf: "main",
    slot: 3,
    scale: 0.25,
    rotationY: 0
  },
  {
    id: "Ron",
    file: "ron-reducido.glb",
    shelf: "main",
    slot: 4,
    scale: 0.25,
    rotationY: 0
  },
  {
    id: "Dumbledore",
    file: "dumbledore-reducido.glb",
    shelf: "main",
    slot: 9,
    scale: 0.25,
    rotationY: 0
  },
  {
    id: "Doby",
    file: "dobby-reducido.glb",
    shelf: "main",
    slot: 11,
    scale: 0.25,
    rotationY: 0
  }
];
