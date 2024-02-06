## VideoPlayerCustom pattern

A sample Enact application that demonstrates how to play `m3u8` in VideoPlayer by importing [hls.js](https://github.com/video-dev/hls.js).

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `sandstone/Button`
- `sandstone/Group`
- `sandstone/Panels/Header`
- `sandstone/Panels/Panel`
- `sandstone/RadioItem`
- `sandstone/Scroller`
- `sandstone/VideoPlayer`

The video data, including the URL and mime type, are stored in [videos.js](src/App/videos.js). For `m3u8` videos, the mime type should be `application/x-mpegURL`.
To enable `m3u8` video playback, the application uses [hls.js](https://github.com/video-dev/hls.js), which is imported in [App.js](src/App/App.js).
In [App.js](src/App/App.js), the application retrieves the video data from [videos.js](src/App/videos.js) and assigns the source and video element to the VideoPlayer based on the mime type.

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
