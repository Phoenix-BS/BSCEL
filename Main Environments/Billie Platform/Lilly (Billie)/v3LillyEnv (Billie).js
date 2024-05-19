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
// Lake Mirror Default = 2
const seedRandom = seededRandom(2)
const seedRandomBias = seededRandomBias(2)

// Geometry Material List
map.customData.materials = {
	"Rock": {
		shader: "Standard",
		color: [0.2, 0.2, 0.2]
	},
	"Star": {
		shader: "Standard",
		shaderKeywords: [],
		color: [0.7, 0.9, 1]
	},
	"Cloud": {
		shader: "InterscopeConcrete",
		color: [0.7, 0.7, 0.7]
	},
	"OpaqueLight": {
		shader: "OpaqueLight"
	},
	"TransparentLight": {
		shader: "TransparentLight"
	}
};

//#region Gradient Lights (ty swifter <3)

// Sky gradient control panel
const SKYLIGHT_AMOUNT = 130 // < light count
const SKYLIGHT_OFFSET = 0
const SKYLIGHT_DISTANCE = 80
const SKYLIGHT_ID = 1000
const SKYLIGHT_TYPE = 4

function darkenEdges(x, h) {
	const j = x - 0.5
	const k = j * j * 4
	return 1 - Math.pow(k, h)
}

for (let i = 0; i < SKYLIGHT_AMOUNT; i++) {
	const fraction = i / (SKYLIGHT_AMOUNT - 1)

	const angle = (fraction - 0.5) * Math.PI + SKYLIGHT_OFFSET

	const y = Math.sin(angle) * SKYLIGHT_DISTANCE
	const z = Math.cos(angle) * SKYLIGHT_DISTANCE

	map.customData.environment.push({
		geometry: { type: "Cube", material: "TransparentLight" },
		position: [0, y, z],
		rotation: [0, 0, 90],
		scale: [0, 69420, 0],
		track: "skylight",
		components: {
			ILightWithId: {
				lightID: SKYLIGHT_ID + i,
				type: SKYLIGHT_TYPE
			},
			TubeBloomPrePassLight: {
				bloomFogIntensityMultiplier: 10
			}
		}
	})
}

let lastSkylight = undefined

const makeStatic = (e) => { e.i = 1 } // static

// takes the last skylight function and applies it again
function bufferSkylight(beat, e) {
	if (!lastSkylight) throw "You haven't set any skylight yet, so there is no 'last' skylight"

	setSkylight(beat, lastSkylight, event => {
		makeStatic(event)
		if (e) e(event)
	})
}

function turnOffSkylight(beat, e) {
	setSkylight(beat, () => [0, 0, 0], e)
}

function setSkylight(beat, fn, e) {
	lastSkylight = fn

	for (let i = 0; i < SKYLIGHT_AMOUNT; i++) {
		const fraction = i / (SKYLIGHT_AMOUNT - 1)
		const col = fn(1 - fraction)

		const event = {
			b: beat,
			et: SKYLIGHT_TYPE,
			i: 4, // transition
			f: 1,
			customData: {
				color: col,
				lightID: SKYLIGHT_ID + i,
			}
		}
		if (e) e(event)
		map.basicBeatmapEvents.push(event)
	}
}

// Color Presets

function lakeDim(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.1020, 0.0784, 0.3569];
	const col3 = [0.4275, 0.1569, 0.5176];
	const col4 = [0.4824, 0.2941, 0.0314];
	const col5 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.2300) {
		const fraction = (t - 0.0000) * 4.3478;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.2300 && t <= 0.4600) {
		const fraction = (t - 0.2300) * 4.3478;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.4600 && t <= 0.4900) {
		const fraction = (t - 0.4600) * 33.3333;
		return mix(col3, col4, fraction);
	}

	// col4 to col5
	if (t >= 0.4900 && t <= 0.5600) {
		const fraction = (t - 0.4900) * 14.2857;
		return mix(col4, col5, fraction);
	}

	// col5 to edge
	return col5;
}

function lakeNight(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.0392, 0.0471, 0.1412];
	const col3 = [0.1843, 0.0745, 0.3569];
	const col4 = [0.0000, 0.0000, 0.0000];

	// edge to col1
	if (t < 0.1500)
		return col1;

	// col1 to col2
	if (t >= 0.1500 && t <= 0.4200) {
		const fraction = (t - 0.1500) * 3.7037;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.4200 && t <= 0.5000) {
		const fraction = (t - 0.4200) * 12.5000;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.5000 && t <= 0.5700) {
		const fraction = (t - 0.5000) * 14.2857;
		return mix(col3, col4, fraction);
	}

	// col4 to edge
	return col4;
}

function lakeSunrise(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.4118, 0.6196, 0.8275];
	const col3 = [0.7176, 0.4549, 0.8863];
	const col4 = [1.0000, 0.5373, 0.0000];
	const col5 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.2800) {
		const fraction = (t - 0.0000) * 3.5714;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.2800 && t <= 0.3800) {
		const fraction = (t - 0.2800) * 10.0000;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.3800 && t <= 0.4300) {
		const fraction = (t - 0.3800) * 20.0000;
		return mix(col3, col4, fraction);
	}

	// col4 to col5
	if (t >= 0.4300 && t <= 0.5000) {
		const fraction = (t - 0.4300) * 14.2857;
		return mix(col4, col5, fraction);
	}

	// col5 to edge
	return col5;
}

function lakeSunrise2(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.4392, 0.2824, 0.7412];
	const col3 = [0.6000, 0.5255, 0.1059];
	const col4 = [1.0000, 0.8039, 0.0000];
	const col5 = [0.8824, 0.5882, 0.0941];
	const col6 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.3500) {
		const fraction = (t - 0.0000) * 2.8571;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.3500 && t <= 0.4400) {
		const fraction = (t - 0.3500) * 11.1111;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.4400 && t <= 0.5300) {
		const fraction = (t - 0.4400) * 11.1111;
		return mix(col3, col4, fraction);
	}

	// col4 to col5
	if (t >= 0.5300 && t <= 0.5900) {
		const fraction = (t - 0.5300) * 16.6667;
		return mix(col4, col5, fraction);
	}

	// col5 to col6
	if (t >= 0.5900 && t <= 0.7100) {
		const fraction = (t - 0.5900) * 8.3333;
		return mix(col5, col6, fraction);
	}

	// col6 to edge
	return col6;
}

function lakeBurst(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.0902, 0.1333, 0.5333];
	const col3 = [1.0000, 0.5843, 0.0000];
	const col4 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.4200) {
		const fraction = (t - 0.0000) * 2.3810;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.4200 && t <= 0.4800) {
		const fraction = (t - 0.4200) * 16.6667;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.4800 && t <= 0.5900) {
		const fraction = (t - 0.4800) * 9.0909;
		return mix(col3, col4, fraction);
	}

	// col4 to edge
	return col4;
}

function lakeRainbow(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.3059, 0.3059, 0.3059];
	const col2 = [0.9490, 0.6000, 1.0000];
	const col3 = [0.8078, 0.8941, 1.0000];
	const col4 = [1.0000, 0.6706, 0.0000];
	const col5 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.1400) {
		const fraction = (t - 0.0000) * 7.1429;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.1400 && t <= 0.3700) {
		const fraction = (t - 0.1400) * 4.3478;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.3700 && t <= 0.4100) {
		const fraction = (t - 0.3700) * 25.0000;
		return mix(col3, col4, fraction);
	}

	// col4 to col5
	if (t >= 0.4100 && t <= 0.5700) {
		const fraction = (t - 0.4100) * 6.2500;
		return mix(col4, col5, fraction);
	}

	// col5 to edge
	return col5;
}

function lakeSunset(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.9412, 0.3843, 0.9333];
	const col3 = [1.0000, 0.5412, 0.0000];
	const col4 = [0.0000, 0.0000, 0.0000];

	// edge to col1
	if (t < 0.0600)
		return col1;

	// col1 to col2
	if (t >= 0.0600 && t <= 0.4300) {
		const fraction = (t - 0.0600) * 2.7027;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.4300 && t <= 0.4800) {
		const fraction = (t - 0.4300) * 20.0000;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.4800 && t <= 0.5900) {
		const fraction = (t - 0.4800) * 9.0909;
		return mix(col3, col4, fraction);
	}

	// col4 to edge
	return col4;
}

// Always generates events as transition events
// function setSkylight(time, color preset (see above))
// bufferSkylight(time) < takes the previous color in the list, useful for maintaining color gradient
// turnOffSkylight(time) < sets black events at designated time

// Lake Mirror gradient data
// turnOffSkylight(0)
// bufferSkylight(36)
// setSkylight(36.25, lakeDim)
// bufferSkylight(164)
// setSkylight(164.25, lakeNight)
// bufferSkylight(200)
// setSkylight(227.75, lakeDim)
// turnOffSkylight(228)
// bufferSkylight(260)
// setSkylight(260.25, lakeNight)
// bufferSkylight(292)
// turnOffSkylight(298)
// bufferSkylight(323.66)
// setSkylight(324, lakeSunrise)
// bufferSkylight(372)
// setSkylight(387, lakeSunrise2)
// turnOffSkylight(388)
// bufferSkylight(395.5)
// for (let i = 0; i < 4; i++) {
// 	setSkylight(396 + (i * 16), lakeBurst),
// 		bufferSkylight(404 + (i * 16)),
// 		turnOffSkylight(404.5 + (i * 16)),
// 		bufferSkylight(411.5 + (i * 16))
// }
// setSkylight(468, lakeNight)
// turnOffSkylight(469)
// bufferSkylight(531.25)
// setSkylight(532, lakeNight)
// bufferSkylight(588)
// turnOffSkylight(594)
// bufferSkylight(596)
// setSkylight(597, lakeRainbow)
// bufferSkylight(723)
// turnOffSkylight(723.75)
// setSkylight(724, lakeDim)
// bufferSkylight(786)
// setSkylight(788, lakeSunrise)
// setSkylight(800, lakeSunset)
// bufferSkylight(964)
// setSkylight(990, lakeDim)
// bufferSkylight(1032)
// turnOffSkylight(1032.05)

//#endregion

map.customData.environment.push(
	{
		id: "BillieEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.00003,
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
	{
		id: "Mountain",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "TunnelRotatingLasersPair",
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

	// misc

	{
		id: "DirectionalLight",
		lookupMethod: "Contains",
		rotation: [180, 0, 0]
	},
	{
		id: "WaterfallFlatClose",
		lookupMethod: "EndsWith",
		position: [-80, -1, -20],
		scale: [50, 1, 6.9],
		rotation: [0, 30, 0]
	},
	{
		id: "Sun",
		lookupMethod: "EndsWith",
		position: [80, 180, 1500],
		scale: [100, 100, 100],
		track: "SunTrack",
		components: {
			ILightWithId: {
				lightID: 101,
				type: 4
			},
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 1,
				bloomFogIntensityMultiplier: 1
			}
		}
	},
	{
		id: "Sun\\.\\[\\d+\\]NeonTube \\(1\\)$",
		lookupMethod: "Regex",
		position: [80, 180, 1490],
		rotation: [0, 0, -10],
		scale: [0.3 + 1, 0.5 + 3, 0.25],
		components: {
			ILightWithId: {
				lightID: 102,
				type: 4
			},
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 10
			}
		}
	},
	{
		id: "Sun\\.\\[\\d+\\]NeonTube \\(2\\)$",
		lookupMethod: "Regex",
		position: [80, 180, 1490],
		rotation: [0, 0, -10],
		scale: [0.2 + 1, 1.5 + 3, 0.25],
		components: {
			ILightWithId: {
				lightID: 103,
				type: 4
			},
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 10
			}
		}
	},
	{
		id: "Sun\\.\\[\\d+\\]NeonTube \\(3\\)$",
		lookupMethod: "Regex",
		position: [80, 180, 1490],
		rotation: [0, 0, -10],
		scale: [0.1 + 1, 2.5 + 3, 0.25],
		components: {
			ILightWithId: {
				lightID: 104,
				type: 4
			},
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 10
			}
		}
	},
)

// Assigns sun lightID's
map.basicBeatmapEvents.forEach((x) => {
	if (x.et == 4 && x.customData) {
		if (x.customData.lightID == 1) {
			x.customData.lightID = [101, 102, 103, 104];
		}
	}
}
)

// Star Object Generation
for (let i = 0; i < 300; i++) {
	map.customData.environment.push(
		{
			geometry: { type: "Sphere", material: "Star" },
			position: [0, -9999, 0],
			track: `Star${i}`,
		},
	)
}

// Cloud Generation
const cloudCount = 6
const cloudBubbleCount = 8
for (let i = 0; i < cloudCount; i++) {
	const xPos = seedRandom(-700, 700)
	const yPos = seedRandom(300, 700)
	const zPos = seedRandom(-150, 1000)

	const xRot = seedRandom(-20, 20)
	const yRot = seedRandom(-10, 10)
	const zRot = seedRandom(-10, 10)
	for (let j = 0; j < cloudBubbleCount; j++) {
		const xDev = seedRandom(-100, 100)
		const yDev = seedRandom(-20, 20)
		const zDev = seedRandom(-20, 20)

		const xScale = seedRandom(120, 180)
		const yScale = seedRandom(50, 100)
		const zScale = seedRandom(50, 100)

		const rotDev = seedRandom(-15, 15)
		map.customData.environment.push(
			{
				geometry: { type: "Sphere", material: "Cloud" },
				position: [xPos + xDev, yPos + yDev, zPos + zDev],
				rotation: [xRot + rotDev, yRot + rotDev, zRot],
				scale: [xScale, yScale, zScale],
				track: `Cloud_${i}_${j}`,
			},
		)
		// Cloud Rise Animation
		// map.customData.customEvents.push(
		// 	{
		// 		b: 0,
		// 		t: "AnimateTrack",
		// 		d: {
		// 			track: `Cloud_${i}_${j}`,
		// 			duration: 6,
		// 			localPosition: [[xPos + xDev, yPos + yDev, zPos + zDev, 0], [xPos + xDev, yPos + yDev + 1500, zPos + zDev, 1, "easeInSine"]]
		// 		}
		// 	},
		// )
	}
}

//#region Terrain Generation

// Player Platform

for (let i = 0; i < 100; i++) {

	const xPos = seedRandom(7, 20)
	const yPos = seedRandom(-2, -1.6)
	const zPos = seedRandom(0, 100)

	const xRot = seedRandom(-1, 1)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-1, 1)

	const xScale = seedRandomBias(5, 25, 0.5)
	const yScale = seedRandomBias(2.5, 3.5, 3)
	const zScale = seedRandomBias(5, 25, 0.5)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos + (zPos / 3), yPos, zPos],
			scale: [xScale, yScale, zScale],
			rotation: [xRot, yRot, zRot]
		},
	)
}

// Right Slope

for (let i = 0; i < 200; i++) {

	const xPos = seedRandom(20, 160)
	const yPos = seedRandom(-2, 0)
	const zPos = seedRandom(-20, 120)

	const xRot = seedRandom(-1, 1)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-1, 1)

	const xScale = seedRandomBias(5, 25, 0.5)
	const yScale = seedRandomBias(3, 6, 3)
	const zScale = seedRandomBias(5, 25, 0.5)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos + (zPos / 4.25), yPos, zPos],
			scale: [xScale + (xPos / 5), yScale + (zPos / 5), zScale + (xPos / 5)],
			rotation: [xRot * (xPos / 8), yRot, zRot * (xPos / 8)]
		},
	)
}

// Left Slope

for (let i = 0; i < 500; i++) {

	const xPos = seedRandom(-120, -500)
	const yPos = seedRandom(-6, -2)
	const zPos = seedRandom(-120, 500)

	const xRot = seedRandom(70, 50)
	const yRot = seedRandom(-90, -60)
	const zRot = seedRandom(-5, 5)

	const xScale = seedRandomBias(25, 75, 0.25)
	const yScale = seedRandomBias(25, 200, 3)
	const zScale = seedRandomBias(15, 30, 5)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos, yPos - (xPos / 40), zPos],
			scale: [xScale, yScale, zScale - (xPos / 10)],
			rotation: [xRot - (xPos / 10), yRot, zRot * (zPos / 15)]
		},
	)
}

// Back Mountain Cover

for (let i = 0; i < 200; i++) {

	const xPos = seedRandom(-50, 240)
	const yPos = seedRandom(-2, 0)
	const zPos = seedRandom(-20, -15)

	const xRot = seedRandom(-20, -30)
	const yRot = seedRandom(-10, 10)
	const zRot = seedRandom(-1, 1)

	const xScale = seedRandomBias(2.5, 15, 0.75)
	const yScale = seedRandom(30, 50)
	const zScale = seedRandomBias(2.5, 15, 0.75)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos, yPos, zPos],
			scale: [xScale - (xPos / 120), yScale + (xPos / 2), zScale - (xPos / 120)],
			rotation: [xRot, yRot + (xPos / 5), zRot]
		},
	)
}

// Right Mountain Cover

for (let i = 0; i < 300; i++) {

	const xPos = seedRandom(120, 140)
	const yPos = seedRandom(-2, 0)
	const zPos = seedRandom(-60, 300)

	const xRot = seedRandom(20, 30)
	const yRot = seedRandom(40, 60)
	const zRot = seedRandom(-5, 5)

	const xScale = seedRandomBias(7.5, 10, 0.75)
	const yScale = seedRandom(55, 60)
	const zScale = seedRandomBias(7.5, 10, 0.75)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos, yPos, zPos],
			scale: [xScale - (xPos / 120), yScale + (xPos / 3), zScale - (xPos / 120)],
			rotation: [xRot, yRot + (xPos / 5), zRot + (xPos / 4)]
		},
	)
}

// Background Spire

for (let i = 0; i < 300; i++) {

	const xPos = seedRandom(-40, 40)
	const yPos = seedRandom(-10, 140)
	const zPos = seedRandom(400, 450)

	const xRot = seedRandom(-60, 60)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-60, 60)

	const xScale = seedRandomBias(15, 40, 2)
	const yScale = seedRandom(50, 100)
	const zScale = seedRandomBias(15, 40, 2)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos / (yPos / 32.5) - 50, yPos, zPos],
			scale: [xScale, yScale + (yPos / 3), zScale],
			rotation: [xRot / (yPos / 6), yRot, zRot / (yPos / 6)]
		},
	)
}

// Tree Function
function EpicTree(xPos, yPos, zPos, width, height, leafDev) {
	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos, yPos, zPos],
			scale: [width, height, width]
		},
	)

	for (let i = 1; i < seedRandom(15, 20); i++) {
		map.customData.environment.push(
			{
				geometry: { type: "Cube", material: "Rock" },
				position: [xPos, yPos + (height / 2) - (i * leafDev), zPos],
				rotation: [seedRandom(-5, 5), seedRandom(-180, 180), seedRandom(-5, 5)],
				scale: [width * (i / 2.5) + (width * 1.6), height / seedRandom(25, 50), width * (i / 2.5) + (width * 1.6)]
			}
		)
	}
}

// Tree Right
for (let i = 1; i < 9; i++) {
	EpicTree(
		seedRandom(33, 120),
		seedRandom(10, 30),
		seedRandom(-15, 150),
		seedRandom(2, 3),
		seedRandom(50, 100),
		seedRandom(1, 2.25)
	)
}

// Tree Left
for (let i = 1; i < 17; i++) {
	EpicTree(
		seedRandom(-100, -230),
		seedRandom(10, 20),
		seedRandom(-70, 550),
		seedRandom(2.5, 4.5),
		seedRandom(80, 160),
		seedRandom(1.75, 2.25)
	)
}

//#endregion

// Flower but awesome????
function FlowerLight(x, y, z, width, rot, type, lightID) {
	map.customData.environment.push(
		// Base lilypad
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 0 + rot, 0],
			scale: [width, 0.2, width / 3],
			components: {
				ILightWithId: {
					lightID: 101,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.55,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 72 + rot, 0],
			scale: [width, 0.2, width / 3],
			components: {
				ILightWithId: {
					lightID: 102,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.55,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 144 + rot, 0],
			scale: [width, 0.2, width / 3],
			components: {
				ILightWithId: {
					lightID: 103,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.55,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 216 + rot, 0],
			scale: [width, 0.2, width / 3],
			components: {
				ILightWithId: {
					lightID: 104,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.55,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 288 + rot, 0],
			scale: [width, 0.2, width / 3],
			components: {
				ILightWithId: {
					lightID: 105,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.55,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		// Flower Bloom
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [-60, 0 + rot, 0],
			scale: [seedRandom(1.7, 2), 1.5, 0.25],
			components: {
				ILightWithId: {
					lightID: 111,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.66,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [-60, 72 + rot, 0],
			scale: [seedRandom(1.7, 2), 1.5, 0.25],
			components: {
				ILightWithId: {
					lightID: 112,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.66,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [-60, 144 + rot, 0],
			scale: [seedRandom(1.7, 2), 1.5, 0.25],
			components: {
				ILightWithId: {
					lightID: 113,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.66,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [-60, 216 + rot, 0],
			scale: [seedRandom(1.7, 2), 1.5, 0.25],
			components: {
				ILightWithId: {
					lightID: 114,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.66,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		{
			geometry: { type: "Cube", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [-60, 288 + rot, 0],
			scale: [seedRandom(1.7, 2), 1.5, 0.25],
			components: {
				ILightWithId: {
					lightID: 115,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 0.66,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		// Flower Bulb
		{
			geometry: { type: "Sphere", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 0, 0],
			scale: [0.5, 1.5, 0.5],
			components: {
				ILightWithId: {
					lightID: 130,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 2,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
		// Flower Bulb the sequel
		{
			geometry: { type: "Cylinder", material: "OpaqueLight" },
			position: [x, y, z],
			rotation: [0, 0, 0],
			scale: [1.25, 0.425, 1.25],
			components: {
				ILightWithId: {
					lightID: 120,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 1,
					bloomFogIntensityMultiplier: 0.5
				}
			}
		},
	)
	map.basicBeatmapEvents.forEach((x) => {
		if (x.et == type && x.customData) {
			if (x.customData.lightID == lightID) {
				x.customData.lightID = [101, 102, 103, 104, 105];
			}
			if (x.customData.lightID == lightID + 1) {
				x.customData.lightID = [111, 112, 113, 114, 115];
			}
			if (x.customData.lightID == lightID + 2) {
				x.customData.lightID = 120;
			}
			if (x.customData.lightID == lightID + 3) {
				x.customData.lightID = 130;
			}
		}
	}
	)
}

// FlowerLight(xPosition, yPosition, zPosition, x / z scale, rotation, environment type, lightID)
FlowerLight(-2, -1, 14, 3, seedRandom(-180, 180), 0, 1)
FlowerLight(-5, -1, 25, 4.5, seedRandom(-180, 180), 1, 1)
FlowerLight(2.5, -1, 42, 4, seedRandom(-180, 180), 6, 1)
FlowerLight(-3, -1, 49, 4, seedRandom(-180, 180), 7, 1)

// Pole thingies?
for (let i = 1; i < 19; i++) {
	map.customData.environment.push(
		{
			geometry: { type: "Cylinder", material: "TransparentLight" },
			position: [-70 + (i * 2), 0, 50 + (i * 12.5)],
			rotation: [10 + i, 0, -10],
			scale: [0.9, 50 - (i * 2.5), 0.9],
			components: {
				ILightWithId: {
					lightID: 100 + i,
					type: 2
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 1,
					bloomFogIntensityMultiplier: 1
				}
			}
		},
	)
	map.basicBeatmapEvents.forEach((x) => {
		if (x.et == 2 && x.customData) {
			if (x.customData.lightID == i) {
				x.customData.lightID = 100 + i;
			}
		}
	}
	)
}

// Laser Code (yoinked from Spellbound)
{
	// effects left & right lasers
	const LaserScaleX = 75
	const LaserScaleY = 25
	const LaserScaleZ = 25
	const LaserBrightness = 1.5

	// Effects the left lasers
	const LaserLX = -250
	const LaserLY = 0
	const LaserLZ = 850

	const LaserLRotationX = 70
	const LaserLRotationY = 120
	const LaserLRotationZ = 90

	const LaserLSpreadX = 30
	const LaserLSpreadY = 0
	const LaserLSpreadZ = 0

	// Effects the right lasers
	const LaserRX = 450
	const LaserRY = 0
	const LaserRZ = 700

	const LaserRRotationX = -75
	const LaserRRotationY = 120
	const LaserRRotationZ = 60

	const LaserRSpreadX = 30
	const LaserRSpreadY = 0
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

// Star Animation
// for (let i = 0; i < 300; i++) {
// 	const scale = seedRandom(2.5, 5)

// 	const xPos = seedRandom(-300, 300)
// 	const yPos = seedRandom(75, 300)
// 	const zPos = seedRandom(-50, 750)
// 	const yPosDev = seedRandom(10, 30)

// 	const xRot1 = seedRandom(-10, 10)
// 	const yRot1 = seedRandom(-10, 10)
// 	const zRot1 = seedRandom(-10, 10)
// 	const xRot2 = seedRandom(-10, 10)
// 	const yRot2 = seedRandom(-10, 10)
// 	const zRot2 = seedRandom(-10, 10)
// 	map.customData.customEvents.push(
// 		// set stars in place
// 		{
// 			b: 0 + seedRandom(0, 0.03),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `Star${i}`,
// 				position: [seedRandom(-1000, 1000), seedRandom(250, 1000), seedRandom(-500, 1500)],
// 				scale: [scale, scale, scale]
// 			}
// 		},
// 		// lower stars from sky over time
// 		{
// 			b: 0 + seedRandom(0, 0.03),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `Star${i}`,
// 				duration: seedRandom(24, 48),
// 				position: [
// 					[seedRandom(-2000, 2000), seedRandom(3000, 9000), seedRandom(-750, 2250), 0],
// 					[seedRandom(-2000, 2000), seedRandom(400, 1600), seedRandom(-750, 2250), 1, "easeOutSine"]
// 				],
// 				rotation: [seedRandom(-180, 180), seedRandom(-180, 180), seedRandom(-180, 180)],
// 				scale: [scale / seedRandom(1, 2), scale * seedRandom(2.5, 10), scale / seedRandom(1, 2)]
// 			}
// 		},
// 		// star reset
// 		{
// 			b: 0 + seedRandom(0, 0.03),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `Star${i}`,
// 				position: [0, -9999, 0]
// 			}
// 		},
// 		// turn stars into floating light sticks above and around the player
// 		{
// 			b: 0 + seedRandom(0, 0.03),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `Star${i}`,
// 				duration: seedRandom(14, 18),
// 				position: [[xPos, yPos - yPosDev, zPos, 0], [xPos, yPos + yPosDev, zPos, seedRandom(0.4, 0.6), "easeInOutSine"], [xPos, yPos - yPosDev, zPos, 1, "easeInOutSine"]],
// 				rotation: [[xRot1, yRot1, zRot1, 0], [xRot2, yRot2, zRot2, seedRandom(0.3, 0.7), "easeInOutSine"], [xRot1, yRot1, zRot1, 1, "easeInOutSine"]],
// 				scale: [seedRandom(0.25, 0.5) + (zPos / 500), seedRandom(15, 30), seedRandom(0.25, 0.5) + (zPos / 500)],
// 				repeat: 3
// 			}
// 		},
// 		// rise stars up and out of the way
// 		{
// 			b: 0 + seedRandom(0, 0.03),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `Star${i}`,
// 				duration: seedRandom(20, 30),
// 				position: [[xPos, yPos - yPosDev, zPos, 0], [xPos + seedRandom(-2000, 2000), yPos + seedRandom(750, 1500), zPos + seedRandom(-2000, 2000), 1, "easeOutQuart"]]
// 			}
// 		}
// 	)
// }

// Skybeam generation
// for (let i = 0; i < 300; i++) {
// 	map.customData.environment.push(
// 		{
// 			geometry: { type: "Sphere", material: "TransparentLight" },
// 			position: [0, -9999, 0],
// 			track: `BeamTrackL${i}`,
// 			components: {
// 				ILightWithId: {
// 					type: 3
// 				},
// 				TubeBloomPrePassLight: {
// 					colorAlphaMultiplier: 20,
// 					bloomFogIntensityMultiplier: 40
// 				}
// 			}
// 		},
// 		{
// 			geometry: { type: "Sphere", material: "TransparentLight" },
// 			position: [0, -9999, 0],
// 			track: `BeamTrackR${i}`,
// 			components: {
// 				ILightWithId: {
// 					type: 3
// 				},
// 				TubeBloomPrePassLight: {
// 					colorAlphaMultiplier: 20,
// 					bloomFogIntensityMultiplier: 40
// 				}
// 			}
// 		},
// 	)
// }

// // Skybeam animation (hooked up to right sunbeam all lights only)
// for (let i = 0; i < 180; i++) {
// 	let xP1 = seedRandom(-5, 5) - 50
// 	let yP1 = seedRandom(150, 75)
// 	let zP1 = seedRandom(-5, 5) + 400

// 	let xR1 = seedRandom(-2.5, 2.5)
// 	let yR1 = seedRandom(-180, 180)
// 	let zR1 = seedRandom(-2.5, 2.5)

// 	let xP2 = seedRandom(-100, 100) - 50
// 	let yP2 = seedRandom(2000, 2500)
// 	let zP2 = seedRandom(-100, 100) + 400

// 	let xR2 = seedRandom(-15, 15)
// 	let yR2 = seedRandom(-180, 180)
// 	let zR2 = seedRandom(-15, 15)

// 	let width = seedRandom(2.5, 5)
// 	let height = seedRandom(25, 75) + (width / 2)

// 	let timeRand = seedRandom(0.5, 0.75)

// 	map.customData.customEvents.push(
// 		{
// 			b: 0 + (i / 90),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `BeamTrackL${i}`,
// 				duration: 1,
// 				position: [[xP1, yP1, zP1, 0], [xP2, yP2, zP2, 1]],
// 				rotation: [[xR1, yR1, zR1 + 180, 0], [xR2, yR2, zR2 + 180, 1]],
// 				scale: [[width, height, width, timeRand], [0, height * 2, 0, 1, "easeInQuad"]],
// 				repeat: 77
// 			}
// 		},
// 		{
// 			b: 0 + (i / 90),
// 			t: "AnimateTrack",
// 			d: {
// 				track: `BeamTrackR${i}`,
// 				duration: 1,
// 				position: [[xP1, yP1, zP1, 0], [xP2, yP2, zP2, 1]],
// 				rotation: [[xR1, yR1, zR1, 0], [xR2, yR2, zR2, 1]],
// 				scale: [[width, height, width, timeRand], [0, 0, 0, 1, "easeInQuad"]],
// 				repeat: 77
// 			}
// 		},
// 	)
// }

// Rainbow

const numCubes = 90;
const ringIDStart = 1000;

function hasID(array, id) {
	if (array === undefined) return false // undefined
	if (typeof array === 'number') return id === array // number
	return array.some(x => x === id) // array
}

function getRainbowIDTrack(j, i) {
	return `RainbowGeo_${j}_${i}`
}

for (let j = 0; j < 7; j++) {
	const lightIDs = []

	for (let i = 0; i < numCubes; i++) {
		const lightID = ringIDStart + (j * numCubes) + i

		map.customData.environment.push(
			{
				geometry: { type: "Sphere", material: "OpaqueLight" },
				position: [0, -69420, 0],
				track: getRainbowIDTrack(j, i),
				components: {
					ILightWithId: {
						type: 3,
						lightID: lightID
					},
					TubeBloomPrePassLight: {
						colorAlphaMultiplier: 0.075,
						bloomFogIntensityMultiplier: 2500
					}
				}
			},
		)
		lightIDs.push(lightID)
	}

	map.basicBeatmapEvents.forEach((x) => {
		if (x.et === 3 && x.customData) {
			if (hasID(x.customData.lightID, j)) {
				x.customData.lightID = lightIDs;
			}
		}
	})
}

// Rings
for (let j = 0; j < 7; j++) {

	const radius = 700 - (j * 50)

	for (let i = 0; i < numCubes; i++) {
		let angle = (i / numCubes) * Math.PI;

		const x = radius * Math.cos(angle) - 75;
		const y = radius * Math.sin(angle) + 75;
		const z = 900 + (j * 25);

		// Use the angle directly for rotation around the Z-axis
		let rotationZ = angle * (180 / Math.PI);

		map.customData.customEvents.push(
			// set rainbows in place
			{
				b: 1 + seedRandom(0, 0.003),
				t: "AnimateTrack",
				d: {
					track: getRainbowIDTrack(j, i),
					position: [x, y, z],
					rotation: [0, 0, rotationZ],
					scale: [40, 60, 40]
				}
			},
			// set rainbows out of the way
			// {
			// 	b: 0 + seedRandom(0, 0.003),
			// 	t: "AnimateTrack",
			// 	d: {
			// 		track: getRainbowIDTrack(j, i),
			// 		position: [0, -69420, 0],
			// 		scale: [0, 0, 0]
			// 	}
			// },
		)
	}
}



/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");