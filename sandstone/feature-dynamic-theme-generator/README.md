## Custom Colors Generator

A sample Enact application that uses dynamic color change feature to style components and create a personalized theme.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

This app will help you choose a preset theme and/or customize the Sandstone UI components for your application. 
On the left side of the app, you can see all the presets and/or customizable color fields, while on the right side is the `Theme Preview` area. 
Any value changes you make to the color pickers will be reflected in `Theme Preview`.

#### Customize Themes

The radio buttons on the first Panel allow you to choose a preset, including Sandstone default theme. 
You can also choose to activate dynamic color mode which will modify the luminosity and saturation of your theme colors depending on the current time. 
In addition to this, you can opt to adjust skin automatically, which means that the system will choose between Sandstone neutral and light modes according to the colors you have set.
On the second Panel you can interact with color fields by clicking the colored circle which will open the basic color picker.

#### Reset Theme

The `Reset` button will revert all the changes to the active selected preset.
