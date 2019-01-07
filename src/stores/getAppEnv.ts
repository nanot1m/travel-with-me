import { IStateTreeNode, getEnv } from "mobx-state-tree";
import { RootStoreEnv } from "./RootStoreEnv";

export function getAppEnv(model: IStateTreeNode) {
  return getEnv<RootStoreEnv>(model);
}
