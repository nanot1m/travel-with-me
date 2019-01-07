import React from "react";
import { RootStore } from "./stores/RootStore";
import { Omit } from "react-router";
import { observer } from "mobx-react";

const { Consumer, Provider } = React.createContext<
  typeof RootStore.Type | null
>(null);

export { Consumer as StoreConsumer, Provider as StoreProvider };

export interface WithStoreProps {
  store: typeof RootStore.Type;
}

export function withStore<OriginalProps extends WithStoreProps>(
  component: React.ComponentType<OriginalProps>
): React.SFC<Omit<OriginalProps, "store">> {
  const Component = observer(component);
  return props => (
    <Consumer>
      {store => store && <Component store={store} {...props as any} />}
    </Consumer>
  );
}
