## Spotlight-managed Activity Panels pattern

A sample Enact application that demonstrates Spotlight focus-management in an ActivityPanels scenario

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Header`
- `moonstone/Button`
- `moonstone/Item`

If you have a list of panels defined as children of `ActivityPanels`, then you can navigate panels
by setting `index` prop in `ActivityPanels`.

The click event from `Button` and `Item` will increase index by 1, and clicking breadcrumb will decrease index by 1.

```javascript
	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})
```

`onSelectBreadcrumb`, provided by `moonstone/Panels.BreadcrumbDecorator`, handles click event on
breadcrumb, and back key press.
*Note that index passed to the handler is the index to the previous panel.*

When using spotlight 5-way navigation to move between `ActivityPanels`, the last-focused spottable control in a previously-viewed `Panel` should receive focus priority. If the `Panel` is being viewed for the first time, spottable controls in the `Panel` body should receive focus priority. If none are available, other spottable controls in the `Header` should receive focus.

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
