"use strict";

const fs = require("fs");
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

// Geometry Material List
map.customData.materials = {
	"OpaqueLight": {
		shader: "OpaqueLight"
	},
	"Black": {
		shader: "Standard",
		color: [0.15, 0.15, 0.15]
	}
};

const lerp = (a, b, t) => (b - a) * t + a;
const lerpArr = (a, b, t) => a.map((x, i) => lerp(x, b[i], t))

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

const seedRandom = seededRandom(1)
const seedRandomBias = seededRandomBias(1)

map.customData.environment.push(
	{
		id: "RocketEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.0003,
				startY: -40,
				height: 25
			},
		}
	},
	// object removal
	{
		id: "Mirror",
		lookupMethod: "EndsWith",
		active: false
	},
	{
		id: "Shadow",
		lookupMethod: "EndsWith",
		active: false
	},
	{
		id: "GateLight",
		lookupMethod: "Contains",
		active: false
	},
	// misc
	{
		id: `RocketCarL`,
		lookupMethod: "EndsWith",
		position: [5, 0, 0],
		rotation: [0, -15, 0],
		scale: [-1.5, 0.05, 3]
	},
	{
		id: `RocketCarR`,
		lookupMethod: "EndsWith",
		position: [-5, 0, 0],
		rotation: [0, 15, 0],
		scale: [1.5, 0.05, 3]
	},
	{
		id: `RotatingLasersPair`,
		lookupMethod: "Contains",
		scale: [0.05, 10, 0.05]
	},
	{
		id: `Construction`,
		lookupMethod: "EndsWith",
		rotation: [0, 0, 0],
		scale: [1, 1.5, 5]
	},
	{
		id: `RocketArena`,
		lookupMethod: "EndsWith",
		position: [0, 0, 60],
		rotation: [-90, 0, 180],
		scale: [0.75, 3, 1.5]
	},
	{
		id: `RocketArena`,
		lookupMethod: "EndsWith",
		duplicate: 1,
		position: [0, 0, 60],
		rotation: [-90, 0, 180],
		scale: [-0.75, 3, 1.5]
	},
	{
		id: `EnvLight0`,
		lookupMethod: "Contains",
		position: [0, 0, 60],
		rotation: [0, 0, 0],
		scale: [1, 5, 1]
	},
	{
		id: `RocketArenaLight`,
		lookupMethod: "Contains",
		position: [0, -5, 120],
		rotation: [-90, 0, 0],
		scale: [0.8, 5, 10]
	},
	{
		id: `FrontLights`,
		lookupMethod: "EndsWith",
		position: [0, -150, -680],
		scale: [23, 75, 20]
	},
)

for (let i = 7; i < 14; i++) {
	map.customData.environment.push(
		{
			id: `RotatingLasersPair (${i}).[0]BaseL`,
			lookupMethod: "EndsWith",
			position: [-16 + i, 0, 10 + (i * 5)],
			scale: [500, 50, 500]
		},
		{
			id: `RotatingLasersPair (${i}).[1]BaseR`,
			lookupMethod: "EndsWith",
			position: [16 - i, 0, 10 + (i * 5)],
			scale: [500, 50, 500]
		},
	)
}

for (let i = 0; i < 4; i++) {
	map.customData.environment.push(
		{
			id: `GlowLineL (${i + 2})`,
			lookupMethod: "EndsWith",
			position: [-30 + (i * 20), 50, 100],
			rotation: [-30, 15 - (i * 10), 0],
			scale: [15, 15, 15],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 5
				}
			}
		},
		{
			id: `GlowLineL (${i + 6})`,
			lookupMethod: "EndsWith",
			position: [-75 + (i * 50), 80, 150],
			rotation: [-70, 15 - (i * 10), 0],
			scale: [75, 15, 15],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 50
				}
			}
		},
	)
}

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");