## Single panel pattern // Profile Photo Picker

A sample single panel Enact application where you can pick a profile photo from a given number of photos.

Run `npm install` then
`npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components used
- Image
- Slider
- Button
- Popup
- Picker
- Changable (Higher Order Component)

Take a look at the custom component  `./src/components/ProfilePhotoPicker.js`

On line 11, Picker is used with Changeable to create a functional Picker
```javascript
const StatefulPicker = Changeable(Picker);
```

which is then used in line 57
```jsx
<StatefulPicker onChange={this.handlePickerChange} width="large" >
  {imageComponents}
</StatefulPicker>
```

The rest is straight-forward: Slider controls the position of the main photo using `handleSliderChange` which changes the state of `photoPosition`

Popup component is used as an example in   `./src/components/SaveButton.js`

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
