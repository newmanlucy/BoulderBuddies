import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import blue from '@material-ui/core/colors/blue';
import blueGray from '@material-ui/core/colors/blueGrey';
// import border from '@material-ui/system';

class Message extends Component {
    boxStyle = {
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        borderRadius: "1em",
        textAlign: "left",
        padding: "5px"
    };

    
    isMyMessage() {
        return this.props.message.senderUID === this.props.uid1;
    }
    getStyle() {
        if (this.isMyMessage()) {
            return {
                backgroundColor: blue[500],
                color: "white"
            }
        } else {
            return {
                backgroundColor: blueGray[100]
            }
        }
    }

    render() {
        return (
            <Grid container justifyContent={this.isMyMessage() ? "flex-end" : "flex-start"}>
            <Box color="text.primary">
                {props => (<div {...props}>
                    <div style={{textAlign: "left"}}>
                        <b>{this.props.message.senderName}</b>
                    </div>
                    <Box style={this.getStyle()} {...this.boxStyle}> 
                         <p>{this.props.message.text}</p>
                    </Box>
                    <div style={{textAlign: "right"}} >
                    <p style={{fontSize: "8px", color: "gray"}}>
                        {this.props.message.timeStamp}
                    </p>
                    </div>
                </div>)}
            </Box>
            </Grid>
        );
    }
}

export default Message;