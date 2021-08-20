import path from "path";

import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import globby from "globby";
import HtmlPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import { WebpackPluginServe } from "webpack-plugin-serve";

const webpackServe = new WebpackPluginServe({
	port: 55556,
	hmr: true,
});

const browserConfig =
	(name: string) =>
	(_: any, argv: any): Configuration => {
		const isProd = argv.mode === "production";

		const files = globby.sync(`./src/${name}/*.tsx`);
		const entry: Record<string, string | string[]> = {};
		for (const file of files) {
			const filePath = path.resolve(__dirname, file);
			entry[path.basename(file, ".tsx")] = isProd
				? filePath
				: ["webpack-plugin-serve/client", filePath];
		}

		return {
			devtool: "cheap-source-map",
			resolve: {
				extensions: [".js", ".ts", ".tsx", ".json"],
			},
			target: "web",
			entry,
			output: {
				path: path.resolve(__dirname, name),
				filename: "[name].[contenthash].js",
				assetModuleFilename: "assets/[name].[contenthash].[ext]",
				publicPath: "",
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						use: [
							{
								loader: "babel-loader",
								options: {
									presets: [
										[
											"@babel/preset-env",
											{
												targets: {
													browsers: "last 2 chrome versions",
												},
											},
										],
										["@babel/preset-react", { runtime: "automatic" }],
										[
											"@babel/preset-typescript",
											{ isTSX: true, allExtensions: true },
										],
									],
									plugins: isProd
										? []
										: [require.resolve("react-refresh/babel")],
								},
							},
						],
					},
					{
						test: /\.(png|woff2?|webm|svg)$/,
						type: "asset",
					},
					{
						test: /\.css$/,
						use: ["style-loader", "css-loader"],
					},
				],
			},
			plugins: [
				...Object.keys(entry).map(
					(entryName) =>
						new HtmlPlugin({
							filename: `${entryName}.html`,
							chunks: [entryName],
							template: "webpack-template.html",
						})
				),
				webpackServe,
				...(isProd ? [] : [new ReactRefreshPlugin()]),
				new ForkTsCheckerWebpackPlugin({
					typescript: {
						configFile: path.resolve(__dirname, `src/${name}/tsconfig.json`),
						mode: "write-references",
					},
				}),
				new CleanWebpackPlugin(),
			],
		};
	};

const extensionConfig: Configuration = {
	devtool: "cheap-source-map",
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".json"],
	},
	entry: path.resolve(__dirname, "src/extension/index.ts"),
	output: {
		path: path.resolve(__dirname, "extension"),
		filename: "index.js",
		library: {
			type: "commonjs2",
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true,
					configFile: path.resolve(__dirname, "src/extension/tsconfig.json"),
				},
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: path.resolve(__dirname, "src/extension/tsconfig.json"),
				mode: "write-tsbuildinfo",
			},
		}),
		new CleanWebpackPlugin(),
	],
	externalsPresets: { node: true },
	externals: [nodeExternals() as any],
};

export = [
	browserConfig("dashboard"),
	browserConfig("graphics"),
	extensionConfig,
];
