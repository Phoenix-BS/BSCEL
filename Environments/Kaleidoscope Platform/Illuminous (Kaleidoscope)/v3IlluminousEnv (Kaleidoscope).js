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

map.customData.environment = [
  {
    id: "KaleidoscopeEnvironment.[0]Environment",
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
        color: [0, 0, 0, 5],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, -90, 0],
    scale: [100, 0, 100],
    rotation: [0, 0, 45]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0, 0, 0, 5],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, 90, 0],
    scale: [100, 0, 100],
    rotation: [0, 0, 135]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0, 0, 0, 5],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, 90, 0],
    scale: [100, 0, 100],
    rotation: [0, 0, 225]
  },
  {
    geometry: {
      type: "Plane",
      material: {
        color: [0, 0, 0, 5],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, -90, 0],
    scale: [100, 0, 100],
    rotation: [0, 0, 315]
  },
  {
    id: "DustPS$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "GradientBackground$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "TrackMirror$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Construction$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "\\[\\d\\]Cone\\.\\[0\\]Cone$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "\\[\\d\\]Cone \\(\\d\\)\\.\\[0\\]Cone$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTube",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "ConeLight0$",
    lookupMethod: "Regex",
    active: true,
    position: [0, 22.5, 100],
    rotation: [180, 0, 0],
    scale: [25, 25, 0]
    // Cone Lights (Back Lasers)
  },
  {
    id: "ConeLight1$",
    lookupMethod: "Regex",
    active: true,
    position: [0, 0, 150],
    rotation: [180, 0, 0],
    scale: [1500, 5, 0]
    // Left / Right Lasers
  },
  {
    id: "ConeLight2",
    lookupMethod: "Contains",
    active: true,
    rotation: [0, 0, 0],
    // Diamond Lights (Big Rings)
  },
  {
    id: "ConeLight2$",
    lookupMethod: "Regex",
    active: true,
    position: [0, 0, 125],
    rotation: [0, 0, 0],
    scale: [1.5, 27.5, 0]
    // Diamond Lights (Big Rings)
  },
  {
    id: "ConeLight3$",
    lookupMethod: "Regex",
    active: false
    //Center Lights (Tiles)
  },
  {
    id: "SmallTrackLaneRings$",
    lookupMethod: "Regex",
    position: [0, 0, 50],
    rotation: [0, 0, 0],
    scale: [0, 0, 0]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
