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

const LaserAnchorX = 40
const LaserOffsetX = 2

const LaserAnchorZ = 50
const LaserOffsetZ = 15

const BloomAnchor = 8
const BloomOffset = 12

map.customData.materials = {
  "StoneMaterial": {
    "shader": "Standard",
    "color": [0, 0, 0]
  },
  "LightMaterial": {
    "shader": "OpaqueLight",
    "color": [0, 0, 0]
  },
};

map.customData.environment = [
  {
    id: "BillieEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.005,
        startY: -40,
        height: 1
      },
    }
  },

  // Object Removal

  {
    id: "BackgroundGradient",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Rain",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LeftRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "RightRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "FarRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "RailingFull",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "RailingCurveF",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "NeonTubeDirectionalL\\.\\[\\d+\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTubeDirectionalR\\.\\[\\d+\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTubeDirectionalL \\(\\d\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTubeDirectionalR \\(\\d\\)$",
    lookupMethod: "Regex",
    active: false
  },

  // Miscellanious

  {
    id: "Clouds",
    lookupMethod: "Contains",
    position: [0, 100, 120],
    scale: [20, 20, 30],
  },
  {
    id: "Waterfall$",
    lookupMethod: "Regex",
    position: [0, -40, 150],
    scale: [25, 5, 50],
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, -15, 50],
    scale: [10, 0.05, 50],
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -20, 50],
    scale: [10, 0.05, 50],
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -25, 50],
    scale: [10, 0.05, 50],
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -30, 50],
    scale: [10, 0.05, 50],
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -35, 50],
    scale: [10, 0.05, 50],
  },
  {
    id: "DayAndNight",
    lookupMethod: "Contains",
    position: [0, -30, 1250],
    scale: [4, 4, 1],
  },
  {
    id: "TunnelRotatingLasersPair \\(\\d+\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [25, 60, 110],
    scale: [16, 0.05, 8],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 500,
        bloomFogIntensityMultiplier: 500
      },
    },
  },
  {
    id: "TunnelRotatingLasersPair \\(\\d+\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-25, 60, 110],
    scale: [16, 0.05, 8],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 500,
        bloomFogIntensityMultiplier: 500
      },
    },
  },

  // Left Lasers

  {
    id: "BottomPairLasers\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX, -60, LaserAnchorZ],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + LaserOffsetX, -60, LaserAnchorZ + LaserOffsetZ],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 2), -60, LaserAnchorZ + (LaserOffsetZ * 2)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 3), -60, LaserAnchorZ + (LaserOffsetZ * 3)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 4), -60, LaserAnchorZ + (LaserOffsetZ * 4)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 5), -60, LaserAnchorZ + (LaserOffsetZ * 5)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 6), -60, LaserAnchorZ + (LaserOffsetZ * 6)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 7), -60, LaserAnchorZ + (LaserOffsetZ * 7)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX + (LaserOffsetX * 8), -60, LaserAnchorZ + (LaserOffsetZ * 8)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, -120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },


  // Right Lasers

  {
    id: "BottomPairLasers\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX, -60, LaserAnchorZ],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - LaserOffsetX, -60, LaserAnchorZ + LaserOffsetZ],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 2), -60, LaserAnchorZ + (LaserOffsetZ * 2)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 3), -60, LaserAnchorZ + (LaserOffsetZ * 3)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 4), -60, LaserAnchorZ + (LaserOffsetZ * 4)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 5), -60, LaserAnchorZ + (LaserOffsetZ * 5)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 6), -60, LaserAnchorZ + (LaserOffsetZ * 6)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 7), -60, LaserAnchorZ + (LaserOffsetZ * 7)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },
  {
    id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserAnchorX - (LaserOffsetX * 8), -60, LaserAnchorZ + (LaserOffsetZ * 8)],
    scale: [2.5, 2.5, 7.5],
    rotation: [80, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },

  // Mountain Dupes
  
  {
    id: "t\\.\\[\\d+\\]Mountains$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: false,
    duplicate: 1
  },

  // Mountain Range

  {
    id: "t\\.\\[\\d+\\]Mountains$",
    lookupMethod: "Regex",
    active: true,
    position: [-5, -40, 25],
    scale: [0.4, 5, 0.75],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [0, -40, -20],
    scale: [0.325, 2.5, 1],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-5, -40, -15],
    scale: [0.3, 1, 2],
    rotation: [0, 180, 0]
  },

  // // Mountain Floor


  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-5, -60, 25],
    scale: [0.25, 3, 0.25],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-10, -90, 50],
    scale: [0.25, 1.25, 0.75],
    rotation: [0, -60, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [0, -160, 126],
    scale: [0.2, 4, 0.5],
    rotation: [0, 180, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [0, -50, -10],
    scale: [0.1, 0.5, 0.35],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-5, -40, 64],
    scale: [0.35, 0.35, 0.075],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Mountains\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)\\(Clone\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-5, -40, 0],
    scale: [0.5, 0.3, 0.85],
    rotation: [0, 0, 0]
  },

  // Arch Geometry

  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [0, 19, 250],
    rotation: [0, 0, 0],
    scale: [150, 15, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-10, 16, 250],
    rotation: [0, 0, 15],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [10, 16, 250],
    rotation: [0, 0, -15],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-12, 16, 250],
    rotation: [0, 0, 30],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [12, 16, 250],
    rotation: [0, 0, -30],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-15, 16, 250],
    rotation: [0, 0, 45],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [15, 16, 250],
    rotation: [0, 0, -45],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-18, 14, 250],
    rotation: [0, 0, 60],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [18, 14, 250],
    rotation: [0, 0, -60],
    scale: [15, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-21, 11, 250],
    rotation: [0, 0, 75],
    scale: [18, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [21, 11, 250],
    rotation: [0, 0, -75],
    scale: [18, 12.5, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-26, -30, 250],
    rotation: [0, 0, 0],
    scale: [18, 70, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [26, -30, 250],
    rotation: [0, 0, 0],
    scale: [18, 70, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [-35, -20, 250],
    rotation: [0, 0, 0],
    scale: [18, 70, 10]
  },
  {
    geometry: { type: "Cube", material: "StoneMaterial" },
    position: [35, -20, 250],
    rotation: [0, 0, 0],
    scale: [18, 70, 10]
  },
];

// Bloom Bottom Lights (ty swifter for the code <3)

// For laser = 0, 1, 2, 3
for (let laser = 0; laser <= 3; laser++) {

  // For left (-1) and right (1) sides
  for (let side = -1; side <= 1; side += 2) {

    // Whether to add the variation e.g. " (number)" text in id
    const variationText =
      laser > 0
        ? ` \\(${laser}\\)`
        : ""

    // L or R for side
    const sideText = side === -1 ? "L" : "R"


    // Insert variation (nothing or " (number)") text and side (L or R)
    const id = `LightRailingSegment${variationText}.\\[\\d+\\]NeonTubeDirectional${sideText}$`

    // Z position

    // (BloomAnchor * size) --> negative for left, positive for right
    // (BloomOffset * laser) --> offset per laser
    const x = (BloomAnchor * side) + (BloomOffset * laser * side)

    // Push
    map.customData.environment.push({
      id: id,
      lookupMethod: "Regex",
      position: [x, -20, -50],
      scale: [10, 100, 25],
      components: {
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 100,
          bloomFogIntensityMultiplier: 100
        },
      },
    })
  }
};

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
