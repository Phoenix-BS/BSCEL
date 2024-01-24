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

let RingScaleX = 0.25
let RingScaleY = 0.5

let RingOffsetZ = 250

let RingShapeScaleZ = 5

// Default //

// let RingScaleX = 0.25
// let RingScaleY = 0.5

// let RingOffsetZ = 125

// let RingShapeScaleZ = 5

// Goofy Ahh infinite ring thingies //

// let RingScaleX = 50
// let RingScaleY = 0

// let RingOffsetZ = 60

// let RingShapeScaleZ = 500000

// Vertical Origin Rings //

// let RingScaleX = 50
// let RingScaleY = 0.0075

// let RingOffsetZ = 100

// let RingShapeScaleZ = 5

// Cyberspace Rings //

// let RingScaleX = 0.05
// let RingScaleY = 125

// let RingOffsetZ = 150

// let RingShapeScaleZ = 5

map.customData.environment = [

  {
    id: "OriginsEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0005,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "TrackMirror$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "TrackConstruction$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "t\\.\\[\\d\\]Construction$",
    lookupMethod: "Regex",
    position: [0, -2.5, -1185],
    rotation: [0, 0, 0],
    scale: [3.5, 1, 150]
  },
  {
    id: "SidePSL$",
    lookupMethod: "Regex",
    position: [0, -2.75, 75],
    rotation: [90, 0, 0],
    scale: [1, 3.5, 0.05]
  },
  {
    id: "SidePSL$",
    lookupMethod: "Regex",
    duplicate: 4,
    position: [0, -2.75, 75],
    rotation: [90, 0, 0],
    scale: [1, 3.5, 0.05]
  },
  {
    id: "SidePSR$",
    lookupMethod: "Regex",
    position: [0, -2.75, 75],
    rotation: [90, 0, 0],
    scale: [1, 3.5, 0.05]
  },
  {
    id: "SidePSR$",
    lookupMethod: "Regex",
    duplicate: 4,
    position: [0, -2.75, 75],
    rotation: [90, 0, 0],
    scale: [1, 3.5, 0.05]
  },
  {
    id: "SidePSR$",
    lookupMethod: "Regex",
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0, 0, 0]
  },
  {
    id: "\\[0\\]Spectrogram$",
    lookupMethod: "Regex",
    position: [-9, 6.5, -5],
    rotation: [0, 0, 0],
    scale: [0.5, 1, 1.85]
  },
  {
    id: "\\[1\\]Spectrogram$",
    lookupMethod: "Regex",
    position: [9, 6.5, -5],
    rotation: [0, 0, 0],
    scale: [0.5, 1, 1.85]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0.005, 0.005, 0.005, 1],
        shader: "Standard"
      }
    },
    position: [0, -3, 0],
    scale: [1.6, 0, 10000],
    rotation: [0, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]NeonTube$",
    lookupMethod: "Regex",
    active: true,
    position: [-5.25, -2.5, -20],
    rotation: [90, 0, 0],
    scale: [4, 3, 3]
  },
  {
    id: "t\\.\\[\\d+\\]NeonTube \\(1\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [5.25, -2.5, -20],
    rotation: [90, 0, 0],
    scale: [4, 3, 3]
  },
  {
    id: "t\\.\\[\\d+\\]Laser$",
    lookupMethod: "Regex",
    active: true,
    position: [3.5, -2.99, 750],
    rotation: [90, 0, 0],
    scale: [40, 10, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Laser \\(1\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [1.25, -2.99, 750],
    rotation: [90, 0, 0],
    scale: [40, 10, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Laser \\(2\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-1.25, -2.99, 750],
    rotation: [90, 0, 0],
    scale: [40, 10, 0]
  },
  {
    id: "t\\.\\[\\d+\\]Laser \\(3\\)$",
    lookupMethod: "Regex",
    active: true,
    position: [-3.5, -2.99, 750],
    rotation: [90, 0, 0],
    scale: [40, 10, 0]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    position: [0, -9999, -9999]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -240, 125],
    rotation: [0, 0, 0],
    scale: [80, 120, 10]
  },
  {
    id: "FrontLights$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 302, 125],
    rotation: [0, 0, 180],
    scale: [80, 120, 10]
  },
  {
    id: "RotatingLasersPair\\.\\[\\d\\]BaseL$",
    lookupMethod: "Regex",
    position: [-8.5, -4, 25],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair\\.\\[\\d\\]BaseR$",
    lookupMethod: "Regex",
    position: [8.5, -4, 25],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(1\\)\\.\\[\\d\\]BaseL$",
    lookupMethod: "Regex",
    position: [-8.5, -4.5, 35],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(1\\)\\.\\[\\d\\]BaseR$",
    lookupMethod: "Regex",
    position: [8.5, -4.5, 35],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(2\\)\\.\\[\\d\\]BaseL$",
    lookupMethod: "Regex",
    position: [-8.5, -5, 45],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(2\\)\\.\\[\\d\\]BaseR$",
    lookupMethod: "Regex",
    position: [8.5, -5, 45],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(3\\)\\.\\[\\d\\]BaseL$",
    lookupMethod: "Regex",
    position: [-8.5, -5.5, 55],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(3\\)\\.\\[\\d\\]BaseR$",
    lookupMethod: "Regex",
    position: [8.5, -5.5, 55],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(4\\)\\.\\[\\d\\]BaseL$",
    lookupMethod: "Regex",
    position: [-8.5, -6, 65],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id: "RotatingLasersPair \\(4\\)\\.\\[\\d\\]BaseR$",
    lookupMethod: "Regex",
    position: [8.5, -6, 65],
    rotation: [0, 0, 0],
    scale: [2, 5, 2]
  },
  {
    id : "GameCore.[1]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, RingOffsetZ]
  },
  {
    id : "GameCore.[1]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[1]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[1]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[1]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1 * RingScaleX, 1 * RingScaleY, 1]

  },
  {
    id : "GameCore.[2]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 5 + RingOffsetZ]
  },
  {
    id : "GameCore.[2]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[2]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[2]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[2]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[3]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 10 + RingOffsetZ]
  },
  {
    id : "GameCore.[3]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[3]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[3]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[3]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[4]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 15 + RingOffsetZ]
  },
  {
    id : "GameCore.[4]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[4]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[4]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[4]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[5]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 20 + RingOffsetZ]
  },
  {
    id : "GameCore.[5]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[5]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[5]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[5]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[6]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 25 + RingOffsetZ]
  },
  {
    id : "GameCore.[6]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.5 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[6]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.5 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[6]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.5 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[6]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.5 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[7]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 30 + RingOffsetZ]
  },
  {
    id : "GameCore.[7]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.6 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[7]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.6 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[7]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.6 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[7]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.6 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[8]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 35 + RingOffsetZ]
  },
  {
    id : "GameCore.[8]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.7 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[8]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.7 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[8]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.7 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[8]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.7 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[9]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 40 + RingOffsetZ]
  },
  {
    id : "GameCore.[9]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.8 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[9]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.8 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[9]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.8 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[9]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.8 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[10]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 45 + RingOffsetZ]
  },
  {
    id : "GameCore.[10]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [1.9 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[10]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.9 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[10]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.9 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[10]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [1.9 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[11]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 50 + RingOffsetZ]
  },
  {
    id : "GameCore.[11]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[11]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[11]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[11]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[12]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 55 + RingOffsetZ]
  },
  {
    id : "GameCore.[12]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [2.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[12]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[12]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[12]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.1 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[13]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 60 + RingOffsetZ]
  },
  {
    id : "GameCore.[13]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [2.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[13]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[13]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[13]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.2 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[14]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 65 + RingOffsetZ]
  },
  {
    id : "GameCore.[14]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [2.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[14]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[14]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[14]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.3 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[15]LightsTrackLaneRing(Clone)",
    lookupMethod : "Exact",
    active : true,
    scale : [5,5,RingShapeScaleZ],
    localPosition : [0,0, 70 + RingOffsetZ]
  },
  {
    id : "GameCore.[15]LightsTrackLaneRing(Clone).[0]Laser",
    lookupMethod : "Exact",
    active : true,
    scale : [2.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[15]LightsTrackLaneRing(Clone).[1]Laser (1)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[15]LightsTrackLaneRing(Clone).[2]Laser (2)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  {
    id : "GameCore.[15]LightsTrackLaneRing(Clone).[3]Laser (3)",
    lookupMethod : "Exact",
    active : true,
    scale : [2.4 * RingScaleX, 1 * RingScaleY, 1]
  },
  ];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
