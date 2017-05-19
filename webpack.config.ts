// Load node modules.
import * as fs from 'fs'
import * as path from 'path'

// Load the package file.
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'))

// Expose the configuration object.
export default {
	entry: [
		'babel-polyfill',
		path.join(__dirname, 'src', 'index.ts'),
	],
	output: {
		path: path.join(__dirname, 'lib'),
		filename: 'index.js',
	},
	target: 'node',
	externals: Object.keys(packageJson.dependencies || {})
		.reduce((externals, dependencyName) => {
			externals[dependencyName] = `commonjs ${dependencyName}`
			return externals
		}, {}),
	node: {
		__filename: true,
		__dirname: true,
	},
	module: {
		loaders: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'babel-loader!ts-loader',
		}],
	},
	resolve: {
		alias: {
			'#': __dirname,
		},
		extensions: [
			'.ts',
			'.js',
		],
	},
	devtool: 'source-map',
}
