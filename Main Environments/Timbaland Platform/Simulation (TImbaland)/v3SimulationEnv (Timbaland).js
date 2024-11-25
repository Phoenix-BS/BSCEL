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

map.customData.environment.push(
	{
		id: "TimbalandEnvironment.[0]Environment",
		lookupMethod: "Exact",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.002,
				startY: -9999
			},
		}
	},
	{
		id: "BasicGameHUD",
		lookupMethod: "EndsWith",
		position: [0, 0.5, 7],
		scale: [1, 1.55, 0.25]
	},
	{
		id: "EnergyPanel",
		lookupMethod: "EndsWith",
		position: [0, -0.5, 4.96]
	},
	// object removal
	{
		id: "Structure",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "TimbalandLogo",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Spectrogram",
		lookupMethod: "Contains",
		active: false
	},
	// misc
	{
		id: "BigSmokePS",
		lookupMethod: "EndsWith",
		scale: [10, 10, 150]
	},
	{
		id: "NearBuildingRight",
		lookupMethod: "EndsWith",
		position: [3, -21.5, 27],
		rotation: [-5, -90, 90],
		scale: [0.75, 0.8, 0.295]
	},
	{
		id: "NearBuildingLeft",
		lookupMethod: "EndsWith",
		position: [-3, -21.5, 27],
		rotation: [5, -90, 90],
		scale: [-0.75, 0.8, -0.295]
	},
	{
		id: "Light (4)",
		lookupMethod: "EndsWith",
		position: [-13, 8, 120],
		rotation: [0, 0, 45],
		scale: [15, 6, 1],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 0.5
			}
		}
	},
	{
		id: "Light (5)",
		lookupMethod: "EndsWith",
		position: [13, 8, 120],
		rotation: [0, 0, -45],
		scale: [15, 6, 1],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 0.5
			}
		}
	},
	{
		id: "Light (6)",
		lookupMethod: "EndsWith",
		position: [-13, 10, 120],
		rotation: [0, 0, -30],
		scale: [15, 7.67, 1],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 0.5
			}
		}
	},
	{
		id: "Light (6)",
		lookupMethod: "EndsWith",
		duplicate: 1,
		position: [13, 10, 120],
		rotation: [0, 0, 30],
		scale: [15, 7.67, 1],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 0.5
			},
			ILightWithId: {
				lightID: 110,
				type: 4
			},
		}
	},
	{
		id: "PairLaserTrackLaneRing(Clone)",
		lookupMethod: "EndsWith",
		scale: [1.85, 1.85, 1.85]
	},
	{
		id: "PairLaserTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]LaserLF$",
		lookupMethod: "Regex",
		scale: [2.5, 2.2, 2.5]
	},
	{
		id: "PairLaserTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]LaserRF$",
		lookupMethod: "Regex",
		scale: [2.5, 2.2, 2.5]
	},
)

map.basicBeatmapEvents.forEach((x) => {
	if (x.et == 4 && x.customData) {
		if (x.customData.lightID == 6) {
			x.customData.lightID = 110
		}
	}
}
)

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");