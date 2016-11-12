const React = require('react');
const ReactDom = require('react-dom');

export default class SelectType extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			options: [
				{value: 'mp4', label: 'video'},
				{value: 'mp3', label: 'audio'}
			],
			selectValue: props.selectValue
		}
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e){
		console.log('changing');
		this.setState({selectValue: e.target.value});
	}
	componentDidMount(){
	//	this.setState({selectValue: this.state.selectValue});
	}
	render(){

		var opElms = this.state.options.map( (op) => {
			return (	<option value={op.value} key={op.value}>{ op.label }</option>	);
		});

		return (
			<select id="DownloadType" size="1" defaultValue={this.state.selectValue} onChange={this.handleChange}>
				<option value="test">Select...</option>
				{	opElms	}
			</select>
		)
	}

}
