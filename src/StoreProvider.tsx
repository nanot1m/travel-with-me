import { createContext } from "react";
import { RootStore } from "./stores/RootStore";

const { Consumer, Provider } = createContext(RootStore.create());

export { Consumer as StoreConsumer, Provider as StoreProvider };
