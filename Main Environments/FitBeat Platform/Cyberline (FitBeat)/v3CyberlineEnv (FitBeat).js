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

const LaserDistance = 22.5 // Distance of left / right lasers
const LaserOffset = 1 // Multiple applied to left / right lasers

map.customData.environment = [
  {
    id: "FitBeatEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0005,
        startY: -30,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    position: [0, 9, 75],
    rotation: [0, 0, 0],
    scale: [2.5, 5, 1.5]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 9, 75],
    rotation: [0, 0, 72],
    scale: [2.5, 5, 1.5]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 9, 75],
    rotation: [0, 0, 144],
    scale: [2.5, 5, 1.5]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 9, 75],
    rotation: [0, 0, 216],
    scale: [2.5, 5, 1.5]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 9, 75],
    rotation: [0, 0, 288],
    scale: [2.5, 5, 1.5]
  },
  {
    id: "Spectrograms$",
    lookupMethod: "Regex",
    position: [0, -7.5, 75],
    rotation: [0, 0, 0],
    scale: [5, 0.5, 1]
  },
  {
    id: "RotatingLasersPair$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * LaserOffset],
    rotation: [90, 0, 0],
    scale: [2, 0.6, 2]
  },
  {
    id: "RotatingLasersPair \\(1\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 2)],
    rotation: [90, 0, 0],
    scale: [2, 0.8, 2]
  },
  {
    id: "RotatingLasersPair \\(2\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 3)],
    rotation: [90, 0, 0],
    scale: [2, 1, 2]
  },
  {
    id: "RotatingLasersPair \\(3\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 4)],
    rotation: [90, 0, 0],
    scale: [2, 1.2, 2]
  },
  {
    id: "RotatingLasersPair \\(4\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 5)],
    rotation: [90, 0, 0],
    scale: [2, 1.4, 2]
  },
  {
    id: "RotatingLasersPair \\(5\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 6)],
    rotation: [90, 0, 0],
    scale: [2, 1.6, 2]
  },
  {
    id: "RotatingLasersPair \\(6\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 7)],
    rotation: [90, 0, 0],
    scale: [2, 1.8, 2]
  },
  {
    id: "RotatingLasersPair \\(7\\)$",
    lookupMethod: "Regex",
    position: [0, -5, LaserDistance * (LaserOffset * 8)],
    rotation: [90, 0, 0],
    scale: [2, 2, 2]
  },
  {
    id: "BigCenterLightTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]Neon$",
    lookupMethod: "Regex",
    scale: [0.5, 200, 2]
  },
  {
    id: "BigCenterLightTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]Neon \\(1\\)$",
    lookupMethod: "Regex",
    scale: [0.5, 200, 2]
  },
  {
    id: "BigCenterLightTrackLaneRing(Clone).[0]Ring",
    lookupMethod: "Contains",
    scale: [1.25, 3, 1]
  },
  {
    id: "DustPS$",
    lookupMethod: "Regex",
    scale: [100, 100, 100]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
