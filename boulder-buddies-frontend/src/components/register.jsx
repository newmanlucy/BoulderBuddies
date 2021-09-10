import React, {Component} from "react";


class Register extends Component {


  constructor(props){
    super(props)
    // this.rootUrl = "http://localhost:8000";
    this.rootUrl = "http://34.125.244.56";
    this.endpoint = "/users/";
    this.url = this.rootUrl + this.endpoint;
    this.state = {username: "", level: "0", location: "", bio: "", gender: false}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit (e) {
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
    }).then( res => res.json()).then(
      this.handleRedirect)                    
  }

  handleRedirect (res) {
    // if( res.status === 200 )
        // redirect here
    console.log("in redirect: ", res);
    const uid = res["id"];
    console.log("uid: ", uid);
    window.location.href = '../?uid=' + uid;
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="border col-lg-6">
              <h1 className="font-weight-light">Register</h1>
              <form method="post">
                <fieldset>
                    <div className="row col-lg-12">
                      <div className="col-lg-3">
                        <label htmlFor="username">Name: </label>
                      </div>
                      <div className="col-lg-8">
                        <input type="text" name="username" id="username" placeholder="name" value={this.state.username} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="col-lg-3">
                        <label htmlFor="location">Location: </label>
                      </div>
                      <div className="col-lg-8">
                        <input type="text" name="location" id="location" placeholder="city/neighborhood" value={this.state.location} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="col-lg-3">
                        <label htmlFor="level">Level:</label>
                      </div>
                      <div className="col-lg-1">
                        <p>V</p>
                      </div>
                      <div className="border">
                        <input type="number" name="level" id="level" value={this.state.level} onChange={this.handleChange}/> 
                      </div>
                    </div>
                    <div className="row col-lg-12">
                      <div className="col-lg-3">
                        <label htmlFor="bio">Bio: </label> 
                      </div>
                      <div className="col-lg-8">
                        <textarea name="bio" id="bio" placeholder="bio" value={this.state.bio} onChange={this.handleChange}> </textarea>
                      </div>
                      <div>
                        <p> Do you identify as a woman or a member of the LGBT community?</p>
                        <input type="checkbox" id="gender" name="gender" value={this.state.gender} onChange={this.handleChange}></input>
                        <label htmlFor="gender">Yes</label>
                      </div>
                    </div>
                </fieldset>
                <button onClick={this.handleSubmit}>Register</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default Register;