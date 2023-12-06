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

const RingPositionX = 0
const RingPositionY = -30
const RingPositionZ = 150

const RingRotationX = 80
const RingRotationY = 0
const RingRotationZ = 0

const ConesPositionX = 0
const ConesPositionY = 10
const ConesPositionZ = 300
const ConesDivider = 100

const ConesRotationX = 180
const ConesRotationY = 45
const ConesRotationZ = 0

const ConesScaleX = 2
const ConesScaleY = 5
const ConesScaleZ = 2

map.customData.environment = [
  {
    id: "PanicEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0005,
        startY: -9999
      },
    }
  },

  // object removal

  {
    id: "GradientBackground",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "]Track",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Light (5)",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]NeonTube",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BackColumns",
    lookupMethod: "Contains",
    active: false
  },

  // Ring

  {
    id: "Panels4TrackLaneRing(Clone)",
    lookupMethod: "Contains",
    scale: [4, 4, 4]
  },
  {
    id: "Panels4TrackLaneRing(Clone)",
    lookupMethod: "EndsWith",
    position: [RingPositionX, RingPositionY, RingPositionZ],
    rotation: [RingRotationX, RingRotationY, RingRotationZ],
  },
  {
    id: "Panels4TrackLaneRing\\(Clone\\)\\.\\[\\d\\]GlowLine$",
    lookupMethod: "Regex",
    scale: [0.02, 0.02, 1000],
    components: {
      TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
      },
  },
  },
  {
    id: "Panels4TrackLaneRing\\(Clone\\)\\.\\[\\d\\]Ring$",
    lookupMethod: "Regex",
    scale: [25, 3, 5000]
  },

  // cone wall

  {
    id: "TopCones",
    lookupMethod: "EndsWith",
    position: [ConesPositionX + (ConesDivider * 2), ConesPositionY, ConesPositionZ],
    rotation: [ConesRotationX, ConesRotationY, ConesRotationZ],
    scale: [ConesScaleX, ConesScaleY, ConesScaleZ]
  },
  {
    id: "TopCones",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [-ConesPositionX - (ConesDivider * 2), ConesPositionY, ConesPositionZ],
    rotation: [ConesRotationX, -ConesRotationY, ConesRotationZ],
    scale: [-ConesScaleX, ConesScaleY, ConesScaleZ]
  },
  {
    id: "TopCones",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [ConesPositionX + (ConesDivider * 2), ConesPositionY, ConesPositionZ],
    rotation: [ConesRotationX, ConesRotationY, ConesRotationZ],
    scale: [ConesScaleX, -ConesScaleY, ConesScaleZ]
  },
  {
    id: "TopCones",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [-ConesPositionX - (ConesDivider * 2), ConesPositionY, ConesPositionZ],
    rotation: [ConesRotationX, -ConesRotationY, ConesRotationZ],
    scale: [-ConesScaleX, -ConesScaleY, ConesScaleZ]
  },

  // windows (NOT SYNCED W/ CONES)

  {
    id: "[5]Window",
    lookupMethod: "EndsWith",
    position: [-67.5, 92.5, 267.5],
    rotation: [0, -35, -10],
    scale: [90, 120, 1]
  },
  {
    id: "[6]Window",
    lookupMethod: "EndsWith",
    position: [67.5, 92.5, 267.5],
    rotation: [0, 35, 10],
    scale: [90, 120, 1]
  },

  // cone bridge

  {
    id: "BottomCones",
    lookupMethod: "EndsWith",
    position: [0, -0.05, 16.5],
    rotation: [180, 0, 0],
    scale: [0.4, 0.5, 0.5]
  },
  {
    id: "Spectrograms",
    lookupMethod: "EndsWith",
    position: [0, 1, 12.5],
    rotation: [0, 0, 0],
    scale: [0.4, 0.25, 0.139]
  },

  // bridge lights

  {
    id: "ConstructionGlowLine (4)",
    lookupMethod: "EndsWith",
    position: [-3, 0, 16.5],
    rotation: [90, 0, 0],
    scale: [2, 0.08, 0.25]
  },
  {
    id: "ConstructionGlowLine (5)",
    lookupMethod: "EndsWith",
    position: [3, 0, 16.5],
    rotation: [90, 0, 0],
    scale: [2, 0.08, 0.25]
  },
  {
    id: "ConstructionGlowLine (6)",
    lookupMethod: "EndsWith",
    position: [-2.5, 0, 16.5],
    rotation: [90, 0, 0],
    scale: [2, 0.08, 0.25]
  },
  {
    id: "ConstructionGlowLine (7)",
    lookupMethod: "EndsWith",
    position: [2.5, 0, 16.5],
    rotation: [90, 0, 0],
    scale: [2, 0.08, 0.25]
  },

  // star

  {
    id: "ConstructionGlowLine (8)",
    lookupMethod: "EndsWith",
    position: [-2, 0, 32],
    rotation: [90, 0, 0],
    scale: [1.5, -0.1775, 0.005]
  },
  {
    id: "ConstructionGlowLine (15)",
    lookupMethod: "EndsWith",
    position: [2, 0, 32],
    rotation: [90, 0, 0],
    scale: [1.5, -0.1775, 0.005]
  },

  // misc

  {
    id: "BigSmokePS",
    lookupMethod: "EndsWith",
    position: [RingPositionX, RingPositionY, RingPositionZ],
    rotation: [RingRotationX, RingRotationY, RingRotationZ],
    scale: [1.15, 1.15, 10000]
  },
  {
    id: "DustPS",
    lookupMethod: "EndsWith",
    scale: [300, 300, 300]
  },
  {
    id: "DirectionalLight",
    lookupMethod: "Contains",
    rotation: [-100, 0, 0]
  },
];

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
