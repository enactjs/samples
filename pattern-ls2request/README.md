## LS2Request pattern

A sample Enact application that shows off how to use LS2Request

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/LabeledItem`
- `webos/LS2Request`

Most webOS apps require interaction with LS2Request. In this sample, we show how to
use LS2Request with Redux.

We recommend that you declare your luna service requests in actions. Note that `LS2Request.send()` is
an asynchronous function, so we return a function instead of plain object. 

```javascript
export const getSystemSettings = params => dispatch => {
	return new LS2Request().send({
		service: 'luna://com.webos.settingsservice/',
		method: 'getSystemSettings',
		parameters: params,
		onSuccess: (res) => {
			dispatch(receiveSystemSettings(res));
		},
		onFailure: (res) => console.error(res)
	});
};
```

In the sample, there are two luna service calls being made at `componentDidMount`: one with
`subscribe: true`, and one without. If the call is subscribed, then the setter action
(e.g. `setSystemSettings`) does not directly interfere with redux data flow.

For a setter action that is expected to be handled by a subscribed callback, we don't need to dispatch
an action. See `setSystemSettingsSubscribed` in **./src/actions/actions.js** for more details.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
