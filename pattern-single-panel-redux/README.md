## Single panel pattern // Profile Photo Picker with Redux

A sample single panel Enact application where you can pick a profile photo from a given number of photos and adjust the photo size. State is managed with Redux.

This is a more scalable version of the Profile Photo Picker. It is hooked up with [Redux](http://redux.js.org/), using the presentational/container component pattern as laid out by Dan Abramov here: [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.sidi8whzp).

Run `npm install` then
`npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Moonstone Components used
- `moonstone/Image`
- `moonstone/Slider`
- `moonstone/Button`
- `moonstone/Popup`
- `moonstone/Picker`

#### Running Tests

The sample includes examples on how to use unit tests with Enact. To execute the tests, issue the following command:

```bash
npm run test
```

### Photo credits

All photos are found in [Pexels.com](https://www.pexels.com) under Public Domain CC0 license.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
