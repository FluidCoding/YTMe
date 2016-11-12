// All of the Node.js APIs are available in this process.
const React = require('react');
const ReactDOM = require ('react-dom');
const yT  = require('ytdl-core');
const fsys = require('fs');
const app = require('electron');
import { Text, Label, Button, TextInput, Window, TitleBar, View } from 'react-desktop/windows';
import SelectType from './components/SelectType'


export default class Renderer extends React.Component{

  constructor(props){
    super(props);
    this.theme = 'light';
	  this.state = {
		currentVideoURL: "",
		options: [
			{value: 'mp4', label: 'video' },
			{value: 'mp3', label: 'audio'}
	   ]
	  }
	  this.YoutubeLinkChange = this.YoutubeLinkChange.bind(this);
  }

  componentDidMount() {
	  console.log("mounted");
  }

  componentDidUpdate() {

  }

  downloadVid(){
    const dir = './res/';
    if (!fsys.existsSync(dir))  fsys.mkdirSync(dir);

    const link = document.getElementById('YoutubeLink').value;
    const name = document.getElementById('YoutubeVidName')===null? "" : document.getElementById('YoutubeVidName').value;
    const type = document.getElementById('DownloadType').value;
    console.log(link,name,type);
	  if(type == 'mp4'){
    	var dlstrm = yT(link)
          .pipe(fsys.createWriteStream('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4') );
    	dlstrm.on('finish', function(){
        console.log("done downloading video!");
      });
    }else{
    	var dlstrm = yT(link, {filter:'audioonly'})
          .pipe(fsys.createWriteStream('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp3') );
    	dlstrm.on('finish', function(){
        console.log("done downloading audio!");
      });
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

    var downloadedItems = null;
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
            defaultValue=""
          />

          <SelectType
    		    selectValue='video' />

          <Button push className="dlBtn"
            onClick={this.downloadVid}
          >Download</Button>
        </View>
        <View
          id="ItemsView">
          {downloadedItems}
        </View>
      </Window>
    )
  }
}

ReactDOM.render( <Renderer/> ,
  document.getElementById('YTMeView')
);
