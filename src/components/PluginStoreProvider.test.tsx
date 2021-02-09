import React from 'react';
import { render } from '@testing-library/react';
import PluginStoreProvider from './PluginStoreProvider';

describe('PluginStoreProvider', () => {
  it('Renders', () => {
    const { asFragment } = render(<PluginStoreProvider />);
    expect(asFragment()).toMatchSnapshot();
  });
});
