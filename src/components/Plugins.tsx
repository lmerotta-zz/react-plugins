import React from 'react';
import usePlugins from '../hooks/usePlugins';

type PluginsProps = {
  section: string;
};

const Plugins = ({ section }: PluginsProps): JSX.Element => {
  const plugins = usePlugins(section);

  return (
    <React.Fragment>
      {plugins.map((component, index) => (
        <React.Fragment key={`${section}-${index}`}>{component}</React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Plugins;
