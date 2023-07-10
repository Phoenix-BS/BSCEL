# Important Info
This page contains all the environment edits i've published! You can find them by their base in-game environments.

All screenshots contained in the folders have the lights set on with a value of [0, 1, 1, 1] w/ vanilla laser speed enabled. Some screenshots will have been modified with ring spins / zooms to showcase all the possible effects

All Scripts for each environments will contain the following statement that you can modify to serve as input / output. All will by default have ExpertPlusLawless.dat as the input and ExpertPlusLightshow.dat as the output.

const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("*ExpertPlusLawless.dat*"));
let fileOutput = "*ExpertPlusLightshow*.dat";