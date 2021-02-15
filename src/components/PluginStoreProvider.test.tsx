import React from 'react';
import { render } from '@testing-library/react';
import PluginStoreProvider from './PluginStoreProvider';
import PluginStore from '../utils/store';

describe('PluginStoreProvider', () => {
  it('Renders', () => {
    const { asFragment } = render(
      <PluginStoreProvider store={new PluginStore()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
