## Custom Skin

A sample Enact application that uses custom-skin feature to style the components.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

This app will let you generate a stylesheet that customizes a sandstone application. On the right are all the interactive components, while on the left 
is the `Live Preview` area. Any change you make inside the app should be reflected inside `Live Preview`.

The dropdown on the top of the page allows you to choose between sandstone default skin and a few presets. There is also an option to import your own.

The switch near it turns on the auto generation of colors. This feature will generate a skin based on the first two colors listed(the background and text color).
Activating this feature will replace any other non generated color.

Below them are the color fields. You can interact with them by changing their value inside the input field, or by clicking the colored square beside the field (this will open the basic color picker).
When a valid color is selected, it will apply for the described CSS property. All the components have specific properties which apply to them. For example: 

In order to change the color inside the `Button` components you will need to update the `Component Text Color RGB` property, while the text inside the `Checkbox` component is changed by the `Text Color RGB`. 

At the bottom of the page there is another switch that controls if the output of the app will include variables that still have the default value.

The three ways of checking out content are also present here. `Show Output` will open a popup containing the contents of the generated stylesheet.
The `Copy` button will copy that content to the clipboard, while `Download` will generate you that CSS file with the same name as the `Title` field.

The `Reset` button will revert all the changes to the active selected preset, if one is chosen, or the default sandstone skin for imported ones.
