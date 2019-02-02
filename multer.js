const cloudinary = require('cloudinary');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');
const DataUri = require('datauri');
const path = require('path');
const keys = require('./config/keys');

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

const uploads = multer({ storage }).single('picture');

const dUri = new DataUri();

const dataUri = (req) => dUri.format(path.extname(req.files.file.name).toString(), req.files.file.data);

module.exports = {
	uploads,
	dataUri,
	uploader: cloudinary.uploader
};
