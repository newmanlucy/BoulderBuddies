import React, { Component } from "react";
import { Map } from "./";
import ClimberCard from "./climbercard";
import '../styles/back.css'
import LevelSlider from "./levelslider";
import RadiusSlider from "./radiusslider";

const containerStyle = {
  width: '800px',
  height: '800px'
};

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      others: {results: []},
      minLevel: parseInt(this.props.user.level) - 2,
      maxLevel: parseInt(this.props.user.level) + 2,
      radius: 50
    }  
    this.urlRoot = "http://localhost:8000"
    this.setRadius = this.setRadius.bind(this);
    this.setMinMaxLevel = this.setMinMaxLevel.bind(this);

    // this.urlRoot = "http://34.125.244.56"
  }

  setMinMaxLevel(data) {
    console.log("DATA", data)
    this.setState({...this.state,
      minLevel: data[0],
      maxLevel: data[1]
    });
  }

  setRadius(data) {
    console.log("DATA", data)
    this.setState({...this.state,
      radius: data
    });
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
      fetch(this.getUrl(this.state.minLevel, this.state.maxLevel, 50))
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

  handleChange = (event, newValue) => {
    // this.setMinMaxLevel();
    this.setValue(newValue);
    console.log(this.state)
  };

  render() {
    return (
      <div className="home">
        <h1>Hello, {this.props.user.name}</h1>
        <div className="container">
          <div className="row align-items-center my-5">
              <div className="col-lg-3"> 
              <LevelSlider 
                minLevel={this.state.minLevel} 
                maxLevel={this.state.maxLevel}
                onChange={this.setMinMaxLevel}
                syncWithParent={this.setMinMaxLevel} />
              <RadiusSlider 
                radius={this.state.radius} 
                onChange={this.setRadius}
                syncWithParent={this.setRadius} />
              </div>
              <div className="col-lg-5">
                <Map 
                  center={this.props.user.position} 
                  containerStyle={containerStyle} 
                  others={this.state.others.results}
                  my_id={this.props.user.id}
                  />
              </div>
              <div className="col-lg-2"></div>
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
    );
  }
}

export default Home;