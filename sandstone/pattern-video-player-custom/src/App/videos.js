import subtitleFile from './subtitle.vtt';  // import subtitle file

// Videos List
const videos = [
	{
		title: 'mp4 Video Source',
		poster: 'http://media.w3.org/2010/05/sintel/poster.png',
		source: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		subtitle: subtitleFile,
		type: 'video/mp4',
		desc: 'Custom mp4 video source.'
	},
	{
		title: 'm3u8 Video Source',
		source: '',  // m3u8 video url
		type: 'application/x-mpegURL',  // m3u8 mime type
		desc: 'Custom m3u8 video source.'
	}
];

export default videos;
