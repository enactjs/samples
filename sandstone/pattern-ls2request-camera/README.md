## LS2Request Camera pattern

A sample Enact application that shows off how to use camera API by LS2Request

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

#### Enact Components Used
- `sandstone/Button`
- `sandstone/Panels/Header`
- `sandstone/Panels/Panel`
- `webos/LS2Request`

Most webOS apps require interaction with LS2Request. In this sample, we show how to
use LS2Request with Redux.

#### Running Tests

The sample includes examples on how to use unit tests with Enact. To execute the tests, issue the following command:

```bash
npm run test
```

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
