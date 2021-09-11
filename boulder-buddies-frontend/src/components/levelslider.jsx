import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class LevelSlider extends Component {

  constructor(props){
    super(props)
    this.state = {
      minLevel: this.props.minLevel,
      maxLevel: this.props.maxLevel
    }  
    this.handleChange = this.handleChange.bind(this);
  }

  useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  
  valuetext(value) {
      return `V${value}`;
  }

  handleChange = (event, newValue) => {
    console.log(event, newValue);
    this.setState(({minLevel: newValue[0], maxLevel: newValue[1]}))
    this.props.syncWithParent(this.state)
  };

  render() {
    return (
      <div>
        <Typography id="range-slider" gutterBottom>
          Level range
        </Typography>
        <Slider
          value={[this.state.minLevel, this.state.maxLevel]}
          onChange={this.handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={this.valuetext}
          valueLabelFormat={this.valuetext}
          max={18}
        />
      </div>
    );
  }
}

export default LevelSlider;