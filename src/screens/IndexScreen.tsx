import React from "react";
import { NavLink } from "react-router-dom";
import { StoreConsumer } from "../StoreProvider";

export function IndexScreen() {
  return (
    <StoreConsumer>
      {store => (
        <div>
          <NavLink to="/add-trip">Add Trip</NavLink>
          <h1>Your trip list</h1>
          <ul>
            {store.tripList.map(trip => (
              <li key={trip.id}>
                <NavLink to={`/trip/${trip.id}`}>{trip.name}</NavLink>
              </li>
            ))}
            {store.tripList.length === 0 && (
              <li>
                No trips yet.{" "}
                <NavLink to="/add-trip">Add your first trip</NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </StoreConsumer>
  );
}
