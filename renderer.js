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
  		youtubeVideoURL: "",
      youtubeVideoName: "",
      youtubeType: "",
  		options: [
  			{value: 'mp4', label: 'video' },
  			{value: 'mp3', label: 'audio'}
      ],
      downloadedItems: []
	  }
    // Scope pLs
    this.youtubeVideoURLChange = this.youtubeVideoURLChange.bind(this);
	  this.youtubeVideoNameChange = this.youtubeVideoNameChange.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);
  }

  componentDidMount() {
	  console.log("did mount ");
  }

  componentDidUpdate() {
    console.log('updatesss',  this.state);
  }

  downloadVideo(){
    const dir = './res/';
    if (!fsys.existsSync(dir))  fsys.mkdirSync(dir);

    const link = this.state.youtubeVideoURL;
    const name = this.state.youtubeVideoName;
    const type = this.state.youtubeType;
    console.log(link,name,type);
	  if(type == 'mp4'){
      yT.getInfo(link, function(err, info){
        let fileName =  ( name==="" ? info.title : name);
        fileName = fileName.replace(/[\/\?<>\\:\*\|":]/g, '').replace(/\#/g,'')
            .replace( /[\x00-\x1f\x80-\x9f]/g, '')
            .replace( /^\.+$/, '')
            .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, '')
            .replace( /[\. ]+$/, '');

        var dlstrm = yT(link)
            .pipe(fsys.createWriteStream('./res/' + ( fileName ) + '.mp4') );
      	dlstrm.on('finish', function(){
          console.log("done downloading video!");
          this.setState( {downloadedItems: this.state.downloadedItems.concat({title: fileName, ext: '.mp4'}) } );
          console.log( this.state.downloadedItems );
          this.forceUpdate();
          document.getElementById('YoutubeLink').value = '';
        }.bind(this));
      }.bind(this));

    }else{
      yT.getInfo(link, function(err, info){
        console.log(info, 'get this yo');
        let fileName =  ( name==="" ? info.title : name);
        fileName = fileName.replace(/[\/\?<>\\:\*\|":]/g, '').replace(/\#/g,'')
            .replace( /[\x00-\x1f\x80-\x9f]/g, '')
            .replace( /^\.+$/, '')
            .replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i, '')
            .replace( /[\. ]+$/, '');
        var dlstrm = yT(link, {filter:'audioonly'})
            .pipe(fsys.createWriteStream('./res/' + ( fileName ) + '.mp4') );
            // .pipe((new ffmpeg({source:}));//fsys.createWriteStream('./res/' + ( fileName ) + '.mp4') );
      	dlstrm.on('finish', function(){

          console.log("fileName: " + fileName);
          try {
            console.log('trying to audio it ');
  	        var process = new ffmpeg('./res/' + ( fileName ) + '.mp4');
            process.then(function (video) {
              console.log('well?', './res/' + ( fileName ) + '.mp4')
    		      // Callback mode
    		      video.fnExtractSoundToMP3('./res/' + ( fileName ) + 'a.mp3', function (error, file) {
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
          this.setState( {downloadedItems: this.state.downloadedItems.concat({title:fileName, ext: '.mp4', thmb: info.iurlhq}) } );
          console.log( this.state.downloadedItems );
          document.getElementById('YoutubeLink').value = '';
          this.forceUpdate();
        }.bind(this));

      }.bind(this));

	  }
  }

  youtubeVideoURLChange(e){
	  // console.log("youtubeVidURL", e.target.value);
	 this.setState({youtubeVideoURL: e.target.value});
  }

  youtubeVideoNameChange(e){
    // console.log("youtubeVideoName", e.target.value)
    this.setState({youtubeVideoName: e.target.value})
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
//onChange={(e) => this.youtubeVideoURLChange(e)}          value={this.state.youtubeVideoURL}
  render(){
    console.log('render', this.state);
    var a = this.props.textt;
    console.log(a)
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
          key="MainView"
          >

        <div className="inputContainer">
          <label htmlFor="YoutubeVideoURL"
              className="inputLabel"
            >YouTube URL</label>
        <input
          type="text"
          id="YoutubeVideoURL"
          className="w10Input label"
          placeholder="(http:// | ?v=)"
          value={this.state.YoutubeVideoURL}
          onChange={this.youtubeVideoURLChange}
          ></input>
        </div>

        <div className="inputContainer">
          <label htmlFor="YoutubeVideoName"
              className="inputLabel"
            >File Name</label>
        <input
          type="text"
          id="YoutubeVideoName"
          className="w10Input label"
          placeholder="(optional)"
          value={this.state.youtubeVideoName}
          onChange={this.youtubeVideoNameChange}
          ></input>
        </div>

          <SelectType
    		    selectValue='video' />

          <Button push className="dlBtn"
            onClick={this.downloadVideo}
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
