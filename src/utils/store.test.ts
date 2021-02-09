import React from 'react';
import { PluginStore } from './store';

describe('PluginStore', () => {
  let store: PluginStore;

  beforeEach(() => {
    store = new PluginStore();
  });

  it('Calls all the subscribers with the whole list of sections when a plugin is registered', () => {
    const Plugin = jest.fn();
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();

    store.subscribe(subscriber1);
    const unsubscribe = store.subscribe(subscriber2);

    // Test with the two subscribers
    store.registerPlugin('test-section', Plugin, 'test-plugin');

    expect(subscriber1).toHaveBeenCalledWith(
      expect.objectContaining({
        'test-section': expect.arrayContaining([
          expect.objectContaining({
            name: 'test-plugin'
          })
        ])
      })
    );

    expect(subscriber2).toHaveBeenCalledWith(
      expect.objectContaining({
        'test-section': expect.arrayContaining([
          expect.objectContaining({
            name: 'test-plugin'
          })
        ])
      })
    );

    // remove one subscriber and confirm that it is not called anymore
    unsubscribe();

    store.registerPlugin('test-section', Plugin, 'test-plugin-2');

    expect(subscriber1).toHaveBeenCalledWith(
      expect.objectContaining({
        'test-section': expect.arrayContaining([
          expect.objectContaining({
            name: 'test-plugin'
          }),
          expect.objectContaining({
            name: 'test-plugin-2'
          })
        ])
      })
    );

    // should not have been called a second time
    expect(subscriber2).toHaveBeenCalledTimes(1);
  });

  it('Replaces a component with a new instance', () => {
    const component1 = jest.fn();
    const component2 = jest.fn();
    const component3 = jest.fn();

    store.registerPlugin('test-section', component1, 'test-plugin');
    store.registerPlugin('test-section', component3, 'test-plugin-2');
    store.registerPlugin('test-section', component2, 'test-plugin');

    expect(store.getPluginsForSection('test-section')[0]).not.toEqual(
      component1
    );
    expect(store.getPluginsForSection('test-section')[0]).toEqual(component2);
    expect(store.getPluginsForSection('test-section')[1]).toEqual(component3);
  });

  it('Removes the plugin from the store and calls the subscribers', () => {
    const component = jest.fn();
    const subscriber = jest.fn();

    store.subscribe(subscriber);
    store.registerPlugin('test-section', component, 'test-plugin');
    store.removePlugin('test-section', 'test-plugin');

    expect(subscriber).toHaveBeenCalledWith({ 'test-section': [] });
    expect(() =>
      store.removePlugin('non-existent', 'non-existent')
    ).not.toThrow();
  });

  it('Returns the plugins for the given section, in a sorted order by priority', () => {
    const component1 = jest.fn();
    const component2 = jest.fn();
    const component3 = jest.fn();

    store.registerPlugin('test-section', component3, '3', -100);
    store.registerPlugin('test-section', component1, '1', 100);
    store.registerPlugin('test-section', component2, '2', 0);

    expect(store.getPluginsForSection('test-section')).toEqual([
      component3,
      component2,
      component1
    ]);
    expect(store.getPluginsForSection('non-existent')).toEqual([]);
  });
});
