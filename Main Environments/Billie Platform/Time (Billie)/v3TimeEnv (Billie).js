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

const lerp = (a, b, t) => (b - a) * t + a;
const lerpArr = (a, b, t) => a.map((x, i) => lerp(x, b[i], t))
const distribute = () => Random(lagMs1, lagMs2)

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

function toRadians(values) {
	const toRadNum = (x) => x * (Math.PI / 180)

	if (typeof values === 'number') {
		return toRadNum(values)
	}

	return values.map(toRadNum)
}

function toDegrees(values) {
	return values.map(x => x * (180 / Math.PI));
}


function rotFromQuaternion(q) {
	let euler = new three.Euler(0, 0, 0, "YXZ").setFromQuaternion(q).toArray();
	euler.pop();
	euler = toDegrees(euler);
	return euler;
}


const toThreeVec3 = (v) => new three.Vector3(...v)
const toThreeEuler = (v) =>
	new three.Euler(...toRadians(v), 'YXZ')
const toThreeQuaternion = (v) =>
	new three.Quaternion().setFromEuler(toThreeEuler(v))


function getMatrixFromTransform(transform) {
	const m = new three.Matrix4()
	const pos = transform.position ?? [0, 0, 0]
	const rot = transform.rotation ?? [0, 0, 0]
	const scale = transform.scale ?? [1, 1, 1]
	m.compose(toThreeVec3(pos), toThreeQuaternion(rot), toThreeVec3(scale))
	return m
}

function getTransformFromMatrix(matrix) {
	const pos = new three.Vector3();
	const q = new three.Quaternion();
	const scale = new three.Vector3();
	matrix.decompose(pos, q, scale);
	const rot = rotFromQuaternion(q);
	return {
		position: toArr(pos),
		rotation: rot,
		scale: toArr(scale)
	}
}

const seedRandom = seededRandom(6)
const seedRandomBias = seededRandomBias(6)

// Geometry Material List
map.customData.materials = {
	"Rock": {
		shader: "BTSPillar",
		color: [0.2, 0.2, 0.2]
	},
	"Light": {
		shader: "OpaqueLight",
		color: [0.7, 0.7, 0.7]
	},
	"Aura": {
		shader: "TransparentLight"
	}
};

// Sky gradient
const SKYLIGHT_AMOUNT = 130
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
		geometry: { type: "Cube", material: "Aura" },
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

function Purple(t) {
	const mixNum = (a, b, t) => (b - a) * t + a;
	const mix = (a, b, t) => a.map((x, i) => mixNum(x, b[i], t));

	const col1 = [0.0000, 0.0000, 0.0000];
	const col2 = [0.4902, 0.1569, 0.6078];
	const col3 = [0.8235, 0.4745, 0.8941];
	const col4 = [1.0000, 0.5373, 0.0000];
	const col5 = [0.0000, 0.0000, 0.0000];

	// col1 to col2
	if (t >= 0.0000 && t <= 0.0900) {
		const fraction = (t - 0.0000) * 11.1111;
		return mix(col1, col2, fraction);
	}

	// col2 to col3
	if (t >= 0.0900 && t <= 0.3200) {
		const fraction = (t - 0.0900) * 4.3478;
		return mix(col2, col3, fraction);
	}

	// col3 to col4
	if (t >= 0.3200 && t <= 0.5000) {
		const fraction = (t - 0.3200) * 5.5556;
		return mix(col3, col4, fraction);
	}

	// col4 to col5
	if (t >= 0.5000 && t <= 0.6700) {
		const fraction = (t - 0.5000) * 5.8824;
		return mix(col4, col5, fraction);
	}

	// col5 to edge
	return col5;
}

// function setSkylight(time, color preset (see above))
// bufferSkylight(time) < takes the previous color in the list
// turnOffSkylight(time) < turns off the bitches

turnOffSkylight(0)
bufferSkylight(37.5)
setSkylight(39, Purple)

map.customData.environment.push(
	{
		id: "BillieEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.0001,
				startY: -120,
				height: 25
			},
		}
	},
	// object removal
	{
		id: "NeonTube (",
		lookupMethod: "Contains",
		active: false
	},
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
		id: "Waterfall",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Cloud",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Mountain",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Rain",
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
		id: "Sun",
		lookupMethod: "EndsWith",
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
)

map.customData.customEvents.push(
	{
		b: 489,
		t: "AnimateComponent",
		d: {
			track: "FogTrack",
			BloomFogEnvironment: {
				attenuation: [-0.000006]
			}
		}
	},
	{
		b: 559,
		t: "AnimateComponent",
		d: {
			track: "FogTrack",
			BloomFogEnvironment: {
				attenuation: [0.001]
			}
		}
	}
)

// Player Platform
for (let i = 0; i < 50; i++) {

	const z = seedRandom(-7.5, 5)
	const x = seedRandom(-30, 30)
	const y = seedRandom(-10, -10.5)

	const width = seedRandomBias(2.5, 10, 0.25)
	const depth = seedRandomBias(2.5, 10, 0.25)
	const height = seedRandom(20, 19.5)

	const xRot = seedRandom(-0.5, 0.5)
	const yRot = seedRandom(-30, 30)
	const zRot = seedRandom(-0.5, 0.5)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y, z],
			scale: [width, height, depth],
			rotation: [xRot, yRot, zRot]
		},
	)
}

// Player Side Spires
for (let i = 0; i < 50; i++) {

	const z = seedRandom(-4, 5)
	const x = seedRandom(-30, -25)

	const height = seedRandom(10, 45)
	const width = seedRandom(0.5, 5) + (height / 5)
	const depth = seedRandom(0.5, 5) + (height / 5)

	const y = seedRandom(-20, 0)

	const xRot = seedRandom(-15, 15)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-15, 15)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y, z],
			scale: [width, height, depth],
			rotation: [xRot, yRot, zRot]
		},
	)
}

// Player Back Wall
for (let i = 0; i < 50; i++) {

	const z = seedRandom(-14, -10)
	const x = seedRandom(-30, 25)

	const height = seedRandom(30, 45)
	const width = seedRandom(1.5, 5) + (height / 5)
	const depth = seedRandom(1.5, 5) + (height / 5)

	const y = seedRandom(-20, 0) - (x / 5)

	const xRot = seedRandom(-15, 15)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-15, 15)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y, z],
			scale: [width, height, depth],
			rotation: [xRot, yRot, zRot]
		},
	)
}

// Left Terrain
for (let i = 0; i < 400; i++) {

	const z = seedRandom(100, 1250)
	const x = seedRandom(-100, -500) + (z / 10)
	const y = seedRandom(-100, -102.5) - (x / 3)

	const width = seedRandomBias(10, 60, 0.25)
	const depth = seedRandomBias(10, 60, 0.25)
	const height = seedRandom(70, 73) + ((width + depth) / 5)

	const xRot = seedRandom(-5, 5)
	const yRot = seedRandom(-180, 180)
	const zRot = seedRandom(-5, 5)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y, z],
			scale: [width, height, depth],
			rotation: [xRot, yRot, zRot]
		},
	)
}

// floating rocks
for (let j = 0; j < 2; j++) {
	for (let i = 0; i < 200; i++) {

		const x = seedRandom(400, 450) - (j * 125)
		const y = seedRandom(125, 225) + (j * 120)
		const z = seedRandom(400, 450) + (j * 250)

		const width = seedRandomBias(10, 50, 5)
		const depth = seedRandomBias(10, 50, 5)
		const height = seedRandomBias(25, 200, 2.5)

		const xRot = seedRandom(5, -5)
		const yRot = seedRandom(-180, 180)
		const zRot = seedRandom(5, -5) - (j * 10)

		map.customData.environment.push(
			{
				geometry: { type: "Cube", material: "Rock" },
				position: [x, y, z],
				scale: [width, height, depth],
				rotation: [xRot, yRot, zRot]
			},
		)
	}
}

// Right floor stones
for (let j = 0; j < 24; j++) {
	
	const xBase = seedRandom(-50, 1400)
	const yBase = seedRandom(-125, -50)
	const zBase = seedRandom(-200, 1250)

	for (let i = 0; i < seedRandom(30,60); i++) {

		const x = seedRandom(-75, 75)
		const y = seedRandom(-15, 15)
		const z = seedRandom(-75, 75)

		const width = seedRandomBias(15, 75, 0.5)
		const depth = seedRandomBias(15, 75, 0.5)
		const height = seedRandomBias(50, 100, 2.5)

		const xRot = seedRandom(15, -15)
		const yRot = seedRandom(-180, 180)
		const zRot = seedRandom(15, -15)

		map.customData.environment.push(
			{
				geometry: { type: "Cube", material: "Rock" },
				position: [xBase + x, yBase + y, zBase + z],
				scale: [width, height + (xBase / 10), depth],
				rotation: [xRot, yRot, zRot]
			},
		)
	}
}

//#region Lights

// Lantern Thing
function Lantern(x, y, z, width, height, rot, type, lightID) {
	map.customData.environment.push(
		{
			geometry: { type: "Cylinder", material: "Rock" },
			position: [x, y - 1, z],
			rotation: [0, rot, 0],
			scale: [width, height * 1.5, width]
		},
		{
			geometry: { type: "Cylinder", material: "Rock" },
			position: [x, y - (height * 20), z],
			rotation: [0, rot, 0],
			scale: [width / 3, height * 20, width / 3]
		},
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y - (height * 2), z],
			rotation: [0, rot, 0],
			scale: [width / 12, height * 3, width / 1.5]
		},
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [x, y - (height * 2), z],
			rotation: [0, rot, 0],
			scale: [width / 1.5, height * 3, width / 12]
		},
		{
			geometry: { type: "Sphere", material: "Rock" },
			position: [x, y + height * 1.1, z],
			rotation: [0, rot, 0],
			scale: [width / 4, height * 6.25, width],
		},
		{
			geometry: { type: "Sphere", material: "Rock" },
			position: [x, y + height * 1.1, z],
			rotation: [0, rot + 45, 0],
			scale: [width / 4, height * 6.25, width],
		},
		{
			geometry: { type: "Sphere", material: "Rock" },
			position: [x, y + height * 1.1, z],
			rotation: [0, rot + 90, 0],
			scale: [width / 4, height * 6.25, width],
		},
		{
			geometry: { type: "Sphere", material: "Rock" },
			position: [x, y + height * 1.1, z],
			rotation: [0, rot + 135, 0],
			scale: [width / 4, height * 6.25, width],
		},
		{
			geometry: { type: "Sphere", material: "Light" },
			position: [x, y + height * 1.1, z],
			rotation: [0, rot, 0],
			scale: [width / 1.25, height * 6, width / 1.25],
			components: {
				ILightWithId: {
					lightID: lightID,
					type: type
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 2,
					bloomFogIntensityMultiplier: 1
				}
			}
		},
	)
	map.basicBeatmapEvents.forEach((x) => {
		if (x.et == type && x.customData) {
			if (x.customData.lightID == lightID - 100) {
				x.customData.lightID = lightID;
			}
		}
	}
	)
}

for (let j = 0; j < 4; j++) {
	Lantern(-40 - (j * 8), 0 + (j * 10), 270 - (j * 25), 10, 5, seedRandom(-180, 180), 7, 101 + j)
}

// left lasers
map.customData.environment.push(
	{
		id: `BottomPairLasers.[0]PillarL`,
		lookupMethod: "EndsWith",
		position: [-130, -50, 240],
		rotation: [0, -20, -80],
		scale: [5, 7, 5],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 2,
				bloomFogIntensityMultiplier: 6
			}
		}
	},
)
for (let j = 1; j <= 8; j++) {
	const x = seedRandom(-350, -120)
	const y = seedRandom(-35, -50)
	const z = seedRandomBias(300, 800, 1.75)

	const width = seedRandom(6, 8) + (z / 150)
	const height = seedRandom(5, 10) + (z / 150)

	const rotX = seedRandom(-15, 15)
	const rotY = seedRandom(-30, 30)
	const rotZ = seedRandom(-100, -80)
	map.customData.environment.push(
		{
			id: `BottomPairLasers (${j}).[0]PillarL`,
			lookupMethod: "EndsWith",
			position: [x, y, z],
			rotation: [rotX, rotY, rotZ],
			scale: [width, height, width],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 1.5 + (z / 250),
					bloomFogIntensityMultiplier: 6
				}
			}
		},
	)
}

// right lasers
map.customData.environment.push(
	{
		id: `BottomPairLasers.[1]PillarR`,
		lookupMethod: "EndsWith",
		position: [160, -60, 400],
		rotation: [15, 40, 100],
		scale: [5, 7, 5],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 2,
				bloomFogIntensityMultiplier: 6
			}
		}
	},
)
for (let j = 1; j <= 8; j++) {
	const x = seedRandom(350, 100)
	const y = seedRandom(-100, -150)
	const z = seedRandomBias(400, 1000, 1.75)

	const width = seedRandom(6, 8) + (z / 150)
	const height = seedRandom(5, 10) + (z / 150)

	const rotX = seedRandom(-15, 15)
	const rotY = seedRandom(-30, 30)
	const rotZ = seedRandom(100, 80)
	map.customData.environment.push(
		{
			id: `BottomPairLasers (${j}).[1]PillarR`,
			lookupMethod: "EndsWith",
			position: [x, y, z],
			rotation: [rotX, rotY, rotZ],
			scale: [width, height, width],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 1.5 + (z / 250),
					bloomFogIntensityMultiplier: 6
				}
			}
		},
	)
}

// Sun Streaks
for (let j = 1; j <= 18; j++) {

	const bloomInt = 1
	const alphaInt = 15
	map.customData.environment.push(
		{
			id: "NeonTube",
			lookupMethod: "EndsWith",
			duplicate: 1,
			position: [-150, 650, 2500],
			rotation: [0, 0, -10],
			scale: [15 + (j * 15), 350 - (j * 17.5), 0.25],
			components: {
				ILightWithId: {
					lightID: 101 + j,
					type: 2
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: alphaInt,
					bloomFogIntensityMultiplier: bloomInt
				}
			}
		},
		{
			id: "NeonTube",
			lookupMethod: "EndsWith",
			duplicate: 1,
			position: [-150, 650, 2500],
			rotation: [0, 0, -10],
			scale: [15 + (j * 15), 350 - (j * 17.5), 0.25],
			components: {
				ILightWithId: {
					lightID: 121 + j,
					type: 3
				},
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: alphaInt,
					bloomFogIntensityMultiplier: bloomInt
				}
			}
		},
	)
	map.basicBeatmapEvents.forEach((x) => {
		if (x.et == 2 && x.customData) {
			if (x.customData.lightID == j) {
				x.customData.lightID = [101 + j];
			}
		}
		if (x.et == 3 && x.customData) {
			if (x.customData.lightID == j) {
				x.customData.lightID = [121 + j];
			}
		}
	}
	)
}

//#endregion

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");