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
  "Concrete": {
    shader: "InterscopeConcrete",
    color: [0.2, 0.2, 0.2],
  },
  "LightTrans": {
    shader: "TransparentLight",
  },
  "LightOpaque": {
    shader: "OpaqueLight",
  },
};

map.customData.environment = [
  {
    id: "GreenDayEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.00005,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  // object removal
  {
    id: "Logo$",
    lookupMethod: "Regex",
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
  // misc
  {
    id: "FrontLight$",
    lookupMethod: "Regex",
    position: [0, -50, 400],
    scale: [2.5, 25, 2.5],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 1.5,
        bloomFogIntensityMultiplier: 1.5
      }
    }
  },
  {
    id: "Laser",
    lookupMethod: "EndsWith",
    position: [0, 20, 150],
    rotation: [90, 0, 0],
    scale: [1.5, 1.5, 1.5]
  },
  {
    id: "LightLinesTrackLaneRing(Clone)",
    lookupMethod: "EndsWith",
    position: [0, 0, 30],
    scale: [12.5, 2250, 12.5]
  },
  {
    geometry: { type: "Plane", material: "Concrete" },
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [6, 1, 40]
  }
];

// Screen Generator

{
  const floorLightIDs = {}
  const screenTrackArray = []
  const numScreens = 4 // number of screens you want to generate

  for (let s = 0; s < numScreens; s++) {
    for (let c = 1; c <= 60; c++) {
      const lightIDs = []
      const globalID = s * 60 + c
      floorLightIDs[globalID] = lightIDs

      const lightID = globalID * 300
      lightIDs.push(lightID)
      map.customData.environment.push(
        {
          geometry: { type: "Cube", material: "LightOpaque" },
          position: [-30 + (s * 20), 30 - (c / 2.5), 45 + (c / 15)],
          rotation: [-10, -15 + (s * 10), 0],
          scale: [10, 0.15, 0.15],
          track: `ScreenTrack${s}_${c}`,
          components: {
            ILightWithId: {
              lightID: lightID,
              type: 1,
            },
            TubeBloomPrePassLight: {
              colorAlphaMultiplier: 1.5,
              bloomFogIntensityMultiplier: 0.5
            }
          },
        },
      );

      screenTrackArray.push(
        [`ScreenTrack${s}_${c}`]
      )
    }
  }

  map.basicBeatmapEvents.forEach((x) => {
    if (x.et === 1 && x.customData && x.customData.lightID >= 1 && x.customData.lightID <= numScreens * 60) {
      x.customData.lightID = floorLightIDs[x.customData.lightID];
    }
  });

  //#region create custom events for each screen (requires noodle)
  for (let s = 0; s < numScreens; s++) {
    const screenSpecificTracks = screenTrackArray
      .filter(track => track[0].startsWith(`ScreenTrack${s}`))
      .flatMap(track => track); // flatten the array of arrays
  
    map.customData.customEvents.push(
      {
        b: 0,
        t: "AssignTrackParent",
        d: {
          childrenTracks: screenSpecificTracks,
          parentTrack: `ScreenTrackParent${s + 1}`
        }
      }
    )
  }
  
  //#endregion

}  


// Center Rings
const numCubes4 = 16;
const radius4 = 75;

for (let i = 0; i < numCubes4; i++) {
  let angle = (i / numCubes4) * Math.PI + 0.088;

  let x = radius4 * Math.cos(angle);
  let y = radius4 * Math.sin(angle);

  let rotationZ = angle * (180 / Math.PI);

  let lightID = (i + 1) * 100 + 1;

  for (let j = 0; j < numCubes4; j++) {
    let z = 50 + (j * 30);

    map.customData.environment.push(
      {
        geometry: { type: "Sphere", material: "LightTrans" },
        position: [x, y, z],
        rotation: [0, 0, rotationZ],
        scale: [0.5 + (j / 5), 0.5 + (j / 5), 10],
        components: {
          ILightWithId: {
            lightID: lightID,
            type: 0
          },
          TubeBloomPrePassLight: {
            colorAlphaMultiplier: 1.25,
            bloomFogIntensityMultiplier: 0.5
          }
        }
      },
    );

    map.basicBeatmapEvents.forEach((x) => {
      if (x.et == 0 && x.customData && x.customData.lightID == i + 1) {
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


// Animation Example

// ScreenTrackParent1 is the far left, ScreenTrackParent4 is the far right
// scale is effected by world position based on scale. Expanding any scale axis will move the shape that direction in turn
// map.customData.customEvents.push(
//   {
//     b: 1,
//     t: "AnimateTrack",
//     d: {
//       track: "ScreenTrackParent1",
//       duration: 1,
//       position: [
//         [0, 1, 0, 0],
//         [0, 1, 50, 1, "easeInOutSine"]
//       ],
//       scale: [
//         [1, 1, 1, 0],
//         [1, 3, 1, 1, "easeOutSine"]
//       ],
//       rotation: [
//         [0, 0, 0, 0],
//         [0, 15, 15, 1, "easeOutBounce"]
//       ]
//     }
//   }
// )

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
