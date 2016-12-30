## Routable panel pattern

A sample Enact application that shows off how to use Routable, Routes and Panels

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Routable` (Higher Order Component)
- `moonstone/Panels/Route`
- `ui/ViewManager/SlideLeftArranger`
- `moonstone/BodyText`
- `moonstone/Button`
- `moonstone/Scroller`

Using `Routes` and `Routable` you will have a very simple, declarative way to view and navigate through your panels. Just set up your routes and `RoutablePanels` will take care of the history logic.

Here's what your panels' JSX will end up looking like:

```
<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
	<Route path="first" component={AboutPanel} title="First" onClick={onSecondPanel}>
		<Route path="second" component={MainPanel} title="Second" onClick={onFourthPanel} />
		<Route path="third" component={MainPanel} title="Third" onClick={onFirstPanel}>
			<Route path="fourth" component={MainPanel} title="Fouth" onClick={onThirdPanel} />
		</Route>
	</Route>
</RoutablePanels>
```

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
