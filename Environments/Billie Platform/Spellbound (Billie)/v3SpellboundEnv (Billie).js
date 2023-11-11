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

// Sets the Y position value of Mountains, Water, and anything else targeted to height (lots of values below are based on this)
const SceneryHeight = -150

// effects left & right lasers
const LaserScaleX = 75
const LaserScaleY = 25
const LaserScaleZ = 25
const LaserBrightness = 25

// Effects the left lasers
const LaserLX = -250
const LaserLY = SceneryHeight * 1.25
const LaserLZ = 850

const LaserLRotationX = 90
const LaserLRotationY = 120
const LaserLRotationZ = 90

const LaserLSpreadX = 30
const LaserLSpreadY = 0
const LaserLSpreadZ = 0

// Effects the right lasers
const LaserRX = 450
const LaserRY = SceneryHeight * 1.25
const LaserRZ = 700

const LaserRRotationX = -75
const LaserRRotationY = 120
const LaserRRotationZ = 60

const LaserRSpreadX = 30
const LaserRSpreadY = 0
const LaserRSpreadZ = 0

// Effects the tunnel lights
const TunnelPositionX = 0
const TunnelPositionY = -500
const TunnelPositionZ = 2500

const TunnelRotationX = -15
const TunnelRotationY = 0
const TunnelRotationZ = 0

const TunnelScaleX = 50000
const TunnelScaleY = 25
const TunnelScaleZ = 50000

const TunnelBrightness = 300
// 100 = low, 250 = meduim, 400 = high (is tied to attenuation)

// Moves the surrounding background mountains on X and Z axis
const MountainRangePositionX = 0
const MountainRangePositionZ = 150

// Effects the streaks that hover above the player
const CloudPositionX = 0
const CloudPositionY = 50
const CloudPositionZ = 0

const CloudRotationRange1 = -60
const CloudRotationRange2 = 60

const CloudRadialScale1 = 100
const CloudRadialScale2 = 150
const CloudLineScalel1 = 0.5
const CloudLineScale2 = 3

// mountain rock parameters, will effect all mountain rock groups
const MountainRockRotation1X = -90
const MountainRockRotation2X = -90
const MountainRockRotation1Y = -180
const MountainRockRotation2Y = 180
const MountainRockRotation1Z = 0
const MountainRockRotation2Z = 0

const MountainRockScaleX = 0.1
const MountainRockScaleY = 0.1
const MountainRockScaleZ = 1

const MountainRockLightScaleX = 80
const MountainRockLightScaleZ = 80
// effects the smaller tubes that float around the main one, follows the formula "ScaleBase / ScaleDivider"
const MountainRockLightScaleDivider = 8

const MountainRockLightSpread = 0

const MountainLightBrightness = 5
// 1 = low, 2 = meduim, 5 = high (is tied to attenuation)

// position of rock 1 as determined by a random range
const MountainRockRange1X = -75
const MountainRockRange1XE = -75
const MountainRockRange1Z = 250
const MountainRockRange1ZE = 250

const MountainRock1X = Random(MountainRockRange1X, MountainRockRange1XE)
const MountainRock1Z = Random(MountainRockRange1Z, MountainRockRange1ZE)

// position of rock 2 as determined by a random range
const MountainRockRange2X = 75
const MountainRockRange2XE = 75
const MountainRockRange2Z = 250
const MountainRockRange2ZE = 250

const MountainRock2X = Random(MountainRockRange2X, MountainRockRange2XE)
const MountainRock2Z = Random(MountainRockRange2Z, MountainRockRange2ZE)

// position of the floating sky island + tower
const IslandX = 100
const IslandY = 700
const IslandZ = 2000

map.customData.materials = {
  "Tower": {
    "shader": "Standard",
    "color": [0, 0, 0]
  },
  "Light": {
    "shader": "OpaqueLight",
    "color": [0, 0, 0]
  },
};

map.customData.environment = [
  {
    id: "BillieEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.001,
        startY: -9999,
        height: 1
      },
    }
  },

  // Object Removal

  {
    id: "BackgroundGradient",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "NeonTubeDirectionalR",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LeftRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "RightRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "FarRail",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Curve",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "RailingFull",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "n\\.\\[\\d+\\]NeonTube$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTubeDirectionalL (1)",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LightRailingSegment (2)",
    lookupMethod: "EndsWith",
    active: false
  },
  {
    id: "LightRailingSegment (3)",
    lookupMethod: "EndsWith",
    active: false
  },

  // Misc

  {
    id: "Waterfall",
    lookupMethod: "EndsWith",
    scale: [750, 1, 100],
    position: [0, SceneryHeight, -1750],
    rotation: [0, 0, 0]
  },
  {
    id: "DayAndNight$",
    lookupMethod: "Regex",
    scale: [350, 350, 1],
    position: [250, -5100, 2000],
    rotation: [0, 0, 0],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness / 2.5,
      }
    }
  },  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(\\d\\)$",
    lookupMethod: "Regex",
    rotation: [0, 0, 0]
  },
  {
    id: "BigSmokePS",
    lookupMethod: "EndsWith",
    scale: [1.5, 1000, 1.5],
    position: [0, 5, 7.5],
    rotation: [0, 0, 0]
  },
  {
    id: "BigSmokePS",
    lookupMethod: "EndsWith",
    duplicate: 5,
    scale: [40, 0.01, 40],
    position: [0, SceneryHeight, 0],
    rotation: [0, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    position: [350, -3000, 2500],
    scale: [0, -700, 10],
    rotation: [0, 90, 45]
  },
  {
    id: "WaterRainRipples\\.\\[\\d\\]SplashMesh$",
    lookupMethod: "Regex",
    position: [2500, -50000, -22500],
    scale: [20000, 60000, 500],
    rotation: [0, 0, 0],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 7,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 0.25,
        bloomFogIntensityMultiplier: 0
      }
    },
  },
  {
    id: "Rain",
    lookupMethod: "EndsWith",
    position: [0, -9999, 0],
  },
  {
    id: "Rain",
    lookupMethod: "EndsWith",
    duplicate: 15,
    position: [0, 0, 1000],
    scale: [1000, 75, 1000],
    rotation: [0, Random(-180, 180), 180],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 7,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 10,
        bloomFogIntensityMultiplier: 10
      }
    },
  },

  // Left Lasers

  {
    id: "BottomPairLasers\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 1.25), LaserLRotationY + (LaserLSpreadY * 1.25), LaserLRotationZ + (LaserLSpreadZ * 1.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 1.5), LaserLRotationY + (LaserLSpreadY * 1.5), LaserLRotationZ + (LaserLSpreadZ * 1.5)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 1.75), LaserLRotationY + (LaserLSpreadY * 1.75), LaserLRotationZ + (LaserLSpreadZ * 1.75)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 2), LaserLRotationY + (LaserLSpreadY * 2), LaserLRotationZ + (LaserLSpreadZ * 2)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 2.25), LaserLRotationY + (LaserLSpreadY * 2.25), LaserLRotationZ + (LaserLSpreadZ * 2.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 2.5), LaserLRotationY + (LaserLSpreadY * 2.5), LaserLRotationZ + (LaserLSpreadZ * 2.5)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 2.75), LaserLRotationY + (LaserLSpreadY * 2.75), LaserLRotationZ + (LaserLSpreadZ * 2.75)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 3), LaserLRotationY + (LaserLSpreadY * 3), LaserLRotationZ + (LaserLSpreadZ * 3)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    position: [LaserLX, LaserLY, LaserLZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserLRotationX + (LaserLSpreadX * 3.25), LaserLRotationY + (LaserLSpreadY * 3.25), LaserLRotationZ + (LaserLSpreadZ * 3.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  
  // Right Lasers

  {
    id: "BottomPairLasers\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 1.25), LaserRRotationY + (LaserRSpreadY * 1.25), LaserRRotationZ + (LaserRSpreadZ * 1.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 1.5), LaserRRotationY + (LaserRSpreadY * 1.5), LaserRRotationZ + (LaserRSpreadZ * 1.5)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 1.75), LaserRRotationY + (LaserRSpreadY * 1.75), LaserRRotationZ + (LaserRSpreadZ * 1.75)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 2), LaserRRotationY + (LaserRSpreadY * 2), LaserRRotationZ + (LaserRSpreadZ * 2)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 2.25), LaserRRotationY + (LaserRSpreadY * 2.25), LaserRRotationZ + (LaserRSpreadZ * 2.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 2.5), LaserRRotationY + (LaserRSpreadY * 2.5), LaserRRotationZ + (LaserRSpreadZ * 2.5)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 2.75), LaserRRotationY + (LaserRSpreadY * 2.75), LaserRRotationZ + (LaserRSpreadZ * 2.75)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 3), LaserRRotationY + (LaserRSpreadY * 3), LaserRRotationZ + (LaserRSpreadZ * 3)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },
  {
    id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    position: [LaserRX, LaserRY, LaserRZ],
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
    rotation: [LaserRRotationX + (LaserRSpreadX * 3.25), LaserRRotationY + (LaserRSpreadY * 3.25), LaserRRotationZ + (LaserRSpreadZ * 3.25)],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: LaserBrightness,
        bloomFogIntensityMultiplier: LaserBrightness
      },
    },
  },

  // Tunnel Lasers

  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [-TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [TunnelScaleX, TunnelScaleY, TunnelScaleZ],
    position: [TunnelPositionX, TunnelPositionY, TunnelPositionZ],
    rotation: [TunnelRotationX, TunnelRotationY, TunnelRotationZ],
    components: {
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: TunnelBrightness,
      }
    },
  },

  // Clouds

  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 0, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [0, 50000, 0]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 30, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 60, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 90, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 120, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 150, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 180, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 210, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 240, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 270, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 300, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },
  {
    id: "Clouds",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(CloudRadialScale1, CloudRadialScale2), Random(CloudRadialScale1, CloudRadialScale2), Random(CloudLineScalel1, CloudLineScale2)],
    rotation: [Random(CloudRotationRange1, CloudRotationRange2), 330, Random(CloudRotationRange1, CloudRotationRange2)],
    position: [CloudPositionX, CloudPositionY, CloudPositionZ]
  },

  // Mountain Range

  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    scale: [1.5, 1.5, 1.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 45, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [1.5, 1.5, 1.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 135, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [1.5, 1.5, 1.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 225, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [1.5, 1.5, 1.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 315, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [2, 2, 2.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 0, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [2, 2, 2.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 90, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [2, 2, 2.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 180, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [2, 2, 2.5],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 270, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [3, 3, Random(3, 4.5)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 45, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [3, 3, Random(3, 4.5)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 135, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [3, 3, Random(3, 4.5)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 225, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [3, 3, Random(3, 4.5)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 315, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [5, 5, 15],
    position: [MountainRangePositionX, SceneryHeight - 30, MountainRangePositionZ],
    rotation: [-90, 0, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [5, 5, 15],
    position: [MountainRangePositionX, SceneryHeight - 30, MountainRangePositionZ],
    rotation: [-90, 90, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [5, 5, 15],
    position: [MountainRangePositionX, SceneryHeight - 30, MountainRangePositionZ],
    rotation: [-90, 180, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [5, 5, 15],
    position: [MountainRangePositionX, SceneryHeight - 30, MountainRangePositionZ],
    rotation: [-90, 270, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(1, 1.5), Random(1, 1.5), Random(0.1, 0.25)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 0, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(1, 1.5), Random(1, 1.5), Random(0.1, 0.25)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 90, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(1, 1.5), Random(1, 1.5), Random(0.1, 0.25)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 180, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(1, 1.5), Random(1, 1.5), Random(0.1, 0.25)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 270, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(0.3, 0.8), Random(0.1, 0.6), Random(0.05, 0.15)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 0, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(0.3, 0.8), Random(0.1, 0.6), Random(0.05, 0.15)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 90, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(0.3, 0.8), Random(0.1, 0.6), Random(0.05, 0.15)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 180, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [Random(0.3, 0.8), Random(0.1, 0.6), Random(0.05, 0.15)],
    position: [MountainRangePositionX, SceneryHeight, MountainRangePositionZ],
    rotation: [-90, 270, 0]
  },

  // floating island + house

  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [1.5, 0, 3],
    position: [IslandX - 300, IslandY - 250, IslandZ],
    rotation: [90, 0, 0]
  },
  {
    id: "BackMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    scale: [1.5, 0, -2],
    position: [IslandX - 300, IslandY - 165, IslandZ],
    rotation: [90, 0, 0]
  },

  {
    geometry: { type: "Cube", material: "Tower" },
    position: [IslandX, IslandY, IslandZ],
    rotation: [0, 0, 0],
    scale: [50, 250, 0]
  },
  {
    geometry: { type: "Cube", material: "Tower" },
    position: [IslandX, IslandY + 70, IslandZ],
    rotation: [0, 0, 45],
    scale: [60, 60, 0]
  },
  {
    geometry: { type: "Cube", material: "Tower" },
    position: [IslandX, IslandY + 100, IslandZ],
    rotation: [0, 0, 45],
    scale: [80, 80, 0]
  },
  {
    geometry: { type: "Sphere", material: "Tower" },
    position: [IslandX, IslandY + 125, IslandZ],
    rotation: [0, 0, 45],
    scale: [80, 80, 0]
  },

  {
    geometry: { type: "Cube", material: "Light" },
    position: [IslandX, IslandY, IslandZ],
    rotation: [0, 0, 0],
    scale: [7.5, 110, 1],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 6,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 25,
        bloomFogIntensityMultiplier: 100
      }
    },
  },
  {
    geometry: { type: "Cube", material: "Light" },
    position: [IslandX, IslandY + 60, IslandZ],
    rotation: [0, 0, 0],
    scale: [40, 7.5, 1],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 6,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 25,
        bloomFogIntensityMultiplier: 100
      }
    },
  },
  {
    geometry: { type: "Cube", material: "Light" },
    position: [IslandX, IslandY + 80, IslandZ],
    rotation: [0, 0, 0],
    scale: [60, 10, 1],
    components: {
      ILightWithId: {
        lightID: 103,
        type: 6,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 25,
        bloomFogIntensityMultiplier: 100
      }
    },
  },
  {
    geometry: { type: "Sphere", material: "Light" },
    position: [IslandX, IslandY + 125, IslandZ],
    rotation: [0, 0, 0],
    scale: [60, 60, 1],
    components: {
      ILightWithId: {
        lightID: 104,
        type: 6,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 25,
        bloomFogIntensityMultiplier: 100
      }
    },
  },



  // Mountain Rock 1

  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX, MountainRockScaleY, MountainRockScaleZ],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.25, MountainRockScaleY * 1.25, MountainRockScaleZ / 1.5],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.5, MountainRockScaleY * 1.5, MountainRockScaleZ / 2],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.75, MountainRockScaleY * 1.75, MountainRockScaleZ / 2.5],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / 3],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "LightRailingSegment\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    position: [MountainRock1X, SceneryHeight, MountainRock1Z],
    rotation: [0, 0, 0],
    scale: [MountainRockLightScaleX, 10000, MountainRockLightScaleZ],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 0,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness,
        bloomFogIntensityMultiplier: 100
      }
    },
  },
  {
    id: "LightRailingSegment\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock1X - 15, SceneryHeight - 15, MountainRock1Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 0,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },
  {
    id: "LightRailingSegment\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock1X, SceneryHeight - 15, MountainRock1Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 103,
        type: 0,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },
  {
    id: "LightRailingSegment\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock1X + 15, SceneryHeight - 15, MountainRock1Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 104,
        type: 0,
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },

  // mountain rock 2

  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX, MountainRockScaleY, MountainRockScaleZ],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.25, MountainRockScaleY * 1.25, MountainRockScaleZ / 1.5],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.5, MountainRockScaleY * 1.5, MountainRockScaleZ / 2],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * 1.75, MountainRockScaleY * 1.75, MountainRockScaleZ / 2.5],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / 3],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "FrontMountains",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [Random(MountainRockRotation1X, MountainRockRotation2X), Random(MountainRockRotation1Y, MountainRockRotation2Y), Random(MountainRockRotation1Z, MountainRockRotation2Z)],
    scale: [MountainRockScaleX * Random(2, 5), MountainRockScaleY * Random(2, 5), MountainRockScaleZ / Random(5, 8)],
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight, MountainRock2Z],
    rotation: [0, 0, 0],
    scale: [MountainRockLightScaleX, 10000, MountainRockLightScaleZ],
    components: {
      ILightWithId: {
        lightID: 101,
        type: 1
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness,
        bloomFogIntensityMultiplier: 100
      }
    },
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    position: [MountainRock2X - 15, SceneryHeight - 15, MountainRock2Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 102,
        type: 1
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock2X, SceneryHeight - 15, MountainRock2Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 103,
        type: 1
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d+\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [MountainRock2X + 15, SceneryHeight - 15, MountainRock2Z],
    rotation: [Random(-MountainRockLightSpread, MountainRockLightSpread), Random(-180, 180), Random(-MountainRockLightSpread, MountainRockLightSpread)],
    scale: [MountainRockLightScaleX / MountainRockLightScaleDivider, 10000, MountainRockLightScaleZ / MountainRockLightScaleDivider],
    components: {
      ILightWithId: {
        lightID: 104,
        type: 1
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: MountainLightBrightness / 1.5,
        bloomFogIntensityMultiplier: 10
      }
    },
  },
];

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
    if (x.customData.lightID == 4) {
      x.customData.lightID = 104;
    }
  }
  if (x.et == 1 && x.customData) {
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
  if (x.et == 6 && x.customData) {
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
  if (x.et == 7 && x.customData) {
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
