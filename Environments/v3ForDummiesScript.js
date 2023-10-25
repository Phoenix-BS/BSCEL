// NOTES //

// - This script is designed to help you get a basic understanding of using it, making complicated things comes from experimenting with the tools available
// - Not every single capability of Chroma is explained here, only the bare basics you need to make learning other things easier
// - The code in this script is placeholder and meant to teach you, not be directly copy and used
// - This script assumes you have a basic understanding of mapping and lighting practices. Get a basic understanding before jumping straight into Beat Saber related code
// - Lines with "//" in front are ignored by the script, if you want to add or remove these you can click on the line(s) you want to edit and press ctrl + /
// - This script makes use of JavaScript. You don't need to know in depth JS to use this script, but having JS knowledge can help you to create more complicated and optimized things

// RESOURCES //

// https://github.com/Aeroluna/Heck/wiki
// https://bsmg.wiki/mapping/
// https://chromapper.atlassian.net/wiki/spaces/UG/overview



// SCRIPT //

// Only allows the script to run in strict mode which only allows itself to run if no variables are unused

"use strict";

// Setup Info, Set your input & output diffs here //

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";

// References Brackets, you can reference back here if you forgor //

map.customData = { pointDefinitions: {}, customEvents: [], environment: [] };

// Shortcuts for map data sections //

const customData = map.customData;
const obstacles = map.obstacles;
const notes = map.notes;
const customEvents = customData.customEvents;
const pointDefinitions = customData.pointDefinitions;
const environment = customData.environment;

// Function that allows for a random number to be selected between a range. To use simply type Random(number 1, number 2) in the place of any number //

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// To Make editing code easier you can assign statements to apply to multiple places at once //
//  If you ever type the name that's represented in a let / const statement below, it will act as whatever it equals //

// const BingusX = 69;
// const BingusY = 420;
// const BingusZ = 69420;

// This will set whatever it's modyfing to whatever numbers are set above //
// position: [BingusX, BingusY, BingusZ]

// These types of math can be used to set gradients to multiple things you are modifying //

// id: "Dingus1"
// position: [BingusX, BingusY, BingusZ]
// id: "Dingus2"
// position: [BingusX * 2, BingusY * 2, BingusZ * 2]
// id: "Dingus3"
// position: [BingusX * 3, BingusY * 3, BingusZ * 3]
// etc...

// This is where you will set your materials to be used by geometry objects (If you don't have any geometry in your script then this can be ignored) //

map.customData.materials = {
  "NameOfMaterial": {
    shader: "Standard",
    shaderKeywords: [],
    color: [0.5, 0, 0],
    track: "MaterialTrack"
  },
  "NameOfMaterial": {
    shader: "OpaqueLight",
    color: [0, 1, 1],
    track: "MaterialTrack"
  },
};

// Shader List //

// Standard < Default Material
// OpaqueLight < Lightable if assigned with LightID on an Object and will be visible if turned off
// TransparentLight < Lightable if assigned with LightID on an Object and will be invisible if turned off
// BTSPillar < BTS Cube Material (swifter reference???)
// InterscopeConcrete < Interscope Tunnel Material
// InterscopeCar < Interscope Car Material
// BillieWater < Billie Waterfall Material (Performance Heavy, use sparingly)
// WaterfallMirror < Billie Mirror, can reflect objects if mirror settings allow it (Performance Heavy, use sparingly)

// Material Options //

// shaderKeywords: [] < putting this underneath the shader: statement will override the shader and turn it into a solid color that isn't effected by light and can be changed by color
// color: [0, 0, 0] < Changes the color of the objects the material is assigned to
// track: "MaterialTrack" < Assigns a track to the material, can only be used for animating the color of all objects with the material assigned

// This is where you will write environment statements //

map.customData.environment = [

  // Blueprint statements with every possible modifyer for environment & geometry. feel free to experiment!
  // you can find out what does what here > https://github.com/Aeroluna/Heck/wiki/Environment

  // Environment Statement //

  {
    id: "Environment.com",
    lookupMethod: "MagnifyingGlass",
    active: true / false,
    duplicate: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    track: "Groingilus",
    components: {
      ILightWithId: {
        type: 1,
        lightID: 1
      },
      BloomFogEnvironment: {
        attenuation: 0.005,
        offset: 1,
        startY: -50,
        height: 1
      },
      TubeBloomPrePassLight: {
        colorAlphaMultiplier: 3,
        bloomFogIntensityMultiplier: 5
      }
    }
  },

  // Geometry Object Statement //

  {
    geometry: { type: "Cube", material: "Sprinkous" },
    // Insert properties from Environment Statement (do not include "id" & "lookupMethod")
  },
];

// This is where you will write Animate statements //

map.customData.customEvents.push(

  // Blueprint statements for creating Animations with AnimateTrack (note that this only covers basic AnimateTrack, there are other event types that can be used and learned)
  // you can find out what does what here > https://github.com/Aeroluna/Heck/wiki/Animation

  // AnimateTrack Statement //

  {
    b: 5,
    t: "AnimateTrack",
    d: {
      track: "AnimateZingus",
      duration: 5,
      easing: "easeInOutQuad",
      position: [
        [0, 10, 10, 0],
        [0, 10, 20, 1, "easeOutSine"]
      ],
      rotation: [
        [0, 0, 0, 0],
        [0, 90, 0, 0.25],
        [0, 180, 0, 0.5],
        [0, 270, 0, 0.75],
        [0, 360, 0, 1]
      ],
      scale: [
        [10, 10, 10, 0],
        [20, 20, 20, 0.69, "easeInCubic"],
        [5, 5, 5, 1, "easeOutCubic"]
      ],
    }
  },

  // For each bracket containing numbers in a sequence you are creating a keyframe, where the final value represents time (0 being the start, 1 being the end)
  // For example, if you have [0, 0, 0, 1] modifying position, the first 3 digits will change the X, Y & Z coordinates the same as regular position, and the 4th digit is the time
  // Time works by multiplying the duration and time values and then adding the b value onto the result (The beat the animation starts). This is when the keyframe will occur

  // Easings can be used to help your animation feel more alive and is important for the style of your map
  // Full list of easings: https://easings.net/

  // It's important to remeber that the easing: parameter and putting easings in with animateposition / rotation / scale are different things
  // If you put an easing with the easing parameter it will effect over the whole animation
  // If you put an easing on an animation it will only effect between the previous and current time value
);

// This line of code helps to compile everything together when running and also lets you know if it worked or not

// To run your script, Press f5 and click on node.js if prompted. This should automatically open a terminal and show "done" in the "DEBUG CONSOLE" tab

fs.writeFileSync(fileOutput, JSON.stringify(map, null, 0));
console.log("done");

// If you have any further questions or want to improve on this example script then you can reach me on discord
// phoenix5_