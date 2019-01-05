import React, { Component } from "react";
import { StoreProvider } from "./StoreProvider";
import { RootStore } from "./stores/RootStore";

import "./App.css";

const store = RootStore.create();

class App extends Component {
  render() {
    return (
      <StoreProvider value={store}>
        <div className="App">
          <h1>Hello, world!</h1>
        </div>
      </StoreProvider>
    );
  }
}

export default App;
