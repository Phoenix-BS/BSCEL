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
				attenuation: 0.00005,
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
		id: "TopStructure",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "]Light (",
		lookupMethod: "Contains",
		active: false
	},
	// object yeet
	{
		id: "Buildings",
		lookupMethod: "EndsWith",
		position: [0, -9999, 0]
	},
	{
		id: "MainStructure",
		lookupMethod: "EndsWith",
		position: [0, -9999, 0]
	},
	// misc
	{
		id: "PairLaserTrackLaneRing(Clone)",
		lookupMethod: "EndsWith",
		position: [0, 20, 50],
		rotation: [-20, 0, 0],
		scale: [2.5, 4, 1]
	},
	{
		id: "[0]Ring",
		lookupMethod: "EndsWith",
		scale: [10, 1, 0.5]
	},
	{
		id: "LaserLF",
		lookupMethod: "EndsWith",
		scale: [2, 1.1, 4]
	},
	{
		id: "LaserRF",
		lookupMethod: "EndsWith",
		scale: [2, 1.1, 4]
	},
	{
		id: "LaserL",
		lookupMethod: "EndsWith",
		rotation: [0, 0, 0],
		scale: [2, 2, 2]
	},
	{
		id: "LaserR",
		lookupMethod: "EndsWith",
		rotation: [0, 0, 0],
		scale: [2, 2, 2]
	},
	{
		id: "GlowLineL",
		lookupMethod: "EndsWith",
		localPosition: [-1.5, 0.11, 11.1],
		scale: [15, 1, 0.25],
		components: {
			ILightWithId: {
				lightID: 101,
				type: 4
			}
		}
	},
	{
		id: "GlowLineR",
		lookupMethod: "EndsWith",
		localPosition: [1.5, 0.11, 11.1],
		scale: [15, 1, 0.25],
		components: {
			ILightWithId: {
				lightID: 102,
				type: 4
			}
		}
	},
	{
		id: "TrackConstruction",
		lookupMethod: "EndsWith",
		localPosition: [0, 0.25, -70],
		scale: [1, 0.25, 10]
	}
)

// center lights
for (let i = 0; i < 4; i++) {
map.customData.environment.push(
{
	geometry: { type: "Sphere", material: "OpaqueLight" },
	position: [0, 7, 50],
	scale: [5 - (i / 1.5), 5 - (i / 1.5), 0.25 + (i / 10)],
	components: {
		ILightWithId: {
			lightID: 111 + i,
			type: 4
		},
		TubeBloomPrePassLight: {
			colorAlphaMultiplier: 1,
			bloomFogIntensityMultiplier: 1
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

const dupeCount = 20
const rotCount = 4

for (let i = 0; i < dupeCount; i++) {
	for (let j = 0; j < rotCount; j++) {
	map.customData.environment.push(
		{
			id: "Buildings",
			lookupMethod: "EndsWith",
			duplicate: 1,
			position: [0, 4.5, 50 + (i * 25)],
			rotation: [90, 0, j * (360 / rotCount)],
			scale: [5, 1, 0.5]
		},
		{
			id: "MainStructure",
			lookupMethod: "EndsWith",
			duplicate: 1,
			position: [0, 120, 50 + (i * 25)],
			rotation: [15, 0, j * (360 / rotCount)],
			scale: [6, 6, 6]
		}
	)
}
}

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");