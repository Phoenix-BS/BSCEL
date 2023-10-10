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
    id: "RocketEnvironment.[0]Environment",
    lookupMethod: "Exact",
    components: {
        BloomFogEnvironment: {
            attenuation: 0,
            startY: -9999,
            height: 1,
            track: "fog",
        },
    },
},
{
    id: "RocketArenaLight",
    lookupMethod: "Contains",
    active: false
},
{
    id: "GateLight",
    lookupMethod: "Contains",
    active: false
},
{
    id: "FrontLights",
    lookupMethod: "Contains",
    active: false
},
{
    id: "EnvLight",
    lookupMethod: "Contains",
    active: false
},
{
    id: "BackColumns",
    lookupMethod: "Contains",
    active: false
},
{
    id: "RocketArena",
    lookupMethod: "Contains",
    active: false
},
{
    id: "GlowLineL",
    lookupMethod: "Contains",
    active: false
},
{
    id: "GlowLineR",
    lookupMethod: "Contains",
    active: false
},
{
    id: "GradientBackground",
    lookupMethod: "Contains",
    active: false
},
{
    id: "RotatingLasersPair",
    lookupMethod: "Contains",
    active: false
},
{
    id: "Construction",
    lookupMethod: "Contains",
    active: false
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
    id: "NarrowGameHUD",
    lookupMethod: "Contains",
    active: false
},
{
    id: "RocketCar",
    lookupMethod: "Contains",
    active: false
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    position: [0, 0, 0],
    scale: [50, 0.05, 50],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 5,
    position: [0, 0, 0],
    scale: [50, 0.05, 50],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 6,
    position: [0, 20, 0],
    scale: [50, 0.05, 50],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 6,
    position: [-50, 0, 0],
    scale: [0.05, 50, 50],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 6,
    position: [50, 0, 0],
    scale: [0.05, 50, 50],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 6,
    position: [0, 0, -50],
    scale: [50, 50, 0.05],
    rotation: [0, 0, 0],
},
{
    id: "BigSmokePS$",
    lookupMethod: "Regex",
    duplicate: 6,
    position: [0, 0, 150],
    scale: [50, 50, 0.05],
    rotation: [0, 0, 0],
},
];

map.customData.materials = {
    "Liminal": {
        "shader": "OpaqueLight",
        "color": [0, 0, 0]
    },
};

map.customData.environment.push(
    {
        // Floor
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },
    {
        // Ceiling
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 20, 0],
        rotation: [180, 0, 0],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },
    {
        // Left Wall
        geometry: { type: "Plane", material: "Liminal" },
        position: [-50, 0, 0],
        rotation: [0, 0, -90],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },
    {
        // Right Wall
        geometry: { type: "Plane", material: "Liminal" },
        position: [50, 0, 0],
        rotation: [0, 0, 90],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },
    {
        // Back Wall
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0, -50],
        rotation: [90, 0, 0],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 105,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },
    {
        // Front Wall
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0, 150],
        rotation: [-90, 0, 0],
        scale: [1000, 0, 1000],
        components: {
            ILightWithId: {
                lightID: 106,
                type: 4,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0.25,
            }
        },
    },

    {
        // Left Pillar 1
        geometry: { type: "Cube", material: "Liminal" },
        position: [-35, 0, 15],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 2
        geometry: { type: "Cube", material: "Liminal" },
        position: [-32.5, 0, 30],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 3
        geometry: { type: "Cube", material: "Liminal" },
        position: [-30, 0, 45],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 4
        geometry: { type: "Cube", material: "Liminal" },
        position: [-27.5, 0, 60],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 5
        geometry: { type: "Cube", material: "Liminal" },
        position: [-25, 0, 75],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 105,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 6
        geometry: { type: "Cube", material: "Liminal" },
        position: [-22.5, 0, 90],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 106,
                type: 2,
            },
        },
    },
    {
        // Left Pillar 7
        geometry: { type: "Cube", material: "Liminal" },
        position: [-20, 0, 105],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 107,
                type: 2,
            },
        },
    },

    {
        // Right Pillar 1
        geometry: { type: "Cube", material: "Liminal" },
        position: [35, 0, 15],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 2
        geometry: { type: "Cube", material: "Liminal" },
        position: [32.5, 0, 30],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 3
        geometry: { type: "Cube", material: "Liminal" },
        position: [30, 0, 45],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 4
        geometry: { type: "Cube", material: "Liminal" },
        position: [27.5, 0, 60],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 5
        geometry: { type: "Cube", material: "Liminal" },
        position: [25, 0, 75],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 105,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 6
        geometry: { type: "Cube", material: "Liminal" },
        position: [22.5, 0, 90],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 106,
                type: 3,
            },
        },
    },
    {
        // Right Pillar 7
        geometry: { type: "Cube", material: "Liminal" },
        position: [20, 0, 105],
        rotation: [0, 0, 0],
        scale: [2.5, 1000, 2.5],
        components: {
            ILightWithId: {
                lightID: 107,
                type: 3,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-5.5, 0, 45],
        rotation: [0, 0, 0],
        scale: [4, 0.75, 4],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-5.5, 1.05, 45],
        rotation: [0, 0, 0],
        scale: [4, 2, 4],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-5.5, 1, 45],
        rotation: [0, 0, 0],
        scale: [2.25, 4, 2.25],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-5.5, 2, 45],
        rotation: [0, 0, 0],
        scale: [3, 1.5, 3],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-5.5, 5, 45],
        rotation: [0, 0, 0],
        scale: [3, 0.25, 3],
        components: {
            ILightWithId: {
                lightID: 105,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-5.5, 5.25, 45],
        rotation: [0, 0, 0],
        scale: [3, 1.75, 3],
        components: {
            ILightWithId: {
                lightID: 106,
                type: 1,
            },
        },
    },
    {
        // Pawn 1
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-5.5, 7.25, 45],
        rotation: [0, 0, 0],
        scale: [3, 3, 3],
        components: {
            ILightWithId: {
                lightID: 107,
                type: 1,
            },
        },
    },

    {
        // Pawn 2
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [5.5, 0, 45],
        rotation: [0, 0, 0],
        scale: [4, 0.75, 4],
        components: {
            ILightWithId: {
                lightID: 108,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Sphere", material: "Liminal" },
        position: [5.5, 1.05, 45],
        rotation: [0, 0, 0],
        scale: [4, 2, 4],
        components: {
            ILightWithId: {
                lightID: 109,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [5.5, 1, 45],
        rotation: [0, 0, 0],
        scale: [2.25, 4, 2.25],
        components: {
            ILightWithId: {
                lightID: 110,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Sphere", material: "Liminal" },
        position: [5.5, 2, 45],
        rotation: [0, 0, 0],
        scale: [3, 1.5, 3],
        components: {
            ILightWithId: {
                lightID: 111,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [5.5, 5, 45],
        rotation: [0, 0, 0],
        scale: [3, 0.25, 3],
        components: {
            ILightWithId: {
                lightID: 112,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Sphere", material: "Liminal" },
        position: [5.5, 5.25, 45],
        rotation: [0, 0, 0],
        scale: [3, 1.75, 3],
        components: {
            ILightWithId: {
                lightID: 113,
                type: 1,
            },
        },
    },
    {
        // Pawn 2
        geometry: { type: "Sphere", material: "Liminal" },
        position: [5.5, 7.25, 45],
        rotation: [0, 0, 0],
        scale: [3, 3, 3],
        components: {
            ILightWithId: {
                lightID: 114,
                type: 1,
            },
        },
    },

    {
        // Pawn 3
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-3, 0, 70],
        rotation: [0, 0, 0],
        scale: [4, 0.75, 4],
        components: {
            ILightWithId: {
                lightID: 115,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-3, 1.05, 70],
        rotation: [0, 0, 0],
        scale: [4, 2, 4],
        components: {
            ILightWithId: {
                lightID: 116,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-3, 1, 70],
        rotation: [0, 0, 0],
        scale: [2.25, 4, 2.25],
        components: {
            ILightWithId: {
                lightID: 117,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-3, 2, 70],
        rotation: [0, 0, 0],
        scale: [3, 1.5, 3],
        components: {
            ILightWithId: {
                lightID: 118,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [-3, 5, 70],
        rotation: [0, 0, 0],
        scale: [3, 0.25, 3],
        components: {
            ILightWithId: {
                lightID: 119,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-3, 5.25, 70],
        rotation: [0, 0, 0],
        scale: [3, 1.75, 3],
        components: {
            ILightWithId: {
                lightID: 120,
                type: 1,
            },
        },
    },
    {
        // Pawn 3
        geometry: { type: "Sphere", material: "Liminal" },
        position: [-3, 7.25, 70],
        rotation: [0, 0, 0],
        scale: [3, 3, 3],
        components: {
            ILightWithId: {
                lightID: 121,
                type: 1,
            },
        },
    },

    {
        // Pawn 4
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [3, 0, 70],
        rotation: [0, 0, 0],
        scale: [4, 0.75, 4],
        components: {
            ILightWithId: {
                lightID: 122,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Sphere", material: "Liminal" },
        position: [3, 1.05, 70],
        rotation: [0, 0, 0],
        scale: [4, 2, 4],
        components: {
            ILightWithId: {
                lightID: 123,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [3, 1, 70],
        rotation: [0, 0, 0],
        scale: [2.25, 4, 2.25],
        components: {
            ILightWithId: {
                lightID: 124,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Sphere", material: "Liminal" },
        position: [3, 2, 70],
        rotation: [0, 0, 0],
        scale: [3, 1.5, 3],
        components: {
            ILightWithId: {
                lightID: 125,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Cylinder", material: "Liminal" },
        position: [3, 5, 70],
        rotation: [0, 0, 0],
        scale: [3, 0.25, 3],
        components: {
            ILightWithId: {
                lightID: 126,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Sphere", material: "Liminal" },
        position: [3, 5.25, 70],
        rotation: [0, 0, 0],
        scale: [3, 1.75, 3],
        components: {
            ILightWithId: {
                lightID: 127,
                type: 1,
            },
        },
    },
    {
        // Pawn 4
        geometry: { type: "Sphere", material: "Liminal" },
        position: [3, 7.25, 70],
        rotation: [0, 0, 0],
        scale: [3, 3, 3],
        components: {
            ILightWithId: {
                lightID: 128,
                type: 1,
            },
        },
    },


    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0.01, 135],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 101,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 0.01, 100],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 102,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 0.01, 100],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 103,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0.01, 65],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 104,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 0.01, 30],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 105,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 0.01, 30],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 106,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 0.01, -5],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 107,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 0.01, -40],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 108,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 0.01, -40],
        rotation: [0, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 109,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },




    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 19.99, 135],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 110,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 19.99, 100],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 111,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 19.99, 100],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 112,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 19.99, 65],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 113,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 19.99, 30],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 114,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 19.99, 30],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 115,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [0, 19.99, -5],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 116,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [-35, 19.99, -40],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 117,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
    {
        // Floor Tile
        geometry: { type: "Plane", material: "Liminal" },
        position: [35, 19.99, -40],
        rotation: [180, 0, 0],
        scale: [3.5, 1, 3.5],
        components: {
            ILightWithId: {
                lightID: 118,
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 5,
            }
        },
    },
);

map.basicBeatmapEvents.forEach((x) => {
    if (x.et == 4 && x.customData) {
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
        if (x.customData.lightID == 5) {
            x.customData.lightID = [105, 106];
        }
    }
    if (x.et == 2 && x.customData) {
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
        if (x.customData.lightID == 5) {
            x.customData.lightID = 105;
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 106;
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 107;
        }
    }
    if (x.et == 3 && x.customData) {
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
        if (x.customData.lightID == 5) {
            x.customData.lightID = 105;
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 106;
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = 107;
        }
    }
    if (x.et == 1 && x.customData) {
        if (x.customData.lightID == 1) {
            x.customData.lightID = [101, 102, 103, 104, 105, 106, 107];
        }
        if (x.customData.lightID == 2) {
            x.customData.lightID = [108, 109, 110, 111, 112, 113, 114];
        }
        if (x.customData.lightID == 3) {
            x.customData.lightID = [115, 116, 117, 118, 119, 120, 121];
        }
        if (x.customData.lightID == 4) {
            x.customData.lightID = [122, 123, 124, 125, 126, 127, 128];
        }
    }
    if (!x.et && x.customData) {
        if (x.customData.lightID == 1) {
            x.customData.lightID = 101;
        }
        if (x.customData.lightID == 2) {
            x.customData.lightID = 110;
        }
        if (x.customData.lightID == 3) {
            x.customData.lightID = [102, 111];
        }
        if (x.customData.lightID == 4) {
            x.customData.lightID = [103, 112];
        }
        if (x.customData.lightID == 5) {
            x.customData.lightID = 104;
        }
        if (x.customData.lightID == 6) {
            x.customData.lightID = 113;
        }
        if (x.customData.lightID == 7) {
            x.customData.lightID = [105, 114];
        }
        if (x.customData.lightID == 8) {
            x.customData.lightID = [106, 115];
        }
        if (x.customData.lightID == 9) {
            x.customData.lightID = 107;
        }
        if (x.customData.lightID == 10) {
            x.customData.lightID = 116;
        }
        if (x.customData.lightID == 11) {
            x.customData.lightID = [108, 109, 117, 118];
        }


        // if (x.customData.lightID == 1) {
        //     x.customData.lightID = [101, 110];
        // }
        // if (x.customData.lightID == 2) {
        //     x.customData.lightID = [102, 103, 111, 112];
        // }
        // if (x.customData.lightID == 3) {
        //     x.customData.lightID = [104, 113];
        // }
        // if (x.customData.lightID == 4) {
        //     x.customData.lightID = [105, 106, 114, 115];
        // }
        // if (x.customData.lightID == 5) {
        //     x.customData.lightID = [107, 116];
        // }
        // if (x.customData.lightID == 6) {
        //     x.customData.lightID = [108, 109, 117, 118];
        // }
    }
},
);

map.customData.customEvents.push;

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");