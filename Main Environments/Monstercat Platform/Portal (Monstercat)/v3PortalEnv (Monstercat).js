"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusStandard.dat";
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
  }
};

map.customData.environment = [
  {
    id: "MonstercatEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0005,
        startY: -9999
      },
    }
  },

  // Object Removal

  {
    id: "Front",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Mirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Line",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Spectrogram",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]Laser$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]Laser \\(\\d+\\)$",
    lookupMethod: "Regex",
    active: false
  },

  // Object Yeet

  {
    id: "Building",
    lookupMethod: "Contains",
    position: [0, -9999, 0]
  },
  {
    id: "Construction",
    lookupMethod: "Contains",
    position: [0, -9999, 0]
  },
  {
    id: "MonstercatLogo",
    lookupMethod: "Contains",
    position: [0, -9999, 0]
  },

  // misc

  {
    id: "SmallTrackLaneRing(Clone)",
    lookupMethod: "EndsWith",
    position: [0, 0, 749.95],
    scale: [10, 10, 0.05]
  },
  
  {
    id: "RotatingLasersPair",
    lookupMethod: "Contains",
    position: [0, 0, 1000],
    rotation: [90, 0, 0],
    scale: [6, 0.125, 6],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 0
      }
    }
  },
]

// Center Rings
const numCubes = 14;
const radius = 52.5;

for (let i = 0; i < numCubes; i++) {
  let angle = (i / numCubes) * 2 * Math.PI;

  let x = radius * Math.cos(angle);
  let y = radius * Math.sin(angle);

  let rotationZ = angle * (180 / Math.PI);

  let lightID = (i + 1) * 100 + 1;

  for (let j = 0; j < numCubes; j++) {
    let z = 50 + (j * 40);

    map.customData.environment.push(
      {
        geometry: { type: "Cube", material: "Light" },
        position: [x, y, z],
        rotation: [0, 0, rotationZ],
        scale: [0.5, 24, 1],
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
      },
    );

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

// VConstruction
const numCubes2 = 4;
const radius2 = 80;

for (let i = 0; i < numCubes2; i++) {
  let angle = (i / numCubes2) * 2 * Math.PI;

  let x = radius2 * Math.cos(angle);
  let y = radius2 * Math.sin(angle);

  let rotationZ = angle * (180 / Math.PI);

  for (let j = 0; j < 14; j++) {
    let z = 0 + (j * 40);

    map.customData.environment.push(
      {
        id: "VConstruction",
        lookupMethod: "EndsWith",
        duplicate: 1,
        position: [x, y, z],
        rotation: [0 + (90 * numCubes2), 0, rotationZ + 90],
        scale: [3.4, 3, 5]
      },
      {
        id: "VConstruction",
        lookupMethod: "EndsWith",
        duplicate: 1,
        position: [x * 5, y * 5, z],
        rotation: [0 + (45 * numCubes2), 0, rotationZ + 90],
        scale: [5, 5, 5]
      },
    );
  }
}

// MC Logo Portal
const numCubes3 = 8;
const radius3 = 100;

for (let i = 0; i < numCubes3; i++) {
  let angle = (i / numCubes3) * 2 * Math.PI;

  let x = radius3 * Math.cos(angle);
  let y = radius3 * Math.sin(angle);
  let z = 750;

  let rotationZ = angle * (180 / Math.PI);

  let lightID = (i + 1) * 100 + 1;

  map.customData.environment.push(
    {
      id: "MonstercatLogoL",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [x, y, z],
      rotation: [0 + (90 * numCubes2), 0, rotationZ + 90],
      scale: [250, 250, 1],
      components: {
        ILightWithId: {
          lightID: lightID,
          type: 0
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 2,
          bloomFogIntensityMultiplier: 0
        }
      }
    },
    {
      id: "MonstercatLogoR",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [x, y, z],
      rotation: [0 + (90 * numCubes2), 180, rotationZ + 90],
      scale: [250, 250, 1],
      components: {
        ILightWithId: {
          lightID: lightID,
          type: 0
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 2,
          bloomFogIntensityMultiplier: 0
        }
      }
    },
  );

  map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 0 && x.customData && x.customData.lightID == i + 1) {
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

// Center Rings
const numCubes4 = 7;
const radius4 = 40;

for (let i = 0; i < numCubes4; i++) {
  let angle = (i / numCubes4) * 2 * Math.PI + 89.98;

  let x = radius4 * Math.cos(angle);
  let y = radius4 * Math.sin(angle);

  let rotationZ = angle * (180 / Math.PI);

  let lightID = (i + 1) * 100 + 1;

  for (let j = 0; j < numCubes4; j++) {
    let z = 50 + (j * 40);

    map.customData.environment.push(
      {
        geometry: { type: "Sphere", material: "Light" },
        position: [x, y, z],
        rotation: [0, 0, rotationZ],
        scale: [2.5, 2.5, 10],
        components: {
          ILightWithId: {
            lightID: lightID,
            type: 1
          },
          TubeBloomPrePassLight: {
            colorAlphaMultiplier: 2,
            bloomFogIntensityMultiplier: 0.5
          }
        }
      },
    );

    map.basicBeatmapEvents.forEach((x) => {
      if (x.et == 1 && x.customData && x.customData.lightID == i + 1) {
        let lightIDArray = [];
        for (let l = 0; l < 16; l++) {
          // Change the ordering of lightIDs here
          let newLightID = lightID + ((l + 5) % 16);
          lightIDArray.push(newLightID);
        }
        x.customData.lightID = lightIDArray;
      }
    });
  }
}


/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
