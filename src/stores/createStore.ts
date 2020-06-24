import { RootStore } from "./RootStore";
import { RootStoreEnv } from "./RootStoreEnv";
import { SnapshotIn } from "mobx-state-tree";

export function createStore(
  snapshot: SnapshotIn<typeof RootStore> | undefined,
  env: RootStoreEnv
) {
  return RootStore.create(snapshot, env);
}
