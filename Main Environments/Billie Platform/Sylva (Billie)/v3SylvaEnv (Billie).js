"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";

///// ^^^^^ input ^^^^^ /////
///// vvv workspace vvv /////

map.customData = { pointDefinitions: {}, materials: {}, customEvents: [], environment: [] };

const customData = map.customData;
const obstacles = map.obstacles;
const notes = map.notes;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;
const materials = customData.materials;

function lerp(a, b, t) {
  return (b - a) * t + a
}

function Random(min, max) {
  return lerp(min, max, Math.random())
}

function randBias(min, max, exp) {
  return lerp(min, max, Math.pow(Math.random(), exp));
}

// Tree1 Position (The tree the player sits on)
const Tree1X = 0
const Tree1Y = 0
const Tree1Z = -10

const LaserAnchorX = 75
const LaserOffsetX = 5

const LaserAnchorZ = 100
const LaserOffsetZ = 25

map.customData.materials = {
  "TreeMaterial": {
    "shader": "Standard",
    "color": [0.44, 0.29, 0.26]
  },
  "WoodMaterial": {
    "shader": "Standard",
    "color": [0.45, 0.37, 0.22]
  },
  "LightMaterial": {
    "shader": "OpaqueLight",
    "color": [1, 1, 0.75]
  },
  "LeafMaterial": {
    "shader": "Standard",
    "color": [0.4, 0.8, 0.25]
  },
};

map.customData.environment = [

  {
    id: "BillieEnvironment.[0]Environment",
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

  // Object Removal

  {
    id: "Railing",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BackgroundGradient",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "LeftRail",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "RightRail",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "FarRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Tunnel",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "WaterRainRipples",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Rain",
    lookupMethod: "EndsWith",
    active: false
  },

  // Misc Environment Objects

  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    localPosition: [0, 100, 50],
    scale: [80, 80, 80]
  },
  {
    id: "BigSmokePS",
    lookupMethod: "EndsWith",
    position: [0, -44.9, 0],
    scale: [75, 0.025, 150]
  },
  {
    id: "Waterfall",
    lookupMethod: "EndsWith",
    position: [0, -45, -750],
    scale: [200, 1, 20],
  },
  {
    id: "DayAndNight",
    lookupMethod: "EndsWith",
    position: [0, -2000, 1500],
    scale: [125, 125, 1]
  },
  {
    id: "Mountains",
    lookupMethod: "EndsWith",
    position: [0, -45, 150],
    scale: [1.25, 5, 0.75],
  },
  {
    id: "DirectionalLight",
    lookupMethod: "Contains",
    rotation: [60, 0, 0]
  },

  // Left Lasers

  {
    id: "BottomPairLasers\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [-LaserAnchorX, -60, LaserAnchorZ],
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, -120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
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
    scale: [5, 5, 7.5],
    rotation: [30, 0, 120],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 5
      },
    },
  },


  // Player Tree

  {
    geometry: { type: "Cylinder", material: "TreeMaterial" },
    position: [Tree1X, Tree1Y, Tree1Z],
    rotation: [0, 0, 0],
    scale: [10, 75, 10],
  },
  {
    geometry: { type: "Cylinder", material: "WoodMaterial" },
    position: [Tree1X, Tree1Y - 0.5, Tree1Z + 1],
    rotation: [0, 0, 0],
    scale: [25, 0.5, 25],
  },

  {
    geometry: { type: "Cylinder", material: "WoodMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 1.25, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.25, 1.5, 0.25],
  },
  {
    geometry: { type: "Cylinder", material: "WoodMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 1.25, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.25, 1.5, 0.25],
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.35, 0.4, 0.35],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 1,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.35, 0.4, 0.35],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 1,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 2.7, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 2.7, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 3.1, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 3.1, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 0, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 90, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 1.75, Tree1Y + 2.9, Tree1Z + 13],
    rotation: [0, 90, 0],
    scale: [0.05, 0.375, 0.375],
  },

  {
    geometry: { type: "Cylinder", material: "WoodMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 0.2, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.25, 0.5, 0.25],
  },
  {
    geometry: { type: "Cylinder", material: "WoodMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 0.2, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.25, 0.5, 0.25],
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.35, 0.4, 0.35],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 1,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.35, 0.4, 0.35],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 1,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 0.7, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 0.7, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 1.1, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 1.1, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.375, 0.05, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 0, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X + 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 90, 0],
    scale: [0.05, 0.375, 0.375],
  },
  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [Tree1X - 2.5, Tree1Y + 0.9, Tree1Z + 12.8],
    rotation: [0, 90, 0],
    scale: [0.05, 0.375, 0.375],
  },

  // Bridge Base

  {
    geometry: { type: "Cube", material: "WoodMaterial" },
    position: [0, -0.275, 25],
    rotation: [0, 0, 0],
    scale: [6, 0.2, 500],
    // scale: [Random(5,6),Random(0.3,0.4),Random(0.6,0.75)],
  },
];

for (let i = 0; i < 10; i++) {

  let LeafHeight = Random(60, 80)

  let LeafRotationX = Random(-30, 30)
  let LeafRotationY = Random(-180, 180)
  let LeafRotationZ = Random(-30, 30)

  let LeafScaleX = Random(15, 60)
  let LeafScaleY = Random(15, 40)
  let LeafScaleZ = Random(15, 60)

  map.customData.environment.push(
    {
      geometry: { type: "Sphere", material: "LeafMaterial" },
      position: [Tree1X, LeafHeight, Tree1Z],
      rotation: [LeafRotationX, LeafRotationY, LeafRotationZ],
      scale: [LeafScaleX, LeafScaleY, LeafScaleZ],
    },
  );
}

for (let i = 0; i < 50; i++) {
  let TreeX = Random(50, 400)
  let TreeY = Random(-20, 0)
  let TreeZ = Random(-300, 1200)

  let TreeScale = Random(15, 30)
  let TreeHeight = Random(120, 240)

  map.customData.environment.push(
    {
      geometry: { type: "Cylinder", material: "TreeMaterial" },
      position: [TreeX, TreeY, TreeZ],
      rotation: [0, 0, 0],
      scale: [TreeScale, TreeHeight, TreeScale],
    },
    {
      geometry: { type: "Cylinder", material: "TreeMaterial" },
      position: [-TreeX, TreeY, TreeZ],
      rotation: [0, 0, 0],
      scale: [TreeScale, TreeHeight, TreeScale],
    },
  );
  let c = Math.random()
  let plat = TreeY * Random(0.8, 1.2)
  let rot = Random(-180, 180)
  if (c <= 0.5) {
    map.customData.environment.push(
      // Right
      {
        geometry: { type: "Cylinder", material: "WoodMaterial" },
        position: [TreeX, plat, TreeZ],
        rotation: [0, 0, 0],
        scale: [TreeScale * 2.5, 1, TreeScale * 2.5],
      },
      // Left
      {
        geometry: { type: "Cylinder", material: "WoodMaterial" },
        position: [-TreeX, plat, TreeZ],
        rotation: [0, 0, 0],
        scale: [TreeScale * 2.5, 1, TreeScale * 2.5],
      },
    );
  } else {
    map.customData.environment.push(
      // Right
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [TreeX, TreeY + 5, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 4, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [TreeX, TreeY + 25, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 4, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 0.5, 20, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 20, TreeScale * 0.5],
      },
      {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.125, 20, TreeScale * 1.125],
        components: {
          ILightWithId: {
            type: 7
          },
          TubeBloomPrePassLight: {
            colorAlphaMultiplier: 20,
            bloomFogIntensityMultiplier: 2.5
          }
        },
      },
      // Left
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-TreeX, TreeY + 5, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 4, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-TreeX, TreeY + 25, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 4, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 0.5, 20, TreeScale * 1.15],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.15, 20, TreeScale * 0.5],
      },
      {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [-TreeX, TreeY + 15, TreeZ],
        rotation: [0, rot, 0],
        scale: [TreeScale * 1.125, 20, TreeScale * 1.125],
        components: {
          ILightWithId: {
            type: 6
          },
          TubeBloomPrePassLight: {
            colorAlphaMultiplier: 20,
            bloomFogIntensityMultiplier: 2.5
          }
        },
      },
    );
  }
  for (let j = 0; j < Random(10, 20); j++) {

    let LeafRotationX = Random(-30, 30)
    let LeafRotationY = Random(-180, 180)
    let LeafRotationZ = Random(-30, 30)

    let LeafScaleX = Random(15, 60)
    let LeafScaleY = Random(15, 40)
    let LeafScaleZ = Random(15, 60)

    map.customData.environment.push(
      {
        geometry: { type: "Sphere", material: "LeafMaterial" },
        position: [TreeX, TreeY + (TreeHeight / Random(1, 1.1)), TreeZ],
        rotation: [LeafRotationX, LeafRotationY, LeafRotationZ],
        scale: [LeafScaleX * (TreeScale / 10), LeafScaleY * (TreeScale / 10), LeafScaleZ * (TreeScale / 10)],
      },
      {
        geometry: { type: "Sphere", material: "LeafMaterial" },
        position: [-TreeX, TreeY + (TreeHeight / Random(1, 1.1)), TreeZ],
        rotation: [LeafRotationX, LeafRotationY, LeafRotationZ],
        scale: [LeafScaleX * (TreeScale / 10), LeafScaleY * (TreeScale / 10), LeafScaleZ * (TreeScale / 10)],
      },
    );
  }
}

for (let i = 0; i < 30; i++) {

  map.customData.environment.push(
    {
      id: "Mountains",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [Random(-25, 25), -40, -160 + (i * 50 + Random(-15, 15))],
      scale: [Random(4, 6), Random(0.2, 0.4), Random(0.0025, 0.015)],
    }
  );
}

// Bridge

for (let i = 0; i < 36; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "WoodMaterial" },
      position: [0, -0.25, 6 + (i * 6)],
      rotation: [Random(-2.5, 2.5), Random(-15, 15), Random(-2.5, 2.5)],
      scale: [Random(5, 6), Random(0.3, 0.4), Random(0.6, 0.75)],
    },
  );
  if (i % 2 == 0) {

    let pole = Random(-0.15, 0.1)
    map.customData.environment.push(
      // Left
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-2.75, 0.25 + pole, 6 + (i * 6)],
        rotation: [0, -15, 0],
        scale: [0.75, 2.5, 0.75],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-2.75, 1.5 + pole, 6 + (i * 6)],
        rotation: [0, -15, 0],
        scale: [0.9, 0.15, 0.9],
      },
      {
        geometry: { type: "Sphere", material: "LightMaterial" },
        position: [-2.75, 1.95 + pole, 6 + (i * 6)],
        rotation: [0, 0, 0],
        scale: [1, 1.5, 1],
        components: {
          ILightWithId: {
            lightID: (i + 100) / 2,
            type: 2,
          }
        },
      },
      // Right
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [2.75, 0.25 + pole, 6 + (i * 6)],
        rotation: [0, -15, 0],
        scale: [0.75, 2.5, 0.75],
      },
      {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [2.75, 1.5 + pole, 6 + (i * 6)],
        rotation: [0, -15, 0],
        scale: [0.9, 0.15, 0.9],
      },
      {
        geometry: { type: "Sphere", material: "LightMaterial" },
        position: [2.75, 1.95 + pole, 6 + (i * 6)],
        rotation: [0, 0, 0],
        scale: [1, 1.5, 1],
        components: {
          ILightWithId: {
            lightID: (i + 100) / 2,
            type: 3,
          }
        },
      },
    )
    map.basicBeatmapEvents.forEach((x) => {
      if (x.et == 2 && x.customData) {
        if (x.customData.lightID == i / 2 + 1) {
          x.customData.lightID = (i + 100) / 2;
        }
      }
      if (x.et == 3 && x.customData) {
        if (x.customData.lightID == i / 2 + 1) {
          x.customData.lightID = (i + 100) / 2;
        }
      }
    }
    );
  }
}

map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 1 && x.customData) {
    if (x.customData.lightID == 1) {
      x.customData.lightID = 101;
    }
    if (x.customData.lightID == 2) {
      x.customData.lightID = 102;
    }
    if (x.customData.lightID == 3) {
      x.customData.lightID = 103;
    }
    if (x.customData.lightID == 4) {
      x.customData.lightID = 104;
    }
  }
}
);

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
