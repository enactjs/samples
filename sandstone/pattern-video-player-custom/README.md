## VideoPlayerCustom pattern

A sample Enact application that demonstrates how to add and play the custom videos in VideoPlayer.

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `sandstone/Button`
- `sandstone/Group`
- `sandstone/Panels/Header`
- `sandstone/Panels/Panel`
- `sandstone/RadioItem`
- `sandstone/Scroller`
- `sandstone/VideoPlayer`

Videos in [videos.js](src/App/videos.js) are added to VideoPlayer.

If the video format is `m3u8`, you can play it by running `npm install hls.js` and importing [hls.js](https://github.com/video-dev/hls.js).

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
