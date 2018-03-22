/* eslint-disable no-console */
const process = require('process'),
	readdirp = require('readdirp'),
	shell = require('shelljs');

let error = false;

function findApps () {
	return new Promise((resolve, reject) => {
		readdirp({depth: 1, fileFilter: 'package.json'}, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res.files);
			}
		});
	});
}

findApps()
	.then(files =>
		files.forEach(file => {
			if (file.parentDir) { // Ignore our own package.json
				console.log(`Building ${file.parentDir}`);
				shell.cd(file.fullParentDir);
				shell.exec('npm install && npm run pack', {silent: true}, (code, stdout) => {
					if (code) {
						console.log(`${file.parentDir} failed to build: ${stdout}`);
						error = true;
					}
				});
			}
		})
	);

process.on('exit', (code) => {
	process.exit(code || error ? 1 : 0);
});

