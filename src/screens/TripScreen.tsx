import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

import { StoreConsumer } from "../StoreProvider";

type TripScreenProps = RouteComponentProps<{ tripId: string }>;

const TripScreenBase = function(props: TripScreenProps) {
  const { tripId } = props.match.params;
  const { history } = props;
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
              {trip.points.map(p => (
                <button
                  key={p.id}
                  onClick={() => history.push(`/trip/${trip.id}/point/${p.id}`)}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <div>
              <button
                onClick={() => history.push(`/trip/${trip.id}/add-point`)}
              >
                Add Point
              </button>
            </div>
          </div>
        );
      }}
    </StoreConsumer>
  );
};
const TripScreen = withRouter(TripScreenBase);
export { TripScreen };
