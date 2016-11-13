// All of the Node.js APIs are available in this process.
import React from 'react';
import ReactDOM from 'react-dom';
import yT from 'ytdl-core';
import fsys from 'fs';
import app from 'electron';
import { Text, Label, Button, TextInput, Window, TitleBar, View } from 'react-desktop/windows';
import SelectType from './components/SelectType';
import DownloadItems from './components/DownloadItems';
import ffmpeg from 'ffmpeg';

export default class Renderer extends React.Component{

  constructor(props){
    super(props);
    this.theme = 'light';
	  this.state = {
		currentVideoURL: "",
		options: [
			{value: 'mp4', label: 'video' },
			{value: 'mp3', label: 'audio'}
    ],
    downloadedItems: []
	  }
	  this.YoutubeLinkChange = this.YoutubeLinkChange.bind(this);
    this.downloadVid = this.downloadVid.bind(this);
  }

  componentDidMount() {
	  console.log("mounted");
  }

  componentDidUpdate(p) {
    console.log('updatesss', p)
  }

  downloadVid(){
    const dir = './res/';
    if (!fsys.existsSync(dir))  fsys.mkdirSync(dir);

    const link = document.getElementById('YoutubeLink').value;
    const name = document.getElementById('YoutubeVidName')=== undefined ? "" : document.getElementById('YoutubeVidName').value;
    const type = document.getElementById('DownloadType').value;
    console.log(link,name,type);
	  if(type == 'mp4'){
    	var dlstrm = yT(link)
          .pipe(fsys.createWriteStream('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4') );
    	dlstrm.on('finish', function(){

        this.setState( { downloadedItems: downloadedItems.push({title: name, ext: '.mp4'}) } );
        console.log("done downloading video!");
        document.getElementById('YoutubeLink').value = '';
      }.bind(this));
    }else{
    	var dlstrm = yT(link, {filter:'audioonly'})
          .pipe(fsys.createWriteStream('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4') );
    	dlstrm.on('finish', function(){

        try {
          console.log('trying to audio it ');
	        var process = new ffmpeg('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4');
          process.then(function (video) {
            console.log('well?', './res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4')
  		      // Callback mode
  		      video.fnExtractSoundToMP3('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + 'a.mp3', function (error, file) {
              console.log('mp333 pls')
      			if (!error)
      				console.log('Audio file: ' + file);
        		});
        	}, function (err) {
          		console.log('Error: ' + err);
          	});
          } catch (e) {
          	console.log(e.code);
          	console.log(e.msg);
          }
        console.log("done downloading audio!");
        this.setState( {downloadedItems: this.state.downloadedItems.concat({title: name, ext: '.mp4'}) } );
        console.log( this.state.downloadedItems );
        this.forceUpdate();
      }.bind(this));
	  }
  }

  handleChange(e){
    console.log(e.target);
  }

  YoutubeLinkChange(e){
	  console.log(e.target.value);
	  this.setState({currentVideoURL: document.getElementById('YoutubeLink').value});
  }

  exit(){
	   window.close();
  }

  show(){
	  window.show();
  }

  minimize(){
    app.remote.BrowserWindow.getAllWindows()[0].minimize();
  }

  render(){

    return (
      <Window
        theme={this.theme}
        padding="0px"
      >
        <TitleBar title="Youtube Downloader" controls
          id="TitleBar"
      		onCloseClick={this.exit}
      		onMinimizeClick={this.minimize}
		    />
        <View
          id="MainView"
          background="#f5f5f5"
          paddingLeft="1em"
          width="100%"
          >

          <TextInput
            label="Youtube URL"
            placeholder="(http:// | ?v=)"
            defaultValue={this.state.currentVideoURL}
            className="label"
            id="YoutubeLink"
  		      onChange={this.YoutubeLinkChange}
          />
          <TextInput
            label="File Name"
            placeholder="(optional)"
            className="label"
            id="YoutubeVidName"
            defaultValue=""
          />

          <SelectType
    		    selectValue='video' />

          <Button push className="dlBtn"
            onClick={this.downloadVid}
          >Download</Button>
          <View
            id="ItemsView">
            <DownloadItems
              items={this.state.downloadedItems}>
            </DownloadItems>
          </View>
        </View>

      </Window>
    )
  }
}

ReactDOM.render( <Renderer/> ,
  document.getElementById('YTMeView')
);
