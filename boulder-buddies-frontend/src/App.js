import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Register, Login } from "./components";


function App() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const uid = urlSearchParams.get('uid');
  console.log("uid", uid);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/" component={() => <Home uid={uid}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
