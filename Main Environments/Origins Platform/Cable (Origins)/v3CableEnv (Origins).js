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
		id: "OriginsEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.00002,
				startY: -9999,
				height: 1
			},
		}
	},
	// object removal
	{
		id: "FrontLights",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "TrackMirror",
		lookupMethod: "Contains",
		active: false
	},
	// object yeet
	{
		id: "SidePS",
		lookupMethod: "Contains",
		position: [0, -9999, 0]
	},
	// misc
	{
		id: "SidePSL",
		lookupMethod: "Contains",
		position: [-25, 120, 1000],
		rotation: [-85, 0, 0],
		scale: [100, 50, 0.01],
		duplicate: 10,
		components: {
			ILightWithId: {
				type: 4
			}
		}
	},
	{
		id: "SidePSR",
		lookupMethod: "Contains",
		position: [25, -120, 1000],
		rotation: [-95, 0, 0],
		scale: [100, 50, 0.01],
		duplicate: 10,
		components: {
			ILightWithId: {
				type: 4
			}
		}
	},
	{
		id: "Construction",
		lookupMethod: "EndsWith",
		position: [0, 175, 0],
		rotation: [10, 0, 0],
		scale: [50, 5, 5]
	},
	{
		id: "Construction",
		lookupMethod: "EndsWith",
		duplicate: 1,
		position: [0, -175, 0],
		rotation: [-10, 0, 180],
		scale: [50, 5, 5]
	},
	{
		id: "Spectrograms.[0]Spectrogram",
		lookupMethod: "EndsWith",
		position: [-90, 0, 140],
		rotation: [90, 0, -15],
		scale: [1, 4, 1.5]
	},
	{
		id: "Spectrograms.[1]Spectrogram",
		lookupMethod: "EndsWith",
		position: [90, 0, 140],
		rotation: [90, 0, 15],
		scale: [1, 4, 1.5]
	},
	{
		id: "LightsTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]Laser$",
		lookupMethod: "Regex",
		scale: [1, 1.75, 5]
	},
	{
		id: "LightsTrackLaneRing\\(Clone\\)\\.\\[\\d+\\]Laser \\(\\d+\\)$",
		lookupMethod: "Regex",
		scale: [1, 1.75, 5]
	},
	{
		id: "LightsTrackLaneRing(Clone)",
		lookupMethod: "EndsWith",
		localPosition: [0, 0, 200],
		scale: [4, 4, 2]
	},
	{
		id: "t\\.\\[\\d+\\]Laser$",
		lookupMethod: "Regex",
		position: [-45, 100, 140],
		rotation: [0, 0, 0],
		scale: [10, 10, 10]
	},
	{
		id: "t\\.\\[\\d+\\]Laser \\(1\\)$",
		lookupMethod: "Regex",
		position: [-40, 100, 140],
		rotation: [0, 0, 0],
		scale: [10, 10, 10]
	},
	{
		id: "t\\.\\[\\d+\\]Laser \\(2\\)$",
		lookupMethod: "Regex",
		position: [40, 100, 140],
		rotation: [0, 0, 0],
		scale: [10, 10, 10]
	},
	{
		id: "t\\.\\[\\d+\\]Laser \\(3\\)$",
		lookupMethod: "Regex",
		position: [45, 100, 140],
		rotation: [0, 0, 0],
		scale: [10, 10, 10]
	},
)

map.customData.environment.push(
	{
		id: "RotatingLasersPair\\.\\[\\d+\\]BaseL$",
		lookupMethod: "Regex",
		position: [0, 35, 150],
		rotation: [0, 0, 180],
		scale: [8, 0.25, 5]
	},
	{
		id: "RotatingLasersPair\\.\\[\\d+\\]BaseR$",
		lookupMethod: "Regex",
		position: [0, -35, 150],
		rotation: [0, 0, 0],
		scale: [8, 0.25, 5]
	},
)

for (let i = 1; i < 5; i++) {
	map.customData.environment.push(
		{
			id: `RotatingLasersPair \\(${i}\\)\\.\\[\\d+\\]BaseL$`,
			lookupMethod: "Regex",
			position: [0, 35, 150],
			rotation: [0, 0, 180],
			scale: [8, 0.5, 8]
		},
		{
			id: `RotatingLasersPair \\(${i}\\)\\.\\[\\d+\\]BaseR$`,
			lookupMethod: "Regex",
			position: [0, -35, 150],
			rotation: [0, 0, 0],
			scale: [8, 0.5, 8]
		},
	)
}

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");