import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";

import { WithStoreProps, withStore } from "../StoreProvider";

type TripPointScreenProps = RouteComponentProps<{
  tripId: string;
  pointId: string;
}> &
  WithStoreProps;

export const TripPointScreen = withStore((props: TripPointScreenProps) => {
  const { tripId, pointId } = props.match.params;

  const trip = props.store.trips.get(tripId);
  if (!trip)
    return (
      <div>
        <div>
          <NavLink to="/">Main Page</NavLink>
        </div>
        <h1>we don't know about this trip yet</h1>
      </div>
    );
  const point = trip.points.find(p => p.id === pointId);
  if (!point)
    return (
      <div>
        <div>
          <NavLink to={`/trip/${trip.id}`}>Back to trip</NavLink>
        </div>
        <h1>we don't know about this Trip Point yet</h1>
      </div>
    );
  return (
    <div>
      <div>
        <NavLink to={`/trip/${trip.id}`}>Back to trip</NavLink>
      </div>
      <div>
        <h1>{point.name}</h1>
      </div>
    </div>
  );
});
