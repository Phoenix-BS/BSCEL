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

map.customData.environment = [
  {
    id: "BillieEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.00005,
        startY: -20,
        height: 1
      },
    }
  },
  {
    id: "Mirror",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "PlayersPlace",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Clouds$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Moon$",
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
    id: "Waterfall$",
    lookupMethod: "Regex",
    position: [0, 0, -100],
    scale: [225, 1, 7],
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    position: [0, -750, 1450],
    scale: [0, 1000, 0],
    rotation: [0, 200, 45]
  },
  {
    id: "WaterRainRipples\\.\\[\\d\\]SplashMesh$",
    lookupMethod: "Regex",
    position: [0, -2500, -22500],
    scale: [60000, 125000, 1000],
    rotation: [0, 0, 0]
  },
  {
    id: "WaterRainRipples$",
    lookupMethod: "Regex",
    duplicate: 1
  },
  {
    id: "WaterRainRipples\\(Clone\\)$",
    lookupMethod: "Regex",
    track: "Droplets",
    position: [0, 0.05, -45],
    scale: [12.5, 0.001, 12.5],
    rotation: [0, 0, 0]
  },
  {
    id: "Rain$",
    lookupMethod: "Regex",
    position: [0, -1000, 0],
  },
  {
    id: "Rain$",
    lookupMethod: "Regex",
    duplicate: 20,
    position: [0, -5, 250],
    scale: [75, 7.5, 30],
    rotation: [-170, 0, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    position: [222, 16, -96],
    scale: [1.7, 0.8, 4],
    rotation: [0, 30, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-200, -25, 153],
    scale: [0.3, 0.09, 2.6],
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
    scale: [0.8, 0.1, 2.6],
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
    scale: [0.7, 0.1, 5.5],
    rotation: [-80, -150, 0]
  },
  {  
    id: "FrontMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-80, -25, -170],
    scale: [1, 2, 4],
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
    position: [80, -12, 70],
    scale: [0.17, 0.1, 0.5],
    rotation: [-90, 90, 0]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [60, -2, 80],
    scale: [0.05, 0.03, 0.7],
    rotation: [-120, 140, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-85, -3, 140],
    scale: [0.06, 0.02, 0.95],
    rotation: [-110, -190, 0]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-222, -3, 220],
    scale: [0.27, 0.07, 5.5],
    rotation: [-100, -180, 10]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [25, -15, 145],
    scale: [0.22, 0.12, 0.43],
    rotation: [-105, 140, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [20, -13, 135],
    scale: [0.27, 0.08, 0.3],
    rotation: [-95, 130, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -5, 200],
    scale: [0.9, 0.35, 3.7],
    rotation: [-95, 90, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [75, -45, 270],
    scale: [2.5, 0.25, 6.9],
    rotation: [-90, 90, 90]
  },
{  
  id: "BackMountains$",
  lookupMethod: "Regex",
  duplicate: 1,
  position: [0, -15, 320],
  scale: [1.5, 0.5, 8],
  rotation: [-90, 90, 90]
},
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -2, 150],
    scale: [0.32, 0.3, 0.85],
    rotation: [-90, 85, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -2, 180],
    scale: [0.25, 0.15, 0.45],
    rotation: [-90, 97, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [60, -5, -120],
    scale: [0.5, 0.02, 0.3],
    rotation: [-90, 250, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-80, 0, -80],
    scale: [0.8, 0.12, 0.06],
    rotation: [-90, -70, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 0, 0],
    scale: [0.4, 0.4, 0.35],
    rotation: [-90, -160, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-35, 0, 25],
    scale: [0.15, 0.12, 0.06],
    rotation: [-90, 60, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [12, 0, -40],
    scale: [0.5, 0.3, 0.13],
    rotation: [-90, 270, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -3, 120],
    scale: [0.05, 0.45, 0.25],
    rotation: [-90, 130, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [230, -25, 260],
    scale: [0.2, 0.3, 5.9],
    rotation: [-90, 130, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [260, -25, 180],
    scale: [0.5, 0.6, 7],
    rotation: [-90, 170, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [320, -25, 240],
    scale: [0.9, 3, 9.5],
    rotation: [-90, 170, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [475, -25, 250],
    scale: [1.8, 1.3, 16],
    rotation: [-90, 160, 90]
  },
  {  
    id: "BackMountains$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [120, -25, 250],
    scale: [3.8, 1.4, 16.3],
    rotation: [-90, 90, 90]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [-32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    scale: [10, 7.5, 800],
    position: [32, 200, 600],
    rotation: [-87.66, 0, 0]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-55, -25, 115],
    rotation: [60, 0, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-35, -25, 60],
    rotation: [60, 120, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-45, -25, 135],
    rotation: [60, -30, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-60, -25, 120],
    rotation: [60, 80, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-110, -25, 160],
    rotation: [60, 140, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-160, -25, 176],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-120, -25, 200],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-97, -25, 170],
    rotation: [60, 140, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[\\d\\]PillarL$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [-90, -25, 235],
    rotation: [60, 180, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [35, -35, 65],
    rotation: [120, -160, -60]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(1\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [20, -35, 85],
    rotation: [120, 160, -120]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(2\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [40, -30, 130],
    rotation: [120, -110, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(3\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [125, -30, 140],
    rotation: [120, -20, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(4\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [90, -30, 170],
    rotation: [120, -70, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(5\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [50, -30, 145],
    rotation: [120, 50, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(6\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [120, -30, 190],
    rotation: [120, 150, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(7\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [70, -30, 210],
    rotation: [120, 110, -40]
  },
  {
    id: "t\\.\\[\\d+\\]BottomPairLasers \\(8\\)\\.\\[\\d\\]PillarR$",
    lookupMethod: "Regex",
    scale: [12, 12, 12],
    position: [40, -30, 235],
    rotation: [120, 150, -40]
  },
  {
    id: "RailingCurveF$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Sun$",
    lookupMethod: "Regex",
    active: true,
    scale: [160, 160, 160],
    position: [0, 440, 850],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Sphere",
      material: {
        color: [0, 0, 0, 10],
        shader: "Standard",
        shaderKeywords: []
      }
    },
    position: [0, 375, 800],
    scale: [475, 475, 475],
    rotation: [0, 0, 0]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.8, 0.8, 0.8, 10],
        shader: "OpaqueLight"
      }
    },
    position: [-15, 9.5, 60],
    scale: [3.5, 3.5, 3.5],
    rotation: [45, 45, 45]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.8, 0.8, 0.8, 10],
        shader: "OpaqueLight"
      }
    },
    position: [-15, 9.5, 60],
    scale: [3.5, 3.5, 3.5],
    rotation: [-45, -45, -45]
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.15, 0.15, 0.15, 10],
        shader: "OpaqueLight"
      }
    },
    position: [-15, 0, 60],
    scale: [5, 2, 5],
    rotation: [0, 0, 0],
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [3, 3, 3],
    position: [-15, 2, 60],
    rotation: [10, 0, -10]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [3, 3, 3],
    position: [-15, 2, 60],
    rotation: [-10, 0, 10]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.8, 0.8, 0.8, 10],
        shader: "OpaqueLight"
      }
    },
    position: [15, 9.5, 60],
    scale: [3.5, 3.5, 3.5],
    rotation: [45, 45, 45],
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [0.8, 0.8, 0.8, 10],
        shader: "OpaqueLight"
      }
    },
    position: [15, 9.5, 60],
    scale: [3.5, 3.5, 3.5],
    rotation: [-45, -45, -45],
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.15, 0.15, 0.15, 10],
        shader: "OpaqueLight"
      }
    },
    position: [15, 0, 60],
    scale: [5, 2, 5],
    rotation: [0, 0, 0],
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(1\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [3, 3, 3],
    position: [15, 2, 60],
    rotation: [10, 90, -10]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(1\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [3, 3, 3],
    position: [15, 2, 60],
    rotation: [-10, 90, 10]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [1, 1, 1, 10],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, 55, 120],
    scale: [17.5, 17.5, 17.5],
    rotation: [45, 90, 45]
  },
  {
    geometry: {
      type: "Cube",
      material: {
        color: [1, 1, 1, 10],
        shader: "Standard",
        shaderkeyword: []
      }
    },
    position: [0, 55, 120],
    scale: [17.5, 17.5, 17.5],
    rotation: [-45, 0, -45]
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.15, 0.15, 0.15, 10],
        shader: "OpaqueLight"
      }
    },
    position: [0, 0, 120],
    scale: [7.5, 25, 7.5],
    rotation: [0, 0, 0],
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.15, 0.15, 0.15, 10],
        shader: "OpaqueLight"
      }
    },
    position: [0, 0, 120],
    scale: [9, 15, 9],
    rotation: [0, 0, 0],
  },
  {
    geometry: {
      type: "Cylinder",
      material: {
        color: [0.15, 0.15, 0.15, 10],
        shader: "OpaqueLight"
      }
    },
    position: [0, 0, 120],
    scale: [10.5, 5, 10.5],
    rotation: [0, 0, 0],
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(2\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [6, 6, 6],
    position: [3, 35, 121.5],
    rotation: [15, 0, -15]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(2\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [6, 6, 6],
    position: [-3, 35, 121.5],
    rotation: [-15, 90, 15]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(3\\)\\.\\[\\d\\]NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    active: true,
    scale: [100, 100, 100],
    position: [0, 1900, 650],
    rotation: [0, 0, -14]
  },
  {
    id: "t\\.\\[\\d+\\]LightRailingSegment \\(3\\)\\.\\[\\d\\]NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    active: true,
    scale: [100, 100, 100],
    position: [0, 1900, 650],
    rotation: [0, 0, 14]
  }
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
