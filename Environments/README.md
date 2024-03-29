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
2. Open VSC (Visual Studio Code). Click File > Open Folder and open your Map folder you put your script in
3. Create your input & output diffs in Chromapper and set them accordingly in the script
4. Open your input diff and place a chroma event. This is to ensure that chromapper can add Chroma as a suggestion when you run the script later.
5. Run the script by either pressing F5 or click Run in the top left and scroll down to Run Without Debugging. If prompted on how you want to run the script, select [node.js](https://nodejs.org/en) (If you do not have this installed be sure to do so) You should see a popup in the Debug Console saying `done`
6. Go to the map info screen in ChroMapper and click the blue save button. This will add chroma as a suggestion to your output diff (if you already have chroma set on the output diff you don't need to worry about this)

# Settings
- Be sure to turn "Save With Default Values" off. This can be found in General Settings and ensures that null values aren't saved with the V3.3 map version.
- Be sure to set "Time Value Decimal Prescision" to 6. This can be found in the Experimental Settings and will make sure that Chromapper saves your map without rounding down numbers in the scripts. This is most commonly noticable with rounding down `attenuation` to a value of 0. If you want to avoid this entirely, just re-run the script on anything you copy over or modify. This will only be noticable with scripts that have an `attenuation` value that is over 6 decimal places long
- Check that your map diff is set to V3. To check this, open the diff and press `alt + shift + .` to get a pop-up to swap your version
- Saving the map in Chromapper is a good way to get the map back to an understandable state if you find yourself with an undiagnosible error

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
# Binary Environment (Triangle)
![Binary Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Triangle%20Platform/Binary%20(Triangle)/Binary.png)
[Binary Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Triangle%20Platform/Binary%20(Triangle))
# Burger Environment (Green Day)
![Burger Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Green%20Day%20Platform/Burger%20(Green%20Day)/Burger.png)
[Burger Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Green%20Day%20Platform/Burger%20(Green%20Day))
# Chalice Environment (Panic!)
![Chalice Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Panic!%20Platform/Chalice%20(Panic)/Chalice.png)
[Chalice Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Panic!%20Platform/Chalice%20(Panic))
# Cyberline Environment (FitBeat)
![Cyberline Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/FitBeat%20Platform/Cyberline%20(FitBeat)/Cyberline.png)
[Cyberline Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/FitBeat%20Platform/Cyberline%20(FitBeat))
# Hailstorm Environment (BTS)
![Hailstorm Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Hailstorm%20(BTS)/Hailstorm.png)
[Hailstorm Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/BTS%20Platform/Hailstorm%20(BTS))
# Illuminous Environment (Kaleidoscope)
![Illuminous Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope)/Illuminous.png)
[Illuminous Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope))
# Infrastructure Environment (Big Mirror)
![Infrastructure Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror)/Infrastructure.png)
[Infrastructure Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror))
# Light Bridge Environment (Origins)
![Light Bridge Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Origins%20Platform/LightBridge%20(Origins)/Light%20Bridge.png)
[Light Bridge Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Origins%20Platform/LightBridge%20(Origins))
# Lightbringer Environment (BTS)
![Lightbringer Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Lightbringer%20(BTS)/Lightbringer.png)
[Lightbringer Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/BTS%20Platform/Lightbringer%20(BTS))
# Mainframe Environment (Dragons)
![Mainframe Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Dragons%20Platform/Mainframe%20(Dragons)/Mainframe.png)
[Mainframe Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Dragons%20Platform/Mainframe%20(Dragons))
# Morality Environment (Spooky)
![Morality Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Spooky%20Platform/Morality%20(Spooky)/Morality.png)
[Morality Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Spooky%20Platform/Morality%20(Spooky))
# Mystic Environment (Billie)
![Mystic Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Mystic%20(Billie)/Mystic.png)
[Mystic Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Mystic%20(Billie))
# Overflow Environment (BTS)
![Overflow Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Overflow%20(BTS)/Overflow.png)
[Overflow Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/BTS%20Platform/Overflow%20(BTS))
# Ravine Environment (Billie)
![Ravine Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Ravine%20(Billie)/Ravine.png)
[Ravine Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Ravine%20(Billie))
# Signal Environment (Spooky)
![Signal Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Spooky%20Platform/Signal%20(Spooky)/Signal.png)
[Signal Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Spooky%20Platform/Signal%20(Spooky))
# Sight Environment (Billie)
![Sight Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Sight%20(Billie)/Sight.png)
[Sight Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Sight%20(Billie))
# Smokescreen Environment (BTS)
![Smokescreen Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/BTS%20Platform/Smokescreen%20(BTS)/Smokescreen.png)
[Smokescreen Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/BTS%20Platform/Smokescreen%20(BTS))
# Spellbound Environment (Billie)
![Spellbound Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Billie%20Platform/Spellbound%20(Billie)/Spellbound.png)
[Spellbound Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Environments/Billie%20Platform/Spellbound%20(Billie))
# Superliminal Environment (Rocket)
![Superliminal Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Rocket%20Platform/Superliminal%20(Rocket)/Superliminal.png)
[Superliminal Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Rocket%20Platform/Superliminal%20(Rocket))
# Synthwave Environment (Dragons)
![Synthwave Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Dragons%20Platform/Synthwave%20(Dragons)/Synthwave.png)
[Synthwave Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Dragons%20Platform/Synthwave%20(Dragons))
# Trails Environment (Gaga)
![Trails Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Gaga%20Platform/Trails%20(Gaga)/Trails.png)
[Trails Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Gaga%20Platform/Trails%20(Gaga))
# Tunnel Environment (Linkin Park)
![Tunnel Image](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark)/Tunnel.png)
[Tunnel Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark))

# Workshop

If you want to get a barebones understanding for how these scripts work you can check out the [For Dummies](https://github.com/Phoenix-BS/BSCEL/blob/main/Environments/v3ForDummiesScript.js) script that helps to explain!