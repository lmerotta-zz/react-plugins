import React, { useMemo } from 'react';
import PluginStore from '../utils/store';

type ProviderContextType = {
  store: PluginStore;
};

export const ProviderContext = React.createContext<ProviderContextType>(
  {} as ProviderContextType
);

type PluginStoreProviderProps = ProviderContextType;

const PluginStoreProvider: React.FC<PluginStoreProviderProps> = ({
  children,
  store
}) => {
  const contextValues = useMemo(
    () => ({
      store
    }),
    [store]
  );

  return (
    <ProviderContext.Provider value={contextValues}>
      {children}
    </ProviderContext.Provider>
  );
};

export default PluginStoreProvider;
