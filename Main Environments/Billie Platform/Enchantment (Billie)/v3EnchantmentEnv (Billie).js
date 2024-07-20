"use strict";

const fs = require("fs");
const { toNamespacedPath } = require("path");
const { buffer } = require("stream/consumers");
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

const lerp = (a, b, t) => (b - a) * t + a;

function seededRandom(a) {
	return function (min, max) {
		var t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		let f = ((t ^ t >>> 14) >>> 0) / 4294967296;
		return lerp(min, max, f);
	}
}

function seededRandomBias(a) {
	return function (min, max, bias) {
		bias ??= 1
		var t = a += 0x6D2B79F5;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		let f = ((t ^ t >>> 14) >>> 0) / 4294967296;
		f = Math.pow(f, bias);
		return lerp(min, max, f);
	}
}

// Seed setter, used to alter the randomness to specific seeds. Change the number in the parenthesis to roll different seeds.

const seedRandom = seededRandom(2)
const seedRandomBias = seededRandomBias(2)

// Geometry Material List
map.customData.materials = {
	"Rock": {
		shader: "Standard",
		color: [0.2, 0.2, 0.2]
	},
	"OpaqueLight": {
		shader: "OpaqueLight"
	},
	"TransparentLight": {
		shader: "TransparentLight"
	}
};

map.customData.environment.push(
	{
		id: "BillieEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.00005,
				startY: -9999,
				height: 1
			},
		}
	},
	// object removal
	{
		id: "Rail",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Gradient",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Cloud",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Rain",
		lookupMethod: "Contains",
		active: false
	},

	// object yeetus

	{
		id: "BigSmokePS",
		lookupMethod: "Contains",
		position: [0, -9999, 0]
	},
	{
		id: "Waterfall",
		lookupMethod: "Contains",
		position: [0, -9999, 0]
	},
	{
		id: "NeonTube",
		lookupMethod: "EndsWith",
		position: [0, -9999, 0]
	},
	{
		id: "Sun",
		lookupMethod: "EndsWith",
		position: [0, -9999, 0]
	},
	{
		id: "Mountain",
		lookupMethod: "Contains",
		position: [0, -9999, 0]
	},

	// misc

	{
		id: "DirectionalLight",
		lookupMethod: "Contains",
		rotation: [180, 0, 0]
	},
	{
		id: "WaterfallFlatClose",
		lookupMethod: "EndsWith",
		position: [0, -10, -250],
		scale: [150, 1, 10],
		rotation: [0, 0, 0]
	},

	// Player HUD
	{
		id: "EnergyPanel",
		lookupMethod: "EndsWith",
		position: [0, 7, 35],
		scale: [0.075, 0.075, 0.075],
		rotation: [-15, 0, 0]
	  },
	  {
		id: "LeftPanel",
		lookupMethod: "EndsWith",
		position: [-5.5, 6, 32.5],
		scale: [2.75, 2.75, 2.75],
		rotation: [0, 0, 0]
	  },
	  {
		id: "RightPanel",
		lookupMethod: "EndsWith",
		position: [5.5, 6, 32.5],
		scale: [2.75, 2.75, 2.75],
		rotation: [0, 0, 0]
	  }
)

map.customData.environment.push(
	{
		geometry: { type: "Sphere", material: "TransparentLight" },
		scale: [150, 2, 150],
		position: [0, -8, 0],
		rotation: [0, 0, 0],
		components: {
			ILightWithId: {
				lightID: 101,
				type: 4
			},
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 0,
				bloomFogIntensityMultiplier: 5
			}
		}
	},
)

for (let i = 4; i < 15; i++) {
	map.customData.environment.push(
		{
			id: `\\]TunnelRotatingLasersPair \\(${i}\\).\\[\\d\\]BaseL.\\[\\d\\]Laser$`,
			lookupMethod: "Regex",
			scale: [10, 12.5, 15000],
			position: [-560, 0, 3750],
			rotation: [-90, 0, 0],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 5,
					bloomFogIntensityMultiplier: 5
				},
				ILightWithId: {
					type: 6
				},
			}
		},
		{
			id: `\\]TunnelRotatingLasersPair \\(${i}\\).\\[\\d\\]BaseR.\\[\\d\\]Laser$`,
			lookupMethod: "Regex",
			scale: [10, 12.5, 15000],
			position: [560, 0, 3750],
			rotation: [-90, 0, 0],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 5,
					bloomFogIntensityMultiplier: 5
				},
				ILightWithId: {
					type: 7
				},
			}
		},
	)
}

{
	let lightIDsForRings = {};

	// Rings
	for (let j = 1; j <= 4; j++) {
		let radius = 25 + (j * 25);
		let numCubes = 120 + (j * 15);

		lightIDsForRings[j] = [];

		for (let i = 0; i < numCubes; i++) {
			let angle = (i / numCubes) * 2 * Math.PI;

			let x = radius * Math.cos(angle);
			let z = radius * Math.sin(angle);
			let y = -10;

			let rotationY = angle * (180 / Math.PI);

			let lightID = (i * numCubes) + 1 + (j * 4) + 1;

			lightIDsForRings[j].push(lightID);

			map.customData.environment.push({
				geometry: { type: "Cube", material: "OpaqueLight" },
				position: [x, y, z],
				rotation: [0, -rotationY, 0],
				scale: [1 + (j * 2), 0.5 + (j / 4), 1 + (j * 2)],
				components: {
					ILightWithId: {
						lightID: lightID,
						type: 0
					},
					TubeBloomPrePassLight: {
						colorAlphaMultiplier: 1,
						bloomFogIntensityMultiplier: 1
					}
				}
			});
		}
	}

	map.basicBeatmapEvents.forEach((event) => {
		if (event.et == 0 && event.customData) {
			if (event.customData.lightID in lightIDsForRings) {
				event.customData.lightID = lightIDsForRings[event.customData.lightID];
			}
		}
	});
}

{
    // Lines
    let radius = 175;
    let numCubes = 18;

    for (let i = 0; i < numCubes; i++) {
        let angle1 = (i / numCubes) * Math.PI + (Math.PI / 2) + 0.085
        let angle2 = -(i / numCubes) * Math.PI + (Math.PI / 2) - 0.085

        let xL = radius * Math.cos(angle1);
        let zL = radius * Math.sin(angle1);
        let xR = radius * Math.cos(angle2);
        let zR = radius * Math.sin(angle2);
        let y = 50;

        let lightID = 100 + i;

        map.customData.environment.push(
            {
                geometry: { type: "Sphere", material: "OpaqueLight" },
                position: [xL, y, zL],
                rotation: [0, 0, 0],
                scale: [1, 50, 1],
                components: {
                    ILightWithId: {
                        lightID: lightID,
                        type: 2
                    },
                    TubeBloomPrePassLight: {
                        colorAlphaMultiplier: 2,
                        bloomFogIntensityMultiplier: 2
                    }
                }
            },
            {
                geometry: { type: "Sphere", material: "OpaqueLight" },
                position: [xR, y, zR],
                rotation: [0, 0, 0],
                scale: [1, 50, 1],
                components: {
                    ILightWithId: {
                        lightID: lightID,
                        type: 3
                    },
                    TubeBloomPrePassLight: {
                        colorAlphaMultiplier: 2,
                        bloomFogIntensityMultiplier: 2
                    }
                }
            }
        );

        map.basicBeatmapEvents.forEach((x) => {
            if (x.et == 2 && x.customData) {
                if (x.customData.lightID == lightID - 100) {
                    x.customData.lightID = [lightID];
                }
            }
            if (x.et == 3 && x.customData) {
                if (x.customData.lightID == lightID - 100) {
                    x.customData.lightID = [lightID];
                }
            }
        });
    }
}

// Laser Code (yoinked from Spellbound)
{
	// effects left & right lasers
	const LaserScaleX = 5
	const LaserScaleY = 0
	const LaserScaleZ = 2.5
	const LaserBrightness = 5

	// Effects the left lasers
	const LaserLX = 0
	const LaserLY = -9.99
	const LaserLZ = 0

	const LaserLRotationX = 0
	const LaserLRotationY = 0
	const LaserLRotationZ = 0

	const LaserLSpreadX = 0
	const LaserLSpreadY = 96.75
	const LaserLSpreadZ = 0

	// Effects the right lasers
	const LaserRX = 0
	const LaserRY = -9.99
	const LaserRZ = 0

	const LaserRRotationX = 0
	const LaserRRotationY = 0
	const LaserRRotationZ = 0

	const LaserRSpreadX = 0
	const LaserRSpreadY = -96.75
	const LaserRSpreadZ = 0

	// Left Lasers

	map.customData.environment.push(
		{
			id: "BottomPairLasers\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 1.25), LaserLRotationY + (LaserLSpreadY * 1.25), LaserLRotationZ + (LaserLSpreadZ * 1.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 1.5), LaserLRotationY + (LaserLSpreadY * 1.5), LaserLRotationZ + (LaserLSpreadZ * 1.5)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 1.75), LaserLRotationY + (LaserLSpreadY * 1.75), LaserLRotationZ + (LaserLSpreadZ * 1.75)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 2), LaserLRotationY + (LaserLSpreadY * 2), LaserLRotationZ + (LaserLSpreadZ * 2)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 2.25), LaserLRotationY + (LaserLSpreadY * 2.25), LaserLRotationZ + (LaserLSpreadZ * 2.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 2.5), LaserLRotationY + (LaserLSpreadY * 2.5), LaserLRotationZ + (LaserLSpreadZ * 2.5)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 2.75), LaserLRotationY + (LaserLSpreadY * 2.75), LaserLRotationZ + (LaserLSpreadZ * 2.75)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 3), LaserLRotationY + (LaserLSpreadY * 3), LaserLRotationZ + (LaserLSpreadZ * 3)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarL$",
			lookupMethod: "Regex",
			position: [LaserLX, LaserLY, LaserLZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserLRotationX + (LaserLSpreadX * 3.25), LaserLRotationY + (LaserLSpreadY * 3.25), LaserLRotationZ + (LaserLSpreadZ * 3.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},

		// Right Lasers

		{
			id: "BottomPairLasers\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 1.25), LaserRRotationY + (LaserRSpreadY * 1.25), LaserRRotationZ + (LaserRSpreadZ * 1.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(1\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 1.5), LaserRRotationY + (LaserRSpreadY * 1.5), LaserRRotationZ + (LaserRSpreadZ * 1.5)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(2\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 1.75), LaserRRotationY + (LaserRSpreadY * 1.75), LaserRRotationZ + (LaserRSpreadZ * 1.75)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(3\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 2), LaserRRotationY + (LaserRSpreadY * 2), LaserRRotationZ + (LaserRSpreadZ * 2)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(4\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 2.25), LaserRRotationY + (LaserRSpreadY * 2.25), LaserRRotationZ + (LaserRSpreadZ * 2.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(5\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 2.5), LaserRRotationY + (LaserRSpreadY * 2.5), LaserRRotationZ + (LaserRSpreadZ * 2.5)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(6\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 2.75), LaserRRotationY + (LaserRSpreadY * 2.75), LaserRRotationZ + (LaserRSpreadZ * 2.75)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(7\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 3), LaserRRotationY + (LaserRSpreadY * 3), LaserRRotationZ + (LaserRSpreadZ * 3)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		},
		{
			id: "BottomPairLasers \\(8\\)\\.\\[\\d+\\]PillarR$",
			lookupMethod: "Regex",
			position: [LaserRX, LaserRY, LaserRZ],
			scale: [LaserScaleX, LaserScaleY, LaserScaleZ],
			rotation: [LaserRRotationX + (LaserRSpreadX * 3.25), LaserRRotationY + (LaserRSpreadY * 3.25), LaserRRotationZ + (LaserRSpreadZ * 3.25)],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: LaserBrightness,
					bloomFogIntensityMultiplier: LaserBrightness
				},
			},
		}
	)
}


//#region Geometry & Terrain

// Player Platform
for (let i = 0; i < 150; i++) {
	const z = seedRandom(-25, 25);
	const x = seedRandom(-25, 25);
	const y = seedRandom(-9.5, -10.5);

	const width = seedRandomBias(2.5, 7.5, 0.75)
	const depth = seedRandomBias(2.5, 7.5, 0.75)

	const distanceFromCenter = Math.sqrt(x * x + z * z)

	const heightIntensity = 0.75
	const rotationIntensity = 0.25

	const height = seedRandom(22, 20) - (distanceFromCenter * heightIntensity)

	const xRot = seedRandom(-0.5, 0.5) + (distanceFromCenter * rotationIntensity)
	const zRot = seedRandom(-0.5, 0.5) + (distanceFromCenter * rotationIntensity)
	const yRot = seedRandom(-30, 30)

	map.customData.environment.push({
		geometry: { type: "Cube", material: "Rock" },
		position: [x, y, z],
		scale: [width, height, depth],
		rotation: [xRot, yRot, zRot]
	});
}

// Surrounding Wall Generation
{
	const baseCubeCount = 60;

	for (let i = 0; i < baseCubeCount; i++) {

		const radius = seedRandom(200, 500)
		const detCubeCount = seedRandom(15, 50)

		let angle = (i / baseCubeCount) * 4 * Math.PI;

		let x = radius * Math.cos(angle);
		let z = radius * Math.sin(angle);

		for (let i = 0; i < detCubeCount; i++) {

			const xDev = seedRandom(-40, 40)
			const yDev = seedRandom(0, 5)
			const zDev = seedRandom(-40, 40)

			map.customData.environment.push(
				{
					geometry: { type: "Cube", material: "Rock" },
					position: [x + xDev, -40 + yDev, z + zDev],
					rotation: [seedRandom(-15, 15), seedRandom(-180, 180), seedRandom(-15, 15)],
					scale: [seedRandom(10, 30) + (radius / 15), seedRandom(-20, 10) + (radius / seedRandom(1.5, 4)), seedRandom(10, 30) + (radius / 15)]
				},
			);
		}
	}
}

// Background Spire Generation
for (let j = 0; j < 20; j++) {

	let side1 = Math.random() < 0.5 ? -1 : 1
	let side2 = Math.random() < 0.5 ? -1 : 1

	const xBase = seedRandom(200, 600) * side1
	const yBase = seedRandom(-20, -30)
	const zBase = seedRandom(200, 600) * side2

	const tall = (seedRandom(8, 15))

	for (let i = 0; i < seedRandom(25, 50); i++) {

		const x = seedRandom(-10, 10)
		const y = yBase + (i * tall)
		const z = seedRandom(-10, 10)

		const height = seedRandom(2.5, 7.5) + (i * 1.5) + (tall / 2)
		const width = seedRandom(50, 80) - (height / (tall / 1.5))
		const depth = seedRandom(50, 80) - (height / (tall / 1.5))

		const xRot = seedRandom(-30, 30) / (i * 0.5 + 0.5)
		const yRot = seedRandom(-180, 180)
		const zRot = seedRandom(-30, 30) / (i * 0.5 + 0.5)

		map.customData.environment.push(
			{
				geometry: { type: "Cube", material: "Rock" },
				position: [xBase + x, y, zBase + z],
				scale: [width, height, depth],
				rotation: [xRot, yRot, zRot]
			},
		)
	}
}

// scrapped billie mountain generation
// {
// function calculateAngle(x, z) {
// 	return Math.atan2(z, x); // calculates the angle in radians
// }

// function calculateDistance(x, z) {
// 	return Math.sqrt(x * x + z * z);
// }

// // loop to generate objects
// for (let i = 0; i < 30; i++) {
// 	const x = seedRandom(-300, 300);
// 	const z = seedRandom(-300, 300);

// 	// calculate the angle to face the center
// 	const angleToCenter = calculateAngle(x, z);

// 	// calculate distance from the center
// 	const distanceFromCenter = calculateDistance(x, z);

// 	// determine scale modifier based on distance
// 	// the further away, the larger the scale
// 	// you can adjust the multiplier (e.g., 0.01) to change how much the scale increases with distance
// 	const distanceScaleModifier = 1 + distanceFromCenter * 0.005;

// 	map.customData.environment.push(
// 		{
// 			id: "FrontMountains$",
// 			lookupMethod: "Regex",
// 			duplicate: 1,
// 			position: [x, -10, z],
// 			scale: [
// 				seedRandom(0.25, 1),
// 				seedRandom(0.1, 0.5),
// 				0.005 * distanceScaleModifier
// 			],
// 			rotation: [
// 				-90,
// 				angleToCenter * (180 / Math.PI) + seedRandom(-30, 30),
// 				seedRandom(-1, 1)
// 			]
// 		}
// 	)
// }
// }


//#endregion



/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");