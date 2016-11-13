import React from 'react';
import ReactDom from 'react-dom';

export default class DownloadItems extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        items: this.props.items
      }
  }


  componentDidMount(){

  }

  componentDidUpdate(props){
    console.log('Itesm Changed.', props);
    if(props.items !== this.state.items) this.setState( { items: props.items} );
  }
  componentWillReceiveProps(props){
    // this.setState( { items: props.items} );
    console.log('Props Recieved.', props);
  }


  render(){
    const location='./res/'
    var items = this.state.items!==undefined ? this.state.items.map( (itm,i)=>{
      return ( <li key={i}><p key={i+"mt"} className='mediaTitle'>{itm.title}</p><video className='mediaElm' src={location + itm.title + itm.ext} autoPlay controls ></video></li> )
    }) : ( <li>Download Something...</li> );
    return (
      <ul>
        {items}
      </ul>
    )
  }
}
