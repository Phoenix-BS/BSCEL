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

map.customData.materials = {
  "Light": {
    shader: "OpaqueLight"
  },
  "Black": {
    shader: "Standard",
    color: [0.15, 0.15, 0.15]
  },
  "BlackLine": {
    shader: "Standard",
    color: [0, 0, 0]
  },
  "Blue1": {
    shader: "BTSPillar",
    color: HEXtoRGB("#19345F")
  },
  "Blue2": {
    shader: "BTSPillar",
    shaderKeywords: [],
    color: HEXtoRGB("#3165AE")
  }
};

map.customData.environment = [
  {
    id: "DragonsEnvironment.[0]Environment",
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
    id: "Ring",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Front",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Track",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "ConstructionGlowLine \\(\\d+\\)\\.\\[\\d+\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Hall",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Spectrogram",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Underground",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },

  // misc
  {
    geometry: { type: "Plane", material: "Black" },
    position: [0, -19, 0],
    scale: [10000, 0.01, 10000]
  },
  {
    id: "GlowLineL",
    lookupMethod: "EndsWith",
    scale: [5, 1, 1]
  },
  {
    id: "GlowLineR",
    lookupMethod: "EndsWith",
    scale: [5, 1, 1]
  },
  {
    id: "RotatingLasersPair",
    lookupMethod: "EndsWith",
    position: [0, 75, 400],
    rotation: [-30, 0, 0],
    scale: [24, 20, 10],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (1)",
    lookupMethod: "EndsWith",
    position: [0, 70, 425],
    rotation: [-30, 0, 0],
    scale: [20, 20, 10],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (2)",
    lookupMethod: "EndsWith",
    position: [0, 65, 450],
    rotation: [-30, 0, 0],
    scale: [16, 20, 10],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (3)",
    lookupMethod: "EndsWith",
    position: [0, 60, 475],
    rotation: [-30, 0, 0],
    scale: [12, 20, 10],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (4)",
    lookupMethod: "EndsWith",
    position: [0, 55, 500],
    rotation: [-30, 0, 0],
    scale: [8, 20, 10],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },

  {
    id: "DragonsSidePSL",
    lookupMethod: "EndsWith",
    position: [0, -5, 150],
    rotation: [90, 0, 0],
    scale: [5, 5, 500],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 500,
        bloomFogIntensityMultiplier: 500
      }
    }
  },
  {
    id: "DragonsSidePSR",
    lookupMethod: "EndsWith",
    position: [0, -5, 150],
    rotation: [90, 0, 0],
    scale: [5, 5, 500],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 500,
        bloomFogIntensityMultiplier: 500
      }
    }
  },

  {
    id: "DragonsSidePSL",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, -15, 250],
    rotation: [90, 0, 0],
    scale: [5, 10, 500]
  },
  {
    id: "DragonsSidePSR",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, -15, 250],
    rotation: [90, 0, 0],
    scale: [5, 10, 500]
  },
  {
    geometry: { type: "Sphere", material: "Light" },
    position: [0, 130, 400],
    rotation: [Random(-180,180),Random(-180,180),Random(-180,180)],
    scale: [30, 30, 30],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 10
      }
    }
  },
  {
    id: "ConstructionGlowLine",
    lookupMethod: "Contains",
    position: [0, -15, 250],
    rotation: [0, 0, 90],
    scale: [25, 25, 5],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50,
        bloomFogIntensityMultiplier: 7.5
      }
    }
  },
];

// Generates the left and right floor lights
for (let i = 1; i < 16; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Light" },
      position: [-15 + (i * 30), -10, 0],
      rotation: [0, 0, 0],
      scale: [0.5, 0.05, 10000],
      components: {
        ILightWithId: {
          lightID: (116 + i),
          type: 1
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [15 - (i * 30), -10, 0],
      rotation: [0, 0, 0],
      scale: [0.5, 0.05, 2500],
      components: {
        ILightWithId: {
          lightID: (116 - i),
          type: 1
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
        }
      }
    },
  )
  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 1 && x.customData) {
      if (x.customData.lightID == 16 + i) {
        x.customData.lightID = 116 + i;
      }
      if (x.customData.lightID == 16 - i) {
        x.customData.lightID = 116 - i;
      }
    }
  }
  )
}

// Generates the forward and backward floor lights
for (let i = 1; i < 31; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Light" },
      position: [0, -10, -120 + (i*30)],
      rotation: [0, 0, 0],
      scale: [2500, 0.05, 0.5],
      components: {
        ILightWithId: {
          lightID: (131 + i),
          type: 1
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 3
        }
      }
    }
  )
  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 1 && x.customData) {
      if (x.customData.lightID == 32 + i) {
        x.customData.lightID = 132 + i;
      }
    }
  }
  )
}

// Generates the flooring made of the dragons underground environment object
for (let i = 0; i < 7; i++) {

  map.customData.environment.push(
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 3, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 3, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 5, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 5, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 7, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 7, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 9, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 9, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 11, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 11, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [10 * 13, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [-10 * 13, -11, -150 + (i * 50)],
      rotation: [0, Random(-10, 10), 0],
      scale: [1.75, 0.75, 2]
    },
  )
}

// Generates the pyramid in the distance, increase the "i < 12" to increase the height of the pyramid
for (let i = 1; i < 12; i++) {
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Blue1" },
      position: [0, -15 + (i * 10) - 15, 400],
      rotation: [-10, -15, 0],
      scale: [150 - (i * 10), 12.5, 150 - (i * 10)]
    },
    {
      geometry: { type: "Cube", material: "Blue1" },
      position: [0, -15 + (i * 10) - 15, 400],
      rotation: [-10, 15, 0],
      scale: [150 - (i * 10), 12.5, 150 - (i * 10)]
    },
  )
}





// Random Cube Generator (Scrapped)

// for (let i = 1; i < 120; i++) {

//   let side = Math.random() < 0.5 ? -1 : 1
//   let PosX = randBias(0, 100, 2) * side
//   let PosY = randBias(-10, 75, 0.75)
//   let PosZ = randBias(300, 400, 1.5)

//   let Scale1 = 10
//   let Scale2 = 20

//   let x = Random(0,1)
//   if (x <= 0.4) {
//     map.customData.environment.push(
//       {
//         geometry: { type: "Cube", material: "Blue1" },
//         position: [PosX / (PosY + 10 / 50),PosY,PosZ],
//         rotation: [Random(-180,180),Random(-180,180),Random(-180,180)],
//         scale: [Random(Scale1, Scale2),Random(Scale1, Scale2),Random(Scale1, Scale2)]
//       },
//     )
//   } else {
//     map.customData.environment.push(
//       {
//         geometry: { type: "Cube", material: "Blue2" },
//         position: [PosX / (PosY + 10 / 50),PosY,PosZ],
//         rotation: [Random(-180,180),Random(-180,180),Random(-180,180)],
//         scale: [Random(Scale1, Scale2),Random(Scale1, Scale2),Random(Scale1, Scale2)]
//       },
//     )
//   }
// }

// Circle Outline for Sun
let radius = 700;
let numCubes = 60;

for (let i = 0; i < numCubes; i++) {
    let angle = (i / numCubes) * 2 * Math.PI;

    // Calculate the position of the cube on the circle using polar coordinates
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle) + 250;
    let z = 1500;

    // Use the angle directly for rotation around the Z-axis
    let rotationZ = angle * (180 / Math.PI);

    map.customData.environment.push({
        geometry: { type: "Cube", material: "BlackLine" },
        position: [x, y, z],
        rotation: [0, 0, rotationZ],
        scale: [500, 500, 1]
    });
}

// Sun lights, id 1 is the lowest, id 4 is the highest
map.customData.environment.push(
  {
      geometry: { type: "Cube", material: "Light" },
      position: [0, -25, 1600],
      rotation: [0, 0, 0],
      scale: [1000, 75, 0.05],
      components: {
        ILightWithId: {
          lightID: 101,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 10,
          bloomFogIntensityMultiplier: 25
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [0, 80, 1600],
      rotation: [0, 0, 0],
      scale: [1100, 90, 0.05],
      components: {
        ILightWithId: {
          lightID: 102,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 10.5,
          bloomFogIntensityMultiplier: 25
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [0, 220, 1600],
      rotation: [0, 0, 0],
      scale: [1400, 120, 0.05],
      components: {
        ILightWithId: {
          lightID: 103,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 11,
          bloomFogIntensityMultiplier: 25
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [0, 550, 1600],
      rotation: [0, 0, 0],
      scale: [1300, 450, 0.05],
      components: {
        ILightWithId: {
          lightID: 104,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 11.5,
          bloomFogIntensityMultiplier: 25
        }
      }
    },
)


map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 4 && x.customData) {
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
)

map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 0 && x.customData) {
    if (x.customData.lightID == 1) {
      x.customData.lightID = 101;
    }
    if (x.customData.lightID == 2) {
      x.customData.lightID = 102;
    }
  }
}
)



/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
