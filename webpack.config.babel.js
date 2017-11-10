import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';

import 'babel-polyfill';

import palette from './config/palette';
import media from './config/media';

process.noDeprecation = true;

export default {
	entry: {
		app: path.join(__dirname, 'src', 'main.js'),
		'babel-polyfill': 'babel-polyfill',
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].bundle.js',
		publicPath: '',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			environment: process.env.NODE_ENV,
			favicon: 'src/static/images/favico.png',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					cssnext({
						features: {
							customProperties: {
								variables: palette,
							},
							customMedia: {
								extensions: media,
							},
						},
					}),
				],
			},
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 8080,
				proxy: 'http://localhost:8080/',
			},
			{
				reload: false,
			},
		),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		new ExtractTextPlugin(
			`[name]__[contenthash:13]${process.env.NODE_ENV === 'production' ? `.min` : ``}.css`
		),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'bundle',
			filename: `bundle__[hash:13]${process.env.NODE_ENV === 'production' ? `.min` : ``}.js`,
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: process.env.NODE_ENV === 'production' ? true : false,
							},
						},
						'sass-loader',
						'postcss-loader',
					],
					fallback: 'style-loader',
				}),
			},
			{
				// es6 轉譯成 es5
				test: /\.js$/,
				loaders: ['babel-loader'],
			},
			{
				// 處理圖片置入
				test: /\.(jpg|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: './[name]_[hash].[ext]',
						},
					},
				],
			},
			{
				// 處理 vue 檔案
				// docs: https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									options: {
										minimize: process.env.NODE_ENV === 'production' ? true : false,
									},
								},
								'sass-loader',
								'postcss-loader',
							],
							fallback: 'style-loader',
						}),
						js: 'babel-loader',
					},
					// other vue-loader options go here
				},
			},
			{
				// 處理影片檔案
				test: /\.(eot|ttf|wav|mp3|mp4|mov)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: './[name]_[hash].[ext]',
				},
			},
			{
				// 處理 html 檔案 (讓 html 讀 bundle 過的圖片/影片)
				test: /\.html$/,
				loader: 'html-loader?attrs[]=video:src',
			},
		],
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.common.js',
		},
	},
	devtool: process.env.NODE_ENV === 'demo' ? 'source-map' : false,
};
