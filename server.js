import webpack from 'webpack';
import express from 'express';
import history from 'connect-history-api-fallback';
import config from './webpack.config.babel';

const app = express();
const compiler = webpack(config);

app.use(history());

app.use(
	require('webpack-dev-middleware')(compiler, {
		publicPath: config.output.publicPath,
		stats: {
			chunks: false,
			colors: true,
		},
	}),
);

app.use(require('webpack-hot-middleware')(compiler));

app.listen(8080, err => {
	if (err) {
		return console.error(err);
	}

	return console.log('Listening at http://localhost:8080/');
});
