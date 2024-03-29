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

// If you want to modify the Burger with tracks use these keywords: BottomBun, Lettuce1, Lettuce2, Lettuce3, Lettuce4, Patty, Cheese, Tomato, TopBun1, TopBun2

const BurgerHeightOffset = 0

// ^^^^^ Use this to move the Burgers positions up or down (Useful to avoid spawn animation clipping between the notes and the Burger)

map.customData.environment = [
  {
    id: "GreenDayEnvironment.[0]Environment",
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
    id: "Logo$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BaseL\\.\\[\\d\\]Laser\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BaseR\\.\\[\\d\\]Laser\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "GradientBackground",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GlowLineL",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GlowLineR",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GreenDayCity",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "TrackMirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "TrackConstruction",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LightLinesTrackLaneRing\\(Clone\\)\\.\\[\\d\\]GlowLine\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LightLinesTrackLaneRing\\(Clone\\)\\.\\[\\d\\]GlowLine \\(\\d\\)\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LightLinesTrackLaneRing(Clone)",
    lookupMethod: "Contains",
    position: [0, 0, 75],
    scale: [1.5, 250, 1.5]
  },
  {
    id: "FrontLight$",
    lookupMethod: "Regex",
    position: [0, -100, 60],
    scale: [1.5, 25, 1.5]
  },
  {
    id: "PS",
    lookupMethod: "Contains",
    active: false
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.8, 0.5, 0.2, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, -0.6 + BurgerHeightOffset, 30],
    scale: [7.5, 0.5, 7.5],
    rotation: [0, 0, 0],
    track: "BottomBun"
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.5, 0.8, 0.1, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, -0.45 + BurgerHeightOffset, 30],
    scale: [3.5, 0.1, 9.1],
    rotation: [0, 15, 0],
    track: "Lettuce1"
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.5, 0.8, 0.1, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, -0.45 + BurgerHeightOffset, 30],
    scale: [3.5, 0.1, 9.1],
    rotation: [0, 48, 0],
    track: "Lettuce2"
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.5, 0.8, 0.1, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, -0.45 + BurgerHeightOffset, 30],
    scale: [3.5, 0.1, 9.1],
    rotation: [0, 84, 0],
    track: "Lettuce3"
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.5, 0.8, 0.1, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, -0.45 + BurgerHeightOffset, 30],
    scale: [3.5, 0.1, 9.1],
    rotation: [0, 139, 0],
    track: "Lettuce4"
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.35, 0.05, 0, 1],
        shader: "InterscopeConcrete",
      },
    },
    position: [0, -0.125 + BurgerHeightOffset, 30],
    scale: [8.5, 0.35, 8.5],
    rotation: [0, 0, 0],
    track: "Patty"
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.9, 0.6, 0.02, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, 0.3 + BurgerHeightOffset, 30],
    scale: [7.5, 0.175, 7.5],
    rotation: [0, -45, 0],
    track: "Cheese"
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.9, 0.05, 0, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, 0.65 + BurgerHeightOffset],
    scale: [8, 0.2, 8],
    rotation: [0, 0, 0],
    track: "Tomato"
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.8, 0.5, 0.2, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, 1 + BurgerHeightOffset, 30],
    scale: [7.5, 0.25, 7.5],
    rotation: [0, 0, 0],
    track: "TopBun1"
  },
  {
    geometry: {
      type: "Sphere",
      material: {
        color: [0.8, 0.5, 0.2, 1],
        shader: "BTSPillar",
      },
    },
    position: [0, 1.3 + BurgerHeightOffset, 30],
    scale: [7.5, 3, 7.5],
    rotation: [0, 0, 0],
    track: "TopBun2"
  },
];




map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
