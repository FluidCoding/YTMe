import React from 'react';
import ReactDom from 'react-dom';
import app from 'electron';

export default class DownloadItems extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        items: this.props.items
      }
      this.openInFolder = this.openInFolder.bind(this);
  }
  componentDidMount(){  }

  componentDidUpdate(props){
    if(props.items !== this.state.items) this.setState( { items: props.items} );
  }
  componentWillReceiveProps(props){  }

  openInFolder(i){
    const location='\\res\\';
    // console.log(app, i ,location + this.state.items[i].title + this.state.items[i].ext , this.state.items.length);
    // Production const location='..\\..\\.\\res\\';
    // if(this.state.items!==undefined && this.state.items.length>=i)
    //   app.shell.showItemInFolder(app.remote.app.getAppPath() + location + this.state.items[i].title + this.state.items[i].ext);
    app.shell.showItemInFolder(app.remote.app.getAppPath()  + location + ".");
    console.log(this);

  }

  render(){
    const location='.\\res\\';
    // Production const location='..\\..\\.\\res\\';
    var items = this.state.items!==undefined ? this.state.items.map( (itm,i)=>{
      const thbnail = itm.thmb===undefined ? null : ( <img height="120px" width="160px" src={itm.thmb}></img> );
      return ( <li key={i}><p key={i+"mt"} onClick={this.openInFolder} className='mediaTitle'>{itm.title}</p><video className='mediaElm' height={(itm.thmb===undefined?'80px':'120px')} src={location + encodeURI( itm.title )+ itm.ext} autoPlay controls ></video>{thbnail}</li> )
    }) : ( <li>Download Something...</li> );
    return (
      <ul>
        {items}
      </ul>
    )
  }
}
