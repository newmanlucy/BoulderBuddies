import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class RadiusSlider extends Component {

  constructor(props){
    super(props)
    this.state = {
      radius: this.props.radius
    }  
    this.handleChange = this.handleChange.bind(this);
    this.MAX = 1000000000;
    this.valuetext = this.valuetext.bind(this);
  }

  useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

  valuetext(value) {
      if (value === this.MAX) { 
          return "Max";
      }
      return `${value}`;
  }

  handleChange = (event, newValue) => {
    console.log(event, newValue);
    this.setState(({radius: newValue}))
    this.props.syncWithParent(this.state)
  };

  render() {
    return (
      <div>
        <Typography id="range-slider" gutterBottom>
          Radius (mi)
        </Typography>
        <Slider
          value={this.state.radius}
          scale={(x) => {
              if (x === 0) {
                  return 1;
              } else if (x === 1) {
                return 5;
            } else if (x === 2) {
                return 10;
            } else if (x === 3) {
                return 25;
            } else if (x === 4) {
                return 50;
            } else if (x === 5) {
                return 100;
            } else if (x === 6) {
                return this.MAX;
            } 
          }}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={this.valuetext}
          valueLabelFormat={this.valuetext}
          min={0}
          max={6}        />
      </div>
    );
  }
}

export default RadiusSlider;