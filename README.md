# YTMe

Youtube Downloader on top of Electron

![YTME Wip2](https://raw.githubusercontent.com/FluidCoding/YTMe/master/YTMe_wip2.png)


**Links**
- [react-desktop](http://reactdesktop.js.org/)
  - Not a fan of TextInputs and state management
- [yt-dl](https://github.com/fent/node-ytdl-core)
- [webpack] [cfg](http://webpack.github.io/docs/configuration.html)
  https://github.com/webpack/docs/wiki/webpack-for-browserify-users#ignore
**Interesting**

 - Binding library for es6 'decko'

**Packaging**

 - Electron packager `npm install electron-packager -g`

	`electron-packager projDir projName --all --out=outDir --ignore="(node_modules|src|res)"`


  `electron-packager . YTMe --all --out=outDir --ignore="(node_modules|src|res)" --overwrite`
