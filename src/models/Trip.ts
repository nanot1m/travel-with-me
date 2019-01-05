import { types as t } from "mobx-state-tree";
import { TripPoint } from "./TripPoint";

export const Trip = t
  .model({
    id: t.identifier,
    name: t.optional(t.string, ""),
    points: t.optional(t.array(TripPoint), [])
  })
  .actions(self => {
    function addPoint(id: string, name: string) {
      self.points.push(
        TripPoint.create({
          id,
          name
        })
      );
    }

    return {
      addPoint
    };
  });
