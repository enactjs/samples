## Routable panel pattern

A sample Enact application that shows off how to use Routable, Routes and Panels

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `sandstone/BodyText`
- `sandstone/Button`
- `sandstone/Panels/Panel`
- `sandstone/Panels/Routable` (Higher Order Component)
- `sandstone/Panels/Route`
- `sandstone/Scroller`
- `ui/ViewManager/SlideLeftArranger`

Using `Routes` and `Routable` you will have a very simple, declarative way to view and navigate through your panels. Just set up your routes and `RoutablePanels` will take care of the history logic.

Here's what your panels' JSX will end up looking like:

```
<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
	<Route path="first" component={AboutPanel} onClick={onSecondPanel} title="First">
		<Route path="second" component={MainPanel} onClick={onFourthPanel} title="Second" />
		<Route path="third" component={MainPanel} onClick={onFirstPanel} title="Third">
			<Route path="fourth" component={MainPanel} onClick={onThirdPanel} title="Fouth" />
		</Route>
	</Route>
</RoutablePanels>
```

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
