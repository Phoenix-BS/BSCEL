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

map.customData.materials = {
  "LightMaterial": {
    "shader": "OpaqueLight",
    "color": [0, 0, 0]
  },
};

const BigRingScaleX = 1
const BigRingScaleY = 1
const BigRingScaleZ = 1

const TriangleRingScaleX = 10
const TriangleRingScaleY = 10
const TriangleRingScaleZ = 0.01

const RingLightScaleX = 1
const RingLightScaleY = 8
const RingLightScaleZ = 8

const SpectroScaleX = 1.5
const SpectroScaleY = 1.25
const SpectroScaleZ = 5

const SpectroDepth = 150
const SpectroSpacing = -25

const BuildingX = 5
const BuildingY = -6
const BuildingZ = 9.5

const BuildingScaleX = 1
const BuildingScaleY = 0.25
const BuildingScaleZ = 0.5

const BuildingRotationX = 0
const BuildingRotationY = 0
const BuildingRotationZ = 105

const BackLaserScaleX = 1
const BackLaserScaleY = 5
const BackLaserScaleZ = 0.25

const LaneLaserScaleX = 5
const LaneLaserScaleY = 7.5
const LaneLaserScaleZ = 10

const SideLaserX = 9.5
const SideLaserZ = 22
const SideLaserSpacing = 2

map.customData.environment = [
  {
    id: "TriangleEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0001,
        startY: -9999
      },
    }
  },

  // Rings

  {
    id: "BigTrackLaneRing(Clone)",
    lookupMethod: "EndsWith",
    scale: [BigRingScaleX, BigRingScaleY, BigRingScaleZ],
    localPosition: [0, 0, 80]
  },
  {
    id: "TriangleTrackLaneRing(Clone)",
    lookupMethod: "EndsWith",
    scale: [TriangleRingScaleX, TriangleRingScaleY, TriangleRingScaleZ],
    localPosition: [0, 0, 150],
    localRotation: [0, 0, 0]
  },

  // Ring Lights

  {
    id: "NeonTubeBothSidesDirectional",
    lookupMethod: "EndsWith",
    scale: [RingLightScaleX, RingLightScaleY, RingLightScaleZ],
  },
  {
    id: "NeonTubeBothSidesDirectional (1)",
    lookupMethod: "EndsWith",
    scale: [RingLightScaleX, RingLightScaleY, RingLightScaleZ],
  },
  {
    id: "NeonTubeBothSidesDirectional (2)",
    lookupMethod: "EndsWith",
    scale: [RingLightScaleX, RingLightScaleY, RingLightScaleZ],
  },
  {
    id: "NeonTubeBothSidesDirectional (3)",
    lookupMethod: "EndsWith",
    scale: [RingLightScaleX, RingLightScaleY, RingLightScaleZ],
  },

  // Spectrograms

  {
    id: "Spectrograms.[0]",
    lookupMethod: "Contains",
    position: [-SpectroSpacing, SpectroSpacing, SpectroDepth],
    rotation: [45, 90, 0],
    scale: [SpectroScaleX, SpectroScaleY, SpectroScaleZ],
  },
  {
    id: "Spectrograms.[1]",
    lookupMethod: "Contains",
    position: [SpectroSpacing, SpectroSpacing, SpectroDepth],
    rotation: [135, 90, 0],
    scale: [SpectroScaleX, SpectroScaleY, SpectroScaleZ],
  },

  // Buildings

  {
    id: "NearBuildingLeft\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NearBuildingRight\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
    lookupMethod: "Regex",
    active: false
  },

  {
    id: "t\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    scale: [BackLaserScaleX, BackLaserScaleY, BackLaserScaleZ],
  },
  {
    id: "t\\.\\[\\d+\\]NeonTubeDirectional \\(\\d+\\)$",
    lookupMethod: "Regex",
    scale: [BackLaserScaleX, BackLaserScaleY, BackLaserScaleZ],
  },

  {
    id: "NearBuildingLeft$",
    lookupMethod: "Regex",
    position: [-BuildingX, BuildingY, BuildingZ],
    rotation: [BuildingRotationX, BuildingRotationY, BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },
  {
    id: "NearBuildingRight$",
    lookupMethod: "Regex",
    position: [BuildingX, BuildingY, BuildingZ],
    rotation: [BuildingRotationX, BuildingRotationY, -BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },
  {
    id: "NearBuildingLeft$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-BuildingX, BuildingY, BuildingZ - 4],
    rotation: [BuildingRotationX, BuildingRotationY, BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },
  {
    id: "NearBuildingRight$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [BuildingX, BuildingY, BuildingZ - 4],
    rotation: [BuildingRotationX, BuildingRotationY, -BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },
  {
    id: "NearBuildingLeft\\(Clone\\)$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-BuildingX, BuildingY, BuildingZ - 8],
    rotation: [BuildingRotationX, BuildingRotationY, BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },
  {
    id: "NearBuildingRight\\(Clone\\)$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [BuildingX, BuildingY, BuildingZ - 8],
    rotation: [BuildingRotationX, BuildingRotationY, -BuildingRotationZ],
    scale: [BuildingScaleX, BuildingScaleY, BuildingScaleZ],
  },

  {
    id: "t\\(Clone\\)\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
    lookupMethod: "Regex",
    active: false
  },

  // Back Columns

  {
    id: "BackColumns$",
    lookupMethod: "Regex",
    position: [0, 8.5, 90],
    rotation: [-70, 0, 0],
    scale: [0.75, 1, 1],
  },
  {
    id: "BackColumns$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 6, 20],
    rotation: [-30, 0, 0],
    scale: [3, 8, 1],
  },
  {
    id: "BackColumnNeon$",
    lookupMethod: "Regex",
    active: false
  },

  // Back Lights

  {
    id: "BottomBoxLight",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "BottomBakedBloom",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "NearBuildingLeft\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 109,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingRight\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 110,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingLeft\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 107,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingRight\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 108,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingLeft\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 105,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingRight\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 106,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingLeft\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 103,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingRight\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 104,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingLeft\\(Clone\\)\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0,
      }
    },
  },
  {
    id: "NearBuildingRight\\(Clone\\)\\(Clone\\)\\.\\[\\d+\\]NeonTubeDirectional$",
    lookupMethod: "Regex",
    components: {
      ILightWithId: {
        lightID: 102,
        type: 0,
      }
    },
  },

  // Left / Right Lasers

  {
    id: "RotatingLasersPair\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(1\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(1\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(2\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing * 2],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(2\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing * 2],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(3\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing * 3],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(3\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing * 3],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(4\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing * 4],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(4\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing * 4],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(5\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing * 5],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(5\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing * 5],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(6\\)\\.\\[\\d+\\]BaseL$",
    lookupMethod: "Regex",
    position: [-SideLaserX, -10, SideLaserZ + SideLaserSpacing * 6],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },
  {
    id: "RotatingLasersPair \\(6\\)\\.\\[\\d+\\]BaseR$",
    lookupMethod: "Regex",
    position: [SideLaserX, -10, SideLaserZ + SideLaserSpacing * 6],
    rotation: [0, 0, 0],
    scale: [2.5, 10, 2.5],
  },

  // Front Lights

  {
    id: "DoubleColorLaser$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, -120],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(1\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, -105],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(2\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, -75],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(3\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, -45],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(4\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, -15],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(5\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, 15],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(6\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, 45],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(7\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, 75],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(8\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, 105],
    scale: [5, 5, 5],
  },
  {
    id: "DoubleColorLaser \\(9\\)$",
    lookupMethod: "Regex",
    position: [0, 10, 50],
    rotation: [-30, 0, 120],
    scale: [5, 5, 5],
  },

  // Beam Lights

  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [-1.825, 0, 83],
    rotation: [0, 0, 0],
    scale: [0.15, 0.05, 150],
    components: {
      ILightWithId: {
        lightID: 109,
        type: 2,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [1.825, 0, 83],
    rotation: [0, 0, 0],
    scale: [0.15, 0.05, 150],
    components: {
      ILightWithId: {
        lightID: 109,
        type: 3,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [-1.55, 0, 83.5],
    rotation: [0, 0, 0],
    scale: [0.125, 0.05, 150],
    components: {
      ILightWithId: {
        lightID: 110,
        type: 2,
      }
    },
  },
  {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [1.55, 0, 83.5],
    rotation: [0, 0, 0],
    scale: [0.125, 0.05, 150],
    components: {
      ILightWithId: {
        lightID: 111,
        type: 3,
      }
    },
  },

  // Misc Lights

  {
    id: "NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    scale: [LaneLaserScaleX, LaneLaserScaleY, LaneLaserScaleZ],
  },
  {
    id: "NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    scale: [LaneLaserScaleX, LaneLaserScaleY, LaneLaserScaleZ],
  },
  {
    id: "DirectionalLight",
    lookupMethod: "EndsWith",
    rotation: [-85, 0, 0]
  },
];

map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 0 && x.customData) {
    if (x.customData.lightID == 10) {
      x.customData.lightID = 110;
    }
    if (x.customData.lightID == 9) {
      x.customData.lightID = 109;
    }
    if (x.customData.lightID == 8) {
      x.customData.lightID = 108;
    }
    if (x.customData.lightID == 7) {
      x.customData.lightID = 107;
    }
    if (x.customData.lightID == 6) {
      x.customData.lightID = 106;
    }
    if (x.customData.lightID == 5) {
      x.customData.lightID = 105;
    }
    if (x.customData.lightID == 4) {
      x.customData.lightID = 104;
    }
    if (x.customData.lightID == 3) {
      x.customData.lightID = 103;
    }
    if (x.customData.lightID == 2) {
      x.customData.lightID = 102;
    }
    if (x.customData.lightID == 1) {
      x.customData.lightID = 101;
    }
  }
  if (x.et == 2 && x.customData) {
    if (x.customData.lightID == 9) {
      x.customData.lightID = 109;
    }
    if (x.customData.lightID == 10) {
      x.customData.lightID = 110;
    }
  }
  if (x.et == 3 && x.customData) {
    if (x.customData.lightID == 9) {
      x.customData.lightID = 109;
    }
    if (x.customData.lightID == 11) {
      x.customData.lightID = 111;
    }
  }
}
)

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
