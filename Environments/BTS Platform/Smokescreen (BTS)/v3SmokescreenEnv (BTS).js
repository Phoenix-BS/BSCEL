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

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Seperate Clouds along the X axis
const CloudSeperation = 10

// Sets the Y position for all cloud objects
const CloudHeight = -12.5

// Set random rotation range on the Y axis between Range1 and Range2 (To avoid random rotation set both values to the same number)
const CloudRotationRange1 = 0
const CloudRotationRange2 = 0

// Sets the scale for all pillars and left / right laser objects
const LaserScaleX = 3
const LaserScaleY = 3
const LaserScaleZ = 3

// Sets Laser localposition (based on LaserPosition)
const PillarX = 0.25
const PillarY = -7.5
const PillarZ = -25

// Sets a gradient of seperation between each pillar object
const PillarOffsetX = 1
const PillarOffsetY = 0.1
const PillarOffsetZ = -0.5

// Sets pillar rotation
const PillarRotationX = 50
const PillarRotationY = -95
const PillarRotationZ = 0

// PILLAR BRIDGE PRESET
// const PillarX = 0
// const PillarY = -4
// const PillarZ = -25

// const PillarOffsetX = 1
// const PillarOffsetY = 0.25
// const PillarOffsetZ = -0.5

// const PillarRotationX = 0
// const PillarRotationY = -120
// const PillarRotationZ = 0

// Sets the position for the small cube objects seperate from the pillars
const SmallCubeX = 0
const SmallCubeY = 45
const SmallCubeZ = 15

// Sets small pillar localposition (based on SmallCube)
const SmallCubeOffsetX = 0.75
const SmallCubeOffsetY = -0.15
const SmallCubeOffsetZ = 0.25

// Sets small pillar rotation
const SmallCubeRotationX = -130
const SmallCubeRotationY = 15
const SmallCubeRotationZ = 15

// Ranges for random positions for ring cubes
const SkyCubeRangeX1 = -200
const SkyCubeRangeX2 = 200

const SkyCubeRangeY1 = -25
const SkyCubeRangeY2 = 75

const SkyCubeRangeZ1 = -100
const SkyCubeRangeZ2 = 200

// Will effect how far spaced apart the bottom bloom lights are from eachother
const LaserBloomOffset = 10

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.001,
        startY: -17.5,
        height: 10,
        track: "fog",
      },
    }
  },

  // Object Removal

  {
    id: "GlowLineH",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GradientBackground",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BakedBloom",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Reflector",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "BottomGlow",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "PillarsMovementEffect",
    lookupMethod: "Contains",
    active: false
  },

  // Lasers

  {
    id: "PillarL",
    lookupMethod: "EndsWith",
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ]
  },
  {
    id: "PillarR",
    lookupMethod: "EndsWith",
    scale: [LaserScaleX, LaserScaleY, LaserScaleZ]
  },

  // Pillars

  {
    id: "PillarPair\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-PillarX - (PillarX * PillarOffsetX), PillarY + (PillarY * PillarOffsetY), PillarZ + (PillarZ * PillarOffsetZ)],
    localRotation: [PillarRotationX, -PillarRotationY, -PillarRotationZ]
  },
  {
    id: "PillarPair\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [PillarX + (PillarX * PillarOffsetX), PillarY + (PillarY * PillarOffsetY), PillarZ + (PillarZ * PillarOffsetZ)],
    localRotation: [PillarRotationX, PillarRotationY, PillarRotationZ]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-PillarX - (PillarX * PillarOffsetX * 2), PillarY + (PillarY * PillarOffsetY * 2), PillarZ + (PillarZ * PillarOffsetZ * 2)],
    localRotation: [PillarRotationX, -PillarRotationY, -PillarRotationZ]
  },
  {
    id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [PillarX + (PillarX * PillarOffsetX * 2), PillarY + (PillarY * PillarOffsetY * 2), PillarZ + (PillarZ * PillarOffsetZ * 2)],
    localRotation: [PillarRotationX, PillarRotationY, PillarRotationZ]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-PillarX - (PillarX * PillarOffsetX * 3), PillarY + (PillarY * PillarOffsetY * 3), PillarZ + (PillarZ * PillarOffsetZ * 3)],
    localRotation: [PillarRotationX, -PillarRotationY, -PillarRotationZ]
  },
  {
    id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [PillarX + (PillarX * PillarOffsetX * 3), PillarY + (PillarY * PillarOffsetY * 3), PillarZ + (PillarZ * PillarOffsetZ * 3)],
    localRotation: [PillarRotationX, PillarRotationY, PillarRotationZ]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-PillarX - (PillarX * PillarOffsetX * 4), PillarY + (PillarY * PillarOffsetY * 4), PillarZ + (PillarZ * PillarOffsetZ * 4)],
    localRotation: [PillarRotationX, -PillarRotationY, -PillarRotationZ]
  },
  {
    id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [PillarX + (PillarX * PillarOffsetX * 4), PillarY + (PillarY * PillarOffsetY * 4), PillarZ + (PillarZ * PillarOffsetZ * 4)],
    localRotation: [PillarRotationX, PillarRotationY, PillarRotationZ]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-PillarX - (PillarX * PillarOffsetX * 5), PillarY + (PillarY * PillarOffsetY * 5), PillarZ + (PillarZ * PillarOffsetZ * 5)],
    localRotation: [PillarRotationX, -PillarRotationY, -PillarRotationZ]
  },
  {
    id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [PillarX + (PillarX * PillarOffsetX * 5), PillarY + (PillarY * PillarOffsetY * 5), PillarZ + (PillarZ * PillarOffsetZ * 5)],
    localRotation: [PillarRotationX, PillarRotationY, PillarRotationZ]
  },

  // Small Pillars

  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-SmallCubeX - (SmallCubeX * SmallCubeOffsetX), SmallCubeY + (SmallCubeY * SmallCubeOffsetY), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ)],
    localRotation: [SmallCubeRotationX, -SmallCubeRotationY, -SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [SmallCubeX + (SmallCubeX * SmallCubeOffsetX), SmallCubeY + (SmallCubeY * SmallCubeOffsetY), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ)],
    localRotation: [SmallCubeRotationX, SmallCubeRotationY, SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-SmallCubeX - (SmallCubeX * SmallCubeOffsetX * 2), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 2), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 2)],
    localRotation: [SmallCubeRotationX, -SmallCubeRotationY, -SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [SmallCubeX + (SmallCubeX * SmallCubeOffsetX * 2), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 2), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 2)],
    localRotation: [SmallCubeRotationX, SmallCubeRotationY, SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-SmallCubeX - (SmallCubeX * SmallCubeOffsetX * 3), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 3), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 3)],
    localRotation: [SmallCubeRotationX, -SmallCubeRotationY, -SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [SmallCubeX + (SmallCubeX * SmallCubeOffsetX * 3), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 3), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 3)],
    localRotation: [SmallCubeRotationX, SmallCubeRotationY, SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarL$",
    lookupMethod: "Regex",
    localPosition: [-SmallCubeX - (SmallCubeX * SmallCubeOffsetX * 4), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 4), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 4)],
    localRotation: [SmallCubeRotationX, -SmallCubeRotationY, -SmallCubeRotationZ]
  },
  {
    id: "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarR$",
    lookupMethod: "Regex",
    localPosition: [SmallCubeX + (SmallCubeX * SmallCubeOffsetX * 4), SmallCubeY + (SmallCubeY * SmallCubeOffsetY * 4), SmallCubeZ + (SmallCubeZ * SmallCubeOffsetZ * 4)],
    localRotation: [SmallCubeRotationX, SmallCubeRotationY, SmallCubeRotationZ]
  },

  // Clouds

  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    position: [-CloudSeperation, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [CloudSeperation, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-CloudSeperation * 2, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [CloudSeperation * 2, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-CloudSeperation * 3, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [CloudSeperation * 3, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-CloudSeperation * 4, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [CloudSeperation * 4, CloudHeight, 0],
    rotation: [0, Random(CloudRotationRange1, CloudRotationRange2), 0],
    scale: [0.75, 2.5, 10],
    track: "CloudFloor"
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    position: [0, -32.5, 0],
    rotation: [0, 0, 0],
    scale: [3, 5, 3]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -30, 0],
    rotation: [0, -60, 0],
    scale: [2.5, 4, 2.5]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -27.5, 0],
    rotation: [0, 60, 0],
    scale: [2, 3, 2]
  },

  // Bloom Lasers

  {
    id: "SideLaser\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "1\\]SideLaser$",
    lookupMethod: "Regex",
    position: [-LaserBloomOffset * 2, -7.5, -50],
    rotation: [90, 0, 0],
    scale: [2, 10, 0.25]
  },
  {
    id: "2\\]SideLaser$",
    lookupMethod: "Regex",
    position: [-LaserBloomOffset, -7.5, -50],
    rotation: [90, 0, 0],
    scale: [2, 10, 0.25]
  },
  {
    id: "3\\]SideLaser$",
    lookupMethod: "Regex",
    position: [LaserBloomOffset, -7.5, -50],
    rotation: [90, 0, 0],
    scale: [2, 10, 0.25]
  },
  {
    id: "4\\]SideLaser$",
    lookupMethod: "Regex",
    position: [LaserBloomOffset * 2, -7.5, -50],
    rotation: [90, 0, 0],
    scale: [2, 10, 0.25]
  },

  // Misc

  {
    id: "StarHemisphere$",
    lookupMethod: "Regex",
    scale: [3, 3, 3]
  },
  {
    id: "MagicDoorSprite",
    lookupMethod: "EndsWith",
    position: [0, 50, 500],
    rotation: [-30, 0, 90],
    scale: [10, 10, 1]
  },
  {
    id: "MagicDoorSprite",
    lookupMethod: "EndsWith",
    duplicate: 1,
    position: [0, 50, 500],
    rotation: [-30, 0, -90],
    scale: [10, 10, 1]
  },

  // CUBE EFFECT (Modified version, Original made by Zyxi) //
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
    "lookupMethod": "Regex",
    "duplicate": 1,
    "active": true
  },
  {
    "id": "[1]Cube(Clone)",
    "lookupMethod": "Contains",
    "position": [
      0,
      25,
      25
    ],
    track: "CubeGroup"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "localPosition": [
      Random(SkyCubeRangeX1, SkyCubeRangeX2),
      Random(SkyCubeRangeY1, SkyCubeRangeY2),
      Random(SkyCubeRangeZ1, SkyCubeRangeZ2)
    ],
    "scale": [
      0.75,
      1000,
      0.75
    ],
    "rotation": [
      Random(-60, 60),
      Random(-360, 360),
      Random(-60, 60)
    ],
    track: "Cubes"
  },
  {
    "id": "[0]Cube",
    "lookupMethod": "Contains",
    "active": false
  }
];

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
