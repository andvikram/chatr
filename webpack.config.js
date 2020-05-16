const path = require("path");
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

let config = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx|)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.(png|svg|jpg|gif|ico|eot|woff|woff2|ttf)$/,
				loader: "file-loader",
				options: { name: '/tmp/[name].[ext]' }
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	}
};

let webConfig = Object.assign({}, config, {
	entry: path.join(__dirname, "client_app", "client.js"),
	target: 'web',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.' + 'web' + '.js',
		publicPath: "/"
	},
	// plugins: [
	// 	new webpack.HotModuleReplacementPlugin()
	// ],
	// devServer: {
	// 	compress: true,
	// 	hot: true,
	// 	historyApiFallback: true,
	// 	contentBase: path.join(__dirname, 'public'),
	// 	host: "localhost",
  //   port: "3035",
	// 	public: "localhost:3035",
	// 	watchOptions: {
  //     ignored: /node_modules/
  //   }
	// }
});

let nodeConfig = Object.assign({}, config, {
	entry: path.join(__dirname, "server_app", "server.js"),
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.' + 'node' + '.js',
		// publicPath: path.resolve(__dirname, './public/' + 'node/')
	}
});

module.exports = [
	webConfig, nodeConfig,       
];