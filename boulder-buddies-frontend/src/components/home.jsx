import React, { Component } from "react";
import { Map } from "./";
import ClimberCard from "./climbercard";


const containerStyle = {
  width: '800px',
  height: '600px'
};

const center = {
  lat: 41.0,
  lng: -74.0
};



class Home extends Component {



  constructor(props){
    super(props)
    this.state = {
      others: {results: []}
    }  
    this.urlRoot = "http://localhost:8000/"

  }

  getUrl() {
    console.log(this.props);
    const url = this.urlRoot + "users/" + this.props.uid + "/query/";
    console.log()
  }
    // climber = {"name": "Rachel", "level": 4, "location": "Boston", "bio": "Hi...."};
    // cc = <ClimberCard climber={this.climber}/>

    componentDidMount() {
      fetch(this.getUrl())
          .then(res => res.json())
          .then(
              (result) => {
              this.setState({
                  isLoaded: true,
                  others: result
              });
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

  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="border row align-items-center my-5">
              <div className="border row col-lg-12">
              <div className="border col-lg-7">
                <Map center={center} containerStyle={containerStyle} others={this.state.others.results} />
              </div>
              <div className="border col-lg-2"></div>
              <div className="border col-lg-3">
                {Object.entries(this.state.others.results).map(([idx, climber]) => (
                  <div key={climber.name}>
                      <ClimberCard climber={climber}/>
                  </div>
              ))}
                {/* {Object.entries(this.state.others.results).map(([idx, climber]) => (
                    <Marker
                    onLoad={onLoad}
                    position={climber.location}
                  />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;