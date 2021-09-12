import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';


class ClimberCard extends Component {
  style={
    //width: "300px",
    height: "200px",
    margin:"2px",
    marginTop: "0px"
  }

  render() {
    return (
      <Paper elevation={3} className="climbercard card" style={this.style}>
        <h3 className="card-title">{this.props.climber.name}</h3>
          <div className="card-body">
            <h4>{this.props.climber.location}, V{this.props.climber.level}</h4>
            <p>{this.props.climber.bio}</p>
            <div style={{position: "absolute", bottom: "0", left: "90px"}} >
              <a href="/messaging">Message</a>
            </div>
        </div>
      </Paper>
    );
  }
}

export default ClimberCard;