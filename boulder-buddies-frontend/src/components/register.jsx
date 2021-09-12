import React, {Component} from "react";
import '../styles/back.css'
import '../styles/register-box.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';


class Register extends Component {


  constructor(props){
    super(props)
    // this.rootUrl = "http://localhost:8000";
    this.rootUrl = "http://34.125.244.56";
    this.endpoint = "/users/";
    this.url = this.rootUrl + this.endpoint;
    this.state = {username: "", level: "0", location: "", bio: "", gender: false, user: null}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleChange(e) {
    if (e.target.id === "username") {
      this.setState({...this.state, "username": e.target.value})
    } else if (e.target.id === "location") {
      this.setState({...this.state, location: e.target.value})
    } else if (e.target.id === "level") {
      this.setState({...this.state, "level": e.target.value})
    } else if (e.target.id === "bio") {
      this.setState({...this.state, "bio": e.target.value})
    } else if (e.target.id === "gender") {
      this.setState({...this.state, "gender": e.target.checked})
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData();
    console.log("state:", this.state)
    if (!this.state.gender) {
      alert("You must be a woman or LGBT to participate in this community.");
      return;
    }
    form.append("name", this.state.username);
    form.append("level", this.state.level);
    form.append("location", this.state.location);
    form.append("bio", this.state.bio);
    fetch(this.url, {
        method: "POST",
        mode: "cors",
        body: form,
    }).then( res => res.json()).then(this.handleRedirect)                    
  }

  handleRedirect (res) {
    this.setState({...this.state, user: res})
  }

  render() {
    console.log(this.state);
    return ( this.state.user === null ?
      <div className="register">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="box">
              <img className="logo-size" src={process.env.PUBLIC_URL + '/bb_logo_pink.png'} alt='BB Logo'/> 
              <h1 className="font-weight-light">Register</h1>
              <form method="post">
                <fieldset>
                    <div className="row col-lg-12">
                      <div className="text-center">
                        <label htmlFor="username">Name: </label>
                      </div>
                      <div className="name-center">
                        <input type="text" name="username" id="username" placeholder="name" value={this.state.username} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="text-center">
                        <label htmlFor="location">Location: </label>
                      </div>
                      <div className="location-center">
                        <input type="text" name="location" id="location" placeholder="city/neighborhood" value={this.state.location} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="text-center">
                        <label htmlFor="level">Level:</label>
                      </div> 
                      <div className="level-center">
                        <input type="number" name="level" id="level" value={this.state.level} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="text-center">
                        <label htmlFor="bio">Bio: </label> 
                      </div>
                      <div className="bio-center">
                        <textarea name="bio" id="bio" style={{width: "300px"}} placeholder="bio" value={this.state.bio} onChange={this.handleChange}> </textarea>
                      </div>
                      </div>
                      <div className="row col-lg-12">
                      <div className="text-center col-8">
                        <p> Do you identify as a woman or a member of the LGBT community?</p>
                        {/* <input type="checkbox" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}></input> */}
                        {/* <label htmlFor="gender">Yes</label> */}
                      
                      </div>
                      <div className="col-2 d-flex align-items-center">
                        <FormControlLabel
                          control={<Checkbox name="gender" id="gender" />}
                          label="Yes"
                          value={this.state.gender} 
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                </fieldset>
                <div style={{padding: "10px"}}>
                <Button 
                variant="contained" 
                color="primary"
                onClick={this.handleSubmit}
              >
                Register
              </Button>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
     :
     <Router>
        <Switch>
          <Redirect from="/register" to="/" />
          <Route path="/" component={() => <Home 
              uid={this.state.user.id}
              user={this.state.user}
            />}
        />
        </Switch>
      </Router>
     );
  }

}
export default Register;