import { types as t, flow } from "mobx-state-tree";
import { Trip } from "../models/Trip";
import { User } from "../models/User";
import { TripPoint } from "../models/TripPoint";
import { getAppEnv } from "./getAppEnv";

export const RootStore = t
  .model({
    trips: t.map(Trip),
    tripPoints: t.map(TripPoint),
    user: t.optional(User, {})
  })
  .actions(self => {
    const { storage } = getAppEnv(self);
    function addTrip(id: string, name: string) {
      self.trips.put(Trip.create({ id, name }));
    }

    function deleteTrip(id: string) {
      self.trips.delete(id);
    }

    const fetchTripPoints = flow(function*(limit: number) {
      const result = yield storage.getObjects("trip-points", limit);
      const points = result.docs.reduce((acc: any, d: any) => {
        const data = d.data();
        const point = TripPoint.create({
          id: d.id,
          description: data.description,
          name: data.name,
          location: {
            latitude: data.location._lat,
            longitude: data.location._long
          }
        });
        acc[d.id] = point;
        return acc;
      }, {});
      console.log(points);
      self.tripPoints.merge(points);
    });

    return {
      addTrip,
      deleteTrip,
      fetchTripPoints
    };
  })
  .views(self => {
    return {
      get tripList() {
        return [...self.trips.values()];
      },
      get tripPointsList() {
        return [...self.tripPoints.values()];
      }
    };
  });
