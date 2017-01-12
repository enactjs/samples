## List-Redux

A sample Enact application that shows off how to use VirtualList + Redux + LS2Request. The app is a very stripped down version of ChannelEdit. This is designed to help developers connect the dots for a more complete application. Also we want to show off some differences between the newer `Enact` way and the `Enyo` way.

## Installation 

Clone this repo. Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can access it from a webOS device. To create an installable application, use `npm run pack` and then use the packaging tools to package the **dist** folder.

## Enyo Architecture vs Enact Architecture

### NOTE: This assumes you have some knowledge of redux and how it works.

In the `Enyo` version of the ChannelEdit app `Collections` and `Controllers` were used to a great 
extent. There were `Luna` methods inside of `Controllers`, and they were called inside of 
`Components` which then updated `Collections`. The basic ideas are very similar, but with `Enact` + 
`Redux` it makes the process a lot easier. As we know, `Redux` has all of the `State` in a single 
object that we can expose to our app. We can call `actions` from our `Component`, which will then 
pass the data received from a `Luna` method to a `Reducer`. From that reducer, we can decide what 
part of our `State` to update. Using `react-redux` and `connect` we can update the parts of the 
tree that need to be updated. We don't need to mess with binding, which allows us to have more 
declarative code.

## Redux Shape

If you look in the `reducers.js` file we'll see what looks like a standard reducer. One thing to note is the shape of the `initialState`. This will be the state of our channel reducer. We could use one `Array` for all the channels, but that would lead to very inefficient updates.

```javascript
let initialState = {
	channelsOrder: [],
	channels: {},
	selectedChannels: new Set()
};
```

We break things up into 3 parts: `channelsOrder`, `channels` (which is an object), and `selectedChannels` (which is a set).

It's very important to choose the correct data structures for our store.

We use and `Array` for `channelsOrder` which only holds the `channelId`.

We use an `Object` for channels so we can index each channel by it's `channelId`. This way we can make quick updates to our store and also have minimal re-renders.

We use a `Set` for `selectedChannels` because it makes it very easy and performant way to add and remove values compared to an `Array`.


This technique is explained in detail here: https://medium.com/@lavrton/optimizing-react-redux-store-for-high-performance-updates-3ae6f7f1e4c1

Then in our `ChannelItem` component we can call:

```javascript
const mapStateToProps = ({channels}, {dataIndex}) => ({
	selected: channels.channels[dataIndex].selected,
	locked: channels.channels[dataIndex].locked,
	channelNumber: channels.channels[dataIndex].channelNumber
});
```

This will update only the items that need to be updated when `locked`, `unlocked`, or `selected`. 

**It is important to only expose the parts of the data we need to the component. This will make it much more performant.** 

Starting out with a good redux shape will save you from performance problems down the line.

#### Enact Components Used
- `moonstone/Button`
- `moonstone/LabeledItem`
- `webos/LS2Request`

The main thing we want to take away from this project is how to update data using redux

In the sample, there are two luna service calls being made at `componentDidMount`: one with
`subscribe: true`, and one without. If the call is subscribed, then the setter action
(e.g. `setSystemSettings`) does not directly interfere with redux data flow.

For a setter action that is expected to be handled by a subscribed callback, we don't need to dispatch
an action. See `setSystemSettingsSubscribed` in **./src/actions/actions.js** for more details.

---

This project was bootstrapped with [enact-dev](https://github.com/enyojs/enact-dev).