import { types as t, SnapshotIn, flow } from "mobx-state-tree";
import { Trip } from "../models/Trip";
import { User } from "../models/User";
import { getAppEnv } from "./getAppEnv";

function agregateByKey<T>(extractKey: (obj: T) => string, list: T[]) {
  return list.reduce(
    (acc, item) => {
      acc[extractKey(item)] = item;
      return acc;
    },
    {} as Record<string, T>
  );
}

export const RootStore = t
  .model({
    trips: t.map(Trip),
    user: t.optional(User, {})
  })
  .actions(self => {
    const { tripRepository } = getAppEnv(self);

    const addTrip = flow(function*(id: string, name: string) {
      return tripRepository.addTrip(Trip.create({ id, name }));
    });

    function deleteTrip(id: string) {
      self.trips.delete(id);
    }

    function afterCreate() {
      tripRepository
        .getTripsStream()
        .subscribe((self as typeof RootStore.Type).setTrips);
    }

    function setTrips(trips: Array<SnapshotIn<typeof Trip>>) {
      self.trips.merge(agregateByKey(x => x.id, trips));
    }

    return {
      addTrip,
      deleteTrip,
      setTrips,
      afterCreate
    };
  })
  .views(self => {
    return {
      get tripList() {
        return [...self.trips.values()];
      }
    };
  });
