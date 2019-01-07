import { types as t } from "mobx-state-tree";
import { Trip } from "../models/Trip";
import { User } from "../models/User";

export const RootStore = t
  .model({
    trips: t.map(Trip),
    user: t.optional(User, {})
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
  })
  .views(self => {
    return {
      get tripList() {
        return [...self.trips.values()];
      }
    };
  });
