import { ComponentType } from 'react';
import { PluginStoreType } from '../types';

export class PluginStore {
  private sections: PluginStoreType = {};
  private listeners: Array<(sections: PluginStoreType) => void> = [];

  subscribe(listener: (sections: PluginStoreType) => void): () => void {
    this.listeners.push(listener);

    // return unsubscribe callback
    return (): void => {
      this.listeners = this.listeners.filter((current) => current !== listener);
    };
  }

  registerPlugin(
    section: string,
    component: ComponentType | JSX.Element,
    name: string,
    priority = 0
  ): void {
    const pluginStore = this.sections[section] || [];

    // if we find a component with the given name, replace it
    if (pluginStore.findIndex((current) => current.name === name) !== -1) {
      this.sections[section] = pluginStore.map((current) =>
        current.name === name
          ? {
              component,
              priority,
              name
            }
          : current
      );
    } else {
      this.sections[section] = [...pluginStore, { component, priority, name }];
    }

    this.listeners.forEach((listener) => listener(this.sections));
  }

  removePlugin(section: string, name: string): void {
    const pluginStore = this.sections[section] || [];

    this.sections[section] = pluginStore.filter(
      (current) => current.name !== name
    );

    this.listeners.forEach((listener) => listener(this.sections));
  }

  getPluginsForSection(section: string): Array<ComponentType | JSX.Element> {
    const pluginStore = this.sections[section];

    if (!pluginStore || pluginStore.length < 1) {
      return [];
    }

    return pluginStore
      .sort((a, b) => a.priority - b.priority)
      .map((a) => a.component);
  }
}

export default PluginStore;
