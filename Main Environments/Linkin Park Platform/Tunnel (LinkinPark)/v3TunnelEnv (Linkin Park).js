"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusStandard.dat";


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

let laserOffset = 15;

map.customData.environment = [
  {
    id: "LinkinParkEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
      BloomFogEnvironment: {
        attenuation: 0.001,
        startY: -9999,
        height: 1,
        track: "fog",
      },
    }
  },
  {
    id: "Tunnel \\(\\d\\)\\.\\[\\d\\]Top$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LinkinParkSoldier$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "Tunnel ",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "Logo$",
    lookupMethod: "Regex",
    active: false
  },
  {
    id: "LinkinParkTextLogo",
    lookupMethod: "Contains",
    active: false
  },
  {
    id: "LaserFloor \\(4\\)$",
    lookupMethod: "Regex",
    active: false
  },

  // HUD

  {
    id: "LeftPanel$",
    lookupMethod: "Regex",
    position: [-2, 2.5, 7.5]
  },
  {
    id: "RightPanel$",
    lookupMethod: "Regex",
    position: [2, 2.5, 7.5]
  },
  {
    id: "EnergyPanel$",
    lookupMethod: "Regex",
    position: [0, 4, 7.5]
  },

  // Smoke

  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, -9999, 0]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 8,
    position: [0, 0.05, 0],
    scale: [30, 0.001, 30],
    rotation: [0, 0, 0]
  },
  {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 8,
    position: [0, 67.5, 0],
    scale: [30, 0.001, 30],
    rotation: [0, 0, 0]
  },
  {
    id: "Tunnel\\.\\[\\d\\]Top$",
    lookupMethod: "Regex",
    position: [57.9, 36.48, -150],
    scale: [10, 200, 200],
    rotation: [0, 90, 90]
  },

  // Infrastructure

  {
    id: "Tunnel\\.\\[\\d\\]Top$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-57.9, 36.48, -150],
    scale: [10, 200, 200],
    rotation: [0, -90, 90]
  },
  {
    id: "TunnelRings$",
    lookupMethod: "Regex",
    position: [625, 25, -600],
    scale: [12.5, 10, 200],
    rotation: [0, -5, 90]
  },
  {
    id: "TunnelRings$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-625, 25, -600],
    scale: [12.5, 10, 200],
    rotation: [0, 5, -90]
  },
  {
    id: "TunnelRings$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, 0, 120],
    scale: [11.95, 1000, 12.5],
    rotation: [-90, 0, 0]
  },

  // Bridge + Center Light
  
  {
    id: "LogoLight$",
    lookupMethod: "Regex",
    position: [0, 0.75, 25],
    scale: [8, 8, 8],
    rotation: [0, 0, 90]
  },
  {
    id: "TrackMirror$",
    lookupMethod: "Regex",
    position: [0.8725, 0, -15],
    scale: [2.9, 1, 1.25],
    rotation: [0, 0, 0]
  },
  {
    id: "LaserFloor \\(2\\)$",
    lookupMethod: "Regex",
    position: [1.75, 0, -75],
    scale: [4, 2, 2],
    rotation: [90, 0, 0]
  },
  {
    id: "LaserFloor \\(3\\)$",
    lookupMethod: "Regex",
    position: [-1.75, 0, -75],
    scale: [4, 2, 2],
    rotation: [90, 0, 0]
  },
  {
    id: "LaserTop \\(3\\)$",
    lookupMethod: "Regex",
    position: [-47.5, 7.5, 120],
    scale: [40, 10, 2.5],
    rotation: [0, 0, 0]
  },
  {
    id: "LaserTop$",
    lookupMethod: "Regex",
    position: [-44, 27.5, 120],
    scale: [35, 10, 2.5],
    rotation: [0, 0, -22.5]
  },
  {
    id: "LaserTop \\(1\\)$",
    lookupMethod: "Regex",
    position: [-33, 45.5, 120],
    scale: [30, 10, 2.5],
    rotation: [0, 0, -45]
  },
  {
    id: "LaserTop \\(2\\)$",
    lookupMethod: "Regex",
    position: [-14.5, 57.5, 120],
    scale: [25, 10, 2.5],
    rotation: [0, 0, -67.5]
  },
  {
    id: "LaserTop \\(4\\)$",
    lookupMethod: "Regex",
    position: [14.5, 57.5, 120],
    scale: [25, 10, 2.5],
    rotation: [0, 0, 67.5]
  },
  {
    id: "LaserTop \\(5\\)$",
    lookupMethod: "Regex",
    position: [33, 45.5, 120],
    scale: [30, 10, 2.5],
    rotation: [0, 0, 45]
  },
  {
    id: "LaserTop \\(6\\)$",
    lookupMethod: "Regex",
    position: [44, 27.5, 120],
    scale: [35, 10, 2.5],
    rotation: [0, 0, 22.5]
  },
  {
    id: "LaserTop \\(7\\)$",
    lookupMethod: "Regex",
    position: [47.5, 7.5, 120],
    scale: [40, 10, 2.5],
    rotation: [0, 0, 0]
  },
  {
    id: "LaserL$",
    lookupMethod: "Regex",
    position: [-40, 2, 622.5],
    scale: [1, 1, 25],
    rotation: [90, 0, 0]
  },
  {
    id: "LaserL \\(2\\)$",
    lookupMethod: "Regex",
    position: [-40, 10, 622.5],
    scale: [1, 1, 25],
    rotation: [90, 0, 0]
  },
  {
    id: "LarerR$",
    lookupMethod: "Regex",
    position: [40, 2, 622.5],
    scale: [1, 1, 25],
    rotation: [90, 0, 0]
  },
  {
    id: "LarerR \\(2\\)$",
    lookupMethod: "Regex",
    position: [40, 10, 622.5],
    scale: [1, 1, 25],
    rotation: [90, 0, 0]
  },
  {
    id: "Spectrograms\\.\\[0\\]TunnelSpectrogram$",
    lookupMethod: "Regex",
    position: [0.195, -0.01, 450],
    scale: [15, 7.5, 125],
    rotation: [0, -90, 90]
  },
  {
    id: "Spectrograms\\.\\[1\\]TunnelSpectrogram$",
    lookupMethod: "Regex",
    position: [-0.195, -0.01, 450],
    scale: [15, 7.5, 125],
    rotation: [0, 90, -90]
  },
  {
    id: "\\]TunnelRotatingLasersPair.\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 1 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(1\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 1 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 2 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 2 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 3 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(17\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 3 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(16\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 4 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 4 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(17\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 5 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(2\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 5 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(1\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 6 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(11\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 6 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(7\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 7 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(16\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 7 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(5\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 8 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(9\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 8 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 9 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 9 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(3\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 10 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 10 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 11 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(15\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 11 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 12 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(4\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 12 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(15\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 13 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(6\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 13 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 14 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 14 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(14\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 15 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(13\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 15 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(8\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 16 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(3\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 16 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(12\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 17 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(10\\).\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 17 * laserOffset],
    rotation: [-30, 30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair \\(2\\).\\[0\\]BaseL.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [-7, 0, 18 * laserOffset],
    rotation: [-30, -30, 0]
  },
  {
    id: "\\]TunnelRotatingLasersPair.\\[1\\]BaseR.\\[0\\]Laser$",
    lookupMethod: "Regex",
    scale: [1, 0.005, 10000],
    position: [7, 0, 18 * laserOffset],
    rotation: [-30, 30, 0]
  },
];


map.customData.customEvents.push

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
