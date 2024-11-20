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
		id: "KDAEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.0002,
				startY: -100,
				height: 50
			},
		}
	},
	// object removal
	{
		id: "FloorMirror",
		lookupMethod: "EndsWith",
		active: false
	},
	{
		id: "GlowTopLine\\.\\[\\d+\\]BakedBloom$",
		lookupMethod: "Regex",
		active: false
	},
	{
		id: "GlowTopLine \\(\\d+\\)\\.\\[\\d+\\]BakedBloom$",
		lookupMethod: "Regex",
		active: false
	},
	// misc
	{
		id: `GlowLine$`,
		lookupMethod: "Regex",
		position: [seedRandom(-150,150), seedRandom(-50,-100), seedRandom(250,500)],
		rotation: [seedRandom(-40,-70), seedRandom(15,-15), seedRandom(15,-15)],
		scale: [seedRandom(2.5,5), 10000, seedRandom(2.5,5)]
	},
	{
		id: `t\\.\\[\\d+\\]Laser \\(\\d+\\)$`,
		lookupMethod: "Regex",
		scale: [3, 10, 3],
		rotation: [150, 0, 0]
	},
	{
		id: `FrontLights`,
		lookupMethod: "EndsWith",
		position: [0, -22.5, -680],
		scale: [3, 10, 15]
	},
	{
		id: `Construction`,
		lookupMethod: "EndsWith",
		position: [-15, -2.5, 10],
		rotation: [10, -30, 0],
		scale: [1.5, 2, 0.75]
	},
	{
		id: `Construction`,
		lookupMethod: "EndsWith",
		duplicate: 1,
		position: [15, -2.5, 10],
		rotation: [10, 30, 0],
		scale: [1.5, 2, 0.75]
	},
	{
		id: `TentacleLeft`,
		lookupMethod: "EndsWith",
		position: [-3, 5, 20],
		rotation: [0, 0, 180],
		scale: [1.5, 1.5, 0.75]
	},
	{
		id: `TentacleRight`,
		lookupMethod: "EndsWith",
		position: [3, 5, 20],
		rotation: [0, 0, 180],
		scale: [-1.5, 1.5, 0.75]
	},
	{
		id: `GlowTopLine`,
		lookupMethod: "EndsWith",
		position: [0, -0.75, 0],
		rotation: [90, 0, 0],
		scale: [2, 1, 1]
	},
	{
		id: `GlowTopLine (1)`,
		lookupMethod: "EndsWith",
		position: [-0.5, -0.75, 0],
		rotation: [90, 0, 0],
		scale: [2, 1, 1]
	},
	{
		id: `GlowTopLine (2)`,
		lookupMethod: "EndsWith",
		position: [0.5, -0.75, 0],
		rotation: [90, 0, 0],
		scale: [2, 1, 1]
	},
	{
		id: `GlowTopLine (3)`,
		lookupMethod: "EndsWith",
		position: [-1, -0.75, 0],
		rotation: [90, 0, 0],
		scale: [2, 1, 1]
	},
	{
		id: `GlowTopLine (4)`,
		lookupMethod: "EndsWith",
		position: [1, -0.75, 0],
		rotation: [90, 0, 0],
		scale: [2, 1, 1]
	},
	{
		geometry: { type: "Cube", material: "Black" },
		position: [-11, -3.5, 43],
		rotation: [0, 0, -45],
		scale: [5.5, 5.5, 25]
	  },
	  {
		geometry: { type: "Cube", material: "Black" },
		position: [11, -3.5, 43],
		rotation: [0, 0, -45],
		scale: [5.5, 5.5, 25]
	  },
)

for (let i = 1; i < 77; i++) {
	map.customData.environment.push(
		{
			id: `GlowLine \\(${i}\\)$`,
			lookupMethod: "Regex",
			position: [seedRandom(-150,150), seedRandom(-50,-100), seedRandom(250,500)],
			rotation: [seedRandom(-40,-70), seedRandom(15,-15), seedRandom(15,-15)],
			scale: [seedRandom(2.5,5), 10000, seedRandom(2.5,5)]
		},
	)
}

// Bridge (taken and modified from internet environment)
for (let i = 0; i < 30; i++) {

	map.customData.environment.push(
	  {
		geometry: { type: "Cube", material: "Black" },
		position: [0, -0.5, 5 + (i * 5)],
		rotation: [0, 0, 0],
		scale: [4, 0.25, 1.5]
	  },
	  {
		geometry: { type: "Cube", material: "Black" },
		position: [-2.6, -12, 5 + (i * 5)],
		rotation: [0, 45, 0],
		scale: [0.75, 25, 1.5]
	  },
	  {
		geometry: { type: "Cube", material: "Black" },
		position: [2.6, -12, 5 + (i * 5)],
		rotation: [0, -45, 0],
		scale: [0.75, 25, 1.5]
	  },
	  {
		geometry: { type: "Cylinder", material: "Black" },
		position: [0, -3, 5 + (i * 5)],
		rotation: [0, 30, 0],
		scale: [1.75, 1, 11]
	  },
	  {
		geometry: { type: "Cylinder", material: "Black" },
		position: [0, -3, 5 + (i * 5)],
		rotation: [0, -30, 0],
		scale: [1.75, 1, 11]
	  },
	);
  }
  
  map.customData.environment.push(
	{
	  geometry: { type: "Cube", material: "Black" },
	  position: [-3, -0.75, 57],
	  rotation: [0, 0, 60],
	  scale: [0.25, 1.5, 110]
	},
	{
	  geometry: { type: "Cube", material: "Black" },
	  position: [3, -0.75, 57],
	  rotation: [0, 0, -60],
	  scale: [0.25, 1.5, 110]
	},
  );

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");