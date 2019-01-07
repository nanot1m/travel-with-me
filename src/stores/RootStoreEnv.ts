import { Auth } from "../lib/Auth";
import { Storage } from "../lib/Storage";
export interface RootStoreEnv {
  auth: Auth;
  storage: Storage;
}
