const {writeToFile} = require('./writeToFile');
const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
	const body = [];

	if (req.method === 'POST' && req.url === '/write') {
		req.on('data', (chunk) => {
			body.push(chunk);
		});

		req.on('end', () => {
			// eslint-disable-next-line
			const finalBody = Buffer.concat(body)?.toString()?.split(':')[1]?.split('[')[1]?.split(']}')[0];
			let colors = finalBody.split(',');
			colors = colors.map(color => {
				if (color.length > 5) {
					return color.split('"')[1];
				} else {
					return color;
				}
			});
			writeToFile(colors);
		});

		res.setHeader('access-control-allow-origin', '*');
		res.statusCode = 200;
	} else {
		res.setHeader('access-control-allow-origin', '*');
		res.statusCode = 400;
	}
	res.end();
});

server.listen(port);
