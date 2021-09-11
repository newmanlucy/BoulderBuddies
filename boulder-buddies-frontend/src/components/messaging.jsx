import React, { Component } from "react";
import Message from "./message";


class Messaging extends Component {

    messages = [
        {
            senderUID: 1,
            senderName: "Lucy",
            recepientUID: 2,
            recipientName: "Erin",
            text: "Hello! How long have you been climbing?",
            timeStamp: "Sat 9:46 AM"
        }, {
          senderUID: 2,
          senderName: "Erin",
          recepientUID: 1,
          recipientName: "Lucy",
          text: "Hi!! It's nice to meet you. I just started a few months ago :) HBU?",
          timeStamp: "Sat 9:47 AM"
      }, {
        senderUID: 2,
        senderName: "Erin",
        recepientUID: 1,
        recipientName: "Lucy",
        text: "Hi!! It's nice to meet you. I just started a few months ago :) HBU?",
        timeStamp: "Sat 9:47 AM"
    }, {
            senderUID: 1,
            senderName: "Lucy",
            recepientUID: 2,
            recipientName: "Erin",
            text: "Same!! That's awesome!",
            timeStamp: "Sat 9:48 AM"
        }, {
            senderUID: 1,
            senderName: "Lucy",
            recepientUID: 2,
            recipientName: "Erin",
            text: "There's this bouldering area near New Paltz I've been wanting to check out, are you interested?? I still haven't climbed outside yet, but I really want to try it!",
            timeStamp: "Sat 9:48 AM"
        }, {
          senderUID: 2,
          senderName: "Erin",
          recepientUID: 1,
          recipientName: "Lucy",
          text: "Cool, yeah!! Definitely interested. When were you thinking of going?",
          timeStamp: "Sat 9:48 AM"
      }
    ]

  constructor(props){
    super(props)
    this.state = {
      messages: {results: []}
    }  
    this.urlRoot = "http://localhost:8000"
    // this.urlRoot = "http://34.125.244.56"
  }

  getUrl() {
    console.log(this.props);
    let url = this.urlRoot + "/users/messages/" + this.props.uid1 + "/" + this.props.uid2 + "/";
    return url
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
                  messages: result
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
      <div className="messaing">
        <div className="container">
          <div className="border row my-5">
              <div className="border">
                {Object.entries(this.messages).map(([idx, message]) => (
                  <div key={idx}>
                      <Message message={message} uid1={1}/>
                  </div>
              ))}
              </div>
              <form className="col-md-5">
                <input style={{width: "70%", margin: "5px"}} type="text" value={this.state.text} />

                <input style={{width: "20%", margin: "5px"}} type="submit" value="Send" />
              </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Messaging;