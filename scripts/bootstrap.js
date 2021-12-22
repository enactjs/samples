/* eslint-disable no-console */
const process = require('process'),
	readdirp = require('readdirp'),
	shell = require('shelljs');

let error = false;

function findApps () {
	return new Promise((resolve, reject) => {
		readdirp({depth: 2, fileFilter: 'package.json', directoryFilter: ['!node_modules']}, (err, res) => {
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
				console.log(`Bootstrapping ${file.parentDir}`);
				shell.cd(file.fullParentDir);
				const result = shell.exec('npm install', {silent: true});
				if (result.code !== 0) {
					console.log(`${file.parentDir} failed to build: ${result.stdout}`);
					error = true;
				}
			}
		})
	);

process.on('exit', (code) => {
	process.exit(code || error ? 1 : 0);
});

