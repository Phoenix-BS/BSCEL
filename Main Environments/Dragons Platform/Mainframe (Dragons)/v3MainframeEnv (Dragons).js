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

const LaserOffset = 10;
const LaserScaleOffset = 5;

map.customData.environment = [
  {
    id: "DragonsEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0001,
        startY: -100,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.005, 0.005, 0.005, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [0, -40, 0],
    scale: [100, 0, 100],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.005, 0.005, 0.005, 5],
        shader: "InterscopeConcrete"
      }
    },
    position: [0, 100, 0],
    scale: [100, 0, 100],
    rotation: [180, 0, 0]
  },
  {
    id: "Underground$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "HallConstruction$",
    lookupMethod: "Regex",
    scale: [15, 5, 5],
    rotation: [0, 0, 180],
    position: [0, 20, 50]
  },
  {
    id: "HallConstruction$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [15, 5, 5],
    rotation: [0, 0, 0],
    position: [0, 20, 50]
  },
  {
    id: "Spectrograms\\.\\[0\\]Spectrogram$",
    lookupMethod: "Regex",
    scale: [3, 20, 1.5],
    rotation: [90, 60, 0],
    position: [32.5, 0, 325]
  },
  {
    id: "Spectrograms\\.\\[1\\]Spectrogram$",
    lookupMethod: "Regex",
    scale: [3, 20, 1.5],
    rotation: [90, -60, 0],
    position: [-32.5, 0, 325]
  },
  {
    id: "DragonsSidePSL$",
    lookupMethod: "Regex",
    scale: [8, 3, 1],
    rotation: [0, -30, 90],
    position: [-150, 15, 170]
  },
  {
    id: "DragonsSidePSR$",
    lookupMethod: "Regex",
    scale: [8, 3, 1],
    rotation: [0, 30, 90],
    position: [150, 15, 170]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    scale: [70, 3.5, 70],
    rotation: [0, 0, 0],
    position: [0, 15, 450]
  },
  {
    id: "GradientBackground$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    scale: [30, 70, 3],
    rotation: [0, 0, 90],
    position: [125, 20, 300]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [30, 70, 3],
    rotation: [0, 0, -90],
    position: [-125, 20, 300]
  },
  {
    id: "ConstructionGlowLine \\(6\\)$",
    lookupMethod: "Regex",
    active: false
    // Big Rings L
  },
  {
    id: "ConstructionGlowLine \\(1\\)$",
    lookupMethod: "Regex",
    active: false
    // Big Rings R
  },
  {
    id: "ConstructionGlowLine \\(4\\)$",
    lookupMethod: "Regex",
    scale: [8, 2.25, 0.25],
    rotation: [90, 0, 0],
    position: [-7.5, 55, 0]
    // Back Laser L
  },
  {
    id: "ConstructionGlowLine \\(5\\)$",
    lookupMethod: "Regex",
    scale: [8, 2.25, 0.25],
    rotation: [90, 0, 0],
    position: [7.5, 55, 0]
    // Back Laser R
  },
  {
    id: "GlowLineL$",
    lookupMethod: "Regex",
    active: true,
    scale: [100, 100, 100],
    rotation: [0, 0, 0],
    position: [-150, -50, 250]
    // Center Line L
  },
  {
    id: "GlowLineR$",
    lookupMethod: "Regex",
    active: true,
    scale: [100, 100, 100],
    rotation: [0, 0, 0],
    position: [150, -50, 250]
    // Center Line R
  },
  {
    id: "BigTrackLaneRing(Clone).[0]Ring",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BigTrackLaneRing(Clone)",
    lookupMethod: "Contains",
    rotation: [90, 0, 0],
    scale: [0.75, 9, 0.1]
  },
  {
    id: "BigTrackLaneRing\\(Clone\\)$",
    lookupMethod: "Regex",
    position: [0, -40, 130]
  },
  {
    id: "PanelsTrackLaneRing(Clone)",
    lookupMethod: "Contains",
    rotation: [-90, 0, 0],
    scale: [2.5, 7.5, 4]
  },
  {
    id: "PanelsTrackLaneRing\\(Clone\\)$",
    lookupMethod: "Regex",
    position: [0, -12.5, 125]
  },
  {
    id: "RotatingLasersPair$",
    lookupMethod: "Regex",
    scale: [4, 1 * LaserScaleOffset, 15],
    rotation: [-90, 0, 0],
    position: [0, 40, 14 * LaserOffset]
  },
  {
    id: "RotatingLasersPair \\(1\\)$",
    lookupMethod: "Regex",
    scale: [4, 1.5 * LaserScaleOffset, 15],
    rotation: [-90, 0, 0],
    position: [0, 40, 18 * LaserOffset]
  },
  {
    id: "RotatingLasersPair \\(2\\)$",
    lookupMethod: "Regex",
    scale: [4, 2 * LaserScaleOffset, 15],
    rotation: [-90, 0, 0],
    position: [0, 40, 22 * LaserOffset]
  },
  {
    id: "RotatingLasersPair \\(3\\)$",
    lookupMethod: "Regex",
    scale: [4, 2.5 * LaserScaleOffset, 15],
    rotation: [-90, 0, 0],
    position: [0, 40, 26 * LaserOffset]
  },
  {
    id: "RotatingLasersPair \\(4\\)$",
    lookupMethod: "Regex",
    scale: [4, 3 * LaserScaleOffset, 15],
    rotation: [-90, 0, 0],
    position: [0, 40, 30 * LaserOffset]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
