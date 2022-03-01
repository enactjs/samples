## Activity Panels deep linking pattern

A sample Enact application that shows off how to use Routable, Routes and ActivityPanels

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Header`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Routable` (Higher Order Component)
- `moonstone/Panels/Route`

Similar to routable panels pattern sample, using `Routes` and `Routable` you will have a very simple,
declarative way to view and navigate through your panels. Just set up your routes and `RoutablePanels`
will take care of the history logic.

Here's what your panels' JSX will end up looking like:

```jsx
<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
	<Route component={MainPanel} onClick={onSecondPanel} path="first" title="First">
		<Route component={MainPanel} onClick={onThirdPanel} path="second" title="Second">
			<Route component={MainPanel} onClick={onFourthPanel} path="third" title="Third">
				<Route component={MainPanel} path="fourth" title="Fourth"/>
			</Route>
		</Route>
	</Route>
</RoutablePanels>
```

You can find a more detailed view inside of [App.js](src/App/App.js)

To deep link at app launch time, you can set the initial state of `path` and feed it to the store.

```javascript
// set default launch path
const launchParam = '/first/second';
const store = configureStore({
	path: launchParam
});
```

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
