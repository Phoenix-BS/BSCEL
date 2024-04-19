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

function lerp(a, b, t) {
    return (b - a) * t + a;
}

function Random(min, max) {
    return lerp(min, max, Math.random());
}

function randBias(min, max, exp) {
    return lerp(min, max, Math.pow(Math.random(), exp));
}

const VortexPosX = 0;
const VortexPosY = 400;
const VortexPosZ = 900;

const VortexRotX = 30;
const VortexRotZ = 0;

// Modifies the animations involving scale to offset the original values by a multiplier (mushroom cap animations for example)
const AnimScaleFactor = 1.15

// NOTE: lots of elements of this environment are randomly generated, so  be sure to re-run this script for different variations that fit your needs

map.customData.materials = {
    "Rock": {
        shader: "Standard",
        color: [0.2, 0.15, 0.1],
    },
    "Stem": {
        shader: "Standard",
        color: [0.7, 0.7, 0.7],
    },
    "Cap": {
        shader: "Standard",
        color: [0.8, 0.3, 0.3],
    },
    "Cookie": {
        shader: "InterscopeConcrete",
        color: [0.5, 0.3, 0.2],
    },
    "Metal": {
        shader: "InterscopeConcrete",
        color: [0.6, 0.6, 0.6],
    },
    "Light": {
        shader: "TransparentLight",
    },
    "LightOpaque": {
        shader: "OpaqueLight",
    },
};

map.customData.environment = [
    {
        id: "BTSEnvironment.[0]Environment",
        lookupMethod: "Exact",
        components: {
            BloomFogEnvironment: {
                attenuation: 0.000012,
                startY: -9999,
            },
        },
    },

    // object removal
    {
        id: "LaserLight0",
        lookupMethod: "EndsWith",
        position: [0, -9999, 0],
    },
    {
        id: "t\\.\\[\\d+\\]LaserL$",
        lookupMethod: "Regex",
        active: false,
    },
    {
        id: "t\\.\\[\\d+\\]LaserR$",
        lookupMethod: "Regex",
        active: false,
    },
    {
        id: "Clouds",
        lookupMethod: "EndsWith",
        position: [0, -9999, 0],
    },
    {
        id: "LowCloudsGenerator",
        lookupMethod: "EndsWith",
        active: false,
    },
    {
        id: "BottomGlow",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "GradientBackground",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "TrackMirror",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "GlowLineL",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "GlowLineR",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "GlowLineC",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "GlowLineH",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "Construction",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "PillarL.[0]Pillar",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "PillarR.[0]Pillar",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "LightWrapper",
        lookupMethod: "Contains",
        active: false,
    },
    {
        id: "Environment\\.\\[\\d+\\]SideLaser$",
        lookupMethod: "Regex",
        active: false,
    },
    {
        id: "MagicDoorSprite",
        lookupMethod: "Contains",
        position: [0, -9999, 0],
    },

    // misc

    {
        id: "DirectionalLight",
        lookupMethod: "Contains",
        rotation: [150, 0, 0]
    },
    {
        geometry: { type: "Sphere", material: "Light" },
        position: [0, 0, 1000],
        scale: [750, 750, 100],
        components: {
            ILightWithId: {
                type: 0,
            },
            TubeBloomPrePassLight: {
                colorAlphaMultiplier: 0,
                bloomFogIntensityMultiplier: 125,
            },
        },
    },
];

// Flat Floor
map.customData.environment.push(
    {
        geometry: { type: "Plane", material: "Rock" },
        position: [0, -1.4, 0],
        rotation: [0, 0, 0],
        scale: [500, 0, 500],
    },
);

// Floor Generator
for (let i = 0; i < 500; i++) {
    map.customData.environment.push(
        {
            geometry: { type: "Cube", material: "Rock" },
            position: [Random(-100, 100), Random(-1.4, -0.7), Random(-100, 500)],
            rotation: [Random(-2, 2), Random(-180, 180), Random(-2, 2)],
            scale: [Random(10, 50), Random(0.25, 0.75), Random(10, 50)],
        },
    );
}

// Floor Light Generator
const floorLightIDs = {}

for (let c = 17; c <= 20; c++) {
    const lightIDs = []
    floorLightIDs[c] = lightIDs

    for (let i = 0; i < 30; i++) {
        const lightID = c * 300 + i;
        lightIDs.push(lightID)
        map.customData.environment.push({
            geometry: { type: "Cube", material: "LightOpaque" },
            position: [Random(-100, 100), Random(-1.4, -0.7), Random(-100, 500)],
            rotation: [Random(-30, 30), Random(-180, 180), Random(-30, 30)],
            scale: [Random(0.5, 5), Random(2, 5), Random(0.5, 5)],
            components: {
                ILightWithId: {
                    lightID: lightID,
                    type: 1,
                },
            },
        });
    }
}

map.basicBeatmapEvents.forEach((x) => {
    if (x.et === 1 && x.customData && x.customData.lightID >= 17 && x.customData.lightID <= 20) {
        x.customData.lightID = floorLightIDs[x.customData.lightID];
    }
});

// Impact Floor Generator
for (let i = 0; i < 50; i++) {
    map.customData.environment.push(
        {
            geometry: { type: "Cube", material: "Rock" },
            position: [Random(-25, 25), Random(-5, -10), Random(550, 600)],
            rotation: [Random(5, 20), Random(-180, 180), Random(-30, 30)],
            scale: [Random(25, 50), Random(2.5, 12.5), Random(75, 150)],
        },
    );
}

// Sides Generator
for (let i = 0; i < 250; i++) {
    let side = Math.random() < 0.5 ? -1 : 1;
    let width = Random(150, 250) * side;

    map.customData.environment.push(
        {
            geometry: { type: "Sphere", material: "Rock" },
            position: [width, Random(-60, -20), Random(-100, 1000)],
            rotation: [0, 0, 0],
            scale: [Random(100, 200), Random(100, 200), Random(100, 200)],
        },
    );
}

// Mushroom Generator

for (let i = 0; i < 40; i++) {
    let side = Math.random() < 0.5 ? -1 : 1;
    let PosX = Random(75, 200) * side;
    let PosY = 0;
    let PosZ = Random(-100, 1000);

    let PosXRand = Random(0.8, 0.5);

    let StemScale = Random(10, 15);
    let StemScaleY = Random(80, 160);

    let StemRotX = Random(-3, 3);
    let StemRotZ = Random(-3, 3);

    let CapScale = Random(60, 120);
    let CapScaleY = Random(25, 50);

    map.customData.environment.push(
        {
            geometry: { type: "Cylinder", material: "Stem" },
            position: [PosX / PosXRand, PosY, PosZ],
            rotation: [StemRotX, Random(-180, 180), StemRotZ],
            scale: [StemScale, StemScaleY, StemScale],
        },
        {
            geometry: { type: "Sphere", material: "Cap" },
            position: [PosX / PosXRand, PosY + StemScaleY, PosZ],
            rotation: [Random(-15, 15), Random(-180, 180), Random(-15, 15)],
            scale: [CapScale, CapScaleY, CapScale],
            track: `MushCapTrack${i}`,
        },
    );
    map.customData.customEvents.push(

        // Mushroom Cap Bounce Animation
        {
            b: 0,
            t: "AnimateTrack",
            d: {
                track: `MushCapTrack${i}`,
                duration: 1,
                scale: [
                    [CapScale, CapScaleY, CapScale, 0],
                    [CapScale * AnimScaleFactor, CapScaleY * AnimScaleFactor, CapScale * AnimScaleFactor, 0.05],
                    [CapScale, CapScaleY, CapScale, 1, "easeOutSine"]
                ],
                repeat: 1
            }
        },
    );
}

for (let i = 0; i < 10; i++) {
    map.customData.environment.push(
        {
            id: "HighCloudsGenerator",
            lookupMethod: "EndsWith",
            duplicate: 1,
            position: [VortexPosX * 1.2, VortexPosY * 1.2, VortexPosZ * 1.2],
            rotation: [VortexRotX, Random(-15, 15), VortexRotZ],
            scale: [2 + (i * 1.75), 0.5 + (i * 0.5), 2 + (i * 1.75)],
        },
    );
}

// UFO Center
for (let i = 0; i < 60; i++) {
    map.customData.environment.push(
        {
            geometry: { type: "Cube", material: "Cookie" },
            position: [VortexPosX, VortexPosY, VortexPosZ],
            rotation: [VortexRotX, i * 6, VortexRotZ],
            scale: [1000, 60, 60],
        },
        {
            geometry: { type: "Cube", material: "Cookie" },
            position: [VortexPosX, VortexPosY, VortexPosZ],
            rotation: [VortexRotX, i * 6, VortexRotZ],
            scale: [500, 80, 80],
        },
        {
            geometry: { type: "Cube", material: "Cookie" },
            position: [VortexPosX, VortexPosY, VortexPosZ],
            rotation: [VortexRotX, i * 6, VortexRotZ],
            scale: [400, 120, 120],
        },
    );
}

// UFO Points
for (let i = 0; i < 3; i++) {
    let rot = i * 60;
    let lightOffset = 5;

    map.customData.environment.push(
        {
            geometry: { type: "Cube", material: "Light" },
            position: [VortexPosX, VortexPosY, VortexPosZ],
            rotation: [0, rot - lightOffset, 0],
            scale: [1025, 25, 25],
            components: {
                ILightWithId: {
                    lightID: 100 + (i * 3),
                    type: 4,
                },
                TubeBloomPrePassLight: {
                    colorAlphaMultiplier: 2.5,
                    bloomFogIntensityMultiplier: 0,
                },
            },
        },
        {
            geometry: { type: "Cube", material: "Light" },
            position: [VortexPosX, VortexPosY, VortexPosZ],
            rotation: [0, rot + lightOffset, 0],
            scale: [1025, 25, 25],
            components: {
                ILightWithId: {
                    lightID: 101 + (i * 3),
                    type: 4,
                },
                TubeBloomPrePassLight: {
                    colorAlphaMultiplier: 2.5,
                    bloomFogIntensityMultiplier: 0,
                },
            },
        },
        {
            geometry: { type: "Cube", material: "Light" },
            position: [VortexPosX, VortexPosY - 40, VortexPosZ],
            rotation: [0, rot, 0],
            scale: [1010, 25, 25],
            components: {
                ILightWithId: {
                    lightID: 102 + (i * 3),
                    type: 4,
                },
                TubeBloomPrePassLight: {
                    colorAlphaMultiplier: 2.5,
                    bloomFogIntensityMultiplier: 0,
                },
            },
        },
    );
    map.basicBeatmapEvents.forEach((x) => {
        if (x.et == 4 && x.customData) {
            if (x.customData.lightID == 1) {
                x.customData.lightID = [100, 101, 102];
            }
            if (x.customData.lightID == 2) {
                x.customData.lightID = [103, 104, 105];
            }
            if (x.customData.lightID == 3) {
                x.customData.lightID = [106, 107, 108];
            }
        }
    });
    for (let j = 0; j < 10; j++) {
        map.customData.environment.push(
            {
                geometry: { type: "Cube", material: "Metal" },
                position: [VortexPosX, VortexPosY, VortexPosZ],
                rotation: [0, j + rot, 0],
                scale: [1010, 90, 90],
            },
            {
                geometry: { type: "Cube", material: "Metal" },
                position: [VortexPosX, VortexPosY, VortexPosZ],
                rotation: [0, -j + rot, 0],
                scale: [1010, 90, 90],
            },
        );
    }
}

// UFO Beam Point
map.customData.environment.push(
    {
        geometry: { type: "Cylinder", material: "Metal" },
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [VortexRotX, 0, VortexRotZ],
        scale: [75, 100, 115],
    },
);

const LaserX = 150;
const LaserXOffset = 15;

const LaserAnchor = 700;
const LaserSpace = 22.222;
const LaserScale = 40;

const RotX = 180;
const RotY = 0;
const RotZ = 0;

map.customData.environment.push(
    {
        id: "PillarL",
        lookupMethod: "EndsWith",
        rotation: [240, 90, -90],
    },
    {
        id: "PillarR",
        lookupMethod: "EndsWith",
        rotation: [240, -90, 90],
    },
    {
        id: "PillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [-LaserX, 450, LaserAnchor],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [LaserX, 450, LaserAnchor],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "SmallPillarPair\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [-LaserX + LaserXOffset, 450, LaserAnchor + LaserSpace],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "SmallPillarPair\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [LaserX - LaserXOffset, 450, LaserAnchor + LaserSpace],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 2),
            450,
            LaserAnchor + (LaserSpace * 2),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 2),
            450,
            LaserAnchor + (LaserSpace * 2),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 3),
            450,
            LaserAnchor + (LaserSpace * 3),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(1\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 3),
            450,
            LaserAnchor + (LaserSpace * 3),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 4),
            450,
            LaserAnchor + (LaserSpace * 4),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 4),
            450,
            LaserAnchor + (LaserSpace * 4),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 5),
            450,
            LaserAnchor + (LaserSpace * 5),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(2\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 5),
            450,
            LaserAnchor + (LaserSpace * 5),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 6),
            450,
            LaserAnchor + (LaserSpace * 6),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 6),
            450,
            LaserAnchor + (LaserSpace * 6),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 7),
            450,
            LaserAnchor + (LaserSpace * 7),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id:
            "SmallPillarPair \\(3\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 7),
            450,
            LaserAnchor + (LaserSpace * 7),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarL\\.\\[\\d+\\]RotationBaseL$",
        lookupMethod: "Regex",
        position: [
            -LaserX + (LaserXOffset * 8),
            450,
            LaserAnchor + (LaserSpace * 8),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
    {
        id: "PillarPair \\(4\\)\\.\\[\\d+\\]PillarR\\.\\[\\d+\\]RotationBaseR$",
        lookupMethod: "Regex",
        position: [
            LaserX - (LaserXOffset * 8),
            450,
            LaserAnchor + (LaserSpace * 8),
        ],
        rotation: [RotX, RotY, RotZ],
        scale: [LaserScale, LaserScale, LaserScale],
    },
);

const RightSpread = 1.5;
const LeftSpread = 3;
const SpreadMult = 2;

map.customData.environment.push(
    {
        id: "PillarPair\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [VortexRotX + RightSpread + 180, 0, VortexRotZ + RightSpread],
        scale: [45, 150, 45],
    },
    {
        id: "PillarPair \\(1\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [VortexRotX + RightSpread + 180, 0, VortexRotZ - RightSpread],
        scale: [45, 150, 45],
    },
    {
        id: "PillarPair \\(2\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [
            VortexRotX - RightSpread + 180,
            0,
            VortexRotZ + (RightSpread * SpreadMult),
        ],
        scale: [45, 150, 45],
    },
    {
        id: "PillarPair \\(3\\)\\.\\[\\d\\]PillarR\\.\\[\\d\\]LaserR$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [
            VortexRotX - RightSpread + 180,
            0,
            VortexRotZ - (RightSpread * SpreadMult),
        ],
        scale: [45, 150, 45],
    },
    {
        id: "PillarPair\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [VortexRotX + LeftSpread + 180, 0, VortexRotZ + LeftSpread],
        scale: [20, 150, 20],
    },
    {
        id: "PillarPair \\(1\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [VortexRotX + LeftSpread + 180, 0, VortexRotZ - LeftSpread],
        scale: [20, 150, 20],
    },
    {
        id: "PillarPair \\(2\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [
            VortexRotX - LeftSpread + 180,
            0,
            VortexRotZ + (LeftSpread * SpreadMult),
        ],
        scale: [20, 150, 20],
    },
    {
        id: "PillarPair \\(3\\)\\.\\[\\d\\]PillarL\\.\\[\\d\\]LaserL$",
        lookupMethod: "Regex",
        position: [VortexPosX, VortexPosY, VortexPosZ],
        rotation: [
            VortexRotX - LeftSpread + 180,
            0,
            VortexRotZ - (LeftSpread * SpreadMult),
        ],
        scale: [20, 150, 20],
    },
);

// ring cubes

const SkyCubeRangeX1 = -350;
const SkyCubeRangeX2 = 350;
const SkyCubeRangeY1 = 0;
const SkyCubeRangeY2 = 150;
const SkyCubeRangeZ1 = -250;
const SkyCubeRangeZ2 = 250;

const SkyCubeScale1 = 5;
const SkyCubeScale2 = 25;
const SkyCubeRot = 180;

// CUBE EFFECT (Modified version, Original made by Zyxi) //
map.customData.environment.push(
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\)\\.\\[0\\]Cube$",
        "lookupMethod": "Regex",
        "duplicate": 1,
        "active": true,
    },
    {
        "id": "PillarTrackLaneRingsR",
        "lookupMethod": "Contains",
        "position": [
            0,
            0,
            500,
        ],
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[0\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[1\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[2\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[3\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[4\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[5\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[6\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[7\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[8\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[9\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[10\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[11\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[12\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[13\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[14\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[15\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[16\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[17\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[18\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[19\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[20\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[21\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[22\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[23\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[24\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[25\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[26\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[27\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[28\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id":
            "t\\.\\[\\d+\\]PillarTrackLaneRingsR \\(1\\)\\.\\[29\\]PillarTrackLaneRing\\(Clone\\).\\[1\\]Cube\\(Clone\\)$",
        "lookupMethod": "Regex",
        "localPosition": [
            Random(SkyCubeRangeX1, SkyCubeRangeX2),
            Random(SkyCubeRangeY1, SkyCubeRangeY2),
            Random(SkyCubeRangeZ1, SkyCubeRangeZ2),
        ],
        "scale": [
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
            Random(SkyCubeScale1, SkyCubeScale2),
        ],
        "rotation": [
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
            Random(-SkyCubeRot, SkyCubeRot),
        ],
        track: "Cubes",
    },
    {
        "id": "[0]Cube",
        "lookupMethod": "Contains",
        "active": false,
    },
);

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");
