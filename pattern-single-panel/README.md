## Single panel pattern // Profile Photo Picker

A sample single panel Enact application where you can pick a profile photo from a given number of photos.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Image`
- `moonstone/Slider`
- `moonstone/Button`
- `moonstone/Popup`
- `moonstone/Picker`

Take a look at the custom component  `./src/components/ProfilePhotoPicker.js`
Slider controls the position of the main photo using `handleSliderChange()` which changes the state of `photoPosition`

The `Popup` component is used in   `./src/components/SaveButton.js`

#### Running Tests

The sample includes examples on how to use unit tests with Enact. To execute the tests, issue the following command:

```bash
npm run test
```

### Photo credits

All photos are found in [Pexels.com](https://www.pexels.com) under Public Domain CC0 license.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
