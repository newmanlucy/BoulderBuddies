import React, { Component } from 'react'

class Message extends Component {
    getStyle() {
        console.log(this.props.message.senderUID === this.props.uid1)
        if (this.props.message.senderUID === this.props.uid1) {
            return {
                backgroundColor: "LightGray"
            }
        } else {
            return {
                backgroundColor: "Violet"
            }
        }
    }

    render() {
        return (
        <div className="message col-md-5">
            <div className="row float-right">
                <b>{this.props.message.senderName}</b>
                <div className="" style={this.getStyle()}> 
                    <p>{this.props.message.text}</p>
                </div>
                    <p style={{fontSize: "8px", color: "gray"}}>{this.props.timeStamp}</p>
                <div className="row"> 
                </div>
            </div>
        </div>
        );
    }
}

export default Message;