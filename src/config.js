export const googlAPI = {
	CLIENT_ID: '323752503434-un612lb782gd4rnmf15635dk8lga13nk',
};

export const cloudinaryAPI = {
	CLOUDINARY_WSIH_PRESET: 'mbmo4mtb',
	CLOUDINARY_UPLOAD_URL: 'https://api.cloudinary.com/v1_1/dxwnkzsxe/image/upload',
};

export const apiDomain = {
	'dev': 'https://25dev.25demo.com/backend/api',
	'demo': 'https://25dev.25demo.com/backend/api',
	'production': 'https://wishpool.25sprout.com/backend/api',
}[process.env.NODE_ENV];

export const IMAGE_MAX_WIDTH = 560;

export default 'this is app config';
