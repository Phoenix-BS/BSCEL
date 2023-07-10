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

let OffsetXL = -150
let OffsetXR = 150
let OffsetYB = -150
let OffsetYT = 150
let OffsetZ = 75

let ScaleX = 15
let ScaleY = 1.5
let ScaleZ = 5

let RotationXBL = 45
let RotationXBR = -45
let RotationXTL = 135
let RotationXTR = -135

// Default / Preset Values:

// let OffsetXL = -150
// let OffsetXR = 150
// let OffsetYB = -150
// let OffsetYT = 150
// let OffsetZ = 75

// let ScaleX = 15
// let ScaleY = 1.5
// let ScaleZ = 5

// let RotationXBL = 45
// let RotationXBR = -45
// let RotationXTL = 135
// let RotationXTR = -135

map.customData.environment = [

  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    position: [OffsetXL, OffsetYB, 2 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 0.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 3 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 0.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 4 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 0.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 5 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 1 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 6 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 1.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 7 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 1.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 8 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 1.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 9 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 2 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 10 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 2.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 11 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 2.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 12 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 2.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 13 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 3 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 14 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 3.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYB, 15 * OffsetZ],
    rotation: [RotationXBL, 90, 0],
    scale: [ScaleX, 3.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 2 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 0.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 3 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 0.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 4 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 0.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 5 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 1 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 6 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 1.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 7 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 1.5 * ScaleY, ScaleZ],
    track: "Spike"
  }, {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 8 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 1.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 9 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 2 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 10 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 2.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 11 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 2.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 12 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 2.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 13 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 3 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 14 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 3.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYB, 15 * OffsetZ],
    rotation: [RotationXBR, 90, 0],
    scale: [ScaleX, 3.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 2 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 0.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 3 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 0.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 4 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 0.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 5 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 1 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 6 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 1.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 7 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 1.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 8 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 1.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 9 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 2 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 10 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 2.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 11 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 2.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 12 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 2.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 13 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 3 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 14 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 3.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXL, OffsetYT, 15 * OffsetZ],
    rotation: [RotationXTL, 90, 0],
    scale: [ScaleX, 3.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 2 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 0.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 3 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 0.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 4 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 0.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 5 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 1 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 6 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 1.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 7 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 1.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 8 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 1.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 9 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 2 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 10 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 2.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 11 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 2.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 12 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 2.75 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 13 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 3 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 14 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 3.25 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "BottomCones$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [OffsetXR, OffsetYT, 15 * OffsetZ],
    rotation: [RotationXTR, 90, 0],
    scale: [ScaleX, 3.5 * ScaleY, ScaleZ],
    track: "Spike"
  },
  {
    id: "PanicEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.00001,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "Panels4TrackLaneRing\\(Clone\\)$",
    lookupMethod: "Regex",
    position: [0, 0, -10],
    rotation: [0, 0, 0],
    scale: [12.5, 5000, 12.5]
  },
  {
    id: "TrackConstruction$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "PlayersPlace$",
    lookupMethod: "Regex",
    active: true,
    track: "PlayerStuff"
  },
  {
    id: "BasicGameHUD$",
    lookupMethod: "Regex",
    track: "PlayerStuff"
  },
  {
    id: "ConstructionGlowLine$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(15\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(8\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(5\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(4\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(7\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [100, -250, 175],
    rotation: [0, 0, 0],
    scale: [75, 75, 75]
  },
  {
    id: "ConstructionGlowLine \\(6\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-100, -250, 175],
    rotation: [0, 0, 0],
    scale: [75, 75, 75]
  },
  {
    id: "\\[\\d\\]Ring$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Light \\(5\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BackColumns$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Spectrograms$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "TopCones$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "GradientBackground$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTube",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Laser\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    scale: [0.05, 2000, 0.05]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair$",
    lookupMethod: "Regex",
    position: [0, 50, 100],
    rotation: [-30, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
  {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(1\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 200],
    rotation: [-15, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(2\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 300],
    rotation: [0, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(3\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 400],
    rotation: [15, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(4\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 500],
    rotation: [30, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(5\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 600],
    rotation: [45, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
   {
    id: ".*Environment\\.\\[\\d*\\]RotatingLasersPair \\(6\\)$",
    lookupMethod: "Regex",
    position: [0, 50, 700],
    rotation: [60, 0, 0],
    scale: [12.5, 12.5, 12.5]
  },
  {
    id: "Mirror$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Window$",
    lookupMethod: "Regex",
    position: [0, 0, 1750],
    scale: [35000, 5000000, 1]
  },
];


map.customData.customEvents.push(

  // {
  //   b: 0,
  //   t: "AnimateTrack",
  //   d: {
  //     track: "Spike",
  //     duration: 0.25,
  //     repeat: 32,
  //     repeataddtime: 0.25,
  //     scale: [
  //       [ScaleX, ScaleY, ScaleZ, 0],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.05, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.1, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.15, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.2, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.25, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.3, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.35, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.4, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.45, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.5, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.55, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.6, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.65, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.7, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.75, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.8, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.85, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.9, "easeInSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 0.95, "easeOutSine"],
  //       [Random(0.0005, 1.5) * ScaleX, Random(0.0005, 5) * ScaleY, Random(0.0005, 2.5) * ScaleZ, 1, "easeInSine"],
  //     ]
  //   }
  // }

  // Randomly Generated Glitch Effect (used during https://youtu.be/9g2nz88j4I0?t=36)
);



/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
