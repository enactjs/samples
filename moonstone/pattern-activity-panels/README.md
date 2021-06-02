## Activity Panels pattern

A sample Enact application that demonstrates how to use ActivityPanels

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Header`
- `moonstone/Panels/Panel`

If you have a list of panels defined as children of `ActivityPanels`, then you can navigate panels
by setting `index` prop in `ActivityPanels`.

```jsx
<ActivityPanels {...this.props} index={this.state.index} onSelectBreadcrumb={this.handleSelectBreadcrumb}>
	<MainPanel onClick={this.handleClick} title="First" />
	<MainPanel onClick={this.handleClick} title="Second" />
	<MainPanel onClick={this.handleClick} title="Third" />
	<MainPanel title="Fourth" />
</ActivityPanels>
```

The click event from `Button` will increase index by 1, and clicking breadcrumb will decrease index by 1.

```javascript
	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})
```

`onSelectBreadcrumb`, provided by `moonstone/Panels.BreadcrumbDecorator`, handles click event on
breadcrumb, and back key press.
*Note that index passed to the handler is the index to the previous panel.*

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
