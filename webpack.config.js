let HtmlWebpackPlugin = require('html-webpack-plugin');

////======== 以link—css的方式注入html ========
let ExtractTextPlugin = require('extract-text-webpack-plugin');

////======== 清除旧的编译生成文件 ========
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		'app.bundle': './src/app.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			////======== 使用ExtractTextPlugin前 ======== 
			// use: ['style-loader', 'css-loader']
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader'],
			})
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.jsx$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	},
	plugins: [new HtmlWebpackPlugin({
			// 指定生成的html文件的名字
			title: '有师科技',
			// 使用的html的模板
			template: 'src/index.html',
			// html压缩
			minify: {
				// collapseWhitespace: true
			},
			// 指定生成的js文件是在head里还是在body里面,不写默认在body里面
			// inject: 'head',
			// 缓存相关
			hash: true
		}),
		new ExtractTextPlugin('styles.css'),
		new CleanWebpackPlugin(['dist'])
	],
	devServer: {
		port: 9000,
		////======== 自动打开 ========
		open: true
	}
};