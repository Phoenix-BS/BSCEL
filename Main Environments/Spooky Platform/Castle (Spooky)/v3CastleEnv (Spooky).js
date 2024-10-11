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

const toArr = (v) => [v.x, v.y, v.z];

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


function combineTransforms(
	target, // {pos: [x,y,z], rot: [x,y,z], scale: [x,y,z]}
	transform, // {pos: [x,y,z], rot: [x,y,z], scale: [x,y,z]}
	anchor, // [x,y,z]
) {
	const newTarget = {}
	Object.assign(newTarget, target)
	const newTransform = {}
	Object.assign(newTransform, transform)

	newTarget.position ??= [0, 0, 0]
	newTarget.position = newTarget.position.map((x, i) => x - anchor[i])

	const targetM = getMatrixFromTransform(newTarget)
	const transformM = getMatrixFromTransform(newTransform)
	targetM.premultiply(transformM)
	const finalTarget = getTransformFromMatrix(targetM)

	const finalPos = finalTarget.position.map((x, i) => x + anchor[i])

	return {
		position: finalPos,
		rotation: finalTarget.rotation,
		scale: finalTarget.scale,
	}
}

const seedRandom = seededRandom(6)
const seedRandomBias = seededRandomBias(6)

// Geometry Material List
map.customData.materials = {
	"Rock": {
		shader: "Standard",
		color: [0.3, 0.3, 0.3]
	},
	"Road": {
		shader: "InterscopeConcrete",
		color: [0.3, 0.3, 0.3]
	},
	"Light": {
		shader: "OpaqueLight",
		color: [0.7, 0.7, 0.7]
	},
	"Aura": {
		shader: "TransparentLight"
	},
	"Cloud": {
		shader: "BTSPillar",
		color: [0.8, 0.8, 0.8]
	},
};

map.customData.environment.push(
	{
		id: "HalloweenEnvironment.[0]Environment",
		lookupMethod: "Exact",
		track: "FogTrack",
		components: {
			BloomFogEnvironment: {
				attenuation: 0.0005,
				startY: -50,
				height: 25
			},
		}
	},
	// object removal
	{
		id: "Ground",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Stone",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Grave",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Fence",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Hand",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Crow",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "NeonTube",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Moon",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Tree",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "Bats",
		lookupMethod: "Contains",
		active: false
	},
	{
		id: "GateLight",
		lookupMethod: "Contains",
		active: false
	},

	// misc

	{
		id: "BigSmokePS",
		lookupMethod: "EndsWith",
		position: [0, 0, -100],
		scale: [100, 100, 350]
	},
)

// Road Terrain left
for (let i = 0; i < 600; i++) {

	let xPos = seedRandom(-15, -70)
	let yPos = -8
	let zPos = seedRandom(-50, 1000)

	let xRot = seedRandom(-2.5, 2.5)
	let yRot = seedRandom(-30, 30)
	let zRot = seedRandom(-30, 2.5)

	let xScale = seedRandom(10, 25)
	let yScale = seedRandom(10, 9.8) - (xPos / seedRandom(3.5, 2.5))
	let zScale = seedRandom(10, 25)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [0, -9999, 0],
			track: `LeftSlope${i}`
		}
	)
	function SideAnimLeft(beat, keyframe, repeat) {
		map.customData.customEvents.push(
			{
				b: beat,
				t: "AnimateTrack",
				d: {
					track: `LeftSlope${i}`,
					duration: keyframe,
					position: [
						[xPos, yPos, zPos, 0],
						[xPos, yPos, zPos - 300, 1]
					],
					rotation: [xRot, yRot, zRot],
					scale: [
						[xScale, yScale, zScale, 0],
					],
					repeat: repeat
				}
			},
		)
	}
	// starting beat, beat duration, how many times to repeat
	// by default the hills dont show so keep the first function to put them in place
	SideAnimLeft(0, 0.1, 0)
	SideAnimLeft(10, 10, 1)
}

// Road Terain Right
for (let i = 0; i < 600; i++) {

	let xPos = seedRandom(15, 70)
	let yPos = -8
	let zPos = seedRandom(-50, 1000)

	let xRot = seedRandom(-2.5, 2.5)
	let yRot = seedRandom(-30, 30)
	let zRot = seedRandom(-2.5, 30)

	let xScale = seedRandom(10, 25)
	let yScale = seedRandom(10, 9.8) + (xPos / seedRandom(3.5, 2.5))
	let zScale = seedRandom(10, 25)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [0, -9999, 0],
			track: `RightSlope${i}`
		}
	)
	function SideAnimRight(beat, keyframe, repeat) {
		map.customData.customEvents.push(
			{
				b: beat,
				t: "AnimateTrack",
				d: {
					track: `RightSlope${i}`,
					duration: keyframe,
					position: [
						[xPos, yPos, zPos, 0],
						[xPos, yPos, zPos - 300, 1]
					],
					rotation: [xRot, yRot, zRot],
					scale: [
						[xScale, yScale, zScale, 0],
					],
					repeat: repeat
				}
			},
		)
	}
	// starting beat, beat duration, how many times to repeat
	// by default the hills dont show so keep the first function to put them in place
	SideAnimRight(0, 0.1, 0)
	SideAnimRight(10, 10, 1)
}

// Front Mound
for (let i = 0; i < 150; i++) {

	let xPos = seedRandom(-75, 75)
	let yPos = seedRandom(-10, 10)
	let zPos = seedRandom(1100, 1200)

	let xRot = seedRandom(-15, 15)
	let yRot = seedRandom(-180, 180)
	let zRot = seedRandom(-15, 15)

	let xScale = seedRandom(15, 50)
	let yScale = seedRandom(10, 20)
	let zScale = seedRandom(15, 50)

	map.customData.environment.push(
		{
			geometry: { type: "Cube", material: "Rock" },
			position: [xPos, yPos, zPos],
			rotation: [xRot, yRot, zRot],
			scale: [xScale, yScale, zScale]
		}
	)
}

// Cloud Generation
// just kidding now its star count
const cloudCount = 250
for (let i = 0; i < cloudCount; i++) {
	const xPos = seedRandom(-750, 750)
	const zPos = seedRandom(0, 1200)
	const yPos = seedRandom(600, 200)

	const scale = seedRandom(0.75, 1.75)

	map.customData.environment.push(
		{
			geometry: { type: "Sphere", material: "Aura" },
			position: [xPos, yPos, zPos],
			scale: [scale, scale, scale],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 10,
					bloomFogIntensityMultiplier: 2
				},
				ILightWithId: {
					type: 1
				},
			}
		},
	)
}

for (let j = 7; j < 24; j++) {
	map.customData.environment.push(
		{
			id: `RotatingLasersPair (${j}).[0]BaseL`,
			lookupMethod: "EndsWith",
			position: [-150, 0, 50 + (j * 50)],
			scale: [5, 15, 5],
			rotation: [0, 0, 0],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 10,
					bloomFogIntensityMultiplier: 1
				}
			}
		},
		{
			id: `RotatingLasersPair (${j}).[1]BaseR`,
			lookupMethod: "EndsWith",
			position: [150, 0, 50 + (j * 50)],
			scale: [5, 15, 5],
			rotation: [0, 0, 0],
			components: {
				TubeBloomPrePassLight: {
					colorAlphaMultiplier: 10,
					bloomFogIntensityMultiplier: 1
				}
			}
		}
	)
}

// Road + Castle
map.customData.environment.push(
	{
		geometry: { type: "Cube", material: "Road" },
		position: [0, -0.5, 0],
		scale: [25, 0.5, 1000],
		rotation: [0, 0, 0]
	},
	{
		id: "Castle",
		lookupMethod: "Contains",
		position: [0, 20, 1150],
		scale: [7, 8, 2]
	}
)

// Lights
map.customData.environment.push(
	{
		geometry: { type: "Cylinder", material: "Light" },
		position: [-13, -0.75, 20],
		scale: [1, 1.5, 10000],
		rotation: [0, 0, 0],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 1
			},
			ILightWithId: {
				lightID: 150,
				type: 4
			},
		}
	},
	{
		geometry: { type: "Cylinder", material: "Light" },
		position: [13, -0.75, 20],
		scale: [1, 1.5, 10000],
		rotation: [0, 0, 0],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 5,
				bloomFogIntensityMultiplier: 1
			},
			ILightWithId: {
				lightID: 151,
				type: 4
			},
		}
	},
	{
		id: "GlowLineL (7)",
		lookupMethod: "EndsWith",
		position: [50, 0, 1300],
		scale: [150, 150, 150],
		rotation: [-30, 0, -10],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 15,
				bloomFogIntensityMultiplier: 5
			}
		}
	},
	{
		id: "GlowLineL (8)",
		lookupMethod: "EndsWith",
		position: [50, 0, 1300],
		scale: [150, 150, 150],
		rotation: [-30, 0, -30],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 15,
				bloomFogIntensityMultiplier: 5
			}
		}
	},
	{
		id: "GlowLineL (9)",
		lookupMethod: "EndsWith",
		position: [-50, 0, 1300],
		scale: [150, 150, 150],
		rotation: [-30, 0, 30],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 15,
				bloomFogIntensityMultiplier: 5
			}
		}
	},
	{
		id: "GlowLineL (6)",
		lookupMethod: "EndsWith",
		position: [-50, 0, 1300],
		scale: [150, 150, 150],
		rotation: [-30, 0, 10],
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 15,
				bloomFogIntensityMultiplier: 5
			}
		}
	},
	{
		geometry: { type: "Sphere", material: "Aura" },
		position: [0, 1, 9],
		scale: [2, 3, 2],
		rotation: [0, 0, 0],
		track: "AuraLight",
		components: {
			TubeBloomPrePassLight: {
				colorAlphaMultiplier: 0.000001,
				bloomFogIntensityMultiplier: 100
			},
			ILightWithId: {
				type: 1
			},
		}
	},
)

map.basicBeatmapEvents.forEach((x) => {
	if (x.et == 4 && x.customData) {
		if (x.customData.lightID == 1) {
			x.customData.lightID = 150
		}
		if (x.customData.lightID == 2) {
			x.customData.lightID = 151
		}
	}
}
)

// Player Track Data
// requires NE
// map.customData.customEvents.push(
// 	{
// 		b: 0,
// 		t: "AssignPlayerToTrack",
// 		d: {
// 			track: "PlayerChild"
// 		}
// 	},
// 	{
// 		b: 0,
// 		t: "AssignTrackParent",
// 		d: {
// 			childrenTracks: ["AuraLight", "PlayerChild"],
// 			parentTrack: "PlayerTrack"
// 		}
// 	}
// )

// // Player Animations
// map.customData.customEvents.push(
// 	{
// 		b: 0,
// 		t: "AnimateTrack",
// 		d: {
// 			track: "PlayerTrack",
// 			duration: 32,
// 			position: [
// 				[0, 0, 0, 0],
// 				[0, 0, 200, 1]
// 			]
// 		}
// 	}
// )

//#endregion

/////  ^^^ workspace ^^^ /////
///// vvvvv output vvvvv /////

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");