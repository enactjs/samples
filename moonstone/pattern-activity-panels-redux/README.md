## Activity Panels pattern with Redux

A sample Enact application that demonstrates how to use ActivityPanels with Redux

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Header`
- `moonstone/Panels/Panel`

If you have a list of panels defined as children of `ActivityPanels`, then you can navigate panels
by setting `index` prop in `ActivityPanels`.

```javascript
render: ({index, pushPanel, popPanel, ...rest}) => {
	return (
		<ActivityPanels {...rest} index={index} onSelectBreadcrumb={popPanel}>
			<MainPanel onClick={pushPanel} title="First" />
			<MainPanel onClick={pushPanel} title="Second" />
			<MainPanel onClick={pushPanel} title="Third" />
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

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
