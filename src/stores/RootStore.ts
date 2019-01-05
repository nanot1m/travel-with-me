import { types as t } from "mobx-state-tree";
import { Trip } from "../models/Trip";

export const RootStore = t
  .model({
    trips: t.map(Trip)
  })
  .actions(self => {
    function addTrip(id: string, name: string) {
      self.trips.put(Trip.create({ id, name }));
    }

    function deleteTrip(id: string) {
      self.trips.delete(id);
    }

    return {
      addTrip,
      deleteTrip
    };
  });
