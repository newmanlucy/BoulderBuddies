import React, { Component } from "react";

class Login extends Component {


    render() {
        return <div className="home">
            <div className="container">
                <div>
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="name" placeholder="name" />
                </div>
                <div>
                    <p>New user? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    }

}


export default Login;