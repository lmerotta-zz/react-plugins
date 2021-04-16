import React from 'react';
import usePlugins from './usePlugins';
import PluginStoreProvider from '../components/PluginStoreProvider';
import { renderHook, act } from '@testing-library/react-hooks';
import PluginStore from '../utils/store';

describe('Plugins', () => {
  let store: PluginStore;

  const Component1 = () => <p data-testid='component1'>I'm component 1</p>;
  const Component2 = () => <p data-testid='component2'>I'm component 2</p>;
  const Component3 = () => <p data-testid='component3'>I'm component 3</p>;

  beforeEach(() => {
    store = new PluginStore();
  });

  it('Renders the plugins from the given section', () => {
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

    act(() => {
      store.registerPlugin('test-other-section', <Component3 />, 'third', 1);
    });

    expect(result.current.length).toEqual(2);
    expect(result.current[0]).toMatchInlineSnapshot(`<Component1 />`);
    expect(result.current[1]).toMatchInlineSnapshot(`<Component2 />`);
  });

  it('Only subscribes to the store once', () => {
    jest.spyOn(store, 'subscribe');

    expect(store.subscribe).toHaveBeenCalledTimes(0);

    store.registerPlugin('test', Component1, 'first', 0);

    renderHook(() => usePlugins('test'), {
      wrapper: ({ children }: any) => (
        <PluginStoreProvider store={store}>{children}</PluginStoreProvider>
      )
    });

    expect(store.subscribe).toHaveBeenCalledTimes(1);

    act(() => {
      store.registerPlugin('test', <Component2 />, 'second', 1);
    });

    expect(store.subscribe).toHaveBeenCalledTimes(1);
  });
});
