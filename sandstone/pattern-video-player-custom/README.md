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

If the video format is `m3u8`, you can play it by writing url of the video and mime type as `application/x-mpegURL` in [videos.js](src/App/videos.js).
We support `m3u8` format using [hls.js](https://github.com/video-dev/hls.js) which is imported in [App.js](src/App/App.js).
[App.js](src/App/App.js) brings video information from [videos.js](src/App/videos.js) and bind source and video element in video player depending on mime type.

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
