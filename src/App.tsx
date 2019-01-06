import "./App.css";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { IndexScreen } from "./screens/IndexScreen";
import { AddTripScreen } from "./screens/AddTripScreen";
import { LoginScreen } from "./screens/LoginScreen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={IndexScreen} />
          <Route path="/add-trip" component={AddTripScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" render={() => <h1>Register Screen</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
