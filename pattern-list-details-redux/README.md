## List details pattern // City Viewer with Redux

A sample list details Enact application. This pattern focuses on layout for Enact apps.

This is a more scalable version of the City Viewer. It is hooked up with [Redux](http://redux.js.org/), using the presentational/container component pattern as laid out by Dan Abramov here: [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.sidi8whzp).

This layout is divided into `Head` and `Body`. Inside the Body component you can find the `Sidebar` and `Content`.

#### Run the App

Run `npm install` then
`npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components used
- `moonstone/Divider`
- `moonstone/IconButton`
- `moonstone/Image`
- `moonstone/CheckboxItem`

#### Running Tests

The sample includes examples on how to use unit tests with Enact. In this redux version, we only test the reducers here. To execute the tests, issue the following command:

```bash
npm run test
```

### Photo credits

All photos are found in [Pexels.com](https://www.pexels.com) under Public Domain CC0 license.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
