## LS2Request Camera pattern

A sample Enact application that shows off how to use camera API by LS2Request

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

#### Enact Components Used
- `sandstone/Button`
- `sandstone/Panels/Header`
- `sandstone/Panels/Panel`
- `webos/LS2Request`

Most webOS apps require interaction with LS2Request. In this sample, we show how to use LS2Request with Redux.

To use camera API in your web app, you need to set permissions for methods.
First, you need to identify the ACG information for the camera methods.
Then specify the method's ACG information in the `appinfo.json` file.

appinfo.json
```json
{
    ...
    "requiredPermissions": ["camera.query", "camera.operation"]
    ...
}
```

https://www.webosose.org/docs/guides/development/web-apps/using-ls2-api-in-web-apps/#identify-the-acg-group-of-the-methods

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
