## Activity Panels pattern with Redux

A sample Enact application that demonstrates how to use ActivityPanels with Redux

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Header`
- `moonstone/Button`

If you have a list of panels defined as children of `ActivityPanels`, then you can navigate panels
by setting `index` prop in `ActivityPanels`.

```javascript
render: ({index, pushPanel, popPanel, ...rest}) => {
	return (
		<ActivityPanels {...rest} onSelectBreadcrumb={popPanel} index={index}>
			<MainPanel title="First" onClick={pushPanel} />
			<MainPanel title="Second" onClick={pushPanel} />
			<MainPanel title="Third" onClick={pushPanel} />
			<MainPanel title="Fourth" />
		</ActivityPanels>
	);
}
```

`onSelectBreadcrumb`, provided by `moonstone/Panels.BreadcrumbDecorator`, handles click event on
breadcrumb, and back key press.
*Note that index passed to the handler is the index to the previous panel.*

In this pattern sample, `index` state is managed in redux. There are two actions to manage index:
`increaseIndex` and `decreaseIndex`. Each action will increase and decrease index state in index reducer.

In `App` view, `index` state is map to `index` props via `mapStateToProps` and `pushPanel`, `popPanel`
props are added via `mapDispatchToProps` to dispatch `increaseIndex`, `decreaseIndex` accordingly.

```javascript
const mapStateToProps = ({index}) => ({
	index
});

const mapDispatchToProps = (dispatch) => {
	return {
		pushPanel: () => dispatch(increaseIndex()),
		popPanel: () => dispatch(decreaseIndex())
	};
};
```

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
