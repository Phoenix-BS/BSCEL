"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";
map.rawEnvironment = [];

///// ^^^^^ input ^^^^^ /////
///// vvv workspace vvv /////

map.customData = { pointDefinitions: {}, materials: {}, customEvents: [], environment: [] };

const customData = map.customData;
const obstacles = map.obstacles;
const notes = map.notes;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;
const materials = customData.materials;

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

map.customData.environment = [

  {
    id: "BillieEnvironment.[0]Environment",
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
  {
    id: "Clouds$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RailingCurveF$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RailingFullBack$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RailingFullFront$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LastRailingCurve$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BackgroundGradient$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LeftRail$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RightRail$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LeftFarRail1$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RightFarRail1$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LeftFarRail2$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "RightFarRail2$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Moon$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Waterfall$",
    lookupMethod: "Regex",
    position: [0, -6, -100],
    scale: [225, 1, 7],
  },
  {
    id: "Rain$",
    lookupMethod: "Regex",
    position: [0, -1000, 0],
  },
  {
    id: "Rain$",
    lookupMethod: "Regex",
    duplicate: 10,
    position: [0, -5, 200],
    scale: [50, 6, 15],
    rotation: [-180, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    position: [0, -100, 0],
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-3000, 3000, 600],
    scale: [500, 25000, 500],
    rotation: [50, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-1500, 3000, 600],
    scale: [500, 25000, 500],
    rotation: [50, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 3000, 600],
    scale: [500, 25000, 500],
    rotation: [50, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [1500, 3000, 600],
    scale: [500, 25000, 500],
    rotation: [50, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [3000, 3000, 600],
    scale: [500, 25000, 500],
    rotation: [50, 0, 0]
  },
  {  
    id: "WaterRainRipples\\.\\[0\\]SplashMesh$",
    lookupMethod: "Regex",
    position: [450, 12500, 300],
    scale: [49000, 15000, 3000],
    rotation: [7.5, 17.5, -20]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-200, -25, 153],
    scale: [0.3, 0.09, 1.6],
    rotation: [-90, -60, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-160, -26, -10],
    scale: [0.55, 0.05, 1.2],
    rotation: [-100, -100, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-220, -26, 160],
    scale: [0.8, 0.1, 1.6],
    rotation: [-90, -100, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-130, -4, 45],
    scale: [0.25, 0.04, 0.22],
    rotation: [-90, -80, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-160, -12, -25],
    scale: [0.15, 0.09, 0.4],
    rotation: [-90, -110, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-150, -12, 75],
    scale: [0.2, 0.08, 0.55],
    rotation: [-90, -80, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [60, -12, -75],
    scale: [0.4, 0.25, 0.8],
    rotation: [-90, -170, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-170, -35, -170],
    scale: [0.7, 0.1, 4.5],
    rotation: [-80, -150, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-80, -25, -170],
    scale: [1, 2, 3.5],
    rotation: [-90, -170, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [130, -35, -60],
    scale: [0.7, 0.1, 2],
    rotation: [-80, 100, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [150, -25, -20],
    scale: [0.3, 0.1, 2.5],
    rotation: [-75, 110, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [90, -3, -30],
    scale: [0.7, 0.1, 0.4],
    rotation: [-90, 90, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [110, -13, -60],
    scale: [0.275, 0.15, 1.25],
    rotation: [-80, 120, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [100, -8, 60],
    scale: [0.12, 0.02, 0.4],
    rotation: [-90, 90, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-80, -25, 120],
    scale: [0.85, 0.5, 4],
    rotation: [-60, 30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [130, -25, 70],
    scale: [1.3, 0.9, 6],
    rotation: [-60, 30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [10, -25, 50],
    scale: [1.75, 0.3, 6.4],
    rotation: [-60, -30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -6, -30],
    scale: [1.5, 1, 0.15],
    rotation: [-90, -30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -6, -90],
    scale: [0.75, 1, 0.15],
    rotation: [-90, -70, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -6, -150],
    scale: [1.75, 1, 0.15],
    rotation: [-90, -70, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [90, -12, -290],
    scale: [0.75, 1, 0.15],
    rotation: [-90, 60, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -6, 30],
    scale: [3.5, 2.5, 2.25],
    rotation: [-90, 30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-20, -6, 15],
    scale: [0.25, 0.35, 0.075],
    rotation: [-90, -70, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-20, -6, 10],
    scale: [0.15, 0.175, 0.05],
    rotation: [-90, -120, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [5, -6, 5],
    scale: [0.25, 0.15, 0.05],
    rotation: [-90, 120, 0]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    position: [0, -6, 10],
    scale: [1.25, 2, 0.25],
    rotation: [-90, 0, 90]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [-560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 12.5, 15000],
    position: [560, 0, 3750],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-50, -135, 120],
    rotation: [60, 0, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-25, -90, 160],
    rotation: [60, 120, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-45, -135, 140],
    rotation: [60, -30, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-50, -90, 160],
    rotation: [60, 80, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-90, -135, 180],
    rotation: [60, 140, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-120, -110, 196],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-30, -135, 190],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-74, -110, 210],
    rotation: [60, 140, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [-10, -135, 245],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [20, -75, 195],
    rotation: [120, -160, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [35, -100, 170],
    rotation: [120, 160, -120]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [45, -70, 210],
    rotation: [120, -110, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [15, -60, 190],
    rotation: [120, -20, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [80, -120, 190],
    rotation: [120, -70, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [30, -135, 175],
    rotation: [120, 50, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [110, -110, 190],
    rotation: [120, 150, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [90, -135, 210],
    rotation: [120, 110, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [8, 8, 8],
    position: [120, -135, 235],
    rotation: [120, 150, -40]
  },
  {
    id: "Sun$",
    lookupMethod: "Regex",
    position: [0, -9999, 0]
  },
    {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
    lookupMethod: "Regex",
    scale: [9, 55, 0.0001],
    position: [-40, -6.05, 170],
    rotation: [-90, 15, 90]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(2\\)$",
    lookupMethod: "Regex",
    scale: [9, 55, 0.0001],
    position: [30, -6.05, 210],
    rotation: [-90, 0, 90]
  },
  {
    id: "Sun\\.\\[\\d+\\]NeonTube \\(3\\)$",
    lookupMethod: "Regex",
    scale: [9, 55, 0.0001],
    position: [-10, -6.05, 240],
    rotation: [-90, -15, 90]
  },
  {
    id: "LightRailingSegment\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [-8, -5.99, 37.5],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [8, -5.99, 37.5],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [-6, -5.99, 35],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(1\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [6, -5.99, 35],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(2\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [-4, -5.99, 32.5],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(2\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [4, -5.99, 32.5],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(3\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [-2, -5.99, 250],
    rotation: [90, 0, 0]
  },
  {
    id: "LightRailingSegment \\(3\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    scale: [4, 100, 0.25],
    position: [2, -5.99, 250],
    rotation: [90, 0, 0]
  },
];

// map.customData.customEvents.push()

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
