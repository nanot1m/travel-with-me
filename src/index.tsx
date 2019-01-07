import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./StoreProvider";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./stores/createStore";
import { Auth } from "./lib/Auth";
import { firebaseInstance, db } from "./firebase/firebaseInstance";
import { TripRepository } from "./repositories/TripRepository";

const store = createStore(undefined, {
  auth: new Auth(firebaseInstance.auth()),
  tripRepository: new TripRepository(db)
});

ReactDOM.render(
  <StoreProvider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
