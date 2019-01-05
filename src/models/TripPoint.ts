import { types as t } from "mobx-state-tree";
import { Location } from "./Location";

export const TripPoint = t
  .model({
    id: t.identifier,
    name: t.optional(t.string, ""),
    description: t.optional(t.string, ""),
    location: t.maybe(Location)
  })
  .actions(self => {
    function setDescription(description: string) {
      self.description = description;
    }
    function setLocation(location: typeof Location.Type) {
      self.location = Location.create(location);
    }
    return {
      setDescription,
      setLocation
    };
  });
