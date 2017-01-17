# List-Redux

A sample Enact application that shows off how to use VirtualList + Redux + LS2Request. The app is a very stripped down version of ChannelEdit. This is designed to help developers connect the dots for a complete application. Also, we want to show off some differences between the newer Enact way and the Enyo way.

## Installation

Clone this repo. Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

## Enyo Architecture vs Enact Architecture

Even though Enyo and Enact are both component based JavaScript libraries, there are quite a few differences between the two.

### Mixins

In Enyo we used `mixin`s. `Mixin`s are a way for us to apply functionality to a component without extending from a parent object or class. In Enact we have `Higher-Order Components` or `HOC`s. `HOC`s are components or functions that we can use to wrap other components to give add functionality to the wrapped component. The biggest difference between a `mixin` and a `HOC` is that a `mixin` adds methods straight to a component while a `HOC` composes a new component - this means that `mixin`s can potentially overwrite methods with the same name. We are using a few `HOC`s in our code (e.g `AppStateDecorator` and `connect`). These give us the ability to do routing and manage global state. Also, a lot of our `Moonstone` components are already wrapped so there is rarely a need to add in things like `Spotlight` or `Marquee` support directly.

You can read more about `HOC`s here:

[Facebook Docs Higher-Order Components](https://facebook.github.io/react/docs/higher-order-components.html)

[Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.2lgpctscu).

### Redux

**NOTE: This assumes you have some knowledge of Redux and how it works.**

In the Enyo version of the ChannelEdit app, `Collection`s and `Controller`s were used to a great extent. We called `Controller` commands from our `Component`s which called `Luna` commands. Then we updated our `Collection`s, which we received an event from. Finally, we had to imperatively update our `Component` based on the `Collection` change event.

The basic ideas are very similar, but with Enact and Redux the process is a lot easier. As we all know, Redux maintains all of the `state` in a single object that we can expose to our app. We can call `actions` from our `Component`, which will then pass the data received from a `Luna` method to a reducer. From that reducer, we can decide what part of our `state` to update. Using `react-redux` and `connect` we can pass new props to the `Component`. If we set up our `Component`s correctly, the view will update correctly based on the new props from `Redux`. This means we don't need to handle the event, we just need to handle the new data. This allows us to reason about our code much more easily.

In `Enyo` we also had support for the `flux` pattern. Redux is a simplified and very popular version of `flux`.

### VirtualList + Redux

In many apps like `ChannelEdit`, we need to use `VirtualList` and Redux together. This allows us to list as many things as we need with minimal performance impact. `VirtualList` is very good rendering only what is on screen. However, if we need to make UI updates inside of the list there is still the potential to trigger re-renders when they aren't wanted. Below we'll discuss why it's important to have an optimized Redux state shape.

### Redux State Shape

#### The Naïve Approach

**Problem 1: Poor Redux Shape**

Redux shape is a very important topic. The Redux store is just a single JavaScript object. The simplicity is great for developers. We can just put things into a Redux store and it will update our views with no problem. It can be tempting to make its shape look as simple as possible. However, there could be a very inefficient view that can potentially be a performance problem down the line.

When you first learn Redux through something like a TODO List sample, the example will just have an array of items to represent a list. This is very easy for the developer and if we need to make an update to a specific item we just traverse through the list making our needed updates.

```javascript
// Initial Shape
let initialState = {
	channels: []
};

// each channel in the channels array can look something like this:
{
	channelId: '1_2_3_4_5'
	selected: true,
	locked: false
	//... more data
}

//reducer section
case 'SELECT_ITEM' : {
	const selectedIndex = action.selectedIndex
	const newState = state.channel.map((val, index) => {
		return selectedIndex === index ? val.selected = true : val
	});
	return Object.assign({}, newState);
}

```

But what happens when our list grows to a very large amount? If we have 1000 channels, then we're looking at up to 1000 pieces of data every time, when we just need to access 1 specific piece.

**Problem 2: Sending out too much data to components**

Another common mistake when using Redux is to just place a connect at the top of the tree and let React take care of the updates.

Inside our `ChannelList.js`

```javascript
const renderComponent = ({data, key}) => {
	return (<ChannelItem key={key} data={data} />);
};

const mapStateToProps = ({channels}) => ({
	channels: channels.channels
});

export default connect(mapStateToProps)(ChannelList);
```

In this example, we're just taking channels with all of the data and passing them all to the list. Each component will get all the data from a channel. This approach will work, but every time the list changes it will trigger a re-render for all of the children inside of `VirtualList` instead of just the one that needs to be updated.

#### The Optimized Approach
**To solve our first problem we need to reorganize our Redux shape.**

If you look in the `reducers.js` file we'll see what looks like a standard reducer. One thing to note is the shape of the `initialState`. This will be the state of our channel reducer. We could use one `Array` for all the channels, but that would lead to very inefficient updates.

```javascript
let initialState = {
	channelsOrder: [],
	channels: {},
	selectedChannels: new Set()
};
```

We break things up into 3 parts: `channelsOrder` (array), `channels` (object), and `selectedChannels` (set).

It's very important to choose the correct data structures for our store.

We use an `Array` for `channelsOrder` which only holds the `channelId` of each channel.

We use an `Object` for channels so we can index each channel by its `channelId`. This way we can directly access our channels and make quick updates to our store.

We use a `Set` for `selectedChannels` because it is very easy and efficient to add and remove values when compared to an `Array`.

Take a look inside `reducers.js` to see how we organized our data from `Luna` to Redux.

**Note: We are trying to make our reducers pure so we're trying to emphasize immutability**

```javascript
case 'RECEIVE_CHANNEL_LIST': {
	const newState = action.payload.channelList.reduce((previous, current) => {
		const channelObj = Object.assign({}, previous);
		const currentChannel = Object.assign({}, current);

		const channelOrder = channelObj.channelsOrder.concat(currentChannel.channelId);

		channelObj.channelsOrder = channelOrder;
		channelObj.channels[currentChannel.channelId] = currentChannel;

		return channelObj;
	}, state);

	return Object.assign({}, state, newState);
}
```

Now that we have this all set, we have solved the problem of having the wrong data shape. This means we can access any channel without traversing through an array.

**To solve our second problem we need to specify the data received by our connected components**

Now that we have a new shape inside `ChannelList.js` we can now do this.

```javascript
const renderComponent = ({data, index, key}) => {
	return (<ChannelItem key={key} dataIndex={data[index]} />);
};

const mapStateToProps = ({channels}) => ({
	channels: channels.channelsOrder
});

export default connect(mapStateToProps)(ChannelList);
```

This will only send in our specific `channelIds` to each `ChannelItem` as a `dataIndex`.

Then in our `ChannelItem` component we can do this:

```javascript
const mapStateToProps = ({channels}, {dataIndex}) => ({
	selected: channels.selectedChannels.has(dataIndex),
	locked: channels.channels[dataIndex].locked,
	//...Any other state that we need
});
```

This will update only the items that need to be updated when `locked` or `selected` are changed. You must remember to explicitly retrieve all the data you need or else different updates to a channel can trigger a re-render.

Now that we have this more specific `connect` we have solved the second problem.

This technique is explained in more detail here:

[Optimizing React-Redux](https://medium.com/@lavrton/optimizing-react-redux-store-for-high-performance-updates-3ae6f7f1e4c1)

[Normalizing State Shape](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html)

### LS2Request

If you take a look into the `actions.js` file you can find how we do LS2Requests. It's pretty straightforward. You just need to dispatch these actions from an event. You need to call `LS2Request` inside of an action, and then in `onSuccess` you must pass the response to a function with a `type`. This way your reducer will know what to do with the data.

```javascript
export const getChannelList = params => dispatch => {
	return new LS2Request().send({
		service: 'luna://com.webos.service.iepg',
		method: 'getChannelList',
		parameters: params,
		onSuccess: (res) => {
			dispatch(receiveChannelList(res));
		},
		onFailure: (res) => console.error(res)
	});
};

function receiveChannelList (res) {
	return {
		type: 'RECEIVE_CHANNEL_LIST',
		payload: res
	};
}
```

You can read more here:
[Enact Redux Async Docs with LS2Request Sample](http://nebula.lgsvl.com/enyojs/enact-docs/develop/docs/developer-guide/redux/redux_async/)
[Redux Async Actions](http://redux.js.org/docs/advanced/AsyncActions.html)

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).
