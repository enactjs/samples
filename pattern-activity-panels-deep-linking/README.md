## Activity Panels deep linking pattern

A sample Enact application that shows off how to use Routable, Routes and ActivityPanels

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Routable` (Higher Order Component)
- `moonstone/Panels/Route`
- `moonstone/Panels/Header`
- `moonstone/Button`

Similar to routable panels pattern sample, using `Routes` and `Routable` you will have a very simple,
declarative way to view and navigate through your panels. Just set up your routes and `RoutablePanels`
will take care of the history logic.

Here's what your panels' JSX will end up looking like:

```jsx
<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
	<Route path="first" component={MainPanel} title="First" onClick={onSecondPanel}>
		<Route path="second" component={MainPanel} title="Second" onClick={onThirdPanel}>
			<Route path="third" component={MainPanel} title="Third" onClick={onFourthPanel}>
				<Route path="fourth" component={MainPanel} title="Fourth" />
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

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
