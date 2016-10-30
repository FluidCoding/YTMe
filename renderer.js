// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use babel';
const React = require('react');
const ReactDOM = require ('react-dom');
import { Text, Label, Button, TextInput, Window, TitleBar } from 'react-desktop/windows';
const babel = require('babel-register');
const yT  = require('ytdl-core');
const fsys = require('fs');
import Select from 'react-select';
// import 'react-select/dist/react-select.css';c


class Renderer extends React.Component{
  constructor(props){
    /// Construct Things
    // props n stuff

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
  // We're all mounted n-ready
  componentDidMount() {
	  console.log("mounted");
  }

  componentDidUpdate() {

  }

  downloadVid(){
    const link = document.getElementById('YoutubeLink').value;
    const name = document.getElementById('YoutubeVidName')===null? "" : document.getElementById('YoutubeVidName').value;
    console.log("DL ", link);
    var dlstrm = yT(link).pipe(fsys.createWriteStream('./res/' + ( name==="" ? link.substring( link.indexOf("?v=")+3) : name ) + '.mp4') );
    dlstrm.on('finish', function(){console.log("done!");});
    console.log("going...", dlstrm);
  }
  handleChange(e){
    console.log(e.target);
  }
  YoutubeLinkChange(e){
	  console.log(e.target.value);
	  this.setState({currentVideoURL: document.getElementById('YoutubeLink').value});
  }
  render(){
	  console.log("RENDERING")
    return (
        <Window
          theme={this.theme}
          padding="0px"
        >
        <TitleBar title="Youtube Downloader" controls/>

        <TextInput
          label="Youtube URL"
          placeholder="http://"
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
		<Select
			name="DownloadType"
			value="mp4"
			options={this.state.options}
			onChange={this.handleChange}
		/>
        <Button push className="dlBtn"
          onClick={() => this.downloadVid() }>
            Download
          </Button>
      </Window>
    )
  }
}
ReactDOM.render( <Renderer/> ,
  document.getElementById('YTMeView')
);
export default Renderer;
