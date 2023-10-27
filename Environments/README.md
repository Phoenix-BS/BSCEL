# Important Info

All screenshots contained in the folders have the lights set on with a value of **[0, 1, 1, 1]** w/ vanilla laser speed enabled. Some screenshots will have been modified with ring spins / zooms to showcase all the possible effects

All Environments are made for **V3 maps** unless specified otherwise. Currently the recommended way to modify and work with these scripts is with Chromapper. Official editor lights are compatible but the process to apply is different and should generally be avoided by those without prior chroma knowledge.

All Scripts for each environments will contain the following statement at the top that you can modify to serve as input / output:
```
const fs = require("fs");
const { toNamespacedPath } = require("path");
let map = JSON.parse(fs.readFileSync("ExpertPlusLawless.dat"));
let fileOutput = "ExpertPlusLightshow.dat";
```

In this example code, `ExpertPlusLawless.dat` is the input diff and `ExpertPlusLightshow.dat` is the output diff.
The input diff is where you store your map and the script applies it's properties to the output diff with your map when you run it.

All scripts in this database will by default have `ExpertPlusLawless.dat` as the input and `ExpertPlusLightshow.dat` as the output

### To Run the scripts, follow the steps listed below:

1. Download the script and put it in the map folder that you want to modify
2. Ensure that the map file is the correct version the script needs to run and that the input / output diffs are correctly assigned to what you need
3. Place a chroma event in the input diff (This will ensure that the output diff has chroma as a suggestion which is necessary for the environment to work)
4. Open the map folder in VSC (Visual Studio Code) and select the script
5. Run the script by either pressing F5 or click Run in the top left and scroll down to Run Without Debugging. If prompted on how you want to run the script, select [node.js](https://nodejs.org/en) (If you do not have this installed be sure to do so)
6. To check that there are no errors, click on Terminal in the top left and select New Terminal. Then select the Debug Console option where you should see the scripts output. If it worked as intended you should get an output that say's "done"
7. Go to the map info screen in ChroMapper and click the blue save button. This will add chroma as a suggestion to your output diff (if you already have chroma set on the output diff you don't need to worry about this)

# Presets

Certain environment scripts contain options & presets you can apply to further customize the environment to your needing. All screenshots in this library contain default values and do not showcase the customize options. If customizeable options are available they can be applied by modifier statements at the top of the script.
Here's an example of what they look like:

```
let BingusX = 69;
let BingusY = 420;
let BingusZ = 69420;

// Bingus Original //
let BingusX = 69;
let BingusY = 420;
let BingusZ = 69420;

// Bingus Extreme //
let BingusX = 300;
let BingusY = 1200;
let BingusZ = 5000;
```

These preset statements are the easiest way to effect multiple of the same objects in the environment at once without manually editing the code, so feel free to experiment!

# Settings
- Be sure to turn "Save With Default Values" off. This can be found in General Settings and ensures that null values aren't saved with the V3.3 map version.
- Be sure to set "Time Value Decimal Prescision" to 6. This can be found in the Experimental Settings and will make sure that Chromapper saves your map without rounding down numbers in the scripts. This is most commonly noticable with rounding down `attenuation` to a value of 0. If you want to avoid this entirely, just re-run the script on anything you copy over or modify.

### Environment List

# Absence Environment (Billie)
![Absence Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Absence%20(Billie)/Absence.png)
[Absence Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Billie%20Platform/Absence%20(Billie))
# Abstraction Environment (BTS)
![Abstraction Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Abstraction%20(BTS)/Abstraction.png)
[Abstraction Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/BTS%20Platform/Abstraction%20(BTS))
# Accelerate Environment (BTS)
![Accelerate Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Accelerate%20(BTS)/Accelerate.png)
[Accelerate Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Accelerate%20(BTS))
# Arches Environment (KDA)
![Arches Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/KDA%20Platform/Arches%20(KDA)/Arches.png)
[Arches Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/KDA%20Platform/Arches%20(KDA))
# Ascension Environment (Panic!)
![Ascension Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Panic!%20Platform/Ascension%20(Panic)/Ascension.png)
[Ascension Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Panic!%20Platform/Ascension%20(Panic))
# Burger Environment (Green Day)
![Burger Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Green%20Day%20Platform/Burger%20(Green%20Day)/Burger.png)
[Burger Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Green%20Day%20Platform/Burger%20(Green%20Day))
# Cyberline Environment (FitBeat)
![Cyberline Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/FitBeat%20Platform/Cyberline%20(FitBeat)/Cyberline.png)
[Cyberline Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/FitBeat%20Platform/Cyberline%20(FitBeat))
# Illuminous Environment (Kaleidoscope)
![Illuminous Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope)/Illuminous.png)
[Illuminous Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope))
# Infrastructure Environment (Big Mirror)
![Infrastructure Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror)/Infrastructure.png)
[Infrastructure Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror))
# Light Bridge Environment (Origins)
![Light Bridge Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Origins%20Platform/LightBridge%20(Origins)/Light%20Bridge.png)
[Light Bridge Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Origins%20Platform/LightBridge%20(Origins))
# Mainframe Environment (Dragons)
![Mainframe Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Dragons%20Platform/Mainframe%20(Dragons)/Mainframe.png)
[Mainframe Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Dragons%20Platform/Mainframe%20(Dragons))
# Morality Environment (Spooky)
![Morality Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Spooky%20Platform/Morality%20(Spooky)/Morality.png)
[Morality Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Spooky%20Platform/Morality%20(Spooky))
# Mystic Environment (Billie)
![Mystic Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Mystic%20(Billie)/Mystic.png)
[Mystic Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Mystic%20(Billie))
# Ravine Environment (Billie)
![Ravine Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Ravine%20(Billie)/Ravine.png)
[Ravine Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Ravine%20(Billie))
# Signal Environment (Spooky)
![Signal Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Spooky%20Platform/Signal%20(Spooky)/Signal.png)
[Signal Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Spooky%20Platform/Signal%20(Spooky))
# Sight Environment (Billie)
![Sight Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Sight%20(Billie)/Sight.png)
[Sight Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Sight%20(Billie))
# Superliminal Environment (Rocket)
![Superliminal Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Rocket%20Platform/Superliminal%20(Rocket)/Superliminal.png)
[Superliminal Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Rocket%20Platform/Superliminal%20(Rocket))
# Tunnel Environment (Linkin Park)
![Tunnel Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark)/Tunnel.png)
[Tunnel Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark))

# Workshop

If you want to get a barebones understanding for how these scripts work you can check out the [For Dummies](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/v3ForDummiesScript.js) script that helps to explain!