const cloudinary = require('cloudinary');
const keys = require('./config/keys');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: keys.cloud_name,
	api_key: keys.cloudinary_api_key,
	api_secret: keys.cloudinary_api_secret
});

const storage = cloudinaryStorage({
	cloudinary,
	folder: 'demo',
	allowedFormats: [ 'jpg', 'jpeg', 'png' ],
	transformation: [ { width: 500, height: 500, crop: 'limit' } ]
});

const parser = multer({ storage });

module.exports = (app) => {
	app.post('/api/upload', (req, res) => {
		console.log(req.files);

		res.send('hello there');
	});
};

// app.post('/api/upload', parser.single('image'), (req, res) => {
// 	console.log(req.file);
// 	const image = {};
// 	image.url = req.file.url;
// 	image.id = req.file.public_id;

// 	res.send(image);
