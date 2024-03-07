import subtitleFile1 from './subtitleEN.vtt';  // import subtitle file
import subtitleFile2 from './subtitleKO.vtt';  // import subtitle file

// Videos List
const videos = [
	{
		title: 'mp4 Video Source',
		poster: 'http://media.w3.org/2010/05/sintel/poster.png',
		source: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		subtitles: [
			{file: subtitleFile1, lang: "en"},
			{file: subtitleFile2, lang: "ko"}
		],
		type: 'video/mp4',
		desc: 'Custom mp4 video source.'
	},
	{
		title: 'm3u8 Video Source',
		source: '',  // put m3u8 video url here
		subtitles: [],
		type: 'application/x-mpegURL',  // m3u8 mime type
		desc: 'Custom m3u8 video source.'
	}
];

export default videos;
