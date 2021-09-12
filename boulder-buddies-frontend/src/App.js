import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Register, Login, Messaging } from "./components";


function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const uid = urlSearchParams.get('uid');
  console.log("uid", uid);

  console.log(window.location);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/messaging/:uid1/:uid2" exact component={() => 
              <Messaging 
              uid1={parseInt(window.location.pathname.split("/")[2])} 
              uid2={parseInt(window.location.pathname.split("/")[3])}/>} 
            />
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/" component={() => <Home uid={uid}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
