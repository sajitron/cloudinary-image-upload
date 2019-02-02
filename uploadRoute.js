const { uploads, dataUri, uploader } = require('./multer');

module.exports = (app) => {
	app.post('/api/upload', uploads, (req, res) => {
		console.log(req.files.file);

		if (req.files.file) {
			const file = dataUri(req).content;

			return uploader
				.upload(file)
				.then((result) => {
					return res.status(200).send({
						data: result
					});
				})
				.catch((err) => res.status(400).send({ data: { err } }));
		}
	});
};
