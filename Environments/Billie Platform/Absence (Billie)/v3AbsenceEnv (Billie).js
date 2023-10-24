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

let laserOffset = 4;

map.customData.environment = [
  {
    id: "BillieEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.00001,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "NeonTubeDirectionalL \\(1\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "NeonTubeDirectionalR \\(1\\)$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Moon\\.\\[\\d+\\]NeonTube$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Clouds$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "WaterfallSetDepthOnly$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "WaterfallFlatClose$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "WaterfallFlatFar$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, -9999, 0]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 10,
    scale: [100, 1.5, 100],
    position: [0, -700, 0]
  },
  {
    id: "BackgroundGradient$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Sun$",
    lookupMethod: "Regex",
    position: [0, -9999, 0]
  },
  {
    id: "Rain$",
    track: "RainTrack",
    lookupMethod: "Regex",
    position: [0, -9999, 0]
  },
  {
    id: "Rain$",
    track: "RainTrack",
    lookupMethod: "Regex",
    duplicate: 4,
    scale: [1, 1.5, 1],
    rotation: [0, 0, 0],
    position: [0, 10, 8]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "StarL",
    lookupMethod: "Regex",
    scale: [1.5, 1.5, 1.5],
    position: [-175, 175, 750],
    rotation: [0, 0, 120]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "StarL",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [1.5, 1.5, 1.5],
    position: [-175, 175, 750],
    rotation: [0, 0, -120]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "StarL",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [2, 1.5, 1.5],
    position: [-175, 175, 750],
    rotation: [0, 0, 0]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(3\\)$",
    track: "StarR",
    lookupMethod: "Regex",
    scale: [1.5, 1.5, 1.5],
    position: [175, 175, 750],
    rotation: [0, 0, 120]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(3\\)$",
    track: "StarR",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [1.5, 1.5, 1.5],
    position: [175, 175, 750],
    rotation: [0, 0, -120]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(3\\)$",
    track: "StarR",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [2, 1.5, 1.5],
    position: [175, 175, 750],
    rotation: [0, 0, 0]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "ScarBL",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.8, 0.8, 0.8],
    position: [-75, -20, 500],
    rotation: [60, 0, 0]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "ScarTL",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.8, 0.8, 0.8],
    position: [-150, 225, 500],
    rotation: [90, 0, 0]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "ScarBR",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.8, 0.8, 0.8],
    position: [75, -20, 500],
    rotation: [60, 0, 0]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    track: "ScarTR",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.8, 0.8, 0.8],
    position: [150, 225, 500],
    rotation: [90, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    track: "AuroraContainerC",
    position: [0, 1000, 500],
    scale: [0, 0, 0],
    rotation: [-20, 0, 0]
  },
  {  
    id: "WaterRainRipples\\.\\[0\\]SplashMesh$",
    lookupMethod: "Regex",
    track: "AuroraC",
    position: [0, 0, 0],
    scale: [7500, 17500, 3000],
    rotation: [0, 0, 0]
  },
  {
    id: "WaterRainRipples\\(Clone\\)$",
    lookupMethod: "Regex",
    track: "AuroraContainerBack",
    position: [0, 500, 1],
    scale: [0, 1, 0],
    rotation: [0, 0, 0]
  },
  {
    id: "WaterRainRipples\\(Clone\\)\\.\\[0\\]SplashMesh$",
    lookupMethod: "Regex",
    track: "AuroraBack",
    position: [0, 0, 0],
    scale: [-500000000, -500000, 16000],
    rotation: [0, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 4 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 4 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 7 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 7 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 10 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 10 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 13 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 13 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 16 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 16 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 19 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 19 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 22 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 22 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 25 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 25 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 28 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 28 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 31 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 31 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [-3.6, 0, 34 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.05, 500],
    position: [3.6, 0, 34 * laserOffset],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-220, 140, -90],
    rotation: [0, 180, 25]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-240, 120, -80],
    rotation: [0, 180, 20]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-260, 100, -70],
    rotation: [0, 180, 15]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-280, 80, -60],
    rotation: [0, 180, 10]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-300, 60, -50],
    rotation: [0, 180, 5]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-320, 40, -40],
    rotation: [0, 180, 0]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-340, 20, -30],
    rotation: [0, 180, -5]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-360, 0, -20],
    rotation: [0, 180, -10]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[0\\]PillarL$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [-380, -20, -10],
    rotation: [0, 180, -15]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [220, 140, -90],
    rotation: [0, -180, -25]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [240, 120, -80],
    rotation: [0, -180, -20]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [260, 100, -70],
    rotation: [0, -180, -15]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [280, 80, -60],
    rotation: [0, -180, -10]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [300, 60, -50],
    rotation: [0, -180, -5]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [320, 40, -40],
    rotation: [0, -180, 0]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [340, 20, -30],
    rotation: [0, -180, 5]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [360, 0, -20],
    rotation: [0, -180, 10]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[1\\]PillarR$",
    lookupMethod: "Regex",
    scale: [20, 20, 20],
    position: [380, -20, -10],
    rotation: [0, -180, 15]
  },
  {
    id: "WaterfallFalling$",
    lookupMethod: "Regex",
    scale: [50, 10, 30],
    position: [0, -0.25, -28],
    rotation: [0, 180, 0]
  },
  {
    id: "WaterfallFalling$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.7, 150, 1],
    position: [0, -1.75, -12],
    rotation: [90, 180, 0]
  },
  {
    id: "WaterfallTransition$",
    lookupMethod: "Regex",
    scale: [50, 10, 30],
    position: [0, -0.25, -28],
    rotation: [0, 180, 0]
  },
  {
    id: "FrontMountains$",
    lookupMethod: "Regex",
    scale: [0.8, 0.3, 7],
    position: [0, -100, -60],
    rotation: [-90, 180, 0]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    scale: [0.04, 0.02, 0.2],
    position: [0, 1.5, -18]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.05, 0.04, 0.13],
    position: [-15, 0.5, -13]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.05, 0.04, 0.13],
    position: [15, 0.5, -13]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.16, 0.25, 0.55],
    position: [0, -5, 7]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.35, 0.45, 4.5],
    position: [0, -60, 25],
    localrotation: [0, -30, 0]
  },
  {
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    scale: [0.35, 0.45, 4.5],
    position: [0, -60, 28],
    localrotation: [0, 30, 0]
  },
  {
    id: "RailingFullBack$",
    lookupMethod: "Regex",
    scale: [65, 48, 48],
    position: [0, -240, 48],
    rotation: [75, 0, 0]
  },
  {
    id: "RailingFullFront$",
    lookupMethod: "Regex",
    scale: [72.5, 48, 48],
    position: [0, -240, -69],
    rotation: [75, 0, 0]
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d\\]RailingCurveF$",
    lookupMethod: "Regex",
    track: "BridgeRail",
    scale: [0.75, 2, 20000],
    position: [0, -1.5, 30],
    rotation: [0, 0, 0]
  },
  {
    id: "LightRailingSegment \\(2\\)\\.\\[\\d\\]RailingCurveF$",
    lookupMethod: "Regex",
    track: "LeftRail",
    scale: [20, 20, 20],
    position: [-80, -10, 225],
    rotation: [0, 0, 90]
  },
  {
    id: "LightRailingSegment \\(3\\)\\.\\[\\d\\]RailingCurveF$",
    lookupMethod: "Regex",
    track: "RightRail",
    scale: [20, 20, 20],
    position: [80, -10, 225],
    rotation: [0, 0, -90]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment\\.\\[1\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [125, 690, 0],
    position: [-250, -200, 1500],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment\\.\\[2\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [125, 690, 0],
    position: [250, -200, 1500],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(1\\)\\.\\[1\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [125, 690, 0],
    position: [-350, -180, 1500],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(1\\)\\.\\[2\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [125, 690, 0],
    position: [350, -180, 1500],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(2\\)\\.\\[1\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [99, 0.01, 99],
    position: [-85, -54, 224],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(2\\)\\.\\[2\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [55, 0.01, 55],
    position: [-85, 34, 224],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(3\\)\\.\\[1\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [55, 0.001, 55],
    position: [85, 34, 224],
    rotation: [-90, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(3\\)\\.\\[2\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [99, 0.001, 99],
    position: [85, -54, 224],
    rotation: [-90, 0, 0]
  },
  {
    id: "LeftRail$",
    lookupMethod: "Regex",
    active: true,
    scale: [3.5, 0.5, 0.16],
    position: [0, -1.6, -2.3],
    rotation: [-8, -75, 0]
  },
  {
    id: "LeftFarRail1$",
    lookupMethod: "Regex",
    active: true,
    scale: [2.5, 0.5, 0.16],
    position: [0, -1.6, -2.4],
    rotation: [0, -60, 0]
  },
  {
    id: "LeftFarRail2$",
    lookupMethod: "Regex",
    active: true,
    scale: [1.5, 0.5, 0.16],
    position: [0, -1.6, -2.5],
    rotation: [8, -45, 0]
  },
  {
    id: "RightRail$",
    lookupMethod: "Regex",
    active: true,
    scale: [3.5, 0.5, 0.16],
    position: [0, -1.6, -2.3],
    rotation: [-8, 75, 0]
  },
  {
    id: "RightFarRail1$",
    lookupMethod: "Regex",
    active: true,
    scale: [2.5, 0.5, 0.16],
    position: [0, -1.6, -2.4],
    rotation: [0, 60, 0]
  },
  {
    id: "RightFarRail2$",
    lookupMethod: "Regex",
    active: true,
    scale: [1.5, 0.5, 0.16],
    position: [0, -1.6, -2.5],
    rotation: [8, 45, 0]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
