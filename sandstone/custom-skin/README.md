How to add/remove/change colors for the custom skin application: 

In order to change add a color to the app what you need are 3 different things: 
1) Name you wish to display inside the app
2) It's value in hex
3) The name of the css property

With this three things you must next go to the MainPanel.js and create a pair of [`colorName`, `setColorName`]
using the hook `useState` giving the default value the `hex value` mentioned above. You must add 
`colorName` to the `colors` array and the `setColorName` to `setColors` array. You must also add the name
chosen for display inside `propNames` array and the css property name to `varNames` array.

For example: For `TextColorRGB` we created [`TextSubColor`, `setTextSubColor`] = `useState(`'#ABAEB3'`)`, 
we added them to `colors` and `setColors`, we decided that the display name would be 'Text Sub Color' and we
added it to `propNames` and the css attribute we added to `varNames` was `--sand-text-sub-color`.

If the color must be represented as RGB color please add RGB at the end display name (ex: `Component Text Color RGB`).

When we add all those variables to their arrays please add them at the same index as this is the method
by which we do most of the operations.

Next in order to generate the colors we go to the util.js. Here in generateColors function we return an array
of colors that contains all the colors we use for auto mode. Please insert a new value to in that array at 
the index you inserted the color in all those arrays back in the MainPanel.js. The value is chosen thus:

If the default hex value for our attribute is equal to another's we copy that attribute's return element four 
the new one (ex: `Text Sub Color` has the same default value as `Component Text Sub Color RGB` so they
both return `textColors[0].toUpperCase()` ). This is the case if they are both in the same category (both are
background colors or both are text colors). If this is the first time this hex value appears just add one
to the limit of `generateBGColors` (or `generateTextColors` for text colors) and use the new color generated.


After you add/remove or edit the variables please check the app to see if there are any unintended changes applied 
to the non live preview components.
