let HtmlWebpackPlugin = require('html-webpack-plugin');

////======== 以link—css的方式注入html ========
let ExtractTextPlugin = require('extract-text-webpack-plugin');

////======== 清除旧的编译生成文件 ========
let CleanWebpackPlugin = require('clean-webpack-plugin');

let webpack = require('webpack');
module.exports = {
	entry: {
		'app.bundle': './src/app.js',
		'app.bundle2': './src/app2.js'
	},
	output: {
		path: __dirname + '/dist',
		// filename: '[name].[chunkhash].js'
		////======== 开启模块热替换时需要使用hash(每个文件的hash码统一) ========
		filename: '[name].[hash].js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			////======== 使用ExtractTextPlugin前 ======== 
			use: ['style-loader', 'css-loader']

			////======== 使用ExtractTextPlugin前(如果开启了模块热替换，不可以使用如下的代码) ======== 
			// use: ExtractTextPlugin.extract({
			// 	fallback: 'style-loader',
			// 	use: ['css-loader'],
			// })
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
			filename: 'index.html',
			// html压缩
			minify: {
				// collapseWhitespace: true
			},
			// 指定生成的js文件是在head里还是在body里面,不写默认在body里面
			// inject: 'head',
			// 缓存相关
			hash: true,
			chunks: ['app.bundle']
		}), new HtmlWebpackPlugin({
			// 指定生成的html文件的名字
			title: '有师科技',
			// 使用的html的模板
			template: 'src/main.html',
			filename: 'main.html',
			// html压缩
			minify: {
				// collapseWhitespace: true
			},
			// 指定生成的js文件是在head里还是在body里面,不写默认在body里面
			// inject: 'head',
			// 缓存相关
			hash: true,
			chunks: ['app.bundle2'],
			// 排除某些依赖
			// excludeChunks:['app.bundle']
		}),
		////======== 开启模块热替换时需要关闭掉 ========
		// new ExtractTextPlugin('styles.css'),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: true
		}),

		new CleanWebpackPlugin(['dist']),

		////======== 模块热替换 ========
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		port: 9000,
		////======== 自动打开 ========
		open: true,
		////======== 开启模块热替换（内容修改时不会重新加载界面） ========
		hot: true
	}
};