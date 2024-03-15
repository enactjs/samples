## Custom Colors LS2Request pattern

A sample Enact application demonstrating how to customize a Sandstone app using a Setting Service with a `customUi` category via LS2Request.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

This app will help you choose a preset theme and/or customize the Sandstone UI components for your application. 

This sample is separated in three distinct views, each part further expanding upon the customization applied to your 
sandstone application. To make the most of this sample the app must on WebOS, but it works on any other operating system (except of luna calls)

### Presets

All the presets we used in this app are provided by the Enact team. They are stored inside the presets.js file and can
be used in any application you wish. They are also used to derive the presets default colors stored inside the 
presetsDefaultColors.js file. These are the standard Sandstone presets.

### Context

The app uses React Context for internal data storing, but it can be modified for your needs.
The context structure is the following:

* activeTheme - denotes the name of the currently active preset (type String)
* lightMode: - variable which indicates if the lightMode has been chosen for the sandstone app (type Boolean)
* backgroundColor: - hex color that will be used for the `--sand-bg-color` CSS property (type String)
* componentBackgroundColor: - hex color that will be used for the `--sand-component-bg-color` CSS property (type String)
* focusBackgroundColor: - hex color that will be used for the `--sand-focus-bg-color-rgb` CSS property (type String)
* popupBackgroundColor: - hex color that will be used for the `--sand-overlay-bg-color-rgb` CSS property (type String)
* subtitleTextColor: - hex color that will be used for the `--sand-text-sub-color` CSS property (type String)
* textColor: - hex color that will be used for the `--sand-text-color-rgb` CSS property (type String)
* colors: - long string that will be used inside the stylesheet to apply all the changes to our app (type String)
  
#### Preset Choice View

In this view we chose a preset that is applied inside our sandstone application. This preset is chosen from a list of default
sandstone presets, available inside the preset.js file. After we chose the preset, we update the context with the preset name (activeTheme),
the stylesheet content (colors) and the default colors for that preset (backgroundColor, componentBackgroundColor, focusBackgroundColor,
popupBackgroundColor, subtitleTextColor, textColor). The default colors can be found inside the presetDefaultColors.js file.

Inside this view we also chose if we use the light or neutral skin for sandstone. After the user chooses, we save that choice
inside lightMode.

#### Color Customization View

In this view we can further customize the chosen preset by changing some of the default colors. The colors we can modify are backgroundColor, 
componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor and textColor. The colors we chose to add
to open for this customization cover most of the aspects of our sandstone apps. Once we changed a color it will be updated inside
the context in order to be used later inside the Showcase view. This colors start as the default colors from the chosen preset,
and changing the preset again will override them. We also have a reset button to manually reset them to the preset default colors.
All the preset default colors are stored inside presetDefaultColors.js.

### Showcase View

Inside this view we show you how to customize the app with all the changes we've made so far.
In order to customize our sandstone app we need to append a stylesheet to the root of our app. The content of this 
stylesheet is saved already inside our context (the colors property).This will load our chosen preset and change the 
colors of the sandstone app. If we want to also change the default colors we will append an additional stylesheet. The 
structure of that stylesheet can be seen in this view.

It should be mentioned that if you have the context set up properly, you can copy the useEffect we used in this view to
any other sandstone application and it will work. 

If you do not wish to customize the app with your own colors, not the one provided by us, you can replace the colors
variable with your own CSS file. In order to do so easily you can create a sandstone skin using our sample called 
feature-custom-skin-generator and save it as a string inside your application. You can check the presets.js file to see
how such a string needs to look like.

### Use LS2Request

Active preset, default customization colors, colors(CSS stylesheet) and lightMode are saved in a key located in `com.webos.service.settings/` 
with the following structure:
```
category: 'customUi',
settings: {
    key: 'theme'
}
```

Using LS2Request, every time a preset, a color or lightMode is changed, we update `theme` key using `setSystemSettings` function located in 
`./lunaCalls/setSystemSettings.js`. Note that the key data should be saved in String format using `JSON.stringify`.

Example:
```
new LS2Request().send({
	service: 'luna://com.webos.service.settings/',
	method: 'setSystemSettings',
	parameters: {
		category: 'customUi',
		settings: {
			theme: JSON.stringify(updatedData)
		}
	}
})
```

`theme` key does not have a default value defined, it comes as an empty string. Because of this, we need to check the value 
of `theme` key when the sample first loads and set a value for the key. In this sample we used the app context as a default value.

Example:
```
new LS2Request().send({
    service: 'luna://com.webos.service.settings/',
	method: 'getSystemSettings',
	parameters: {
		category: 'customUi',
		keys: ['theme']
	},
	onSuccess: (res) => {
		// if `theme` key is empty, populate with a default value
		if (res.settings.theme === '') {
			new LS2Request().send({
				service: 'luna://com.webos.service.settings/',
				method: 'setSystemSettings',
				parameters: {
					category: 'customUi',
					keys: JSON.stringify(defaultValue)
				}
			});
		}
	}
});
```

After the key data is set, we can fetch the data stored in `theme` and update app context. This is done with `getSystemSettings`
function located inside `./lunaCalls/getSystemSettings.js`. In this sample it accepts `setContext` parameter to update the
context when data is available, but it can be changed depending on your chosen data storage or even omitted.

Example:
```
new LS2Request().send({
	service: 'luna://com.webos.service.settings/',
	method: 'getSystemSettings',
	parameters: {
		category: 'customUi',
		keys: ['theme']
	},
	onSuccess: (res) => {
		// if data is not initialized, don't update app context
		if (res.settings.theme === '') return;
		// update app context with values retrieved from SettingsService
		setLocalData(JSON.parse(res.settings.theme)); // change this method that suits your data storage
		// eslint-disable-next-line no-console
		resolve(res);
	}
});
```
