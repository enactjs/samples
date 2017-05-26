## LS2Request pattern

A sample Enact application that shows off how to derive a computed value from multiple LS2Request calls

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

### Enact Components Used
- `webos/LS2Request`

A component may require multiple LS2Request return values to form. In this sample, we show how to manage multiple LS2Request returns in Redux store, and show how to use selectors to compute derived data.

When you run this sample on TV, you may observe multiple information (e.g. foreground app ID, TV system name, country group, authentication, etc.) displaying after clicking on the button. Each information are gathered from different service calls, and need to be computed to display in a string format we want.

Whether data comes from multiple services or multiple keys from the same service, they should be all stored in redux store.  [Reselect](https://github.com/reactjs/reselect) library is a very useful for creating memoized, composable selector functions. We can use reselect selectors to efficiently compute derived data from Redux store.

```javascript
const getComplexValue = createSelector(
	[getFirstData, getSecondData],
	(firstData, secondData) => {
		// do complex logic to select value
		return firstData + secondData;
	}
);
```

### See also
- [Computing Derived Data](http://redux.js.org/docs/recipes/ComputingDerivedData.html)
- [Reselect](https://github.com/reactjs/reselect)

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
