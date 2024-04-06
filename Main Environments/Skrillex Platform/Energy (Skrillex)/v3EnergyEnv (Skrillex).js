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

map.customData.materials = {
  "Light": {
    shader: "TransparentLight"
  },
  "Concrete": {
    shader: "Standard",
    color: [0.6, 0.6, 0.6]
  }
};

map.customData.environment = [
  {
    id: "SkrillexEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.001,
        startY: -40,
        height: 20
      },
    }
  },

  // object removal
  {
    id: "Plane",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Logo",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Gradient",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BakedBloom",
    lookupMethod: "Contains",
    active: false
  },

  // misc

  {
    id: "BigSmokePS",
    lookupMethod: "Contains",
    position: [0, 0, 0],
    scale: [0.66, 0.01, 10]
  },
  {
    id: "SkrillexTrackRing",
    lookupMethod: "Contains",
    scale: [1, 1, 15]
  },
  {
    id: "NeonTubeBothSidesDirectional",
    lookupMethod: "Contains",
    scale: [5, 2.25, 0.5]
  },
  {
    id: "NeonSide",
    lookupMethod: "Contains",
    scale: [0.5, 500, 0.5],
  },
  {
    id: "TrackBL",
    lookupMethod: "EndsWith",
    scale: [15, 15, 15],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 0.25
      }
    }
  },
  {
    id: "TrackBR",
    lookupMethod: "EndsWith",
    scale: [15, 15, 15],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 0.25
      }
    }
  },
  {
    id: "TrackTL",
    lookupMethod: "EndsWith",
    scale: [15, 15, 15],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 0.25
      }
    }
  },
  {
    id: "TrackTR",
    lookupMethod: "EndsWith",
    scale: [15, 15, 15],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 5,
        bloomFogIntensityMultiplier: 0.25
      }
    }
  },

  // geometry

  {
    geometry: { type: "Plane", material: "Concrete" },
    position: [0, 0, 0],
    scale: [2.5, 1, 1000]
  },
  // Bar Lights
  {
    geometry: { type: "Cube", material: "Light" },
    position: [-2, 0.5, 31],
    scale: [8, 0.75, 0.25],
    rotation: [0, 0, 0],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 0,
        bloomFogIntensityMultiplier: 50
      }
    }
  },
  {
    geometry: { type: "Cube", material: "Light" },
    position: [2, 0.5, 31],
    scale: [8, 0.75, 0.25],
    rotation: [0, 0, 0],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 0,
        bloomFogIntensityMultiplier: 50
      }
    }
  },

  // side moving lasers

  {
    id: "SinMoveLasersPair",
    lookupMethod: "Contains",
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 10,
        bloomFogIntensityMultiplier: 0
      }
    }
  },

  {
    id: "SinMoveLasersPair.[0]LaserL",
    lookupMethod: "EndsWith",
    scale: [2, 2, 2],
    rotation: [30, -30, -90]
  },
  {
    id: "SinMoveLasersPair.[0]LaserL.[0]BoxLight",
    lookupMethod: "EndsWith",
    position: [-4.75, 12.5, 25]
  },

  {
    id: "SinMoveLasersPair.[1]LaserR",
    lookupMethod: "EndsWith",
    scale: [2, 2, 2],
    rotation: [30, 30, -90]
  },
  {
    id: "SinMoveLasersPair.[1]LaserR.[0]BoxLight",
    lookupMethod: "EndsWith",
    position: [4.75, 12.5, 25]
  },
]

for (let i = 1; i < 20; i++) {
  map.customData.environment.push(
    {
      id: `SinMoveLasersPair (${i}).[0]LaserL`,
      lookupMethod: "EndsWith",
      scale: [2, 2, 2],
      rotation: [30, -30, -90]
    },
    {
      id: `SinMoveLasersPair (${i}).[0]LaserL.[0]BoxLight`,
      lookupMethod: "EndsWith",
      position: [-4.75 - (i * 0.25), 12.5 - (i * 0.5), 25]
    },

    {
      id: `SinMoveLasersPair (${i}).[1]LaserR`,
      lookupMethod: "EndsWith",
      scale: [2, 2, 2],
      rotation: [30, 30, -90]
    },
    {
      id: `SinMoveLasersPair (${i}).[1]LaserR.[0]BoxLight`,
      lookupMethod: "EndsWith",
      position: [4.75 + (i * 0.25), 12.5 - (i * 0.5), 25]
    },
  )
}

// logo lights
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
