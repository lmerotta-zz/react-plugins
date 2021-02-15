import React from 'react';
import usePlugins from './usePlugins';
import PluginStoreProvider from '../components/PluginStoreProvider';
import { renderHook, act } from '@testing-library/react-hooks';
import PluginStore from '../utils/store';

describe('Plugins', () => {
  let store: PluginStore;
  beforeEach(() => {
    store = new PluginStore();
  });
  it('Renders the plugins from the given section', async () => {
    const Component1 = () => <p data-testid='component1'>I'm component 1</p>;
    const Component2 = () => <p data-testid='component2'>I'm component 2</p>;

    store.registerPlugin('test', Component1, 'first', 0);
    const wrapper = ({ children }: any) => (
      <PluginStoreProvider store={store}>{children}</PluginStoreProvider>
    );

    const { result } = renderHook(() => usePlugins('test'), { wrapper });

    expect(result.current.length).toEqual(1);
    expect(result.current[0]).toMatchInlineSnapshot(`<Component1 />`);

    act(() => {
      store.registerPlugin('test', <Component2 />, 'second', 1);
    });

    expect(result.current.length).toEqual(2);
    expect(result.current[1]).toMatchInlineSnapshot(`<Component2 />`);
  });
});
