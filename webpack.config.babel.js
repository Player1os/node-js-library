export default {
	entry: [
		'babel-polyfill',
		'./src/index.ts',
	],
	output: {
		filename: './lib/index.js',
	},
	module: {
		loaders: [{
			// note that babel-loader is configured to run after ts-loader
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: "babel-loader!ts-loader"
		}],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	devtool: 'source-map',
}
