/**
 * marvel.js
 * ---------------------------------------------------------
 * Módulo que define la colección de Funkos Marvel.
 * 
 * Este archivo actúa como un mapa de distribución que indica:
 *  - Qué Funkos se cargan
 *  - Qué modelo 3D utiliza cada uno
 *  - En qué estantería se colocan
 *  - En qué slot exacto se posicionan
 */

export const marvelCollection = [

  {
    id: "capitanAmerica",               // Identificador del Funko
    file: "capitan-america.glb",        // Modelo 3D
    shelf: "top",                       // Estantería superior
    slot: 0                             // Posición dentro de la estantería
  },
  {
    id: "hulk",
    file: "hulk.glb",
    shelf: "top",
    slot: 2
  },
  {
    id: "ironman",
    file: "ironman.glb",
    shelf: "top",
    slot: 7
  },
  {
    id: "thor",
    file: "thor.glb",
    shelf: "bottom",
    slot: 1
  },
  {
    id: "spiderman",
    file: "spiderman.glb",
    shelf: "bottom",
    slot: 4
  }
];
