"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";


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

let CubeOffset = 35;

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0001,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "TrackMirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Construction",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LaserLight0$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "GlowLineH",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "EnergyPanel$",
    lookupMethod: "Regex",
    position: [0, 0.2, 10]
  },
  {
    id: "LeftPanel$",
    lookupMethod: "Regex",
    position: [-2, 2, 10]
  },
  {
    id: "RightPanel$",
    lookupMethod: "Regex",
    position: [2, 2, 10]
  },
  {
    id: "GlowLineC$",
    lookupMethod: "Regex",
    active: true,
    position: [0, 0, 8.25],
    scale: [10, 5.5, 1],
    rotation: [90, 90, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.5, 0, 0, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [-5, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.5, 0.3, 0, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [-3, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.5, 0.5, 0, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [-1, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0, 0.5, 0, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [1, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0, 0.15, 0.5, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [3, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.35, 0, 0.5, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [5, 0, 0],
    scale: [0.2, 0, 500],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Sphere",
      material: {
        color: [9, 9, 9, 4],
        shader: "BTSPillar"
      }
    },
    position: [0, 300, 1750],
    scale: [1200, 1200, 1200],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [1, 1, 1, 1],
        shader: "Standard"
      }
    },
    position: [0, 0.002, 5],
    scale: [11, 5, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0.25, 0.25, 0.25, 10],
        shader: "BTSPillar"
      }
    },
    position: [0, 0.001, 5],
    scale: [12, 6, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-4, 0.003, 3],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-4, 0.003, 5],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-4, 0.003, 7],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-2, 0.003, 3],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-2, 0.003, 5],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-2, 0.003, 7],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [0, 0.003, 3],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [0, 0.003, 5],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [0, 0.003, 7],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [2, 0.003, 3],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [2, 0.003, 5],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [2, 0.003, 7],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [4, 0.003, 3],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [4, 0.003, 5],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [4, 0.003, 7],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-5, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-5, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-3, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-3, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-1, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [-1, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [1, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [1, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [3, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [3, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [5, 0.003, 4],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    geometry: {
      type: "Quad",
      material: {
        color: [0, 0, 0, 1],
        shader: "Standard"
      }
    },
    position: [5, 0.003, 6],
    scale: [1, 1, 1],
    rotation: [90, 0, 0]
  },
  {
    id: "CoreLighting\\.\\[\\d\\]DirectionalLight$",
    lookupMethod: "Regex",
    active: true,
    rotation: [-230, 0, 0]
  },
  {
    id: "StarsPS$",
    lookupMethod: "Regex",
    scale: [0, 0, 0]
  },
  {
    id: "StarsPS$",
    lookupMethod: "Regex",
    duplicate: 10,
    scale: [220, 220, 50],
    rotation: [90, 0, 0],
    position: [0, 250, 1200]
  },
  {
    id: "StarHemisphere$",
    lookupMethod: "Regex",
    active: true,
    scale: [1, 1, 1],
    position: [0, 0, 0]
  },
  {
    id: "DustPS$",
    lookupMethod: "Regex",
    active: false,
    scale: [250, 250, 250]
  },
  {
    id: "GlowLineL$",
    lookupMethod: "Regex",
    scale: [7.5, 500, 17.5],
    rotation: [90, 0, 0],
    position: [-6, 0, -1500]
  },
  {
    id: "GlowLineR$",
    lookupMethod: "Regex",
    scale: [7.5, 500, 17.5],
    rotation: [90, 0, 0],
    position: [6, 0, -1500]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    scale: [4.25, 10, 4.25],
    rotation: [-90, -90, -90],
    position: [0, 225, 1225]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    scale: [10, 3.5, 10],
    rotation: [90, 0, 0],
    position: [0, 300, 1200]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 0],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 15],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 30],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 45],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 60],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 75],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 90],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 105],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 120],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 135],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 150],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 165],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 180],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 195],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 210],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 225],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 240],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 255],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 270],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 285],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 300],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 315],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 330],
    position: [0, 300, 2500]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [42.5, 177.5, 100],
    rotation: [-20, 0, 345],
    position: [0, 300, 2500]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, -30],
    position: [-22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, 30],
    position: [-22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, -30],
    position: [22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, 30],
    position: [22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, -30],
    position: [-70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, 30],
    position: [-70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, -30],
    position: [70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [3.75, 0.1, 3],
    rotation: [0, 0, 30],
    position: [70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [-8, -4.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [8, -4.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [-8.5, -3.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [8.5, -3.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [-9, -2.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [9, -2.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [-9.5, -1.25, -1200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [0.25, 100, 3.5],
    rotation: [90, 0, 0],
    position: [9.5, -1.25, -1200]
  },
  {
    id: "\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, -10],
    position: [0, -60, 160]
  },
  {
    id: "\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, 10],
    position: [0, -60, 160]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, -20],
    position: [-8, -45, 170]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, 20],
    position: [8, -45, 170]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, -30],
    position: [-16, -30, 180]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, 30],
    position: [16, -30, 180]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, -40],
    position: [-24, -15, 190]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, 40],
    position: [24, -15, 190]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, -50],
    position: [-32, 0, 200]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [4, 12, 1.5],
    rotation: [0, 0, 50],
    position: [32, 0, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [-22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [-22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [22.5, 80, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [-70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [-70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [70, 50, 200]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    rotation: [0, 0, 0],
    position: [70, 50, 200]
  },
  {
    id: "SideLaser$",
    lookupMethod: "Regex",
    scale: [1800, 35, 50],
    rotation: [0, 0, 90],
    position: [0, 350, 1300]
  },
  {
    id: "SideLaser\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },


  // CUBE //
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -10.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -9.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -8.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -7.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -6.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -5.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -4.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -3.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -2.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -1.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      0.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      1.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      2.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      3.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      4.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      5.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      6.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      7.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      8.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      9.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      10.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      11.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      12.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      13.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      14.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      15.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      16.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      17.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      18.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      19.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -10.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -9.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -8.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -7.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -6.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -5.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -4.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -3.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -2.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      -1.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      0.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      1.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      2.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      3.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      4.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      5.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      6.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      7.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      8.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      9.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      10.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      11.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      12.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      13.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      14.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      15.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      16.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      17.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      18.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      Random(200,-200),
      19.999 * CubeOffset,
      Random(250,650)
    ],
    "scale": [
      Random(8,24),
      Random(8,24),
      Random(8,24)
    ],
    "rotation": [
      Random(-180,180),
      Random(-180,180),
      Random(-180,180)
    ]
  },
  {
    "id": "[0]Cube",
    "lookupMethod": "Contains",
    "active": false
  }
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
