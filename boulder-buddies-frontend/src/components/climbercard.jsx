import React, { Component } from 'react'

class ClimberCard extends Component {
  render() {
    return (
      <div className="climbercard">
        <div className="border container">
          <div className="col-md-5 align-items-left my-5">
              <div className="row">
                  <h3>{this.props.climber.name}</h3>
                <div className="row"> 
                  <h4>{this.props.climber.location}, V{this.props.climber.level}</h4>
                </div>
                <div className="row"> 
                  <p>{this.props.climber.bio}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ClimberCard;