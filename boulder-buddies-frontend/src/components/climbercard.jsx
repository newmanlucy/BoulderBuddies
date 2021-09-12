import React, { Component } from 'react'


class ClimberCard extends Component {
  size={
    width: "300px",
    height: "250px"
  }

  render() {
    return (
      <div className="climbercard card" style={this.size}>
        <h3 className="card-title">{this.props.climber.name}</h3>
          <div className="card-body">
            <h4>{this.props.climber.location}, V{this.props.climber.level}</h4>
            <p>{this.props.climber.bio}</p>
            <div style={{position: "absolute", bottom: "0", left: "115px"}} >
              <a href="/messaging">Message</a>
            </div>
        </div>
      </div>
    );
  }
}

export default ClimberCard;