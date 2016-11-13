import React from 'react';
import ReactDom from 'react-dom';

export default class DownloadItems extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        items: this.props.items
      }
  }
  componentDidMount(){  }

  componentDidUpdate(props){
    if(props.items !== this.state.items) this.setState( { items: props.items} );
  }
  componentWillReceiveProps(props){  }

  render(){
    const location='./res/'
    var items = this.state.items!==undefined ? this.state.items.map( (itm,i)=>{
      const thbnail = itm.thmb===undefined ? null : ( <img height="120px" width="160px" src={itm.thmb}></img> );
      return ( <li key={i}><p key={i+"mt"} className='mediaTitle'>{itm.title}</p><video className='mediaElm' src={location + itm.title + itm.ext} autoPlay controls ></video>{thbnail}</li> )
    }) : ( <li>Download Something...</li> );
    return (
      <ul>
        {items}
      </ul>
    )
  }
}
