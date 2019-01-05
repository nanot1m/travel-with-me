import { types as t } from "mobx-state-tree";

export const Location = t.model({
  latitude: t.number,
  longitude: t.number
});
