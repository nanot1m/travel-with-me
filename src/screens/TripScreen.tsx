import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";

import { StoreConsumer } from "../StoreProvider";

type TripScreenProps = RouteComponentProps<{ tripId: string }>;

export function TripScreen(props: TripScreenProps) {
  const { tripId } = props.match.params;
  return (
    <StoreConsumer>
      {store => {
        const trip = store.trips.get(tripId);
        if (!trip)
          return (
            <div>
              <div>
                <NavLink to="/">Main Page</NavLink>
              </div>
              <h1>we don't know about this trip yet</h1>
            </div>
          );
        return (
          <div>
            <div>
              <NavLink to="/">Main Page</NavLink>
            </div>
            <div>
              <h1>{trip.name}</h1>
              <ul>
                {trip.points.map(p => (
                  <li>
                    <NavLink key={p.id} to={`/trip/${trip.id}/point/${p.id}`}>
                      {p.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <NavLink to={`/trip/${trip.id}/add-point`}>Add Point</NavLink>
            </div>
          </div>
        );
      }}
    </StoreConsumer>
  );
}
