"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";
map.rawEnvironment = [];

///// ^^^^^ input ^^^^^ /////
///// vvv workspace vvv /////

map.customData = { pointDefinitions: {}, customEvents: [], environment: [] };

const customData = map.customData;
const obstacles = map.obstacles;
const notes = map.notes;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

map.customData.environment = [
  {
    id: "KDAEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.005,
        startY: -75,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "DirectionalLight",
    lookupMethod: "Contains",
    rotation: [60, 0, 0]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Crystal$",
    lookupMethod: "Regex",
    position: [-4, 4, 10],
    rotation: [0, 135, 0],
    scale: [5, 5, 5]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Crystal$",
    lookupMethod: "Regex",
    position: [4, 4, 10],
    rotation: [0, -135, 0],
    scale: [5, 5, 5]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, -10, 0],
    rotation: [0, 0, 0],
    scale: [6, 3, 10]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 5,
    position: [0, -0.25, 0],
    rotation: [0, 0, 0],
    scale: [15, 0.01, 15]
  },
  {
    id: "GlowLine$",
    lookupMethod: "Regex",
    localRotation: [90, 0, 0],
    scale: [1.25, 9999, 0.5]
  },
  {
    id: "GlowLine \\(\\d+\\)$",
    lookupMethod: "Regex",
    localRotation: [90, 0, 0],
    scale: [1.25, 9999, 0.5]
  },
  {
    id: "FloorMirror$",
    lookupMethod: "Regex",
    position: [0, 0, 45],
    rotation: [0, 180, 0],
    scale: [0.4, 1, 5]
  },
  {
    id: "t\\.\\[\\d\\]Construction$",
    lookupMethod: "Regex",
    position: [0, 0.05, -10],
    rotation: [90, 180, 0],
    scale: [0.8, 3, 0.005]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    position: [2.5, 10, 0],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    position: [-2.5, 10, 0],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, 7.5, 20],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, 7.5, 20],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, 5, 40],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, 5, 40],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, 2.5, 60],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, 2.5, 60],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, 0, 80],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, 0, 80],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -2.5, 100],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -2.5, 100],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -5, 120],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -5, 120],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -7.5, 140],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -7.5, 140],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -10, 160],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -10, 160],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -12.5, 180],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -12.5, 180],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [2.5, -15, 200],
    rotation: [0, -90, -60],
    scale: [2, 1, 4]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Trail$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-2.5, -15, 200],
    rotation: [0, 90, 60],
    scale: [2, 1, 4]
  },

  // Outer Pillars

  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [-44, -10, 45],
    scale: [5, 40, 3],
    rotation: [0, 30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [44, -10, 45],
    scale: [5, 40, 3],
    rotation: [0, -30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [-44, -10, 65],
    scale: [5, 35, 3],
    rotation: [0, 30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [44, -10, 65],
    scale: [5, 35, 3],
    rotation: [0, -30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [-44, -10, 85],
    scale: [5, 30, 3],
    rotation: [0, 30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [44, -10, 85],
    scale: [5, 30, 3],
    rotation: [0, -30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [-44, -10, 105],
    scale: [5, 25, 3],
    rotation: [0, 30, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.4, 0.4, 0.4, 1],
        shader: "Standard",
      }
    },
    position: [44, -10, 105],
    scale: [5, 25, 3],
    rotation: [0, -30, 0]
  },
  {
    id: "GlowTopLine$",
    lookupMethod: "Regex",
    position: [0, 18, 0],
    scale: [4, 4, 5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5
      }
    }
  },
  {
    id: "GlowTopLine \\(1\\)$",
    lookupMethod: "Regex",
    position: [-10, 16, 0],
    rotation: [92, -2.5, 0],
    scale: [4, 4, 5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5
      }
    }
  },
  {
    id: "GlowTopLine \\(2\\)$",
    lookupMethod: "Regex",
    position: [10, 16, 0],
    rotation: [92, 2.5, 0],
    scale: [4, 4, 5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5
      }
    }
  },
  {
    id: "GlowTopLine \\(3\\)$",
    lookupMethod: "Regex",
    position: [-20, 14, 0],
    rotation: [94, -5, 0],
    scale: [4, 4, 5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5
      }
    }
  },
  {
    id: "GlowTopLine \\(4\\)$",
    lookupMethod: "Regex",
    position: [20, 14, 0],
    rotation: [94, 5, 0],
    scale: [4, 4, 5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5
      }
    }
  },
  {
    id: "RotatingLasersPair$",
    lookupMethod: "Regex",
    position: [0, -0.5, 25],
    scale: [0.7, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(1\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 27.5],
    scale: [0.65, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(2\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 30],
    scale: [0.6, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(3\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 32.5],
    scale: [0.55, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(4\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 35],
    scale: [0.5, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(5\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 37.5],
    scale: [0.45, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(6\\)$",
    lookupMethod: "Regex",
    position: [0, -0.5, 40],
    scale: [0.4, 1, 2]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    position: [0, -72.5, 5],
    scale: [10, 30, 1]
  },
  {
    id: "Laser \\(2\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, -10],
    position: [2, -0.05, 20],
    scale: [3, 3, 3]
  },
  {
    id: "Laser \\(3\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, -20],
    position: [2, -0.05, 30],
    scale: [3, 3, 3]
  },
  {
    id: "Laser \\(4\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, -30],
    position: [2, -0.05, 40],
    scale: [3, 3, 3]
  },
  {
    id: "Laser \\(7\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, 10],
    position: [-2, -0.05, 20],
    scale: [3, 3, 3]
  },
  {
    id: "Laser \\(8\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, 20],
    position: [-2, -0.05, 30],
    scale: [3, 3, 3]
  },
  {
    id: "Laser \\(9\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, 30],
    position: [-2, -0.05, 40],
    scale: [3, 3, 3]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Spear$",
    lookupMethod: "Regex",
    position: [-5, -7.5, 5],
    rotation: [-90, 15, 0],
    scale: [5, 15, 3]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Spear$",
    lookupMethod: "Regex",
    position: [5, -7.5, 5],
    rotation: [-90, -15, 0],
    scale: [5, 15, 3]
  },
  {
    id: "TentacleLeft\\.\\[\\d\\]Spear$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-5, -12.5, 60],
    rotation: [-90, 20, 0],
    scale: [5, 15, 3]
  },
  {
    id: "TentacleRight\\.\\[\\d\\]Spear$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [5, -12.5, 60],
    rotation: [-90, -20, 0],
    scale: [5, 15, 3]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
