import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import InfoWindowMarker from './infowindowmarker';

class Map extends Component {
    componentDidMount() {
      const url = "http://34.125.244.56/users/1"
      // const url = "http://localhost:8000/users/1"
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                user: result
              });
              console.log(this.state);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              console.log(error);
            }
          );
        
      }

    onLoad(infoWindow) {
        console.log('infoWindow: ', infoWindow)
      }

    render() {
      return (
        <LoadScript
          googleMapsApiKey='AIzaSyBd6bma1yQz9avTE2j9OjDERUL1gcGGl-A'
        >
          <GoogleMap
            mapContainerStyle={this.props.containerStyle}
            center={this.props.center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
            {Object.entries(this.props.others).map(([idx, climber]) => (
                <InfoWindowMarker key={idx} user={climber} my_id={this.props.my_id} />
                // <Marker key={idx} position={climber.position} />
            ))}
            {/* {Object.entries(this.props.others).map(([idx, climber]) => (
                <InfoWindow onLoad={this.onLoad} key={idx} position={climber.position} >
                    <div>
                        <h1>{climber.name}</h1>
                        <h2>{climber.location}, {climber.level}</h2>
                    </div>
                </InfoWindow>
            ))} */}


          </GoogleMap>
          
        </LoadScript>
      )
    }
  }


export default React.memo(Map);