const cloudinary = require('cloudinary');
const keys = require('./config/keys');

cloudinary.config({
	cloud_name: keys.cloud_name,
	api_key: keys.cloudinary_api_key,
	api_secret: keys.cloudinary_api_secret
});

module.exports = (app) => {
	app.post('/api/upload', (req, res) => {
		console.log(req.body);
	});
};
