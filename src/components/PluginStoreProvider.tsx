import React, { useMemo } from 'react';
import PluginStore from '../utils/store';

type ProviderContextType = {
  store: typeof PluginStore;
};

export const ProviderContext = React.createContext<ProviderContextType>(
  {} as ProviderContextType
);

const PluginStoreProvider: React.FC = ({ children }) => {
  const contextValues = useMemo(
    () => ({
      store: PluginStore
    }),
    [PluginStore]
  );

  return (
    <ProviderContext.Provider value={contextValues}>
      {children}
    </ProviderContext.Provider>
  );
};

export default PluginStoreProvider;
