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

map.customData.environment = [{
    id: "HalloweenEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
        BloomFogEnvironment: {
            attenuation: 0.001,
            startY: -9999,
            height: 1,
            track: "fog",
        },
    },
},

// Objects Removed

{
    id: "Ground",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Stone",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Gate",
    lookupMethod: "Contains",
    active: false
},
{
    id: "GlowLineL",
    lookupMethod: "Contains",
    active: false,
},
{
    id: "Hand",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Fence",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Grave",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Castle",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Bats",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Moon\\.\\[\\d\\]NeonTube$",
    lookupMethod: "Regex",
    active: false
},

// 2D Tree Objects

{
    id: "Tree1 \\(1\\)$",
    lookupMethod: "Regex",
    position: [20, -13, 25],
    scale: [5, 3, 3],
    rotation: [0, 260, -50],
},
{
    id: "Tree2 \\(1\\)$",
    lookupMethod: "Regex",
    position: [18, -10, 40],
    scale: [5, 3, 3],
    rotation: [0, 260, -50],
},
{
    id: "Tree3$",
    lookupMethod: "Regex",
    position: [15, -7, 30],
    scale: [2, 4.5, 3],
    rotation: [0, 260, -70],
},
{
    id: "Tree3 \\(1\\)$",
    lookupMethod: "Regex",
    position: [25, -5, 15],
    scale: [5, 4, 3],
    rotation: [0, 260, 80],
},
{
    id: "Tree3 \\(2\\)$",
    lookupMethod: "Regex",
    position: [20, -11, 25],
    scale: [2, 2, 3],
    rotation: [0, 260, 0],
},
{
    id: "Tree3 \\(3\\)$",
    lookupMethod: "Regex",
    position: [10, -7, 115],
    scale: [4, 4, 3],
    rotation: [0, 250, 90],
},
{
    id: "Tree2 \\(3\\)$",
    lookupMethod: "Regex",
    position: [25, 0, 35],
    scale: [3, 4, 3],
    rotation: [0, 260, 90],
},
{
    id: "Tree2 \\(2\\)$",
    lookupMethod: "Regex",
    position: [35, -6, 100],
    scale: [4, 4, 4],
    rotation: [0, 200, 0],
},
{
    id: "Tree2$",
    lookupMethod: "Regex",
    position: [25, -4, 100],
    scale: [5, 1.5, 4],
    rotation: [0, 240, 0],
},

// Right Trees

{
    id: "Tree5$",
    lookupMethod: "Regex",
    position: [18, -11, 60],
    scale: [4, 5, 4],
    rotation: [0, -180, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    position: [15, -6, 69],
    scale: [4, 4, 3],
    rotation: [0, -50, -20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [24, -9, 30],
    scale: [2.5, 3, 2],
    rotation: [10, -120, 20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [27, -5, 55],
    scale: [3, 5, 4],
    rotation: [0, 70, -20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [19, -5, 48],
    scale: [3, 4, 3],
    rotation: [0, 20, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [23, -5, 63],
    scale: [5, 6, 4],
    rotation: [0, -120, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [16, -6, 83],
    scale: [4, 5, 6],
    rotation: [-10, -30, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [53, -12, 89],
    scale: [12, 8, 12],
    rotation: [20, -120, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [88, -8, 115],
    scale: [14, 9, 14],
    rotation: [-20, -30, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [14, -8, 90],
    scale: [3, 4, 6],
    rotation: [0, 290, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [16, -4, 220],
    scale: [3.5, 5, 3.5],
    rotation: [0, 70, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [14, -6, 110],
    scale: [3.5, 3, 3.5],
    rotation: [0, 120, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [6, -8, 125],
    scale: [3.5, 5, 4],
    rotation: [0, -70, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [1, -12, 145],
    scale: [5, 5, 3],
    rotation: [-10, 125, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-3, -7, 175],
    scale: [4, 4, 6],
    rotation: [0, 15, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-5, -7, 200],
    scale: [8, 7, 7],
    rotation: [-20, 60, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [17, -3, 150],
    scale: [3.5, 4, 3.5],
    rotation: [0, -70, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [55, -17, 160],
    scale: [14, 12, 14],
    rotation: [-20, 150, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-16, -8, 223],
    scale: [5, 6, 6],
    rotation: [-10, 30, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-24, -5, 245],
    scale: [8, 9, 9],
    rotation: [0, -164, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [35, -7, 40],
    scale: [7, 5, 12],
    rotation: [10, -160, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [53, -12, 16],
    scale: [15, 6, 9],
    rotation: [-10, -50, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [26, -8, 8],
    scale: [4, 4, 3],
    rotation: [0, 120, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [36, -5, -11],
    scale: [5, 8, 14],
    rotation: [10, 0, -20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [32, -3, -11],
    scale: [3, 4, 3],
    rotation: [0, 50, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [32, -5, -21],
    scale: [5, 6, 4],
    rotation: [0, 120, -20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [25, -2, -19],
    scale: [2, 3, 2.5],
    rotation: [0, 20, -10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [38, -16, -52],
    scale: [10, 7, 9],
    rotation: [-10, 240, -30],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [0, -5, -57],
    scale: [8, 9, 12],
    rotation: [-10, 180, 20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [49, -8, -64],
    scale: [9, 12, 11],
    rotation: [-10, 40, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [56, -16, -84],
    scale: [11, 9, 12],
    rotation: [-30, 60, 30],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [59, -25, -102],
    scale: [11, 7, 12],
    rotation: [20, 50, 30],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [50, -8, -130],
    scale: [13, 6.6, 13],
    rotation: [20, 30, 20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [58, -7, -150],
    scale: [8, 9, 7],
    rotation: [0, -120, 0],
},

// Left Trees

{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-15, -18, 80],
    scale: [5, 7.5, 4],
    rotation: [15, -60, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-32, -3, 72],
    scale: [3, 3, 3],
    rotation: [15, 150, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-30, -6, 100],
    scale: [4, 8.5, 5],
    rotation: [0, 160, 30],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-15, -2, 60],
    scale: [3, 2.5, 2.5],
    rotation: [-10, -30, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-22, -5, 45],
    scale: [4, 2.5, 4.5],
    rotation: [30, -30, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-26, -6, 40],
    scale: [2, 3, 3],
    rotation: [0, 80, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-24, -10, 64],
    scale: [4, 6, 7],
    rotation: [10, 150, -15],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-12, -3, 55],
    scale: [4, 3, 2],
    rotation: [10, 50, -5],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-14, -4, 30],
    scale: [3, 4, 5],
    rotation: [10, -60, -15],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-7, -2, 37],
    scale: [2.5, 2, 2],
    rotation: [10, -60, -15],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-7, -12, 25],
    scale: [6, 5, 8],
    rotation: [20, -70, 15],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-35, -6, 38],
    scale: [5, 9, 6],
    rotation: [0, -140, 25],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-7, -2, 21],
    scale: [5, 2.5, 2],
    rotation: [0, 150, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-8, -4, 15],
    scale: [6, 2, 4],
    rotation: [0, 250, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-12, 0, 6],
    scale: [3, 3, 2],
    rotation: [0, 50, -20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-11, -3, 13],
    scale: [3, 1.5, 4],
    rotation: [0, 130, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-18, -5, 6],
    scale: [2.5, 5.5, 3],
    rotation: [0, 10, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-19, -7, -4],
    scale: [8, 7, 11],
    rotation: [0, 150, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-45, -3, 5],
    scale: [9, 12, 15],
    rotation: [10, 180, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-55, -6, 15],
    scale: [8, 13, 13],
    rotation: [-20, 190, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-8, -4, -20],
    scale: [4.5, 3.5, 7],
    rotation: [10, 180, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-6, -2, -7],
    scale: [2, 2, 2],
    rotation: [0, 80, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-5, -4, -18],
    scale: [3, 3, 4],
    rotation: [0, -40, 20],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-1, -4, -18],
    scale: [2, 2, 5],
    rotation: [0, -180, 30],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-7, -3, -23],
    scale: [4, 5, 4],
    rotation: [0, 0, 10],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-3, -5, -32],
    scale: [6, 3.5, 5],
    rotation: [20, 50, 0],
},
{
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: 1,
    position: [-4, -3, -37],
    scale: [4, 3, 4],
    rotation: [0, 260, 0],
},

// Lights

{
    id: "Moon$",
    lookupMethod: "Regex",
    position: [40, 150, 350],
    scale: [18, 18, 18]
},
{
    id: "NeonTubeL\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
},
{
    id: "NeonTubeR\\.\\[\\d\\]BoxLight$",
    lookupMethod: "Regex",
    active: false
},
{
    id: "NeonTubeC$",
    lookupMethod: "Regex",
    active: false
},
{
    id: "NeonTubeL",
    lookupMethod: "Contains",
    position: [0, 0, 275],
    scale: [500, 50, 50],
    rotation: [0, 0, 90],
    components: {
        TubeBloomPrePassLight: {
            colorAlphaMultiplier: 10,
            bloomFogIntensityMultiplier: 27.5
        },
    },
},
{
    id: "NeonTubeR",
    lookupMethod: "Contains",
    position: [0, 5, 275],
    scale: [500, 50, 50],
    rotation: [0, 0, 90],
    components: {
        TubeBloomPrePassLight: {
            colorAlphaMultiplier: 10,
            bloomFogIntensityMultiplier: 27.5
        },
    },
},
{
    id: "BaseR$",
    lookupMethod: "Regex",
    position: [60, -15, 120],
    scale: [2.5, 5, 2.25],
    rotation: [15, 0, -15]
},
{
    id: "BaseL$",
    lookupMethod: "Regex",
    position: [60, -15, 120],
    scale: [2.25, 5, 2.5],
    rotation: [15, 0, 15]
},

// Miscellanious

{
    id: "CoreLighting$",
    lookupMethod: "Regex",
    rotation: [60, 10, 0]
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, 0, 0],
    scale: [10, 0.01, 10]
},
{
    id: "Crow\\.\\[\\d\\]Crow$",
    lookupMethod: "Regex",
    active: false
},
{
    id: "Crow \\(1\\)$",
    lookupMethod: "Regex",
    position: [-4.05, 1.5, 4.05],
    scale: [1, 1, 1],
    rotation: [0, -60, 0]
},
{
    id: "Crow \\(2\\)$",
    lookupMethod: "Regex",
    position: [3.7, 5.075, 23.9],
    scale: [1.15, 1.15, 1.15],
    rotation: [0, 0, 0]
},
{
    id: "Crow \\(3\\)$",
    lookupMethod: "Regex",
    position: [17, 4.9, 26.05],
    scale: [1.15, 1.15, 1.15],
    rotation: [0, 30, 0]
},
];

map.customData.materials = {
    "GroundMaterial": {
        "shader": "BTSPillar",
        "color": [0.15, 0.15, 0.15]
    },
    "RoadMaterial": {
        "shader": "InterscopeConcrete",
        "color": [0.06, 0.06, 0.06]
    },
    "WoodMaterial": {
        "shader": "InterscopeConcrete",
        "color": [0.15, 0.1, 0.1]
    },
    "ObjectMaterial": {
        "shader": "Standard",
        "color": [0.2, 0.2, 0.2]
    },
    "LightMaterial": {
        "shader": "OpaqueLight",
        "color": [0.4, 0.4, 0.4]
    },
};

map.customData.environment.push(

    // Ground & Road

    {
        geometry: { type: "Cube", material: "GroundMaterial" },
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1000, 0, 1000]
    },
    {
        geometry: { type: "Cube", material: "RoadMaterial" },
        position: [10, 0, 10],
        rotation: [0, -10, 0],
        scale: [15, 0.25, 1000]
    },

    // Fence 1

    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [2.5, 0, 6],
        rotation: [0, -10, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [3.05, -0.1, 3],
        rotation: [65, -10, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [3.05, 0, 3],
        rotation: [0, -10, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [3.6, -0.1, 0],
        rotation: [65, -10, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [3.6, 0, 0],
        rotation: [0, -10, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [4.15, -0.1, -3],
        rotation: [65, -10, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [4.15, 0, -3],
        rotation: [0, -10, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [4.7, -0.1, -6],
        rotation: [65, -10, 0],
        scale: [0.2, 6.75, 0.2]
    },

    // Fence 2

    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, -0.1, -2],
        rotation: [65, 0, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, -2],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, -0.1, 1],
        rotation: [65, 0, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 1],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4.25, -0.15, 3.5],
        rotation: [85, 15, -10],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 4],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, -0.1, 7],
        rotation: [65, 0, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 7],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, -0.1, 10],
        rotation: [65, 0, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 10],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, -0.1, 13],
        rotation: [65, 0, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 13],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-6.9, -0.1, 17.1],
        rotation: [115, -70, 0],
        scale: [0.2, 6.75, 0.2]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-4, 0, 16],
        rotation: [0, 0, 0],
        scale: [0.25, 3, 0.25]
    },

    // Floor Lamp (LightID 1)

    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0.4, 5.5],
        rotation: [0, -30, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [2.25, 0.2, 5.5],
        rotation: [0, -30, 0],
        scale: [0.25, 0.419, 0.25],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 0,
            },
        },
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0, 5.5],
        rotation: [0, -30, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0.2, 5.5],
        rotation: [30, -30, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0.2, 5.5],
        rotation: [-30, -30, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0.2, 5.5],
        rotation: [0, -30, 30],
        scale: [0.03, 0.4525, 0.26],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [2.25, 0.2, 5.5],
        rotation: [0, -30, -30],
        scale: [0.03, 0.4525, 0.26],
    },

    // Lamp Post Left (LightID 2)

    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-2.5, -0.1, 13],
        rotation: [0, 30, 0],
        scale: [0.25, 10, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-1.65, 4.45, 12.5],
        rotation: [0, 30, 105],
        scale: [0.15, 1.9, 0.15]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [-1.55, 4.72, 12.45],
        rotation: [0, 30, 90],
        scale: [0.2, 2, 0.2]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4.5, 12],
        rotation: [0, 30, 0],
        scale: [0.025, 0.6, 0.025]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4.2, 12],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [-0.75, 4, 12],
        rotation: [0, -70, 0],
        scale: [0.25, 0.419, 0.25],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 0,
            },
        },
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 3.8, 12],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4, 12],
        rotation: [30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4, 12],
        rotation: [-30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4, 12],
        rotation: [0, -70, 30],
        scale: [0.03, 0.4525, 0.26],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [-0.75, 4, 12],
        rotation: [0, -70, -30],
        scale: [0.03, 0.4525, 0.26],
    },

    // Lamp Post Right (LightID 3)

    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [17, -0.1, 26],
        rotation: [0, -30, 0],
        scale: [0.25, 10, 0.25]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [16.15, 4.45, 25.5],
        rotation: [0, -30, 75],
        scale: [0.15, 1.9, 0.15]
    },
    {
        geometry: { type: "Cube", material: "WoodMaterial" },
        position: [16.05, 4.72, 25.45],
        rotation: [0, -30, 90],
        scale: [0.2, 2, 0.2]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4.5, 25],
        rotation: [0, -30, 0],
        scale: [0.025, 0.6, 0.025]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4.2, 25],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [15.25, 4, 25],
        rotation: [0, -70, 0],
        scale: [0.25, 0.419, 0.25],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 0,
            },
        },
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 3.8, 25],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4, 25],
        rotation: [30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4, 25],
        rotation: [-30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4, 25],
        rotation: [0, -70, 30],
        scale: [0.03, 0.4525, 0.26],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [15.25, 4, 25],
        rotation: [0, -70, -30],
        scale: [0.03, 0.4525, 0.26],
    },

    // Hanging Lamp (LightID 4)

    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4.5, 22.4],
        rotation: [0, 30, 0],
        scale: [0.025, 0.6, 0.025]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4.2, 22.4],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "LightMaterial" },
        position: [1, 4, 22.4],
        rotation: [0, -70, 0],
        scale: [0.25, 0.419, 0.25],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 0,
            },
        },
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 3.8, 22.4],
        rotation: [0, -70, 0],
        scale: [0.4, 0.02, 0.4]
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4, 22.4],
        rotation: [30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4, 22.4],
        rotation: [-30, -70, 0],
        scale: [0.26, 0.4525, 0.03],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4, 22.4],
        rotation: [0, -70, 30],
        scale: [0.03, 0.4525, 0.26],
    },
    {
        geometry: { type: "Cube", material: "ObjectMaterial" },
        position: [1, 4, 22.4],
        rotation: [0, -70, -30],
        scale: [0.03, 0.4525, 0.26],
    },
);

// fence 3

for (let i = 0; i < 60; i++) {

    const PosX = 21
    const PosZ = -5

    map.customData.environment.push(
        {
            geometry: { type: "Cube", material: "WoodMaterial" },
            position: [PosX - (i * 0.525), -0.1, PosZ + (i*3)],
            rotation: [65, -10, 0],
            scale: [0.2, 6.75, 0.2]
        },
        {
            geometry: { type: "Cube", material: "WoodMaterial" },
            position: [PosX - (i * 0.525), 0, PosZ + (i*3)],
            rotation: [0, -10, 0],
            scale: [0.25, 3, 0.25]
        },
    );
}

// Assigning Lamp LightID's
map.basicBeatmapEvents.forEach((x) => {
    if (!x.et && x.customData) {
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
});

map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");