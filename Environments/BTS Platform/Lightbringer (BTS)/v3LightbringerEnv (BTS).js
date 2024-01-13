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

function lerp(a, b, t) {
  return (b - a) * t + a
}

function Random(min, max) {
  return lerp(min, max, Math.random())
}

function randBias(min, max, exp) {
  return lerp(min, max, Math.pow(Math.random(), exp));
}

let Floor = -1

map.customData.materials = {
  "Stone": {
    shader: "InterscopeConcrete",
    color: [0.2, 0.225, 0.25]
  },
  "Water": {
    shader: "BillieWater",
    color: [0.5, 0.8, 1]
  },
  "OpaqueLight": {
    shader: "OpaqueLight",
  }
};

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0001,
        startY: -9999
      },
    }
  },

  // object removal

  {
    id: "Track",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Construction",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Mirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "PillarsMovementEffect",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Reflector",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GlowLine",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LaserLight0",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "HighCloudsGenerator",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "MagicDoorSprite",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "LowCloudsGenerator",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },

  // misc

  {
    geometry: { type: "Plane", material: "Water" },
    position: [0, Floor - 0.05, 25],
    scale: [6, 1, 7]
  },

  {
    geometry: { type: "Cube", material: "OpaqueLight" },
    position: [-1.25, Floor + 0.1, 55],
    scale: [0.25, 0.1, 105],
    components: {
      ILightWithId: {
        type: 4
      }
    }
  },
  {
    geometry: { type: "Cube", material: "OpaqueLight" },
    position: [1.25, Floor + 0.1, 55],
    scale: [0.25, 0.1, 105],
    components: {
      ILightWithId: {
        type: 4
      }
    }
  },

  {
    id: "BloomL",
    lookupMethod: "Contains",
    position: [0, 15, 75],
    scale: [1.5, 1.5, 1.5]
  },
  {
    id: "BloomR",
    lookupMethod: "Contains",
    position: [0, 15, 75],
    scale: [1.5, 1.5, 1.5]
  }
];

// Left / Right Lasers
const LaserX = -17.5
const LaserY = -7.5

const LaserAnchor = 50
const LaserSpace = 7.5
const LaserScale = 2

const RotX = 90
const RotY = 90
const RotYOffset = 10
const RotZ = 0

map.customData.environment.push(
  {
    id: "PillarL",
    lookupMethod: "EndsWith",
    rotation: [30, 30, -60]
  },
  {
    id: "PillarR",
    lookupMethod: "EndsWith",
    rotation: [30, -30, 60]
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + LaserSpace],
    rotation: [RotX, RotY - RotYOffset, RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + LaserSpace],
    rotation: [RotX, RotY - RotYOffset, RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 2)],
    rotation: [RotX, RotY - (RotYOffset * 2), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 2)],
    rotation: [RotX, RotY - (RotYOffset * 2), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 3)],
    rotation: [RotX, RotY - (RotYOffset * 3), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 3)],
    rotation: [RotX, RotY - (RotYOffset * 3), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 4)],
    rotation: [RotX, RotY - (RotYOffset * 4), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 4)],
    rotation: [RotX, RotY - (RotYOffset * 4), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 5)],
    rotation: [RotX, RotY - (RotYOffset * 5), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 5)],
    rotation: [RotX, RotY - (RotYOffset * 5), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 6)],
    rotation: [RotX, RotY - (RotYOffset * 6), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 6)],
    rotation: [RotX, RotY - (RotYOffset * 6), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 7)],
    rotation: [RotX, RotY - (RotYOffset * 7), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 7)],
    rotation: [RotX, RotY - (RotYOffset * 7), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, LaserY, LaserAnchor + (LaserSpace * 8)],
    rotation: [RotX, RotY - (RotYOffset * 8), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, LaserY, LaserAnchor + (LaserSpace * 8)],
    rotation: [RotX, RotY - (RotYOffset * 8), RotZ],
    scale: [LaserScale, LaserScale / 2.5, LaserScale]
  },
)

const ChamberLength = 20

for (let i = 0; i < ChamberLength; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [20, -5 + (i * 2.5), -30 + (i * 10)],
      rotation: [0, 0, i],
      scale: [2.5 + i, 150, 4]
    },
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [-20, -5 + (i * 2.5), -30 + (i * 10)],
      rotation: [0, 0, -i],
      scale: [2.5 + i, 150, 4]
    },
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [20 - (i * 0.15), 2.5, -30 + (i * 10)],
      rotation: [0, 0, 110],
      scale: [1, 50, 2]
    },
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [-20 + (i * 0.15), 2.5, -30 + (i * 10)],
      rotation: [0, 0, -110],
      scale: [1, 50, 2]
    }
  );
  for (let j = 0; j < 4; j++) {

    map.customData.environment.push(
      {
        geometry: { type: "Cube", material: "Stone" },
        position: [30, -15 + (j * 15), -30 + (i * 10)],
        rotation: [0, -30, 0 + (j * 15)],
        scale: [5, 250, 7.5]
      },
      {
        geometry: { type: "Cube", material: "Stone" },
        position: [-30, -15 + (j * 15), -30 + (i * 10)],
        rotation: [0, 30, 0 + (j * -15)],
        scale: [5, 250, 7.5]
      },
    );
  }
}

const BackWall = ChamberLength * 10 - 30

const BackLaserX = -30

const BackLaserRotationZ = 20
const BackLaserRotationZOffset = 10
map.customData.environment.push(
  {
    id: "PillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-BackLaserX, -25, BackWall],
    rotation: [0, 0, BackLaserRotationZ],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [BackLaserX, -25, BackWall],
    rotation: [0, 0, -BackLaserRotationZ],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-BackLaserX, -25, BackWall],
    rotation: [0, 0, BackLaserRotationZ + BackLaserRotationZOffset],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [BackLaserX, -25, BackWall],
    rotation: [0, 0, -BackLaserRotationZ - BackLaserRotationZOffset],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-BackLaserX, -25, BackWall],
    rotation: [0, 0, BackLaserRotationZ + (BackLaserRotationZOffset * 2)],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [BackLaserX, -25, BackWall],
    rotation: [0, 0, -BackLaserRotationZ - (BackLaserRotationZOffset * 2)],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-BackLaserX, -25, BackWall],
    rotation: [0, 0, BackLaserRotationZ + (BackLaserRotationZOffset * 3)],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [BackLaserX, -25, BackWall],
    rotation: [0, 0, -BackLaserRotationZ - (BackLaserRotationZOffset * 3)],
    scale: [10, 5, 5],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },

  // Back Portal

  {
    id: "LowCloudsGenerator",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 10, BackWall * 1.15],
    rotation: [-90, 15, 0],
    scale: [0.75, 5, 2]
  },
  {
    id: "LowCloudsGenerator",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 10, BackWall * 1.15],
    rotation: [-90, -15, 0],
    scale: [0.75, 5, 2]
  },
  {
    id: "LowCloudsGenerator",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 10, BackWall * 1.2],
    rotation: [-90, 30, 0],
    scale: [0.25, 3, 1]
  },
  {
    id: "LowCloudsGenerator",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 10, BackWall * 1.2],
    rotation: [-90, -30, 0],
    scale: [0.25, 3, 1]
  },
)

for (let i = 0; i < 5; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Sphere", material: "OpaqueLight" },
      position: [3, Floor + 0.1, 0 + (i * 10)],
      scale: [1.5, 1.25 + (i * 0.05), 1.5],
      components: {
        ILightWithId: {
          type: 4
        }
      }
    },
    {
      geometry: { type: "Sphere", material: "OpaqueLight" },
      position: [-3, Floor + 0.1, 0 + (i * 10)],
      scale: [1.5, 1.25 + (i * 0.05), 1.5],
      components: {
        ILightWithId: {
          type: 4
        }
      }
    },
  )
  
  for (let k = 0; k < 4; k++) {
    map.customData.environment.push(
      {
        geometry: { type: "Cube", material: "Stone" },
        position: [20, Floor, 0 + (i * 10)],
        rotation: [0, 30, 0],
        scale: [15 + (k * 8), 0.75 - (k * 0.15), 2 - (k * 0.25)]
      },
      {
        geometry: { type: "Cube", material: "Stone" },
        position: [20, Floor, 0 + (i * 10)],
        rotation: [0, -30, 0],
        scale: [15 + (k * 8), 0.75 - (k * 0.15), 2 - (k * 0.25)]
      },

      {
        geometry: { type: "Cube", material: "Stone" },
        position: [-20, Floor, 0 + (i * 10)],
        rotation: [0, 30, 0],
        scale: [15 + (k * 8), 0.75 - (k * 0.15), 2 - (k * 0.25)]
      },
      {
        geometry: { type: "Cube", material: "Stone" },
        position: [-20, Floor, 0 + (i * 10)],
        rotation: [0, -30, 0],
        scale: [15 + (k * 8), 0.75 - (k * 0.15), 2 - (k * 0.25)]
      },
    );
  }
}

// Cloud Rings
// for (let i = 0; i < 8; i++) {

//   map.customData.environment.push(
//     {
//       id: "HighCloudsGenerator",
//       lookupMethod: "EndsWith",
//       duplicate: 1,
//       position: [0, 0, 150 + (i * 10)],
//       rotation: [-90, Random(-15,15), Random(-15,15)],
//       scale: [0.6 - (i * 0.06), 2, 0.6 - (i * 0.06)]
//     },
//   )
// }

for (let i = 0; i < 10; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [0, Floor, 75 + (i * 2.5)],
      rotation: [0, 30, 0],
      scale: [100, 1.75 + (i * 0.25), 50]
    },
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [0, Floor, 75 + (i * 2.5)],
      rotation: [0, -30, 0],
      scale: [100, 1.75 + (i * 0.25), 50]
    },

    {
      geometry: { type: "Cube", material: "Stone" },
      position: [0, Floor, -37.5 - (i * 1)],
      rotation: [0, -30, 0],
      scale: [100, 1.75 + (i * 15), 50]
    },
    {
      geometry: { type: "Cube", material: "Stone" },
      position: [0, Floor, -37.5 - (i * 1)],
      rotation: [0, 30, 0],
      scale: [100, 1.75 + (i * 15), 50]
    }
  )
}

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");