import React from "react";
import { NavLink } from "react-router-dom";
import { withStore } from "../StoreProvider";

export const IndexScreen = withStore(({ store }) => (
  <div>
    <Header />
    <NavLink to="/add-trip">Add Trip</NavLink>
    <h1>Your trip list</h1>
    <ul>
      {store.tripList.map(trip => (
        <li key={trip.id}>{trip.name}</li>
      ))}
      {store.tripList.length === 0 && (
        <li>
          No trips yet. <NavLink to="/add-trip">Add your first trip</NavLink>
        </li>
      )}
    </ul>
  </div>
));

const Header = withStore(({ store }) => (
  <header style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Travel With Me</span>
    {store.user.authenticated ? (
      <span>
        {store.user.login} <button onClick={store.user.signOut}>X</button>
      </span>
    ) : (
      <NavLink to="/login">Login</NavLink>
    )}
  </header>
));
