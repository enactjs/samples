## View transitions pattern // City Viewer

A sample view transitions Enact application. This pattern focuses on layout transitions for Enact apps.

In this app, you can browse photos of different cities around the world.
This layout is divided into `Head` and `Body`. Inside the Body component you can find the `Sidebar` and `Content`.
`MainView` handles the state for picking a country and Body handles the state for picking the city to view.

Run `npm install` then
`npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components used
- `ui/Button`
- `ui/Group`
- `ui/Heading`
- `ui/Icon`
- `ui/Image`
- `ui/Item`
- `ui/Marquee`

#### Running Tests

The sample includes examples on how to use unit tests with Enact. To execute the tests, issue the following command:

```bash
npm run test
```

### Photo credits

All photos are found in [Pexels.com](https://www.pexels.com) under Public Domain CC0 license.

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
