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

let BLScaleX = 0.125
let BLScaleZ = 0.175
let BLHeight = 17.5
let BLDepth = 35
let BLDepthMult = 0.5


map.customData.environment = [{
    id: "BigMirrorEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
        BloomFogEnvironment: {
            attenuation: 0.0025,
            startY: -60,
            height: 1
        },
    },
}, 
{
    id: "NearBuildingLeft$",
    lookupMethod: "Regex",
    position: [-20, -2.5, 30],
    scale: [3, 1.5, 2],
    rotation: [-90, 0, 0]
},
{
    id: "NearBuildingRight$",
    lookupMethod: "Regex",
    position: [20, -2.5, 30],
    scale: [3, 1.5, 2],
    rotation: [-90, 0, 0]
},
{
    id: "\\[0\\]Spectrogram$",
    lookupMethod: "Regex",
    position: [-7.5, 5, 25],
    scale: [0.5, 4, 0.1],
    rotation: [-90, 0, 0]
},
{
    id: "\\[1\\]Spectrogram$",
    lookupMethod: "Regex",
    position: [7.5, 5, 25],
    scale: [0.5, 4, 0.1],
    rotation: [-90, 0, 0]
},
{
    id: "BackColumns$",
    lookupMethod: "Regex",
    position: [0, 40, 30],
    scale: [2.5, 1, 4],
    rotation: [-35, 180, 0]
},
{
    id: "Floor$",
    lookupMethod: "Regex",
    position: [0, -6, -100],
    scale: [1, 1, 4]
},
{
    id: "Environment\\.\\[\\d\\]Construction$",
    lookupMethod: "Regex",
    position: [0, 17.5, -5],
    scale: [2.95, 1.25, 8],
    rotation: [0, 0, 0]
},
{
    id: "FrontLights$",
    lookupMethod: "Regex",
    position: [0, -6.5, -20],
    scale: [3, 4, 2]
},
{
    id: "TopBakedBloom",
    lookupMethod: "Contains",
    active: false
},
{
    id: "BottomBakedBloom",
    lookupMethod: "Contains",
    active: false
},
{
    id: "DoubleColorLaser\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 5)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, 20]
},
{
    id: "DoubleColorLaser \\(1\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 5)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, -20]
},
{
    id: "DoubleColorLaser \\(2\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 4)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, 20]
},
{
    id: "DoubleColorLaser \\(3\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 4)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, -20]
},
{
    id: "DoubleColorLaser \\(4\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 3)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, 20]
},
{
    id: "DoubleColorLaser \\(5\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 3)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, -20]
},
{
    id: "DoubleColorLaser \\(6\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 2)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, 20]
},
{
    id: "DoubleColorLaser \\(7\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth * (BLDepthMult * 2)],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, -20]
},
{
    id: "DoubleColorLaser \\(8\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, 20]
},
{
    id: "DoubleColorLaser \\(9\\)\\.\\[\\d\\]TopBoxLight$",
    lookupMethod: "Regex",
    position: [0, BLHeight, BLDepth],
    scale: [BLScaleX, 150, BLScaleZ],
    rotation: [0, 0, -20]
},
{
    id: "DoubleColorLaser\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 5)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, 20]
},
{
    id: "DoubleColorLaser \\(1\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 5)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, -20]
},
{
    id: "DoubleColorLaser \\(2\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 4)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, 20]
},
{
    id: "DoubleColorLaser \\(3\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 4)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, -20]
},
{
    id: "DoubleColorLaser \\(4\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 3)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, 20]
},
{
    id: "DoubleColorLaser \\(5\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 3)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, -20]
},
{
    id: "DoubleColorLaser \\(6\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 2)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, 20]
},
{
    id: "DoubleColorLaser \\(7\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth * (BLDepthMult * 2)],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, -20]
},
{
    id: "DoubleColorLaser \\(8\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, 20]
},
{
    id: "DoubleColorLaser \\(9\\)\\.\\[\\d\\]BottomBoxLight$",
    lookupMethod: "Regex",
    position: [0, -6, BLDepth],
    scale: [BLScaleX, 25, BLScaleZ],
    rotation: [90, 0, -20]
},
{
    id: "RotatingLasersPair$",
    lookupMethod: "Regex",
    position: [0, 14, 46],
    scale: [1.7, 1.7, 0.5],
    rotation: [-50, 0, 0]
},
{
    id: "RotatingLasersPair \\(1\\)$",
    lookupMethod: "Regex",
    position: [0, 13, 48],
    scale: [1.7, 1.7, 0.5],
    rotation: [-50, 0, 0]
},
{
    id: "RotatingLasersPair \\(2\\)$",
    lookupMethod: "Regex",
    position: [0, 12, 50],
    scale: [1.7, 1.7, 0.5],
    rotation: [-50, 0, 0]
},
{
    id: "RotatingLasersPair \\(3\\)$",
    lookupMethod: "Regex",
    position: [0, 11, 52],
    scale: [1.7, 1.7, 0.5],
    rotation: [-50, 0, 0]
},
{
    id: "NeonTubeDirectionalL$",
    lookupMethod: "Regex",
    position: [-6.25, -6, -25],
    scale: [7, 7, 7]
},
{
    id: "NeonTubeDirectionalR$",
    lookupMethod: "Regex",
    position: [6.25, -6, -25],
    scale: [7, 7, 7]
},
{
    id: "NeonTubeDirectionalFL$",
    lookupMethod: "Regex",
    position: [-6.75, -4, -25],
    scale: [4, 4, 4]
},
{
    id: "NeonTubeDirectionalFR$",
    lookupMethod: "Regex",
    position: [6.75, -4, -25],
    scale: [4, 4, 4]
},
{
    id: "BigTrackLaneRings$",
    lookupMethod: "Regex",
    position: [0, 0, 150]
},
{
    id: "Ring",
    lookupMethod: "Contains",
    scale: [2, 2, 2]
},
{
    id: "NeonTubeBothSidesDirectional",
    lookupMethod: "Contains",
    components: {
        TubeBloomPrePassLight: {
            colorAlphaMultiplier: 3
        }
    },
    scale: [0.35, 100, 0.075],
},
];

map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
//console.log(map.basicBeatmapEvents);