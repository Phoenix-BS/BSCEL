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

// changes hex color codes to RGB values (ty swifter <3)
function HEXtoRGB(color) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
  return (result
    ? [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ]
    : [0, 0, 0])
}

// Mark the final beat of your map to ensure the idle environment animations work
const MapBeatEnd = 399

// Intensity of the idle animation for left / right lasers. The intensity will lower as the lasers are further away w/ the formula (Intensity +/- (LightID * Gradient))
const LaserRotationIntensity = 20
const LaserRotationGradient = 2.5

// NOTE: lots of elements of this environment are randomly generated, so  be sure to re-run this script for different variations that fit your needs

map.customData.materials = {
  "Snow": {
    shader: "InterscopeConcrete",
    color: [1, 1, 1]
  },
  "SnowDark": {
    shader: "InterscopeConcrete",
    color: [0.6, 0.8, 1]
  },
  "Ice": {
    shader: "BTSPillar",
    color: HEXtoRGB("#A5D6ED")
  },
  "Wood": {
    shader: "InterscopeConcrete",
    color: HEXtoRGB("#292116")
  },
  "Leaf": {
    shader: "Standard",
    color: HEXtoRGB("#7AA18A")
  },
  "Light": {
    shader: "TransparentLight"
  },
};

map.customData.environment = [
  {
    id: "GagaEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.005,
        startY: -9999,
        height: 10,
        track: "fog",
      },
    }
  },

  // Old code that i deleted on accident and had to recover lmao im sadge

  {
    "id": "FloorLightTilesGridEffect",
    "lookupMethod": "Contains",
    "active": true
  },
  {
    "id": "SmokePS",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "BackCube",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "BackgroundGradient",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "MainBeamDisk",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "Tesla",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "Construction",
    "lookupMethod": "Contains",
    "active": false
  },
  {
    "id": "Logo$",
    "lookupMethod": "Regex",
    "position": [
      20,
      -60,
      250
    ],
    "rotation": [
      15,
      210,
      90
    ],
    "scale": [
      10,
      3,
      3
    ]
  },
  {
    "id": "Aurora",
    "lookupMethod": "EndsWith",
    "position": [
      0,
      650,
      200
    ],
    "scale": [
      2,
      6,
      5
    ],
    components: {
      ILightWithId: {
        type: 4
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 2,
        bloomFogIntensityMultiplier: 0.5
      }
    },
  },
  {
    "id": "Runway",
    "lookupMethod": "EndsWith",
    "position": [
      0,
      -0.05,
      -200
    ],
    "scale": [
      1,
      1,
      1000
    ]
  },
  {
    "id": "TubeR",
    "lookupMethod": "EndsWith",
    "position": [
      250,
      -100,
      250
    ],
    "rotation": [
      30,
      0,
      150
    ],
    "scale": [
      15,
      15,
      5
    ]
  },
  {
    "id": "TubeL$",
    "lookupMethod": "Regex",
    "position": [
      50,
      240,
      900
    ],
    "rotation": [
      0,
      80,
      30
    ],
    "scale": [
      15,
      15,
      7.5
    ]
  },
  {
    "id": "TubeL \\(1\\)$",
    "lookupMethod": "Regex",
    "position": [
      -400,
      200,
      175
    ],
    "rotation": [
      0,
      30,
      0
    ],
    "scale": [
      12.5,
      12.5,
      7.5
    ]
  },
  {
    "geometry": {
      "type": "Plane",
      "material": "Ice"
    },
    "position": [
      0,
      -10,
      0
    ],
    "rotation": [
      0,
      0,
      0
    ],
    "scale": [
      10000,
      0.001,
      10000
    ]
  },
  {
    "id": "LightningWithTarget",
    "lookupMethod": "Contains",
    "position": [
      0,
      0,
      300
    ]
  },
  {
    "id": "StarSky",
    "lookupMethod": "EndsWith",
    "scale": [
      2,
      2,
      2
    ],
    "position": [
      0,
      0,
      0
    ]
  },
  {
    "id": "StarSky",
    "lookupMethod": "EndsWith",
    "duplicate": 3,
    "scale": [
      2,
      2,
      2
    ],
    "position": [
      0,
      0,
      0
    ],
  },
  {
    "id": "DirectionalLights",
    "lookupMethod": "Contains",
    "rotation": [
      -120,
      0,
      0
    ]
  },
  {
    id: "FrontLaser",
    lookupMethod: "Contains",
    position: [0, -9999, 0]
  },

  {
    id: "RunwayPillarLow (1)",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "RunwayPillarLow (2)",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "RunwayPillar",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "RunwayPillar",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 0.05, 10],
    rotation: [0, 210, 0],
    scale: [0.5, 2.5, 2],
    components: {
      ILightWithId: {
        type: 0
      }
    },
  },
  {
    id: "RunwayPillar",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 0.05, 10],
    rotation: [0, 150, 0],
    scale: [0.5, 2.5, 2],
    components: {
      ILightWithId: {
        type: 0
      }
    },
  },
];

// Bridge Lights Generator (Assigned to type 0, not functional with ID's)

for (let i = 0; i < 10; i++) {

  let SnowPosZ = 0
  map.customData.environment.push(
    {
      id: "RunwayPillar",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [0, 0.05, SnowPosZ + (i * 7.5)],
      rotation: [0, 210, 0],
      scale: [0.5, 2.5, 4],
      components: {
        ILightWithId: {
          type: 0
        }
      },
    },
    {
      id: "RunwayPillar",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [0, 0.05, SnowPosZ + (i * 7.5)],
      rotation: [0, 150, 0],
      scale: [0.5, 2.5, 4],
      components: {
        ILightWithId: {
          type: 0
        }
      },
    },
  );
}

// Terrain Generator (Sphere)

for (let i = 0; i < 400; i++) {

  let SnowPosX = Random(-300, 300)
  let SnowPosY = Random(-9.5, -8.75)
  let SnowPosZ = Random(-200, 400)

  let SnowRotX = Random(-2.5, 2.5)
  let SnowRotY = Random(-180, 180)
  let SnowRotZ = Random(-2.5, 2.5)

  let SnowScaleX = Random(25, 125)
  let SnowScaleY = Random(5, 7.5)
  let SnowScaleZ = Random(25, 125)
  map.customData.environment.push(
    {
      geometry: { type: "Sphere", material: "Snow" },
      position: [SnowPosX, SnowPosY, SnowPosZ],
      rotation: [SnowRotX, SnowRotY, SnowRotZ],
      scale: [SnowScaleX, SnowScaleY, SnowScaleZ]
    }
  );
}

// Terrain Generator (Cube)

for (let i = 0; i < 100; i++) {

  let SnowPosX = Random(-300, 300)
  let SnowPosY = Random(-9.25, -9)
  let SnowPosZ = Random(-200, 400)

  let SnowRotX = Random(-180, 180)
  let SnowRotY = Random(-180, 180)
  let SnowRotZ = Random(-180, 180)

  let SnowScaleX = Random(5, 12.5)
  let SnowScaleY = Random(2.5, 12.5)
  let SnowScaleZ = Random(5, 12.5)
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "SnowDark" },
      position: [SnowPosX, SnowPosY, SnowPosZ],
      rotation: [SnowRotX, SnowRotY, SnowRotZ],
      scale: [SnowScaleX, SnowScaleY, SnowScaleZ]
    }
  );
}

// Tree Generator

for (let i = 0; i < 30; i++) {
  let side = Math.random() < 0.5 ? -1 : 1
  let SnowPosX = randBias(60, 260, 1.25) * side
  let SnowPosY = Random(6,3)
  let SnowPosZ = randBias(-150, 380, 0.75)

  let WoodScale = Random(3, 6)
  let WoodScaleY = Random(40, 70)

  map.customData.environment.push({
    geometry: { type: "Cylinder", material: "Wood" },
    position: [SnowPosX, SnowPosY, SnowPosZ],
    rotation: [0, 0, 0],
    scale: [WoodScale, WoodScaleY, WoodScale]
  });

  for (let j = 0; j < Random(25, 35); j++) {
    let LeafScaleX = Random(2.5, 5)
    let LeafScaleY = Random(1, 2.5)
    let LeafScaleZ = Random(2.5, 5)

    let LeafRotX = Random(-10, 10)
    let LeafRotY = Random(-180, 180)
    let LeafRotZ = Random(-10, 10)

    let verticalScaleFactor = 1 - (SnowPosY + WoodScaleY) / WoodScaleY;

    map.customData.environment.push({
      geometry: { type: "Cube", material: "Leaf" },
      position: [SnowPosX, SnowPosY + (WoodScaleY * randBias(0.25, 1, 0.9)), SnowPosZ],
      rotation: [LeafRotX, LeafRotY, LeafRotZ],
      scale: [
        (LeafScaleX * (WoodScaleY * randBias(1.1,1.4,1.25)) * verticalScaleFactor) / (WoodScale/6),
        LeafScaleY,
        (LeafScaleZ * (WoodScaleY * randBias(1.1,1.4,1.25)) * verticalScaleFactor) / (WoodScale/6),
      ]
    });
  }
}


// Light Generator (Assigned to Ring Lights 0-60)

for (let i = 0; i < 61; i++) {

  let side = Math.random() < 0.5 ? -1 : 1
  let SnowPosX = randBias(0, 200, 1.75) * side
  let SnowPosY = Random(50, 125)
  let SnowPosZ = Random(175, 500) / Random(1, 1.2)

  let SnowRotX = 0
  let SnowRotY = Random(-180, 180)
  let SnowRotZ = 0

  let SnowScaleX = Random(0.8, 1.2)
  let SnowScaleY = Random(30, 50)
  let SnowScaleZ = Random(0.8, 1.2)

  let KeyframeTime = Random(24, 32)
  map.customData.environment.push(
    {
      geometry: { type: "Sphere", material: "Light" },
      position: [SnowPosX, SnowPosY, SnowPosZ],
      rotation: [SnowRotX, SnowRotY, SnowRotZ],
      scale: [SnowScaleX, SnowScaleY, SnowScaleZ],
      track: `SkyTube${i}`,
      components: {
        ILightWithId: {
          lightID: i + 100,
          type: 1
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 20,
          bloomFogIntensityMultiplier: 2.5
        }
      },
    }
  );
  map.customData.customEvents.push(
    {
      b: 0,
      t: "AnimateTrack",
      d: {
        track: `SkyTube${i}`,
        duration: KeyframeTime,
        position: [
          [SnowPosX, SnowPosY, SnowPosZ, 0],
          [SnowPosX, SnowPosY + Random(-40, 30), SnowPosZ, 0.5, "easeInOutSine"],
          [SnowPosX, SnowPosY, SnowPosZ, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd / KeyframeTime),
        repeataddtime: KeyframeTime
      }
    },
  )
  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 1 && x.customData) {
      if (x.customData.lightID == i) {
        x.customData.lightID = i + 100;
      }
    }
  }
  )
}

// Light Generator (assigned to Left Lasers 1-7)

for (let i = 0; i < 8; i++) {

  let KeyframeTime = 20

  map.customData.environment.push(
    {
      id: "FrontLaserL",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-40 + (i * 4), -10, 60 + (i * 30)],
      rotation: [0, 0, 0],
      scale: [1.5, 2, 1.5],
      track: `LaserL${i}`,
      components: {
        ILightWithId: {
          lightID: (i + 100),
          type: 2
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
        }
      },
    }
  );
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [-40 + (i * 4), Random(-7, -6), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    },
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [-40 + (i * 4), Random(-7, -5.5), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    },
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [-40 + (i * 4), Random(-7, -5), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    }
  )
  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 2 && x.customData) {
      if (x.customData.lightID == i + 1) {
        x.customData.lightID = i + 100;
      }
    }
  }
  )
  map.customData.customEvents.push(
    {
      b: 0 + (i / 2),
      t: "AnimateTrack",
      d: {
        track: `LaserL${i}`,
        duration: KeyframeTime,
        rotation: [
          [0, 0, 0, 0],
          [0, 0, LaserRotationIntensity - (i * LaserRotationGradient), 0.25, "easeOutSine"],
          [0, 0, 0, 0.5, "easeInSine"],
          [0, 0, -LaserRotationIntensity + (i * LaserRotationGradient), 0.75, "easeOutSine"],
          [0, 0, 0, 1, "easeInSine"],
        ],
        repeat: Math.ceil(MapBeatEnd / KeyframeTime),
        repeataddtime: KeyframeTime
      }
    },
  )
}

// Light Generator (assigned to Right Lasers 1-7)

for (let i = 0; i < 7; i++) {

  let KeyframeTime = 20

  map.customData.environment.push(
    {
      id: "FrontLaserR",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [40 - (i * 4), -10, 60 + (i * 30)],
      rotation: [0, 0, 0],
      scale: [1.5, 2, 1.5],
      track: `LaserR${i}`,
      components: {
        ILightWithId: {
          lightID: (i + 100),
          type: 3
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
        }
      },
    }
  );
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [40 - (i * 4), Random(-7, -6), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    },
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [40 - (i * 4), Random(-7, -5.5), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    },
    {
      geometry: { type: "Cube", material: "Snow" },
      position: [40 - (i * 4), Random(-7, -5), 60 + (i * 30)],
      rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
      scale: [Random(5, 7.5), Random(5, 7.5), Random(5, 7.5)]
    }
  )
  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 3 && x.customData) {
      if (x.customData.lightID == i + 1) {
        x.customData.lightID = i + 100;
      }
    }
  }
  )
  map.customData.customEvents.push(
    {
      b: 0 + (i / 2),
      t: "AnimateTrack",
      d: {
        track: `LaserR${i}`,
        duration: KeyframeTime,
        rotation: [
          [0, 0, 0, 0],
          [0, 0, -LaserRotationIntensity + (i * LaserRotationGradient), 0.25, "easeOutSine"],
          [0, 0, 0, 0.5, "easeInSine"],
          [0, 0, LaserRotationIntensity - (i * LaserRotationGradient), 0.75, "easeOutSine"],
          [0, 0, 0, 1, "easeInSine"],
        ],
        repeat: Math.ceil(MapBeatEnd / KeyframeTime),
        repeataddtime: KeyframeTime
      }
    },
  )
}

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
