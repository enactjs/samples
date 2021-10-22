const fs = require('fs');
const path = require('path');

const generateCSS = (res) => {
	// eslint-disable-next-line
	const filePath = path.join(__dirname, 'custom_skin.css');
	const stat = fs.statSync(filePath);
	const readStream = fs.createReadStream(filePath);

	res.setHeader('access-control-allow-origin', '*');

	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Content-Length': stat.size
	});

	readStream.on('data', (data) => {
		res.write(data);
	});

	readStream.on('end', () => {
		res.end();
	});
};

module.exports = {
	generateCSS
};
