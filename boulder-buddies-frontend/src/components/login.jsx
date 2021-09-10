import React, { Component } from "react";

class Login extends Component {

    handleChange(e) {
        if (e.target.id === "username") {
          this.setState({...this.state, "username": e.target.value})
        }
      }

      handleSubmit (e) {
        e.preventDefault();
        console.log("state:", this.state)
        fetch(this.url, {
            method: "GET",
            mode: "cors",
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