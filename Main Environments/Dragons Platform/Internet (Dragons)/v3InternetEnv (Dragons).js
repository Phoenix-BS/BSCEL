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

map.customData.materials = {
  "Light": {
    shader: "OpaqueLight"
  },
  "Black": {
    shader: "Standard",
    color: [0.15, 0.15, 0.15]
  }
};

map.customData.environment = [
  {
    id: "DragonsEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0008,
        startY: -9999
      },
    }
  },

  // object removal
  {
    id: "Front",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Spectrogram",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "[0]Ring",
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
    id: "PanelsTrackLaneRing(Clone)",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Underground",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "DragonsSide",
    lookupMethod: "Contains",
    active: false
  },

  // misc
  {
    id: "DirectionalLight",
    lookupMethod: "Contains",
    rotation: [180, 0, 0]
  },
  {
    id: "GlowLineL",
    lookupMethod: "EndsWith",
    scale: [5, 1, 1],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0
      }
    }
  },
  {
    id: "GlowLineR",
    lookupMethod: "EndsWith",
    scale: [5, 1, 1],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 0
      }
    }
  },
  {
    id: "RotatingLasersPair",
    lookupMethod: "EndsWith",
    position: [0, 2, -50],
    rotation: [-88, 0, 0],
    scale: [2, 1500, 2],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (1)",
    lookupMethod: "EndsWith",
    position: [0, 2, -50],
    rotation: [-89, 0, 0],
    scale: [2, 1500, 2],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (2)",
    lookupMethod: "EndsWith",
    position: [0, 2, -50],
    rotation: [-90, 0, 0],
    scale: [2, 1500, 2],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (3)",
    lookupMethod: "EndsWith",
    position: [0, 2, -50],
    rotation: [-91, 0, 0],
    scale: [2, 1500, 2],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
      }
    }
  },
  {
    id: "RotatingLasersPair (4)",
    lookupMethod: "EndsWith",
    position: [0, 2, -50],
    rotation: [-92, 0, 0],
    scale: [2, 1500, 2],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 50
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
        lightID: 103,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 10,
        bloomFogIntensityMultiplier: 2
      }
    }
  },
  {
    id: "BigTrackLaneRing(Clone)",
    lookupMethod: "Contains",
    scale: [0.75, 0.75, 2.5],
  },
  {
    id: "NeonTubeBothSidesDirectional",
    lookupMethod: "Contains",
    scale: [0.25, 4.5, 0.6],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 1.5,
        bloomFogIntensityMultiplier: 0.75
      }
    },
  },
];

// Mainframe Outline
const radius = 15;
const numCubes = 10;

for (let i = 0; i < numCubes; i++) {
  let angle = (i / numCubes) * 2 * Math.PI;

  // Calculate the position of the cube on the circle using polar coordinates
  let x = radius * Math.cos(angle);
  let y = radius * Math.sin(angle);
  let z = -250;

  // Use the angle directly for rotation around the Z-axis
  let rotationZ = angle * (180 / Math.PI);

  map.customData.environment.push(
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [x, y, z],
      rotation: [0, 0, rotationZ + 90],
      scale: [1.25, 2, 25]
    },
    {
      id: "Underground",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [x, y, z],
      rotation: [0, 0, rotationZ + 90],
      scale: [-1.25, 2, 25]
    }
  );
}


// Center Lights Generator
const numCubes2 = 4;
const radius2 = 30;

for (let i = 0; i < numCubes2; i++) {
  let angle = (i / numCubes2) * 2 * Math.PI;

  let x = radius2 * Math.cos(angle);
  let y = radius2 * Math.sin(angle);

  let rotationZ = angle * (180 / Math.PI);

  for (let j = 0; j < numCubes2; j++) {
    let z = 50 + (j * 40);

    let lightID = (i + 1) * 100 + (j * 4) + 1;

    for (let k = -15; k <= 15; k += 10) {
      map.customData.environment.push({
        geometry: { type: "Cube", material: "Light" },
        position: [x, y, z],
        rotation: [0, 0, rotationZ + k],
        scale: [0.15, 5000, 0.15],
        components: {
          ILightWithId: {
            lightID: lightID,
            type: 4
          },
          TubeBloomPrePassLight: {
            colorAlphaMultiplier: 2,
            bloomFogIntensityMultiplier: 0.5
          }
        }
      });
    }
    map.basicBeatmapEvents.forEach((x) => {
      if (x.et == 4 && x.customData && x.customData.lightID == i + 1) {
        let lightIDArray = [];
        for (let l = 0; l < 16; l++) {
          // Change the ordering of lightIDs here
          let newLightID = lightID + ((l + 4) % 16);
          lightIDArray.push(newLightID);
        }
        x.customData.lightID = lightIDArray;
      }
    });
  }
}

// Outer Infrastructure Outline
const radius3 = 50;
const numCubes3 = 30;

for (let i = 0; i < numCubes3; i++) {
  let angle = (i / numCubes3) * 2 * Math.PI;

  let x = radius3 * Math.cos(angle);
  let y = radius3 * Math.sin(angle);
  let z = 60;

  let rotationZ = angle * (180 / Math.PI);

  for (let j = 0; j < 15; j++) {
  map.customData.environment.push(
    {
      geometry: { type: "Cylinder", material: "Black" },
      position: [x, y, z + (j * 30)],
      rotation: [0, 0, rotationZ],
      scale: [5, 5.5, 5]
    }
  );
}
}



// Bridge
for (let i = 0; i < 30; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Black" },
      position: [0, -0.5, 0 + (i * 5)],
      rotation: [0, 0, 0],
      scale: [4, 0.25, 1.5]
    },
    {
      geometry: { type: "Cube", material: "Black" },
      position: [-2.75, -12, 0 + (i * 5)],
      rotation: [0, 0, 0],
      scale: [0.75, 25, 1.5]
    },
    {
      geometry: { type: "Cube", material: "Black" },
      position: [2.75, -12, 0 + (i * 5)],
      rotation: [0, 0, 0],
      scale: [0.75, 25, 1.5]
    },
    {
      geometry: { type: "Cylinder", material: "Black" },
      position: [0, -3, 0 + (i * 5)],
      rotation: [0, 30, 0],
      scale: [0.75, 0.1, 11]
    },
    {
      geometry: { type: "Cylinder", material: "Black" },
      position: [0, -3, 0 + (i * 5)],
      rotation: [0, -30, 0],
      scale: [0.75, 0.1, 11]
    },
  );
}

map.customData.environment.push(
  {
    geometry: { type: "Cube", material: "Black" },
    position: [-3, -0.75, 55],
    rotation: [0, 0, 60],
    scale: [0.25, 1.5, 110]
  },
  {
    geometry: { type: "Cube", material: "Black" },
    position: [3, -0.75, 55],
    rotation: [0, 0, -60],
    scale: [0.25, 1.5, 110]
  },
);

// Jumbotron (Made with Cinema Mod compatibility, enable if you plan to use)

const cinemaScreen = false

// cinema-video.json Settings:

// "screenPosition": {"x": 0, "y": 11.25, "z": 49},
// "screenHeight": 10.5,
// "screenCurvature": 0,
// "transparency": false

map.customData.environment.push(
  {
    geometry: { type: "Cube", material: "Black" },
    position: [-6.5, 20, 50],
    rotation: [-15, 0, 15],
    scale: [0.75, 10, 0.75],
    active: cinemaScreen
  },
  {
    geometry: { type: "Cube", material: "Black" },
    position: [6.5, 20, 50],
    rotation: [-15, 0, -15],
    scale: [0.75, 10, 0.75],
    active: cinemaScreen
  },
  {
    geometry: { type: "Cube", material: "Black" },
    position: [-5.5, 20, 50],
    rotation: [-15, 0, 15],
    scale: [0.75, 10, 0.75],
    active: cinemaScreen
  },
  {
    geometry: { type: "Cube", material: "Black" },
    position: [5.5, 20, 50],
    rotation: [-15, 0, -15],
    scale: [0.75, 10, 0.75],
    active: cinemaScreen
  },
  {
    geometry: { type: "Cube", material: "Black" },
    position: [0, 11.5, 50],
    rotation: [0, 0, 0],
    scale: [19.4, 11, 0.5],
    active: cinemaScreen
  },
);


map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 0 && x.customData) {
    if (x.customData.lightID == 1) {
      x.customData.lightID = [101, 102];
    }
    if (x.customData.lightID == 2) {
      x.customData.lightID = 103;
    }
  }
}
)

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
