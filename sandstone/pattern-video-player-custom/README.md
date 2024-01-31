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

Subtitles are also added to videos by importing subtitle files in [videos.js](src/App/videos.js).
WebVTT format (.vtt files) subtitles are supported only, and other formats should be converted into WebVTT format.

If the video format is `m3u8`, you can play it by writing the mime type of the video as `application/x-mpegURL` in [videos.js](src/App/videos.js).

You can find a more detailed view inside of [App.js](src/App/App.js)

---

This project was bootstrapped with the Enact [cli](https://github.com/enactjs/cli).
