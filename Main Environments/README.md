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
- Be sure to set "Time Value Decimal Prescision" to 6. This can be found in the Experimental Settings and will make sure that Chromapper saves your map without rounding down numbers in the scripts. This is most commonly noticable with rounding down `attenuation` to a value of 0. If you want to avoid this entirely, just re-run the script on anything you copy over or modify. This will only be noticable with scripts that have an `attenuation` value that is over 6 decimal places long. Please note that this setting will increase the file size of your map if you are not careful with optimization.
- Check that your map diff is set to V3. To check this, open the diff and press `alt + shift + .` to get a pop-up to swap your version
- Saving the map in Chromapper is a good way to get the map back to an understandable state if you find yourself with an undiagnosible error

### Environment List

<details><summary>Big Mirror Environment</summary>
<br>

# Infrastructure Environment (Big Mirror)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror)/Infrastructure.png" alt="Infrastructure Image" width="500" />

[Infrastructure Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Big%20Mirror%20Platform/Infrastructure%20(Big%20Mirror))

</details>



<details><summary>Billie Environment</summary>
<br>

# Enchantment Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Enchantment%20(Billie)/Enchantment.png" alt="Enchantment Image" width="500" />

[Enchantment Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Enchantment%20(Billie))

# Lilly Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Lilly%20(Billie)/Lilly.png" alt="Lilly Image" width="500" />

[Lilly Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Lilly%20(Billie))

# Mystic Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Mystic%20(Billie)/Mystic.png" alt="Mystic Image" width="500" />

[Mystic Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Mystic%20(Billie))

# Sight Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Sight%20(Billie)/Sight.png" alt="Sight Image" width="500" />

[Sight Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Sight%20(Billie))

# Spellbound Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Spellbound%20(Billie)/Spellbound.png" alt="Spellbound Image" width="500" />

[Spellbound Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Spellbound%20(Billie))

# Time Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Time%20(Billie)/Time.png" alt="Time Image" width="500" />

[Time Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Time%20(Billie))

</details>



<details><summary>BTS Environment</summary>
<br>

# Abstraction Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Abstraction%20(BTS)/Abstraction.png" alt="Abstraction Image" width="500" />

[Abstraction Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Abstraction%20(BTS))

# Accelerate Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Accelerate%20(BTS)/Accelerate.png" alt="Accelerate Image" width="500" />

[Accelerate Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Accelerate%20(BTS))

# Cookie Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Cookie%20(BTS)/Cookie.png" alt="Cookie Image" width="500" />

[Cookie Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Cookie%20(BTS))

# Lightbringer Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Lightbringer%20(BTS)/Lightbringer.png" alt="Lightbringer Image" width="500" />

[Lightbringer Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Lightbringer%20(BTS))

# Hailstorm Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Hailstorm%20(BTS)/Hailstorm.png" alt="Hailstorm Image" width="500" />

[Hailstorm Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Hailstorm%20(BTS))

# Overflow Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Overflow%20(BTS)/Overflow.png" alt="Overflow Image" width="500" />

[Overflow Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Overflow%20(BTS))

# Smokescreen Environment (BTS)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/BTS%20Platform/Smokescreen%20(BTS)/Smokescreen.png" alt="Smokescreen Image" width="500" />

[Smokescreen Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/BTS%20Platform/Smokescreen%20(BTS))

</details>



<details><summary>Dragons Environment</summary>
<br>

# Internet Environment (Dragons)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Dragons%20Platform/Internet%20(Dragons)/Internet.png" alt="Internet Image" width="500" />

[Internet Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Dragons%20Platform/Internet%20(Dragons))

# Mainframe Environment (Dragons)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Dragons%20Platform/Mainframe%20(Dragons)/Mainframe.png" alt="Mainframe Image" width="500" />

[Mainframe Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Dragons%20Platform/Mainframe%20(Dragons))

# Synthwave Environment (Dragons)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Dragons%20Platform/Synthwave%20(Dragons)/Synthwave.png" alt="Synthwave Image" width="500" />

[Synthwave Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Dragons%20Platform/Synthwave%20(Dragons))

</details>



<details><summary>FitBeat Environment</summary>
<br>

# Cyberline Environment (FitBeat)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/FitBeat%20Platform/Cyberline%20(FitBeat)/Cyberline.png" alt="Cyberline Image" width="500" />

[Cyberline Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/FitBeat%20Platform/Cyberline%20(FitBeat))

</details>



<details><summary>Gaga Environment</summary>
<br>

# Trails Environment (Gaga)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Gaga%20Platform/Trails%20(Gaga)/Trails.png" alt="Trails Image" width="500" />

[Trails Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Gaga%20Platform/Trails%20(Gaga))

</details>



<details><summary>Green Day Environment</summary>
<br>

# Burger Environment (Green Day)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Green%20Day%20Platform/Burger%20(Green%20Day)/Burger.png" alt="Burger Image" width="500" />

[Burger Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Green%20Day%20Platform/Burger%20(Green%20Day))

# Screening Environment (Green Day)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Green%20Day%20Platform/Screening%20(Green%20Day)/Screening.png" alt="Screening Image" width="500" />

[Screening Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Green%20Day%20Platform/Screening%20(Green%20Day))

</details>



<details><summary>Kaleidoscope Environment</summary>
<br>

# Illuminous Environment (Kaleidoscope)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope)/Illuminous.png" alt="Illuminous Image" width="500" />

[Illuminous Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Kaleidoscope%20Platform/Illuminous%20(Kaleidoscope))

</details>



<details><summary>KDA Environment</summary>
<br>

# Arches Environment (KDA)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/KDA%20Platform/Arches%20(KDA)/Arches.png" alt="Arches Image" width="500" />

[Arches Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/KDA%20Platform/Arches%20(KDA))

# Strand Environment (KDA)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/KDA%20Platform/Strand%20(KDA)/Strand.png" alt="Strand Image" width="500" />

[Strand Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/KDA%20Platform/Strand%20(KDA))

</details>



<details><summary>Monstercat Environment</summary>
<br>

# Portal Environment (Monstercat)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Monstercat%20Platform/Portal%20(Monstercat)/Portal.png" alt="Portal Image" width="500" />

[Portal Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Monstercat%20Platform/Portal%20(Monstercat))

</details>



<details><summary>Origins Environment</summary>
<br>

# Light Bridge Environment (Origins)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Origins%20Platform/LightBridge%20(Origins)/Light%20Bridge.png" alt="Light Bridge Image" width="500" />

[Light Bridge Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Origins%20Platform/LightBridge%20(Origins))

# Cable Environment (Origins)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Origins%20Platform/Cable%20(Origins)/Cable.png" alt="Cable Image" width="500" />

[Cable Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Origins%20Platform/Cable%20(Origins))

</details>



<details><summary>Panic! Environment</summary>
<br>

# Chalice Environment (Panic!)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Panic!%20Platform/Chalice%20(Panic)/Chalice.png" alt="Chalice Image" width="500" />

[Chalice Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Panic!%20Platform/Chalice%20(Panic))

</details>



<details><summary>Rocket Environment</summary>
<br>

# Superliminal Environment (Rocket)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Rocket%20Platform/Superliminal%20(Rocket)/Superliminal.png" alt="Superliminal Image" width="500" />

[Superliminal Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Rocket%20Platform/Superliminal%20(Rocket))

</details>



<details><summary>Skrillex Environment</summary>
<br>

# Energy Environment (Skrillex)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Skrillex%20Platform/Energy%20(Skrillex)/Energy.png" alt="Energy Image" width="500" />

[Energy Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Skrillex%20Platform/Energy%20(Skrillex))

</details>



<details><summary>Spooky Environment</summary>
<br>

# Castle Environment (Spooky)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Spooky%20Platform/Castle%20(Spooky)/Castle.png" alt="Castle Image" width="500" />

[Castle Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Spooky%20Platform/Castle%20(Spooky))

# Morality Environment (Spooky)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Spooky%20Platform/Morality%20(Spooky)/Morality.png" alt="Morality Image" width="500" />

[Morality Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Spooky%20Platform/Morality%20(Spooky))

# Signal Environment (Spooky)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Spooky%20Platform/Signal%20(Spooky)/Signal.png" alt="Signal Image" width="500" />

[Signal Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Spooky%20Platform/Signal%20(Spooky))

</details>



<details><summary>Timbaland Environment</summary>
<br>

# Cyclone Environment (Timbaland)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Timbaland%20Platform/Cyclone%20(Timbaland)/Cyclone.png" alt="Cyclone Image" width="500" />

[Cyclone Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Timbaland%20Platform/Cyclone%20(Timbaland))

# Envelop Environment (Timbaland)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Timbaland%20Platform/Envelop%20(Timbaland)/Envelop.png" alt="Envelop Image" width="500" />

[Envelop Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Timbaland%20Platform/Envelop%20(Timbaland))

</details>



<details><summary>Triangle Environment</summary>
<br>

# Binary Environment (Triangle)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Triangle%20Platform/Binary%20(Triangle)/Binary.png" alt="Binary Image" width="500" />

[Binary Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Triangle%20Platform/Binary%20(Triangle))

</details>

<br>

<details><summary>Legacy Scripts</summary>
<br>

# Note:
Environments in this bracket are made with messy and outdated code and are more prone to breaking in the future. Use at your own risk!

<br>

# Absence Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Absence%20(Billie)/Absence.png" alt="Absence Image" width="500" />

[Absence Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Billie%20Platform/Absence%20(Billie))

# Ascension Environment (Panic!)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Panic!%20Platform/Ascension%20(Panic)/Ascension.png" alt="Ascension Image" width="500" />

[Ascension Environment Page](https://github.com/Phoenix-BS/BSCEL/tree/main/Main%20Environments/Panic!%20Platform/Ascension%20(Panic))

# Ravine Environment (Billie)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Ravine%20(Billie)/Ravine.png" alt="Ravine Image" width="500" />

[Ravine Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Billie%20Platform/Ravine%20(Billie))

# Tunnel Environment (Linkin Park)
<img src="https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark)/Tunnel.png" alt="Tunnel Image" width="500" />

[Tunnel Environment Page](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/Linkin%20Park%20Platform/Tunnel%20(LinkinPark))

</details>

# Workshop

If you want to get a barebones understanding for how these scripts work you can check out the [For Dummies](https://github.com/Phoenix-BS/BSCEL/blob/main/Main%20Environments/v3ForDummiesScript.js) script that helps to explain!