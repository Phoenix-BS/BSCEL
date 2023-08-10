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

let treeAmount = 400; // The amount of Tree's in your forest

let smokeAmount = 25; // Smoke count that's spread over a range
let smokeMult = 1; // Smoke offset as a multiple between each smoke object
let smokeScale = 2; // The scale of the first smoke (Will effect the starting point for)

// Tree's will be assigned a random position value with Scale1 and Scale2 acting as a range

let XPosition1 = 250;
let XPosition2 = -250;
let YPosition1 = -35;
let YPosition2 = -40;
let ZPosition1 = 300;
let ZPosition2 = -150;

// Tree's will be assigned a random scale value with Scale1 and Scale2 acting as a range

let XScale1 = 3;
let XScale2 = 9;
let YScale1 = 2.5;
let YScale2 = 5.5;
let ZScale1 = 3;
let ZScale2 = 9;

// Tree's will be assigned a random rotation value with Scale1 and Scale2 acting as a range

let XRotation1 = -15;
let XRotation2 = 15;
let YRotation1 = -180;
let YRotation2 = 180;
let ZRotation1 = -15;
let ZRotation2 = 15;

map.customData.environment = [{
    id: "HalloweenEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
        BloomFogEnvironment: {
            attenuation: 0.001,
            startY: -34.75,
            height: 1,
            track: "fog",
        },
    },
}, {
    id: "Grave",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Tomb",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Fence",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Tree1",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Tree2",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Tree3",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Tree4",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "ZombieHand",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "NeonTube",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Castle",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Bats",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "GateLight",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Crow",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "GroundStone",
    lookupMethod: "Contains",
    active: false,
}, {
    id: "Ground$",
    lookupMethod: "Regex",
    active: false,
}, {
    id: "Tree5$",
    lookupMethod: "Regex",
    position: [0, -50, 0],
}, {
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 25,
    scale: [150, 150, 150],
}, {
    id: "Moon$",
    lookupMethod: "Regex",
    position: [-40, 50, 225],
    scale: [8, 8, 8],
}, {
    geometry: {
        type: "Cylinder",
        material: {
            color: [0.3, 0.3, 0.3, 1],
            shader: "Standard",
        },
    },
    position: [0, -20, 0],
    scale: [7.5, 20, 7.5],
    rotation: [0, 0, 0],
}, {
    id: "GlowLineL \\(\\d\\)\\.\\[1\\]BoxLight$",
    lookupMethod: "Regex",
    active: false,
}, {
    id: "GlowLineL \\(9\\)$",
    lookupMethod: "Regex",
    position: [0, -5, 200],
    scale: [25, 25, 25],
    rotation: [0, -30, 90],
}, {
    id: "GlowLineL \\(6\\)$",
    lookupMethod: "Regex",
    position: [0, -5, 200],
    scale: [25, 25, 25],
    rotation: [0, -10, 90],
}, {
    id: "GlowLineL \\(7\\)$",
    lookupMethod: "Regex",
    position: [0, -5, 200],
    scale: [25, 25, 25],
    rotation: [0, 10, 90],
}, {
    id: "GlowLineL \\(8\\)$",
    lookupMethod: "Regex",
    position: [0, -5, 200],
    scale: [25, 25, 25],
    rotation: [0, 30, 90],
}, {
    id: "Laser\\.\\[\\d\\]BakedBloom$",
    lookupMethod: "Regex",
    active: false,
}, {
    id: "RotatingLasersPair \\(\\d+\\)\\.\\[\\d\\]BaseL\\.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    localPosition: [0, -40, 180],
    scale: [20, 150, 20],
    rotation: [-20, 0, 0],
}, {
    id: "RotatingLasersPair \\(\\d+\\)\\.\\[\\d\\]BaseR\\.\\[\\d\\]Laser$",
    lookupMethod: "Regex",
    localPosition: [0, -40, 180],
    scale: [20, 150, 20],
    rotation: [-20, 0, 0],
}, {
    id: "GroundFog$",
    lookupMethod: "Regex",
    position: [0, -34, 0],
    scale: [500, 1, 500],
}, {
    id: "Tree5$",
    lookupMethod: "Regex",
    duplicate: treeAmount,
}, {
    id: "Tree5$",
    lookupMethod: "Regex",
    position: [
        Random(XPosition1, XPosition2),
        Random(YPosition1, YPosition2),
        Random(ZPosition1, ZPosition2),
    ],
    scale: [
        Random(XScale1, XScale2),
        Random(YScale1, YScale2),
        Random(ZScale1, ZScale2),
    ],
    rotation: [
        Random(XRotation1, XRotation2),
        Random(YRotation1, YRotation2),
        Random(ZRotation1, ZRotation2),
    ],
}, {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [48.0600662, 50.9974899, 128.476181],
    rotation: [-32.3752743, -24.7623966, -11.1623254],
    scale: [35.363903, 1.1311746, 1.1311746],
    components: {
        ILightWithId: {
            lightID: 101,
            type: 4,
        },
    },
}, {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [42.5376244, 38.9518356, 119.6687164],
    rotation: [-32.3557331, 88.9202657, -89.82071],
    scale: [35.3639069, 1.1311744, 1.1311746],
    components: {
        ILightWithId: {
            lightID: 102,
            type: 4,
        },
    },
}, {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [29.0551872, 38.9550667, 128.1179962],
    rotation: [-32.3752743, -24.7623625, 89.8055812],
    scale: [35.3639069, 1.1311746, 1.1311746],
    components: {
        ILightWithId: {
            lightID: 103,
            type: 4,
        },
    },
}, {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [34.5776253, 51.000721, 136.9254608],
    rotation: [-32.3557262, 88.9202657, 11.1472179],
    scale: [35.3638992, 1.1311747, 1.1311746],
    components: {
        ILightWithId: {
            lightID: 104,
            type: 4,
        },
    },
}, {
    geometry: { type: "Cube", material: "LightMaterial" },
    position: [40.3501816, 42.0622063, 131.1585846],
    rotation: [-32.3557331, 88.920293, -39.3367601],
    scale: [0.8915541, 27.9424362, 0.8915542],
    components: {
        ILightWithId: {
            lightID: 105,
            type: 4,
        },
    },
}];

function Random(min, max, bool) {
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    return x;
}

// tree generator script

for (let i = 1; i <= treeAmount; i++) {
    map.customData.environment.push({
        id: `\[${240 + i}\]Tree5(Clone)`, // < If you change the amount of smoke in the enviro you'll need to adjust the id of this function (215 + smokeAmount)
        lookupMethod: "Contains",
        position: [
            Random(XPosition1, XPosition2),
            Random(YPosition1, YPosition2),
            Random(ZPosition1, ZPosition2),
        ],
        scale: [
            Random(XScale1, XScale2),
            Random(YScale1, YScale2),
            Random(ZScale1, ZScale2),
        ],
        rotation: [
            Random(XRotation1, XRotation2),
            Random(YRotation1, YRotation2),
            Random(ZRotation1, ZRotation2),
        ],
    });
}

for (let i = 0; i < smokeAmount; i++) {
    map.customData.environment.push({
        id: `\[${215 + i}\]BigSmokePS(Clone)`,
        lookupMethod: "Contains",
        scale: [
            smokeScale + i * smokeMult,
            smokeScale + i * smokeMult,
            smokeScale + i * smokeMult,
        ],
    });
}

// Satellite Dish Code / Model (TY nasafrasa <3)

// Specifies what materials to use
map.customData.materials = {
    "DefaultMaterial": {
        "shader": "BTSPillar",
        "color": [0, 0, 0],
    },
    "LightMaterial": {
        "shader": "OpaqueLight",
        "color": [0, 0, 0],
    },
};

// Satellite Model Code
map.customData.environment.push({
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [59.9120331, 44.9901352, 138.1375275],
    "rotation": [-46.9515707, 107.9833373, -51.66769],
    "scale": [7.6421328, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [60.8726883, 42.9017601, 135.4089966],
    "rotation": [-38.5620733, 116.6799577, -53.6256559],
    "scale": [7.6421332, 3.5349205, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [61.205719, 40.5193405, 132.7741699],
    "rotation": [-30.0544374, 124.2082878, -53.9167996],
    "scale": [7.6421323, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [60.8983307, 37.934433, 130.3343201],
    "rotation": [-21.5841747, 131.1678134, -52.9911996],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [59.9623032, 35.2463531, 128.1832428],
    "rotation": [-13.273945, 137.9523906, -51.0628426],
    "scale": [7.6421328, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [58.4336472, 32.5584259, 126.4035339],
    "rotation": [-5.2414923, 144.855895, -48.2094491],
    "scale": [7.6421332, 3.5349205, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [56.3710861, 29.973938, 125.0636368],
    "rotation": [2.3829994, 152.1249785, -44.4233523],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [53.8538818, 27.5921936, 124.2150345],
    "rotation": [9.4439873, 159.9824691, -39.6429917],
    "scale": [7.6421328, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [50.9787827, 25.5047455, 123.8903275],
    "rotation": [15.7506263, 168.6272073, -33.7832631],
    "scale": [7.6421332, 3.5349207, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [47.8562546, 23.7918053, 124.1019974],
    "rotation": [21.0729111, 178.2079273, -26.7795854],
    "scale": [7.6421332, 3.5349207, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [44.606308, 22.5192032, 124.8419189],
    "rotation": [25.1514135, -171.2321185, -18.6538323],
    "scale": [7.6421328, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [41.3538551, 21.7358379, 126.0816422],
    "rotation": [27.7299226, -159.8256479, -9.5920556],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [38.2238541, 21.471817, 127.7735291],
    "rotation": [28.6125435, -147.9186884, 0.0132944],
    "scale": [7.6421332, 3.5349205, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [35.3366165, 21.7372818, 129.8525848],
    "rotation": [27.72508, -136.0124529, 9.6178446],
    "scale": [7.6421328, 3.5349207, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [32.8030777, 22.5220394, 132.2388763],
    "rotation": [25.1421722, -124.6079222, 18.6775126],
    "scale": [7.6421337, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [30.7206001, 23.7959328, 134.8407135],
    "rotation": [21.0598894, -114.0505944, 26.8003321],
    "scale": [7.6421347, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [29.1692162, 25.5099907, 137.5581207],
    "rotation": [15.7345565, -104.4725518, 33.8008645],
    "scale": [7.6421332, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [28.208559, 27.5983658, 140.2866516],
    "rotation": [9.4255526, -95.8302315, 39.6575058],
    "scale": [7.6421328, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [27.8755169, 29.9807835, 142.9214783],
    "rotation": [2.3627795, -87.9746533, 44.4350524],
    "scale": [7.6421332, 3.5349205, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [28.1829185, 32.5656929, 145.3613129],
    "rotation": [-5.2630514, -80.7069291, 48.2185162],
    "scale": [7.6421332, 3.5349205, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [29.1189384, 35.2537727, 147.5124207],
    "rotation": [-13.2964249, -73.8040462, 51.0693722],
    "scale": [7.6421328, 3.5349212, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [30.647604, 37.9417076, 149.2921143],
    "rotation": [-21.6072608, -67.0194417, 52.9951714],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [32.7101593, 40.5261917, 150.632019],
    "rotation": [-30.0777625, -60.0589599, 53.9178036],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [35.2273636, 42.9079361, 151.4806366],
    "rotation": [-38.5853027, -52.528386, 53.6228316],
    "scale": [7.6421328, 3.5349207, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [38.1024628, 44.9953728, 151.8053436],
    "rotation": [-46.9742025, -43.8273807, 51.6593367],
    "scale": [7.6421332, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [41.2249832, 46.7083092, 151.5936584],
    "rotation": [-54.9999617, -32.9409471, 47.1377548],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [44.4749222, 47.9809113, 150.8537445],
    "rotation": [-62.2033046, -18.0815854, 38.3781363],
    "scale": [7.6421328, 3.5349212, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [47.7273865, 48.7642822, 149.6140137],
    "rotation": [-67.6532901, 3.4005879, 22.825664],
    "scale": [7.6421332, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [50.8573761, 49.0283012, 147.9221191],
    "rotation": [-69.7978602, 32.106701, -0.0338087],
    "scale": [7.6421332, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [53.7446289, 48.7628403, 145.8430786],
    "rotation": [-67.6420886, 60.7990792, -22.8794928],
    "scale": [7.6421328, 3.5349207, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [56.2781677, 47.9780884, 143.4567871],
    "rotation": [-62.1853685, 82.2598341, -38.4101801],
    "scale": [7.6421328, 3.5349207, 36.409687],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [58.3606491, 46.7042007, 140.8549347],
    "rotation": [-54.9787881, 97.104977, -47.1549977],
    "scale": [7.6421328, 3.5349209, 36.4096832],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [49.1794586, 33.2133789, 141.4096222],
    "rotation": [-32.3557331, 88.920293, -39.3367533],
    "scale": [2.0449643, 5.9557123, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [49.3139648, 32.0106354, 140.1005249],
    "rotation": [-6.7898535, 116.1670651, -48.8550386],
    "scale": [2.0449643, 5.9557123, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [48.4664841, 30.6776199, 139.2739258],
    "rotation": [20.113273, 140.488795, -45.9102503],
    "scale": [2.0449641, 5.9557118, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [46.9607391, 29.7235088, 139.2455444],
    "rotation": [42.425662, 174.1339653, -27.7341249],
    "scale": [2.0449643, 5.9557118, 0.5932291],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [45.3718796, 29.5127411, 140.0262299],
    "rotation": [48.3916888, -134.2855899, 10.2912099],
    "scale": [2.0449643, 5.9557118, 0.5932293],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [44.306778, 30.1258049, 141.3177948],
    "rotation": [32.3557058, -91.0796573, 39.3367397],
    "scale": [2.0449643, 5.9557118, 0.5932293],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [44.1722832, 31.3285351, 142.6268768],
    "rotation": [6.7898309, -63.8328989, 48.8550249],
    "scale": [2.0449643, 5.9557128, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [45.0197639, 32.6615372, 143.453476],
    "rotation": [-20.1132525, -39.5111383, 45.9102332],
    "scale": [2.0449643, 5.9557128, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [46.5254974, 33.6156578, 143.4818573],
    "rotation": [-42.4256415, -5.8659884, 27.7341214],
    "scale": [2.0449643, 5.9557118, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [48.1143723, 33.8264389, 142.7011719],
    "rotation": [-48.3916922, 45.7143742, -10.2912168],
    "scale": [2.0449641, 5.9557123, 0.5932292],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [49.0582733, 29.6272945, 142.705246],
    "rotation": [0.0116834, 122.0748782, -49.2052224],
    "scale": [2.4995661, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [48.0353165, 31.2552738, 142.2490387],
    "rotation": [-32.375264, -24.7623915, -24.113322],
    "scale": [3.9521616, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [47.6015396, 30.3091106, 141.5572205],
    "rotation": [-32.3557262, 88.9202862, -102.7717118],
    "scale": [3.9521613, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [47.5654869, 28.6813946, 142.6771088],
    "rotation": [-49.2052121, 32.0884302, -0.0178719],
    "scale": [2.4995666, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [46.5425262, 30.30937, 142.2209015],
    "rotation": [-32.3752845, -24.7623932, 102.7565829],
    "scale": [3.9521616, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [46.9402542, 29.6277905, 144.0325775],
    "rotation": [0.0116834, 122.0748782, -49.2052224],
    "scale": [2.4995661, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [46.9762955, 31.2555161, 142.9127045],
    "rotation": [-32.3557262, 88.9202862, 24.0981932],
    "scale": [3.9521618, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [48.4330292, 30.5736961, 144.0607147],
    "rotation": [-49.2052121, 32.0884302, -0.0178719],
    "scale": [2.4995666, 0.0353492, 0.0353492],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [34.1879807, 52.0797577, 121.3217773],
    "rotation": [-32.3557331, 88.920293, -39.3367533],
    "scale": [3.8728676, 5.3410087, 3.8728678],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [32.7955475, 54.3433266, 119.0990219],
    "rotation": [-32.3557331, 88.920293, -39.3367601],
    "scale": [2.5981467, 4.7323737, 2.5981467],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [31.1671944, 56.9904785, 116.499649],
    "rotation": [-32.3557331, 88.920293, -39.3367533],
    "scale": [0.1672531, 4.7323737, 0.1672531],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [51.6081619, 8.3735085, 160.4451447],
    "rotation": [24.5349445, -104.3878301, -83.0848116],
    "scale": [42.5584717, 2.3484516, 2.3484514],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [51.8765182, 7.3781662, 160.5912323],
    "rotation": [-19.8091059, -76.1830557, -81.803154],
    "scale": [42.5584793, 2.3484516, 2.3484519],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [51.743576, 5.5390558, 140.8870392],
    "rotation": [-19.6167917, 110.0314174, 79.911656],
    "scale": [42.5584602, 2.3484519, 2.3484521],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [52.0118027, 4.5437269, 141.0331421],
    "rotation": [15.0325053, 70.3971957, 81.6415585],
    "scale": [42.5584831, 2.3484516, 2.3484519],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [67.396431, -33.446804, 170.1814423],
    "rotation": [11.0808396, -105.2923658, -79.4547095],
    "scale": [127.6754227, 2.3484519, 2.3484519],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [67.5766983, -37.7843895, 143.5753937],
    "rotation": [-6.4694365, 106.9617186, 84.5178536],
    "scale": [127.6754532, 2.3484519, 2.3484516],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [39.6487579, -38.8429337, 143.5466614],
    "rotation": [1.8084465, 73.0541051, 85.941989],
    "scale": [127.6753769, 2.3484519, 2.3484519],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [39.4629593, -34.9939423, 170.243988],
    "rotation": [-6.377535, -74.9899378, -78.1666724],
    "scale": [127.675415, 2.3484519, 2.3484519],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [50.6327438, 27.5141354, 155.5731201],
    "rotation": [-8.2459491, -0.3965537, 2.4616766],
    "scale": [16.7131901, 2.3484519, 2.3484521],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [42.6726379, 26.0225296, 147.6278381],
    "rotation": [2.4362128, -90.0432649, 8.2534461],
    "scale": [16.7131939, 2.3484516, 2.3484516],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [50.742691, 25.2129669, 139.6947174],
    "rotation": [8.2459388, 179.6033896, -2.4616868],
    "scale": [16.713192, 2.3484519, 2.3484516],
}, {
    "geometry": { "type": "Cube", "material": "DefaultMaterial" },
    "position": [58.7027817, 26.7045708, 147.6400299],
    "rotation": [-2.4362192, 89.956583, -8.2534537],
    "scale": [16.7131901, 2.3484519, 2.3484521],
});

// Assigning LightID's to Dish Lights
map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 4 && x.customData) {
        if (x.customData.lightID == 1) {
            x.customData.lightID = [101, 102, 103, 104];
        }
        if (x.customData.lightID == 2) {
            x.customData.lightID = 105;
        }
    }
});

map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
//console.log(map.basicBeatmapEvents);