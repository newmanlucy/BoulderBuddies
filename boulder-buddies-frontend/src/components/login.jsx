import React, { Component } from "react";
import '../styles/back.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./";

class Login extends Component {

    constructor(props){
        super(props)
        this.rootUrl = "http://localhost:8000";
        // this.rootUrl = "http://34.125.244.56";
        this.state = {username: "", user: null}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
      }

    getUrl() {
        const url = `${this.rootUrl}/users/login/${this.state.username}`
        return url;
    }

    handleChange(e) {
        this.setState({...this.state, "username": e.target.value})
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("state:", this.state)
        fetch(this.getUrl(), {
            method: "GET",
            mode: "cors",
        }).then( res => res.json()).then(
          this.handleRedirect)                    
    }

    handleRedirect (res) {
        this.setState({...this.state, user: res})
    }


    render() {
        return this.state.user === null ? <div className="home">
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <label for="name">Name: </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="name" 
                        onChange={this.handleChange}
                        />
                    </div>
                </form>
                <div>
                    <p>New user? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div> :  <Router>
        <Switch>
          <Redirect from="/login" to="/" />
          <Route path="/" component={() => <Home 
              uid={this.state.user.id}
              user={this.state.user}
            />}
        />
        </Switch>
      </Router>
    }

}


export default Login;