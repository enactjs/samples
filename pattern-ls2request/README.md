## LS2Request pattern

A sample Enact application that shows off how to use LS2Request

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/LabeledItem`
- `webos/LS2Request`

In order to create a webOS app, you need to interact with LS2Request. In this sample, we show how to
use LS2Request with redux.

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

In the sample, there are two luna service calls being made at the `componentDidMount`: one with
`subscribe: true`, and one without. If the call is subscribed, then the setter action
(e.g. `setSystemSettings`) does not directly interfere with redux data flow.

For a setter action that is expected to be handled by subscribed callback, we don't need to dispatch
and action. See `setSystemSettingsSubscribed` in `./src/actions/actions.js` for more details.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
