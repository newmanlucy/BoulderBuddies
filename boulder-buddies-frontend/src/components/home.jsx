import React, { Component } from "react";
import { Map } from "./";
import ClimberCard from "./climbercard";
import '../styles/back.css'

const containerStyle = {
  width: '800px',
  height: '800px'
};

class Home extends Component {



  constructor(props){
    super(props)
    this.state = {
      others: {results: []}
    }  
    this.urlRoot = "http://localhost:8000"
    // this.urlRoot = "http://34.125.244.56"
  }

  getUrl(minLevel, maxLevel, radius) {
    console.log(this.props);
    let url = this.urlRoot + "/users/" + this.props.uid + "/query";
    let qString = `?min_level=${minLevel}&max_level${maxLevel}=&radius=${radius}`
    url += qString
    console.log(url)
    return url
  }
    // climber = {"name": "Rachel", "level": 4, "location": "Boston", "bio": "Hi...."};
    // cc = <ClimberCard climber={this.climber}/>

    componentDidMount() {
      fetch(this.getUrl(parseInt(this.props.user.level) - 2, parseInt(this.props.user.level) + 2, 50))
          .then(res => res.json())
          .then(
              (result) => {
              this.setState({
                  isLoaded: true,
                  others: result
              });
              console.log("state", this.state)
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
              this.setState({
                  isLoaded: true,
                  error
              });
              console.log("error", error);
              }
          );
    }

  render() {
    return (
      <div className="home">
        <h1>Hello, {this.props.user.name}</h1>
        <div className="container">
          <div className="border row align-items-center my-5">
              <div className="border row col-lg-12">
              <div className="border col-lg-7">
                <Map center={this.props.user.position} containerStyle={containerStyle} others={this.state.others.results} />
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