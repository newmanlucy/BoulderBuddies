import React, { Component } from 'react'

class Message extends Component {
    getStyle() {
        if (this.props.message.senderUID === this.props.uid1) {
            return {
                backgroundColor: "Violet"
            }
        } else {
            return {
                backgroundColor: "LightGray"
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
                    <p style={{fontSize: "8px", color: "gray"}}>{this.props.message.timeStamp}</p>
                <div className="row"> 
                </div>
            </div>
        </div>
        );
    }
}

export default Message;