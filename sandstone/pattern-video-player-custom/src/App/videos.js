// Videos List
const videos = [
	{
		title: 'Sintel',
		poster: 'http://media.w3.org/2010/05/sintel/poster.png',
		source: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		type: 'video/mp4',
		desc: 'Custom mp4 video source.'
	},
	{
		title: 'm3u8 Video Source',
		source: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
		type: 'application/x-mpegURL',  // m3u8 mime type
		desc: 'Custom m3u8 video source.'
	}
];

export default videos;
