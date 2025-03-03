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

// Mark the final beat of your map to ensure the idle environment animations work
const MapBeatEnd = 982

function lerp(a, b, t) {
  return (b - a) * t + a
}

function Random(min, max) {
  return lerp(min, max, Math.random())
}

map.customData.materials = {
  "Rock": {
    shader: "BTSPillar",
    color: [0.2, 0.2, 0.2]
  },
  "Light": {
    shader: "TransparentLight",
  }
};

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.00001,
        startY: -32.5
      },
    }
  },
  {
    id: "LowCloudsGenerator",
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
    id: "MagicDoorSprite",
    lookupMethod: "Contains",
    active: false
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
  {
    id: "LaserLight0",
    lookupMethod: "Contains",
    active: false
  },
  {
    geometry: { type: "Cube", material: "Rock" },
    position: [0, -22.5, 0],
    scale: [40, 40, 40]
  },
  {
    geometry: { type: "Sphere", material: "Light" },
    position: [0, 0, 400],
    rotation: [0, 0, 90],
    scale: [250, 250, 250],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 0.05,
        bloomFogIntensityMultiplier: 20
      }
    },
  },

  {
    id: "0]SideLaser",
    lookupMethod: "EndsWith",
    position: [0, -50, 1000],
    scale: [100, 100, 100],
    rotation: [-60, 0, 30]
  },
  {
    id: "3]SideLaser",
    lookupMethod: "EndsWith",
    position: [0, -50, 1000],
    scale: [100, 100, 100],
    rotation: [-60, 0, 10]
  },
  {
    id: "2]SideLaser",
    lookupMethod: "EndsWith",
    position: [0, -50, 1000],
    scale: [100, 100, 100],
    rotation: [-60, 0, -10]
  },
  {
    id: "1]SideLaser",
    lookupMethod: "EndsWith",
    position: [0, -50, 1000],
    scale: [100, 100, 100],
    rotation: [-60, 0, -30]
  },

  {
    id: "DirectionalLight",
    lookupMethod: "Contains",
    rotation: [60, 0, 0]
  },
];

let LaserX = -80

let LaserAnchor = 200
let LaserSpace = 40
let LaserScale = 15

let RotX = 90
let RotY = 90
let RotZ = 0

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
    position: [-LaserX, -30, LaserAnchor],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + LaserSpace],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + LaserSpace],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 2)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 2)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 3)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 3)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 4)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 4)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 5)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 5)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 6)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 6)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 7)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 7)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
    lookupMethod: "Regex",
    position: [-LaserX, -30, LaserAnchor + (LaserSpace * 8)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
    lookupMethod: "Regex",
    position: [LaserX, -30, LaserAnchor + (LaserSpace * 8)],
    rotation: [RotX, RotY, RotZ],
    scale: [LaserScale, LaserScale, LaserScale]
  },
)

for (let i = 0; i < 30; i++) {

  let Scale = Random(1, 2.5) * (i * 0.75)
  map.customData.environment.push(
    {
      id: "LowCloudsGenerator",
      lookupMethod: "EndsWith",
      duplicate: 1,
      position: [Random(-25, 25) + Scale, -25, Random(-25, 25) + Scale],
      rotation: [0, Random(-180, 180), 0],
      scale: [Scale, Random(2, 3), Scale]
    },
  );
}

// Player Rock Base
for (let i = 0; i < 40; i++) {
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [Random(-30, 30), -20, Random(-20, 40)],
      rotation: [0, Random(-180, 180), 0],
      scale: [Random(7.5, 15), 40, Random(7.5, 15)]
    }
  )
}

// Floor Rock Generation
// for (let i = 0; i < 20; i++) {
//   let side = Math.random() < 0.5 ? -1 : 1
//   let RangeX = Random(50, 750) * side
//   let RangeZ = Random(-500, 1250)

//   for (let j = 0; j < Random(20, 40); j++) {

//     let PosX = RangeX + Random(-40, 40)
//     let PosY = Random(-32.5, 15)
//     let PosZ = RangeZ + Random(-40, 40)
//     map.customData.environment.push(
//       {
//         geometry: { type: "Cube", material: "Rock" },
//         position: [PosX * 1.5, PosY, PosZ],
//         rotation: [Random(-15,15), Random(-180, 180), Random(-15,15)],
//         scale: [Random(7.5, 20), randBias(40, 160, 4), Random(7.5, 20)]
//       }
//     )
//   }
// }

// Cluster Rock Background
for (let i = 0; i < 20; i++) {

  let RangeX = Random(-550, -250)
  let RangeZ = Random(600, 750)

  for (let j = 0; j < Random(20, 40); j++) {

    let PosX = RangeX + Random(-120, 120)
    let PosY = Random(0, 100) + (PosX / 6)
    let PosZ = RangeZ + Random(-80, 80)
    map.customData.environment.push(
      {
        geometry: { type: "Cube", material: "Rock" },
        position: [PosX, PosY, PosZ],
        rotation: [Random(45, 75), Random(55, 65), Random(30, 60)],
        scale: [Random(30, 40), Random(75, 225), Random(30, 40)]
      },
      {
        geometry: { type: "Cube", material: "Rock" },
        position: [-PosX, PosY, PosZ],
        rotation: [Random(45, 75), Random(-55, -65), Random(-30, -60)],
        scale: [Random(30, 40), Random(75, 225), Random(30, 40)]
      }
    )
  }
}

// Cluster Rock Background Animation Pillar
for (let i = 0; i < 60; i++) {

  let x = Random(225, 275)
  let y = Random(-50, 0)
  let z = Random(925, 975)
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [-x, y, z],
      rotation: [Random(-15, 15), Random(-120, 120), Random(0, 30)],
      scale: [Random(60, 100), Random(250, 350), Random(60, 100)],
      track: `RockPillarL${i}`
    },
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x, y, z],
      rotation: [Random(-15, 15), Random(-120, 120), Random(0, -30)],
      scale: [Random(60, 100), Random(250, 350), Random(60, 100)],
      track: `RockPillarR${i}`
    },
  )

  // Starting beat for the rock pillar rising animation
  let Start = 5

  map.customData.customEvents.push(
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `RockPillarL${i}`,
        duration: Random(12,16),
        position: [
          [-x, y, z, 0],
          [-x + Random(0, 50), y + Random(50, 500), z - Random(0, 25), 1, "easeOutSine"]
        ]
      }
    },
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `RockPillarR${i}`,
        duration: Random(12,16),
        position: [
          [x, y, z, 0],
          [x - Random(0, 50), y + Random(50, 500), z - Random(0, 25), 1, "easeOutSine"]
        ]
      }
    },
  )
}

// Cluster Rock Background Animation Debris
for (let i = 0; i < 60; i++) {

  let x = Random(-1250, 1250)
  let y = Random(100, 500)
  let z = Random(150, 1250)
  map.customData.environment.push(
    {
      geometry: { type: "Cube", material: "Rock" },
      position: [x, -50, z],
      scale: [Random(5,25),Random(5,25),Random(5,25)],
      track: `RockDebris${i}`
    }
  )

// Animation Time properties for the floating rock debris launch animation
  let Start = 5
  let KeyframeRandom = 12

  let x2 = x + Random(-150,150)
  let z2 = z + Random(-150,150)

  map.customData.customEvents.push(
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `RockDebris${i}`,
        duration: KeyframeRandom,
        position: [
          [x, -50, z, 0],
          [x2, y, z2, 1, "easeOutExpo"]
        ],
        rotation: [
          [Random(-180,180), Random(-180,180), Random(-180,180), 0],
          [Random(-180,180), Random(-180,180), Random(-180,180), 1, "easeOutExpo"]
        ]
      }
    },
    {
      b: Start + KeyframeRandom + 0.01,
      t: "AnimateTrack",
      d: {
        track: `RockDebris${i}`,
        duration: KeyframeRandom,
        position: [
          [x2, y, z2, 0],
          [x2 + Random(-25,25), y + Random(-75,75), z2 + Random(-25,25), 0.5, "easeInOutSine"],
          [x2, y, z2, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd)
      }
    }
  )
}

// Sphere Light
for (let i = 0; i < 50; i++) {

  let x1 = Random(-750, 750)
  let y1 = Random(-25, -10)
  let z1 = Random(-250, 1250)

  let x2 = Random(-750, 750)
  let y2 = Random(-25, -10)
  let z2 = Random(-250, 1250)

  let x3 = Random(-750, 750)
  let y3 = Random(-25, -10)
  let z3 = Random(-250, 1250)

  map.customData.environment.push(
    {
      geometry: { type: "Sphere", material: "Light" },
      position: [x1, y1, z1],
      rotation: [Random(-30, 30), Random(-180, 180), Random(-30, 30)],
      scale: [Random(2.5, 7.5), Random(40, 160), Random(2.5, 7.5)],
      track: `SphereLight1${i}`,
      components: {
        ILightWithId: {
          lightID: 101,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 10,
          bloomFogIntensityMultiplier: 2.5
        }
      },
    },
    {
      geometry: { type: "Sphere", material: "Light" },
      position: [x1, y1, z1],
      rotation: [Random(-30, 30), Random(-180, 180), Random(-30, 30)],
      scale: [Random(2.5, 7.5), Random(40, 160), Random(2.5, 7.5)],
      track: `SphereLight2${i}`,
      components: {
        ILightWithId: {
          lightID: 102,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 10,
          bloomFogIntensityMultiplier: 2.5
        }
      },
    },
    {
      geometry: { type: "Sphere", material: "Light" },
      position: [x1, y1, z1],
      rotation: [Random(-30, 30), Random(-180, 180), Random(-30, 30)],
      scale: [Random(2.5, 7.5), Random(40, 160), Random(2.5, 7.5)],
      track: `SphereLight3${i}`,
      components: {
        ILightWithId: {
          lightID: 103,
          type: 4
        },
        TubeBloomPrePassLight: {
          colorAlphaMultiplier: 10,
          bloomFogIntensityMultiplier: 2.5
        }
      },
    }
  )

  // Animation Time Properties for the floating sphere lights animation
  let Start = 5
  let KeyframeRandom = Random(16, 32)

  let xa = x1 + Random(-25, 25)
  let ya = y1 + Random(100, 500)
  let za = z1 + Random(-25, 25)

  map.customData.customEvents.push(
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `SphereLight1${i}`,
        duration: KeyframeRandom,
        position: [
          [x1, y1, z1, 0],
          [xa, ya, za, 1, "easeOutSine"]
        ],
        rotation: [
        [Random(-30,30), Random(-180,180), Random(-30,30), 0],
        [Random(-30,30), Random(-180,180), Random(-30,30), 1, "easeOutQuad"]
        ]
      }
    },
    {
      b: Start + KeyframeRandom + 0.01,
      t: "AnimateTrack",
      d: {
        track: `SphereLight1${i}`,
        duration: KeyframeRandom,
        position: [
          [xa, ya, za, 0],
          [xa + Random(-25, 25), ya + Random(-75, 125), za + Random(-25, 25), 0.5, "easeInOutSine"],
          [xa, ya, za, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd)
      }
    },
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `SphereLight2${i}`,
        duration: KeyframeRandom,
        position: [
          [x2, y2, z2, 0],
          [xa, ya, za, 1, "easeOutSine"]
        ],
        rotation: [
        [Random(-30,30), Random(-180,180), Random(-30,30), 0],
        [Random(-30,30), Random(-180,180), Random(-30,30), 1, "easeOutQuad"]
        ]
      }
    },
    {
      b: Start + KeyframeRandom + 0.01,
      t: "AnimateTrack",
      d: {
        track: `SphereLight2${i}`,
        duration: KeyframeRandom,
        position: [
          [xa, ya, za, 0],
          [xa + Random(-25, 25), ya + Random(-75, 125), za + Random(-25, 25), 0.5, "easeInOutSine"],
          [xa, ya, za, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd)
      }
    },
    {
      b: Start,
      t: "AnimateTrack",
      d: {
        track: `SphereLight3${i}`,
        duration: KeyframeRandom,
        position: [
          [x3, y3, z3, 0],
          [xa, ya, za, 1, "easeOutSine"]
        ],
        rotation: [
        [Random(-30,30), Random(-180,180), Random(-30,30), 0],
        [Random(-30,30), Random(-180,180), Random(-30,30), 1, "easeOutQuad"]
        ]
      }
    },
    {
      b: Start + KeyframeRandom + 0.01,
      t: "AnimateTrack",
      d: {
        track: `SphereLight3${i}`,
        duration: KeyframeRandom,
        position: [
          [xa, ya, za, 0],
          [xa + Random(-25, 25), ya + Random(-75, 125), za + Random(-25, 25), 0.5, "easeInOutSine"],
          [xa, ya, za, 1, "easeInOutSine"]
        ],
        repeat: Math.ceil(MapBeatEnd)
      }
    },
  )
}

let RotAnchor = -30
let RotSpace = 7.5

map.customData.environment.push(
  {
    id: "PillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - RotSpace],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + RotSpace],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 2)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 2)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 3)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 3)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 4)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 4)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 5)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 5)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 6)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 6)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 7)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 7)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]LaserL$",
    lookupMethod: "Regex",
    position: [-300, -50, 800],
    rotation: [0, -30, -RotAnchor - (RotSpace * 8)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]LaserR$",
    lookupMethod: "Regex",
    position: [300, -50, 800],
    rotation: [0, 30, RotAnchor + (RotSpace * 8)],
    scale: [25, 25, 25],
    components: {
      TubeBloomPrePessLight: {
        colorAlphaMultiplier: 3
      }
    }
  },
)

map.basicBeatmapEvents.forEach((x) => {
  if (x.et == 0 && x.customData) {
    if (x.customData.lightID == 1) {
      x.customData.lightID = 101;
    }
  }
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

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");