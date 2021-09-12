import React, { Component } from "react";
import Message from "./message";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import blueGray from '@material-ui/core/colors/blueGrey';
import Typography from '@material-ui/core/Typography';



class Messaging extends Component {

  constructor(props){
    super(props)
    this.state = {
      messages: [],
      text: "",
      messager: {}
    }  
    // this.urlRoot = "http://localhost:8000"
    this.urlRoot = "http://34.125.244.56"
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }

  handleChange(e) {
    this.setState({...this.state, "text": e.target.value})
    console.log(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("text", this.state.text);
    // console.log("Submit")
    fetch(this.getUrl(), {
        method: "POST",
        mode: "cors",
        body: form,
    }).then( res => res.json()).then(this.handleUpdateState)                    
  }


  handleUpdateState(data) {
    // console.log(this);
    console.log("data", data);
    // throw this.UserException("STOP!!!");

    this.setState(prevState => ({
      text: "",
      messages: [data, ...prevState.messages],
    }))
    console.log(this.state)
  }

  getUrl() {
    let url = `${this.urlRoot}/users/${this.props.uid1}/messages/${this.props.uid2}`;
    return url
  }
    componentDidMount() {
      fetch(this.getUrl())
          .then(res => res.json())
          .then(
              (result) => {
                console.log(result)
              this.setState({
                  isLoaded: true,
                  messages: result["messages"],
                  messager: result["messager"]
              });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
              this.setState({
                  isLoaded: true,
                  error
              });
              }
          );
    }

  render() {
    return ( 
      <div className="messaing">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
        <Paper style={{height: "50px",
          flexDirection: 'column',
          justifyContent: 'center',
          margin: "20px",
          textAlign: "center",
          width: "550px",
          display: "flex",
        }}>
        <Grid container spacing={3}>
          <Grid item xs={2} sm={1} display="inline">
            {/* <img style={{width: "40px"}} src={process.env.PUBLIC_URL + '/bb_logo_pink.png'} alt='BB Logo'/>  */}
            <Avatar 
              variant="rounded" 
              src={process.env.PUBLIC_URL + '/bb_logo_pink.png'} 
              alt='BB Logo'
              style={{
                border: 1,
                borderColor: blueGray[800],
                backgroundColor: blueGray[50],
                padding: "5px",
                margin: "5px"
              }}
              />
          </Grid>
          <Grid item alignItems="center" style={{width: "80%"}}>
            <h3 style={{marginTop: "6px"}}>{this.state.messager.name}</h3>
          </Grid>
        </Grid>
        </Paper>
        <Paper elevation={3} style={{width: "550px"}}>
        <List className="" style={{height: '800px', 
          overflow: 'scroll',
          display: "flex",
          flexDirection: "column-reverse"
          }} >
                {Object.entries(this.state.messages).map(([idx, message]) => (
                  <ListItem key={idx} alignItems="flex-start">
                    
                      <Message message={message} uid1={this.props.uid1}/>
                  </ListItem> 
              ))}
        </List>  
        </Paper>  
            {/* <div style={{ width: "500px"}}> */}
              <form className="col-md-5" onSubmit={this.handleSubmit}>
                <input 
                  style={{width: "70%", margin: "5px"}} 
                  type="text" 
                  value={this.state.text} 
                  onChange={this.handleChange}
                />

                <Button 
                  // style={{width: "20%", margin: "5px"}} 
                  // type="submit" 
                  variant="contained" 
                  color="primary"
                  onClick={this.handleSubmit}
                > Send </Button>
              </form>
              {/* </div> */}
              </Grid> 
            </div>
       
    );
  }
}

export default Messaging;