import React, { useContext, useEffect, useMemo, useReducer } from 'react';
import { ProviderContext } from '../components/PluginStoreProvider';

const usePlugins = (section: string): Array<JSX.Element> => {
  const { store } = useContext(ProviderContext);
  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      forceRender();
    });

    return (): void => {
      unsub();
    };
  }, [store]);

  const plugins = store.getPluginsForSection(section);

  return useMemo(
    () =>
      plugins.map((component) => {
        if (React.isValidElement(component)) {
          return (component as unknown) as JSX.Element;
        } else {
          const Component = component as React.ComponentType;
          return <Component />;
        }
      }),
    [plugins]
  );
};

export default usePlugins;
