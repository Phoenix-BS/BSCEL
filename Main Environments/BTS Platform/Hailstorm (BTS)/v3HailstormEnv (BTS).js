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

// Mark the final beat of your map to ensure the idle environment animations work
const MapBeatEnd = 734

// NOTE: lots of elements of this environment are randomly generated, so  be sure to re-run this script for different variations that fit your needs

map.customData.materials = {
  "Rock": {
    shader: "BTSPillar",
    color: [0.2, 0.2, 0.2]
  },
  "Light": {
    shader: "OpaqueLight",
    color: [0.7, 0.7, 0.7]
  },
  "Aura": {
    shader: "TransparentLight"
  }
};

// Vortex properties
let VortexPosX = 120
let VortexPosY = 220
let VortexPosZ = 950

let VortexRotX = 250
let VortexRotZ = 22.5

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.000001,
        startY: -9999
      },
    }
  },

  // object removal
  {
    id: "LaserLight0",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "t\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0]
  },
  {
    id: "PillarTrackLaneRingsR",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BottomGlow",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GradientBackground",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "TrackMirror",
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
    id: "GlowLineC",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GlowLineH",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Reflector",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Construction",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "PillarL.[0]Pillar",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "PillarR.[0]Pillar",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LightWrapper",
    lookupMethod: "Contains",
    active: false
  },
  // Aura
  {
    id: "[5]DirectionalLight",
    lookupMethod: "Contains",
    rotation: [VortexRotX, 0, VortexRotZ]
  },
  // Laser
  {
    id: "[4]DirectionalLight",
    lookupMethod: "Contains",
    rotation: [VortexRotX, 0, VortexRotZ]
  },
  {
    id: "Environment\\.\\[\\d+\\]SideLaser$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "MagicDoorSprite",
    lookupMethod: "Contains",
    position: [0, -9999, 0]
  },

  // misc
  {
    id: "LaserLH",
    lookupMethod: "EndsWith",
    scale: [10, 10, 10]
  },
  {
    id: "LaserRH",
    lookupMethod: "EndsWith",
    scale: [10, 10, 10]
  },
];

map.customData.environment.push(
  {
    geometry: { type: "Sphere", material: "Aura" },
    position: [VortexPosX, VortexPosY, VortexPosZ],
    scale: [25, 25, 25],
    components: {
      ILightWithId: {
        type: 0
      },
      TubeBloomPrePassLight: {
        bloomFogIntensityMultiplier: 400
      }
    }

  }
)

for (let i = 0; i < 35; i++) {

  map.customData.environment.push(
    {
      id: "LowCloudsGenerator",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [VortexPosX, VortexPosY, VortexPosZ],
      rotation: [VortexRotX, Random(-15, 15), VortexRotZ],
      scale: [0.2 + (i * 0.975), Random(2.5, 3.5) + (i * Random(1.25, 1.75)), 0.2 + (i * 0.975)]
    }
  )
}

for (let i = 0; i < 15; i++) {

  map.customData.environment.push(
    {
      id: "HighCloudsGenerator",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [VortexPosX - (i * 25), VortexPosY - (i * 25), VortexPosZ - (i * 25)],
      rotation: [VortexRotX + Random(-10,10), 0 + Random(-10, 10), VortexRotZ + Random(-10,10)],
      scale: [-0.5 + (i * 1.15), 0.5 + (i * 0.25), -0.5 + (i * 1.15)]
    },
  )
}

// Rock Generator
for (let i = 0; i < 20; i++) {
  let side = Math.random() < 0.5 ? -1 : 1
  let x = randBias(50, 650, 0.9) * side
  let y = Random(-100, 700)
  let z = Random(-100, 950)

  let rotX = Random(-90, -150)
  let rotY = Random(-180, 180)
  let rotZ = Random(-60, 0)

  let KeyframeTime1 = Random(24,28)
  let KeyframeTime2 = Random(20,32)
  let Intensity = 30

  for (let j = 0; j < Random(10, 30); j++) {

    let RockX = x + Random(-15,15)
    let RockY = y + Random(-30,30)
    let RockZ = z + Random(-15,15)

    let Rock2X = x + Random(-75,75)
    let Rock2Y = y + Random(-175,175)
    let Rock2Z = z + Random(-75,75)

    let RockAnimStartX = VortexPosX + Random(-150,150)
    let RockAnimStartY = VortexPosY + Random(-150,150)
    let RockAnimStartZ = VortexPosZ + Random(100,300)

    map.customData.environment.push(
      {
        geometry: { type: "Cube", material: "Rock" },
        position: [RockAnimStartX, RockAnimStartY, RockAnimStartZ],
        rotation: [rotX + Random(-2.5, 2.5), rotY + Random(-2.5, 2.5), rotZ + Random(-2.5, 2.5)],
        scale: [Random(12.5, 20) + (x / -200), Random(90, 150), Random(12.5, 20) + (z / 100)],
        track: `RockTrack${i}${j}`
      },
      {
        geometry: { type: "Cube", material: "Rock" },
        position: [RockAnimStartX, RockAnimStartY, RockAnimStartZ],
        rotation: [Random(-180, 180), Random(-180, 180), Random(-180, 180)],
        scale: [Random(2.5, 10), Random(2.5, 10), Random(2.5, 10)],
        track: `RockTrack2${i}${j}`
      }
    )
    map.customData.customEvents.push(

      // Rock Scatter Animation
      {
        b: 5,
        t: "AnimateTrack",
        d: {
          track: `RockTrack${i}${j}`,
          duration: 16,
          position: [
            [RockAnimStartX, RockAnimStartY, RockAnimStartZ, 0],
            [RockX, RockY, RockZ, Random(0.55,0.99), "easeOutSine"]
          ]
        }
      },
      {
        b: 5,
        t: "AnimateTrack",
        d: {
          track: `RockTrack2${i}${j}`,
          duration: 16,
          position: [
            [RockAnimStartX, RockAnimStartY, RockAnimStartZ, 0],
            [Rock2X, Rock2Y, Rock2Z, Random(0.55,0.99), "easeOutSine"]
          ]
        }
      },

      // Rock Idle Animation
      {
        b: 25,
        t: "AnimateTrack",
        d: {
          track: `RockTrack${i}${j}`,
          duration: KeyframeTime1,
          position: [
            [RockX, RockY, RockZ, 0],
            [RockX + (VortexPosX / Intensity), RockY + (VortexPosY / Intensity), RockZ + (VortexPosZ / Intensity), Random(0.45,0.55), "easeInOutSine"],
            [RockX, RockY, RockZ, 1, "easeInOutSine"]
          ],
          repeat: Math.ceil(MapBeatEnd / KeyframeTime1)
        }
      },
      {
        b: 25,
        t: "AnimateTrack",
        d: {
          track: `RockTrack2${i}${j}`,
          duration: KeyframeTime2,
          position: [
            [Rock2X, Rock2Y, Rock2Z, 0],
            [Rock2X + (VortexPosX / Intensity), Rock2Y + (VortexPosY / Intensity), Rock2Z + (VortexPosZ / Intensity), Random(0.45,0.55), "easeInOutSine"],
            [Rock2X, Rock2Y, Rock2Z, 1, "easeInOutSine"]
          ],
          repeat: Math.ceil(MapBeatEnd / KeyframeTime2)
        }
      }
    )
  }
}

// for (let i = 0; i < 30; i++) {

//   let x = Random(50, 550)
//   let y = Random(-500, 800)
//   let z = Random(100, 900)

//   let rotX = VortexRotX + (y / 10) + Random(-15,15)
//   let rotZ = VortexRotZ + Random(-15,15)

//   for (let j = 0; j < Random(15, 25); j++) {

//     map.customData.environment.push(
//       {
//         geometry: { type: "Cube", material: "Rock" },
//         position: [x + Random(-15, 15), y + Random(-60, 60), z + Random(-15, 15) - 200],
//         rotation: [rotX + Random(-1, 1), Random(180, 180), rotZ + Random(-1, 1)],
//         scale: [Random(10, 20) + (x / -200), Random(90, 150), Random(10, 20) + (z / 100)]
//       }
//     )
//   }
// }

// Player Rock Bridge
map.customData.environment.push(
  {
    geometry: { type: "Cube", material: "Rock" },
    position: [1, -5.15, 20],
    rotation: [0, 9, 0],
    scale: [15, 10, 55.5]
  }
)

// Player Path
for (let i = 0; i < Random(60,80); i++) {

  let x = Random(-5.5, 2.5)
  let y = Random(-0.15, -0.25)
  let z = Random(-5, 40)

  let rotX = 0
  let rotY = Random(-20, 40)
  let rotZ = 0

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x + (z / 4.5), y, z * Random(1, 1.25)],
      rotation: [rotX, rotY, rotZ],
      scale: [Random(0.5, 6.5), Random(0.15, 0.25), Random(0.5, 1.25)]
    }
  )
}

// Player Rock
for (let i = 0; i < 60; i++) {

  let x = Random(-15, 20)
  let y = Random(-25, -10)
  let z = Random(-40, 170)

  let rotX = Random(-10, 10)
  let rotY = Random(-10, 10)
  let rotZ = Random(-10, 10)

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [Random(7.5, 15), Random(7.5, 15), Random(30, 80)]
    }
  )
}

// Left laser rock
for (let i = 0; i < 30; i++) {

  let x = Random(-45, -25)
  let y = Random(90, 120)
  let z = Random(260, 280)

  let rotX = Random(60, 70)
  let rotY = Random(90, 120)
  let rotZ = Random(-40, -30)

  let Intensity = 30

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [Random(7.5, 15), Random(40, 100), Random(7.5, 15)],
      track: `RockLeftTrack${i}`
    }
  )
  map.customData.customEvents.push(
    {
      b: 0,
      t: "AnimateTrack",
      d: {
        track: `RockLeftTrack${i}`,
        duration: 24,
        position: [
          [x, y, z, 0],
          [x + (VortexPosX / Intensity), y + (VortexPosY / Intensity), z + (VortexPosZ / Intensity), Random(0.45,0.55), "easeInOutSine"],
          [x, y, z, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd / 24)
      }
    }
  )
}

const LaserAlpha = 1
const LaserFog = 0.2

let LeftLaserOffset = -22.5

// left lasers
map.customData.environment.push(
  {
    id: "t\\.\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + LeftLaserOffset],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 2)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 3)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 4)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 5)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 6)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 7)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    position: [-30, 100, 260],
    rotation: [10, 150, -140 + (LeftLaserOffset * 8)],
    track: "LeftLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
)

map.customData.customEvents.push(
  {
    b: 0,
    t: "AnimateTrack",
    d: {
      track: "LeftLaser",
      duration: 24,
      position: [
        [-30, 100, 260, 0],
        [-30 + (VortexPosX / 30), 100 + (VortexPosY / 30), 260 + (VortexPosZ / 30), Random(0.45,0.55), "easeInOutSine"],
        [-30, 100, 260, 1, "easeInOutSine"]
      ],
      repeat: Math.ceil(MapBeatEnd / 24)
    }
  }
)

// Right laser rock
for (let i = 0; i < 30; i++) {

  let x = Random(40, 70)
  let y = Random(-60, 0)
  let z = Random(150, 190)

  let rotX = Random(20, 30)
  let rotY = Random(-120, -60)
  let rotZ = Random(20, 30)

  let Intensity = 30

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      scale: [Random(7.5, 12.5), Random(40, 80), Random(7.5, 12.5)],
      track: `RockRightTrack${i}`
    }
  )
  map.customData.customEvents.push(
    {
      b: 0,
      t: "AnimateTrack",
      d: {
        track: `RockRightTrack${i}`,
        duration: 24,
        position: [
          [x, y, z, 0],
          [x + (VortexPosX / Intensity), y + (VortexPosY / Intensity), z + (VortexPosZ / Intensity), Random(0.45,0.55), "easeInOutSine"],
          [x, y, z, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd / 24)
      }
    }
  )
}



let RightLaserOffset = 17.5

// right lasers
map.customData.environment.push(
  {
    id: "t\\.\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + RightLaserOffset],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 2)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 3)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 4)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 5)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 6)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 7)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
  {
    id: "t\\.\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    position: [50, -5, 180],
    rotation: [-240, 180, 140 + (RightLaserOffset * 8)],
    track: "RightLaser",
    components: {
  TubeBloomPrePassLight: {
    colorAlphaMultiplier: LaserAlpha,
    bloomFogIntensityMultiplier: LaserFog
  }
}
  },
)

map.customData.customEvents.push(
  {
    b: 0,
    t: "AnimateTrack",
    d: {
      track: "RightLaser",
      duration: 24,
      position: [
        [50, -5, 180, 0],
        [50 + (VortexPosX / 30), -5 + (VortexPosY / 30), 180 + (VortexPosZ / 30), Random(0.45,0.55), "easeInOutSine"],
        [50, -5, 180, 1, "easeInOutSine"]
      ],
      repeat: Math.ceil(MapBeatEnd / 24)
    }
  }
)


let RightSpread = 0.75
let LeftSpread = 1.25

map.customData.environment.push(
  {
    id: "PillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX + RightSpread, 0, VortexRotZ + RightSpread],
    scale: [45, 150, 45]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX + RightSpread, 0, VortexRotZ - RightSpread],
    scale: [45, 150, 45]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX - RightSpread, 0, VortexRotZ + RightSpread],
    scale: [45, 150, 45]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX - RightSpread, 0, VortexRotZ - RightSpread],
    scale: [45, 150, 45]
  },
  {
    id: "PillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX + LeftSpread, 0, VortexRotZ + LeftSpread],
    scale: [20, 150, 20]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX + LeftSpread, 0, VortexRotZ - LeftSpread],
    scale: [20, 150, 20]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX - LeftSpread, 0, VortexRotZ + LeftSpread],
    scale: [20, 150, 20]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    position: [VortexPosX, VortexPosY, VortexPosZ],
    rotation: [VortexRotX - LeftSpread, 0, VortexRotZ - LeftSpread],
    scale: [20, 150, 20]
  },
)



// Bridge Center Lights
for (let i = 0; i < 7; i++) {

  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Light" },
      position: [-4.75 + Random(-0.5, 0.5), -0.5 + Random(-0.5, 0.5), 10 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(0.5, 1.25), Random(2, 6), Random(0.5, 1.25)],
      components: {
        ILightWithId: {
          lightID: 101,
          type: 4
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [-4.75 + Random(-0.5, 0.5), -0.25, 10 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(1.5, 2.5), Random(0.5, 0.75), Random(1.5, 2.5)],
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [6 + Random(-0.5, 0.5), -0.5 + Random(-0.5, 0.5), 19 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(0.5, 1.25), Random(2, 8), Random(0.5, 1.25)],
      components: {
        ILightWithId: {
          lightID: 102,
          type: 4
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [6 + Random(-0.5, 0.5), -0.25, 19 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(1.5, 2.5), Random(0.5, 0.75), Random(1.5, 2.5)]
    },
    {
      geometry: { type: "Cube", material: "Light" },
      position: [-3 + Random(-0.5, 0.5), -0.5 + Random(-0.5, 0.5), 30 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(0.5, 1.25), Random(3, 12), Random(0.5, 1.25)],
      components: {
        ILightWithId: {
          lightID: 102,
          type: 4
        }
      }
    },
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [-3 + Random(-0.5, 0.5), -0.25, 30 + Random(-0.5, 0.5)],
      rotation: [Random(-5, 5), Random(-180, 180), Random(-5, 5)],
      scale: [Random(1.5, 2.5), Random(0.5, 0.75), Random(1.5, 2.5)]
    }
  )
}

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
    if (x.customData.lightID == 3) {
      x.customData.lightID = 103;
    }
  }
}
)

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");