import React, { Component } from 'react';
import { Marker, InfoWindow } from "@react-google-maps/api";

class InfoWindowMarker extends Component {

constructor(props){
	super(props);

	this.state = {
		isOpen: false
	}

}

handleToggleOpen = () => {
	this.setState({
		isOpen: true
	});
}

handleToggleClose = () => {
	this.setState({
		isOpen: false
	});
}
render() {

return (
		<Marker
			key={this.props.user.id}
			position={this.props.user.position}
			onClick={() => this.handleToggleOpen()}
		>

		{
			this.state.isOpen &&
		 <InfoWindow  onCloseClick={() => this.handleToggleClose()}>
             <div>
                <h1>{this.props.user.name}</h1>
                <p>V{this.props.user.level}. {this.props.user.bio}</p>
                <a href="/message">Message</a>
             </div>
		 </InfoWindow>
	 	}


		</Marker>

	)
}
}

export default InfoWindowMarker;