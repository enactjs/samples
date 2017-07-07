## Preserving focus in VirtualList Pattern

A sample Enact application that shows how to preserve focus in `VirtualList` when navigating `Panel`s.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Header`
- `moonstone/Button`
- `moonstone/Item`
- `moonstone/VirtualList`

To preserve the last focus, you need to set a unique `containerId` to `VirtualList`.
In this sample, we passed `id` prop from `MainPanel` to `VirtualList`.

If you do this, `Spotlight` and `VirtualList` will recover the last focus when the `Panel` is mounting.

In addition, if you want to preserve the last scroll position, you can save the scroll position from `onScrollStop` callback and restore it with `scrollTo` method.
You may need to use redux for managing each scroll position for VirtualLists.

In `PatternList` view, `containerId` is set and `onScrollStop` calls dispatching `saveLastScrollInfo` action.
```javascript

render = () => {
  const {onScrollStop, id, ...rest} = this.props;
  delete rest.scrollLeft;
  delete rest.scrollTop;

  return (
    <VirtualList
      cbScrollTo={this.getScrollTo}
      className={css.list}
      component={this.renderItem}
      containerId={id}
      data={items}
      dataSize={items.length}
      itemSize={ri.scale(72)}
      onScrollStop={onScrollStop}
    />
  );
}

const mapDispatchToProps = (dispatch, {index}) => ({
  onScrollStop: (info) => dispatch(saveLastScrollInfo(index, info))
});

```

`lastScrollInfo` will be injected as props to the list and it can be restore it with `scrollTo` method.

```javascript
componentDidMount () {
  const {scrollLeft, scrollTop} = this.props;
  this.scrollTo({position: {x: scrollLeft, y: scrollTop}, animate: false});
}

const mapStateToProps = ({lastScrollInfo}, {index}) => {
  const info = lastScrollInfo[index];
  return {
    scrollLeft: info ? info.scrollLeft : 0,
    scrollTop: info ? info.scrollTop : 0
  };
};

```

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
