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

const LogoScaleX = 1.75
const LogoScaleY = 7.5

const LogoPositionX = 0
const LogoPositionY = 50
const LogoPositionZ = 500

const PillarScaleX = 4
const PillarScaleY = 12
const PillarScaleZ = 1.5

const RotationBaseScaleX = 8
const RotationBaseScaleY = 8
const RotationBaseScaleZ = 8

const PillarRotationArch = 10

const SmallPillarScaleX = 3.75
const SmallPillarScaleY = 0.1
const SmallPillarScaleZ = 3

map.customData.environment = [
  {
    id: "BTSEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.0001,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "TrackMirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Construction",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LaserLight0$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "GlowLineH",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "GlowLineL$",
    lookupMethod: "Regex",
    scale: [240, 240, 240],
    rotation: [0, 0, 0],
    position: [-100, -500, 450]
  },
  {
    id: "GlowLineR$",
    lookupMethod: "Regex",
    scale: [240, 240, 240],
    rotation: [0, 0, 0],
    position: [100, -500, 450]
  },
  {
    id: "GlowLineC$",
    lookupMethod: "Regex",
    active: false
  },

  // Cloud Wall

  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    scale: [110, 80, 110],
    rotation: [90, 180, 0],
    position: [0, 50, 700]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [110, 80, 110],
    rotation: [-90, 0, 0],
    position: [0, 50, 700]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [32, 100, 32],
    rotation: [90, 180, 0],
    position: [0, 50, 700]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [32, 100, 32],
    rotation: [-90, 0, 0],
    position: [0, 50, 700]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [14, 185, 14],
    rotation: [90, 180, 0],
    position: [0, 50, 1300]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [14, 185, 14],
    rotation: [-90, 0, 0],
    position: [0, 50, 1300]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [12, 185, 12],
    rotation: [90, 180, 0],
    position: [0, 50, 1300]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [12, 185, 12],
    rotation: [-90, 0, 0],
    position: [0, 50, 1300]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [10, 185, 10],
    rotation: [90, 180, 0],
    position: [0, 50, 1300]
  },
  {
    id: "LowCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [10, 185, 10],
    rotation: [-90, 0, 0],
    position: [0, 50, 1300]
  },

  // Cloud Rings

  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    scale: [0.75, 2, 0.75],
    rotation: [-90, 0, 0],
    position: [0, 25, 175]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.8, 2, 0.8],
    rotation: [-90, 90, 90],
    position: [0, 25, 175]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.75, 2, 0.75],
    rotation: [270, 0, 0],
    position: [0, 25, 175]
  },
  {
    id: "HighCloudsGenerator$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.725, 2.1, 0.725],
    rotation: [270, 90, 90],
    position: [0, 25, 180]
  },

  // Logo

  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 0],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 30],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 60],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 90],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 120],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 150],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 180],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 210],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 240],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 270],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 300],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "MagicDoorSprite$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [LogoScaleX, LogoScaleY, 3],
    rotation: [0, 0, 330],
    position: [LogoPositionX, LogoPositionY, LogoPositionZ]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, -30],
    position: [-22.5, 60, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, 30],
    position: [-22.5, 60, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [-22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [-22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, -140],
    position: [-22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, 140],
    position: [-22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, -30],
    position: [22.5, 60, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, 30],
    position: [22.5, 60, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, -140],
    position: [22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, 140],
    position: [22.5, 57.5, 140]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, -30],
    position: [-50, 50, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, 30],
    position: [-50, 50, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [-50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [-50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, -120],
    position: [-50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, 120],
    position: [-50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, -30],
    position: [50, 50, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]Pillar$",
    lookupMethod: "Regex",
    scale: [SmallPillarScaleX, SmallPillarScaleY, SmallPillarScaleZ],
    rotation: [0, 0, 30],
    position: [50, 50, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]RotationBaseL$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]RotationBaseR$",
    lookupMethod: "Regex",
    scale: [RotationBaseScaleX, RotationBaseScaleY, RotationBaseScaleZ],
    rotation: [0, 0, 0],
    position: [50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, -120],
    position: [50, 47.5, 170]
  },
  {
    id: "\\[\\d+\\]SmallPillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    rotation: [0, 0, 120],
    position: [50, 47.5, 170]
  },

  // Pillar Lasers

  {
    id: "\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, -PillarRotationArch],
    position: [-10, -45, 110]
  },
  {
    id: "\\[\\d+\\]PillarPair\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, PillarRotationArch],
    position: [10, -45, 110]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, -PillarRotationArch * 2],
    position: [-25, -30, 120]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, PillarRotationArch * 2],
    position: [25, -30, 120]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, -PillarRotationArch * 3],
    position: [-40, -15, 130]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, PillarRotationArch * 3],
    position: [40, -15, 130]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, -PillarRotationArch * 4],
    position: [-55, 5, 140]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, PillarRotationArch * 4],
    position: [55, 5, 140]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, -PillarRotationArch * 5],
    position: [-70, 25, 150]
  },
  {
    id: "\\[\\d+\\]PillarPair \\(4\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [PillarScaleX, PillarScaleY, PillarScaleZ],
    rotation: [0, 0, PillarRotationArch * 5],
    position: [70, 25, 150]
  },
    {
      id: "\\[41]\\SideLaser$",
    lookupMethod: "Regex",
    scale: [200, 200, 200],
    rotation: [0, 0, 45],
    position: [0, -75, 375]
  },
  {
    id: "\\[42]\\SideLaser$",
    lookupMethod: "Regex",
    scale: [200, 200, 200],
    rotation: [0, 0, -45],
    position: [0, -75, 375]
  },
  {
    id: "\\[43]\\SideLaser$",
    lookupMethod: "Regex",
    scale: [200, 200, 200],
    rotation: [0, 0, 45],
    position: [0, 125, 375]
  },
  {
    id: "\\[44]\\SideLaser$",
    lookupMethod: "Regex",
    scale: [200, 200, 200],
    rotation: [0, 0, -45],
    position: [0, 125, 375]
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
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      -45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
    "lookupMethod": "Regex",
    "position": [
      0,
      200,
      0
    ],
    "scale": [
      50,
      50,
      50
    ],
    "rotation": [
      0,
      0,
      45
    ]
  },
  {
    "id": "[1]Cube(Clone)",
    "lookupMethod": "Contains",
    "position": [
      0,
      69,
      750
    ]
  },
  {
    "id": "[0]Cube",
    "lookupMethod": "Contains",
    "active": false
  }
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
