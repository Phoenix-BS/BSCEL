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

// Geometry Material List
map.customData.materials = {
    "Material": {
        shader: "Standard",
        color: [0.1, 0.1, 0.1]
    },
    "Disco": {
        shader: "BillieWater"
    },
    "TransparentLight": {
        shader: "TransparentLight"
    },
};

map.customData.environment = [
    {
        id: "NiceEnvironment.[0]Environment",
        lookupMethod: "Exact",
        components: {
            BloomFogEnvironment: {
                attenuation: 0.0007,
                startY: -15,
                height: 5
            },
        },
    },
    // object removal
    {
        id: "[0]Ring",
        lookupMethod: "EndsWith",
        active: false
    },
    {
        id: "FrontLights",
        lookupMethod: "EndsWith",
        active: false
    },
    {
        id: "DoubleColorLaser",
        lookupMethod: "Contains",
        active: false
    },
    // hud misc
    {
        id: "LeftPanel",
        lookupMethod: "EndsWith",
        position: [-2.5, 1.5, 6],
        rotation: [0, -20, 0]
    },
    {
        id: "RightPanel",
        lookupMethod: "EndsWith",
        position: [2.5, 1.5, 6],
        rotation: [0, 20, 0]
    },
    // list
    {
        id: "Floor",
        lookupMethod: "EndsWith",
        position: [10, 36.1, 5],
        rotation: [70, -20, 0],
        scale: [1, 10, 5]
    },
    {
        id: "Floor",
        lookupMethod: "EndsWith",
        duplicate: 1,
        position: [-10, 36.1, 5],
        rotation: [70, 20, 0],
        scale: [1, 10, 5]
    },
    {
        id: "BigTrackLaneRing(Clone)",
        lookupMethod: "Contains",
        rotation: [90, 0, 0],
        scale: [2, 2, 0.25]
    },
    {
        id: "NeonTubeBothSidesDirectional$",
        lookupMethod: "Regex",
        rotation: [0, 0, 0],
        scale: [0.06, 60, 0.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        id: "NeonTubeBothSidesDirectional \\(\\d+\\)$",
        lookupMethod: "Regex",
        rotation: [0, 0, 0],
        scale: [0.06, 60, 0.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        id: "RotatingLaserLeft$",
        lookupMethod: "Regex",
        position: [0, 10, 35],
        rotation: [0, -30, 0],
        scale: [1.5, 1, 1.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.5
            }
        }
    },
    {
        id: "RotatingLaserLeft \\(\\d+\\)$",
        lookupMethod: "Regex",
        position: [0, 10, 35],
        rotation: [0, -30, 0],
        scale: [1.5, 1, 1.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.5
            }
        }
    },
    {
        id: "RotatingLaserRight$",
        lookupMethod: "Regex",
        position: [0, 10, 35],
        rotation: [0, 30, 0],
        scale: [1.5, 1, 1.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.5
            }
        }
    },
    {
        id: "RotatingLaserRight \\(\\d+\\)$",
        lookupMethod: "Regex",
        position: [0, 10, 35],
        rotation: [0, 30, 0],
        scale: [1.5, 1, 1.5],
        components: {
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 3,
                bloomFogIntensityMultiplier: 0.5
            }
        }
    },
    // building positioning + lightid's
    {
        id: "NearBuildingLeft (1)",
        lookupMethod: "EndsWith",
        position: [-5, -2.2, 11],
        rotation: [0, 70, 30],
        scale: [0.25, 0.15, 0.8]
    },
    {
        id: "NearBuildingLeft \\(1\\)\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
        lookupMethod: "Regex",
        scale: [2, 10, 2],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 101
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingLeft \\(1\\)\\.\\[\\d+\\]NeonTubeDirectional$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 105
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingLeft \\(1\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 106
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingLeft (2)",
        lookupMethod: "EndsWith",
        position: [-7, -2.6, 11],
        rotation: [0, 70, 30],
        scale: [0.25, 0.22, 0.8]
    },
    {
        id: "NearBuildingLeft \\(2\\)\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
        lookupMethod: "Regex",
        scale: [2, 10, 2],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 102
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingLeft \\(2\\)\\.\\[\\d+\\]NeonTubeDirectional$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 107
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingLeft \\(2\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 108
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight (1)",
        lookupMethod: "EndsWith",
        position: [5, -2.2, 11],
        rotation: [0, -70, -30],
        scale: [0.25, 0.15, 0.8]
    },
    {
        id: "NearBuildingRight \\(1\\)\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
        lookupMethod: "Regex",
        scale: [2, 10, 2],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 103
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight \\(1\\)\\.\\[\\d+\\]NeonTubeDirectional$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 109
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight \\(1\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 110
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight (2)",
        lookupMethod: "EndsWith",
        position: [7, -2.6, 11],
        rotation: [0, -70, -30],
        scale: [0.25, 0.22, 0.8]
    },
    {
        id: "NearBuildingRight \\(2\\)\\.\\[\\d+\\]NeonTube \\(\\d+\\)$",
        lookupMethod: "Regex",
        scale: [2, 10, 2],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 104
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight \\(2\\)\\.\\[\\d+\\]NeonTubeDirectional$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 111
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    {
        id: "NearBuildingRight \\(2\\)\\.\\[\\d+\\]NeonTubeDirectional \\(1\\)$",
        lookupMethod: "Regex",
        scale: [0.125, 2, 6],
        components: {
            ILightWithId: {
                type: 4,
                lightID: 112
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 1,
                bloomFogIntensityMultiplier: 4
            }
        }
    },
    // spectrograms
    {
        id: "[0]Spectrogram",
        lookupMethod: "EndsWith",
        position: [-8, 12, 50],
        rotation: [75, 60, 0],
        scale: [0.25, 1.25, 0.25],
    },
    {
        id: "[1]Spectrogram",
        lookupMethod: "EndsWith",
        position: [8, 12, 50],
        rotation: [75, -60, 0],
        scale: [0.25, 1.25, 0.25],
    },
    // bar lights
    {
        id: "GlowLineL",
        lookupMethod: "EndsWith",
        position: [-0.4, -0.05, 7],
        rotation: [90, 0, 0],
        scale: [10, 1, 0.125],
        components: {
            ILightWithId: {
                type: 2,
                lightID: 130
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    {
        id: "GlowLineL",
        lookupMethod: "EndsWith",
        duplicate: 1,
        position: [-1, -0.05, 7],
        rotation: [90, 0, 0],
        scale: [10, 1, 0.125],
        components: {
            ILightWithId: {
                type: 2,
                lightID: 131
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    {
        id: "GlowLineFarL",
        lookupMethod: "EndsWith",
        position: [-1.6, -0.05, 15],
        rotation: [90, 0, 0],
        scale: [4, 1, 0.125],
        components: {
            ILightWithId: {
                type: 2,
                lightID: 132
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    {
        id: "GlowLineR",
        lookupMethod: "EndsWith",
        position: [0.4, -0.05, 7],
        rotation: [90, 0, 0],
        scale: [10, 1, 0.125],
        components: {
            ILightWithId: {
                type: 3,
                lightID: 133
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    {
        id: "GlowLineR",
        lookupMethod: "EndsWith",
        duplicate: 1,
        position: [1, -0.05, 7],
        rotation: [90, 0, 0],
        scale: [10, 1, 0.125],
        components: {
            ILightWithId: {
                type: 3,
                lightID: 134
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    {
        id: "GlowLineFarR",
        lookupMethod: "EndsWith",
        position: [1.6, -0.05, 15],
        rotation: [90, 0, 0],
        scale: [4, 1, 0.125],
        components: {
            ILightWithId: {
                type: 3,
                lightID: 135 
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.75,
                bloomFogIntensityMultiplier: 0
            }
        }
    },
    // back laser setup
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [6, 25, 50],
        rotation: [-30, 0, 15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 150
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [-6, 25, 50],
        rotation: [-30, 0, -15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 151
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [5, 24, 54],
        rotation: [-30, 0, 15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 152
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [-5, 24, 54],
        rotation: [-30, 0, -15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 153
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [4, 23, 58],
        rotation: [-30, 0, 15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 154
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [-4, 23, 58],
        rotation: [-30, 0, -15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 155
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [3, 22, 62],
        rotation: [-30, 0, 15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 156
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    {
        geometry: { type: "Cylinder", material: "TransparentLight" },
        position: [-3, 22, 62],
        rotation: [-30, 0, -15],
        scale: [0.5, 10000, 0.5],
        components: {
            ILightWithId: {
                type: 0,
                lightID: 157
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 2,
                bloomFogIntensityMultiplier: 0.25
            }
        }
    },
    // geometry construction
    {
        geometry: { type: "Cube", material: "Material" },
        position: [30, -44.8, -23.5],
        rotation: [30, 20, 0],
        scale: [90, 100, 0.5]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [-30, -44.8, -23.5],
        rotation: [30, -20, 0],
        scale: [90, 100, 0.5]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [-20, -5, 10],
        rotation: [0, -20, 0],
        scale: [60, 5, 6]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [20, -5, 10],
        rotation: [0, 20, 0],
        scale: [60, 5, 6]
    },
    {
        geometry: { type: "Cube", material: "Disco" },
        position: [0, 10, 34],
        rotation: [45, 45, 0],
        scale: [1.5, 1.5, 1.5]
    },
    {
        geometry: { type: "Cube", material: "Disco" },
        position: [0, 10, 34],
        rotation: [-45, -45, 0],
        scale: [1.5, 1.5, 1.5]
    },
    {
        geometry: { type: "Sphere", material: "Material" },
        position: [0, 30, 34],
        rotation: [0, 0, 0],
        scale: [0.5, 40, 0.5]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [40, 40, 50],
        rotation: [30, 60, 0],
        scale: [1000, 5, 1000]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [-40, 40, 50],
        rotation: [30, -60, 0],
        scale: [1000, 5, 1000]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [-52, 20, 25],
        rotation: [0, -30, 15],
        scale: [50, 1000, 1]
    },
    {
        geometry: { type: "Cube", material: "Material" },
        position: [52, 20, 25],
        rotation: [0, 30, -15],
        scale: [50, 1000, 1]
    },
];

map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 4 && x.customData) {
        if (x.customData.lightID == 9) {
            x.customData.lightID = 101
        }
        if (x.customData.lightID == 10) {
            x.customData.lightID = 102
        }
        if (x.customData.lightID == 11) {
            x.customData.lightID = 103
        }
        if (x.customData.lightID == 12) {
            x.customData.lightID = 104
        }
        if (x.customData.lightID == 1) {
            x.customData.lightID = 105
        }
        if (x.customData.lightID == 2) {
            x.customData.lightID = 106
        }
        if (x.customData.lightID == 3) {
            x.customData.lightID = 107
        }
        if (x.customData.lightID == 4) {
            x.customData.lightID = 108
        }
        if (x.customData.lightID == 5) {
            x.customData.lightID = 109
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 110
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 111
        }
        if (x.customData.lightID == 8) {
            x.customData.lightID = 112
        }
    }
    if (x.et == 2 && x.customData) {
        if (x.customData.lightID == 5) {
            x.customData.lightID = 130
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 131
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 132
        }
    }
    if (x.et == 3 && x.customData) {
        if (x.customData.lightID == 5) {
            x.customData.lightID = 133
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 134
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 135
        }
    }
    if (x.et == 0 && x.customData) {
        if (x.customData.lightID == 1) {
            x.customData.lightID = 150
        }
        if (x.customData.lightID == 2) {
            x.customData.lightID = 151
        }
        if (x.customData.lightID == 3) {
            x.customData.lightID = 152
        }
        if (x.customData.lightID == 4) {
            x.customData.lightID = 153
        }
        if (x.customData.lightID == 5) {
            x.customData.lightID = 154
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 155
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 156
        }
        if (x.customData.lightID == 8) {
            x.customData.lightID = 157
        }
    }
});

map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");