import React, { useContext, useEffect, useReducer } from 'react';
import { ProviderContext } from './PluginStoreProvider';

type PluginsProps = {
  section: string;
};

const Plugins = ({ section }: PluginsProps) => {
  const { store } = useContext(ProviderContext);
  const [, forceRender] = useReducer((s) => s + 1, 0);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      forceRender();
    });

    return (): void => {
      unsub();
    };
  });

  return (
    <React.Fragment>
      {store.getPluginsForSection(section).map((component, index) => {
        if (React.isValidElement(component)) {
          return (
            <React.Fragment key={`${section}-${index}-element`}>
              {component}
            </React.Fragment>
          );
        } else {
          const Component = component as React.ComponentType;
          return <Component key={`${section}-${index}-element`} />;
        }
      })}
    </React.Fragment>
  );
};

export default Plugins;
