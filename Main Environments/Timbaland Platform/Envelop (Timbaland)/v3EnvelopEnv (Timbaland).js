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
};

map.customData.environment.push(
	{
		id: "TimbalandEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.0005,
				startY: -125,
				height: 10
			},
		}
	},
	// object removal
	{
		id: "TimbalandLogo",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Ring$",
		lookupMethod: "Regex",
		active: false
	},
	{
		id: "]Light (",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Buildings",
		lookupMethod: "EndsWith",
		active: false
	},
	{
		id: "TrackMirror",
		lookupMethod: "EndsWith",
		active: false
	},
	{
		id: "TrackConstruction",
		lookupMethod: "EndsWith",
		position: [0, -0.05, -9],
		scale: [1, 1, 2]
	},
	// object yeet
	{
		id: "Structure",
		lookupMethod: "Contains",
		position: [0, -9999, 0]
	},
	// misc
	{
		id: "PairLaserTrackLaneRing(Clone)",
		lookupMethod: "EndsWith",
		position: [0, 0, 120],
		rotation: [0, 0, 0],
		scale: [4, 4, 2]
	},
	{
		id: "DirectionalLight",
		lookupMethod: "EndsWith",
		rotation: [90, 0, 0],
	},
)

// center lights
for (let i = 0; i < 4; i++) {
	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [0, 0, 200],
			scale: [25 - (i * 5), 25 - (i * 5), 0.25 + (i / 10)],
			rotation: [0, 0, 45],
			components: {
				ILightWithId: {
					lightID: 111 + i,
					type: 4
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 3,
					bloomFogIntensityMultiplier: 1.5
				}
			}
		}
	)
}

map.basicBeatmapEvents.forEach((x) => {
	if (x.et == 4 && x.customData) {
		if (x.customData.lightID == 1) {
			x.customData.lightID = 101
		}
		if (x.customData.lightID == 2) {
			x.customData.lightID = 102
		}
		if (x.customData.lightID == 3) {
			x.customData.lightID = 111
		}
		if (x.customData.lightID == 4) {
			x.customData.lightID = 112
		}
		if (x.customData.lightID == 5) {
			x.customData.lightID = 113
		}
		if (x.customData.lightID == 6) {
			x.customData.lightID = 114
		}
	}
}
);

const dupeCount = 30
const rotCount = 5

for (let i = 0; i < dupeCount; i++) {
	for (let j = 0; j < rotCount; j++) {
		map.customData.environment.push(
			{
				id: "MainStructure",
				lookupMethod: "EndsWith",
				duplicate: 1,
				position: [0, 0, -40 + (i * 40)],
				rotation: [0, 0, j * (360 / rotCount)],
				scale: [6 - (i * 0.1), 6 - (i * 0.1), 6]
			},
			{
				id: "TopStructure",
				lookupMethod: "EndsWith",
				duplicate: 1,
				position: [0, -20, 250 + (i * 5)],
				rotation: [15, j * (360 / rotCount), 0],
				scale: [12 + i, 6, 1]
			},
			{
				id: "TopStructure",
				lookupMethod: "EndsWith",
				duplicate: 1,
				position: [0, 20, 250 + (i * 5)],
				rotation: [-15, j * (360 / rotCount), 180],
				scale: [12 + i, 6, 1]
			}
		)
	}
}

// re-used code from koven

map.customData.environment.push(
	{
		"id": "LaserL$",
		"lookupMethod": "Regex",
		"localPosition": [
			12,
			-10.799999999999999,
			66
		],
		"localRotation": [
			87.5,
			0,
			0
		],
		"scale": [
			2,
			2,
			2
		]
	},
	{
		"id": "LaserR$",
		"lookupMethod": "Regex",
		"localPosition": [
			-12,
			13.2,
			66
		],
		"localRotation": [
			-87.5,
			0,
			0
		],
		"scale": [
			2,
			2,
			2
		]
	},
	{
		"id": "RotatingLasersPair$",
		"lookupMethod": "Regex",
		"position": [
			0,
			0,
			100
		],
		"rotation": [
			0,
			0,
			0
		],
		"scale": [
			0.33,
			0.33,
			5
		]
	},
	{
		"id": "LaserLF$",
		"lookupMethod": "Regex",
		"localPosition": [
			-16.2,
			0,
			30
		],
		"localRotation": [
			90,
			0,
			90
		],
		"scale": [
			6,
			0.25,
			25
		]
	},
	{
		"id": "LaserRF$",
		"lookupMethod": "Regex",
		"localPosition": [
			16.2,
			0,
			30
		],
		"localRotation": [
			-90,
			0,
			-90
		],
		"scale": [
			6,
			0.25,
			25
		]
	},
)

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");