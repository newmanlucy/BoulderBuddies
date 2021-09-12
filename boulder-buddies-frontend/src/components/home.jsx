import React, { Component } from "react";
import { Map } from "./";
import ClimberCard from "./climbercard";
import '../styles/back.css'
import LevelSlider from "./levelslider";
import RadiusSlider from "./radiusslider";
import Button from '@material-ui/core/Button';
import '../styles/card-scroll.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const containerStyle = {
  width: '1000px',
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
    // this.urlRoot = "http://localhost:8000";
    this.urlRoot = "http://34.125.244.56";
    this.setRadius = this.setRadius.bind(this);
    this.setMinMaxLevel = this.setMinMaxLevel.bind(this);
    this.filter = this.filter.bind(this);

    // this.urlRoot = "http://34.125.244.56"
  }

  setMinMaxLevel(data) {
    console.log("DATA", data)
    this.setState({...this.state,
      minLevel: data.minLevel,
      maxLevel: data.maxLevel
    });
    console.log(this.state)
  }

  setRadius(data) {
    console.log("DATA", data)
    if (data && data.transform && data.radius) {
    this.setState({...this.state,
      radius: data.transform(data.radius)
    })}
    console.log(this.state)
  }

  getUrl() {
    console.log(this.props);
    let url = this.urlRoot + "/users/" + this.props.uid + "/query";
    let qString = `?min_level=${this.state.minLevel}&max_level${this.state.maxLevel}=&radius=${this.state.radius}`
    url += qString
    console.log(url)
    return url
  }
    // climber = {"name": "Rachel", "level": 4, "location": "Boston", "bio": "Hi...."};
    // cc = <ClimberCard climber={this.climber}/>

    filter() {

      console.log("filter",this.state);
      fetch(this.getUrl(this.state.minLevel, this.state.maxLevel, this.radius))
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

    componentDidMount() {
      this.filter()
    }

  handleChange = (event, newValue) => {
    // this.setMinMaxLevel();
    this.setValue(newValue);
    console.log(this.state)
  };

  Group = ({ children }) => {
    <div className="group">
      {children}
    </div>
  };

  render() {
    return (
      <div className="home">
        <Grid container spacing={3}>
          <Grid item xs={2} sm={1} display="inline">
            {/* <img style={{width: "40px"}} src={process.env.PUBLIC_URL + '/bb_logo_pink.png'} alt='BB Logo'/>  */}
          </Grid>
          <Grid item alignItems="center" style={{width: "80%"}}>
            <h1>Hello, {this.props.user.name}</h1>
            {/* <h3 style={{marginTop: "6px"}}>{this.state.messager.name}</h3> */}
          </Grid>
        </Grid>
          <Grid container spacing={3} className="screen-position">
              <Grid item xs className="map-position"> 
              <img className="logo-size" src={process.env.PUBLIC_URL + '/bb_logo_pink.png'} alt='BB Logo'/> 
                <form>
                  <Paper elevation={3} style={{padding: '10px'}}>
                <LevelSlider 
                  minLevel={this.state.minLevel} 
                  maxLevel={this.state.maxLevel}
                  onChange={this.setMinMaxLevel}
                  syncWithParent={this.setMinMaxLevel} />
                <RadiusSlider 
                  radius={this.state.radius} 
                  onChange={this.setRadius}
                  syncWithParent={this.setRadius} />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.filter}
                >
                  Filter
                </Button>
                  </Paper>
                </form>
              </Grid>
              <Grid item sm className="map-position">
                <Map 
                  center={this.props.user.position} 
                  containerStyle={containerStyle} 
                  others={this.state.others.results}
                  my_id={this.props.user.id}
                  />
              </Grid>
                <Grid item xs={2}>
                    <div style={{height: '800px',
                                    overflowY: 'auto', 
                                    }}>
                  {Object.entries(this.state.others.results).map(([idx, climber]) => (
                          <ClimberCard className="inner" key={climber.name} climber={climber}/>
                    
              ))}
                    </div>
                </Grid>
                {/* {Object.entries(this.state.others.results).map(([idx, climber]) => (
                    <Marker
                    onLoad={onLoad}
                    position={climber.location}
                  />
                ))} */}
            </Grid>
      </div>
    );
  }
}

export default Home;