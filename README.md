# react-plugins

> Use your react components as plugins. Register them from anywhere in your application, and render them wherever you want implicitely!

[![NPM](https://img.shields.io/npm/v/react-plugins.svg)](https://www.npmjs.com/package/react-plugins) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**NOTE**: This plugin is still in development, and it's API may change between two versions, check out the releases page for updates. This notice will be removed once the package reaches a stable version

## Motivation

When managing large-scale apps, sometimes it might be needed to render components defined in some part of your app (a module, a particular feature, etc.) in another part of the application. The most concrete example is:

- Your application has many modules, which can be enabled/disabled
- Your application has a sidebar that displays a small widget for each module enabled

In this setup, it would clutter the Sidebar component if it needed to require each widget from each module, like this:

```tsx
// src/Sidebar.tsx

import BillingWidget from './modules/billing';
import UsersWidget from './modules/users';
import AdminWidget from './modules/admin';
// ... other widget imports

const Sidebar = () => (
  <>
    <BillingWidget />
    <UsersWidget />
    <AdminWidget />
    {/* ... other widgets */}
  </>
);
```

With this package, you can simply make your modules register the widgets as plugins in the `sidebar` section, and simply ask the sidebar to display the registered plugins

```tsx
// src/modules/billing
PluginStore.registerPlugin('sidebar', BillingWidget, 'billing-widget');

// src/modules/users
PluginStore.registerPlugin('sidebar', UsersWidget, 'users-widget');

// src/modules/admin
PluginStore.registerPlugin('sidebar', AdminWidget, 'admin-widget');

// src/Sidebar.tsx
const Sidebar = () => <Plugins section='sidebar' />;
```

## Demo

A basic demo showcasing the main features of this plugin is available at https://lmerotta.github.io/react-plugins/
Code is located in the `example` folder

## Install

```bash
npm install --save react-plugins
```

## Features

- Render components outside of the current parent component
- Register components at runtime
- Supports lazy loading

## Example Usage

Create a pluginStore

```ts
// src/pluginStore.ts
import { PluginStore } from 'react-plugins';

const store = new PluginStore();

export default store;
```

Define a component as you'd normally do

```tsx
// src/MyComponent.tsx
const MyComponent = () => <div>Hello, world!</div>;

export default MyComponent;
```

Register your component as a plugin, and wrap your application with the PluginStoreProvider

```tsx
// src/index.tsx
import { PluginStoreProvider } from 'react-plugins';
import ReactDOM from 'react-dom';
import App from './App';
import MyComponent from './MyComponent';
import store from './pluginStore';

store.registerPlugin('body', MyComponent, 'MyComponent', 10);

ReactDOM.render(
  <PluginStoreProvider store={store}>
    <App />
  </PluginStoreProvider>,
  document.getElementById('root')
);
```

Ask your app to render the plugins for the `body` section, with the `Plugins` component.

```tsx
// src/index.tsx
import { Plugins } from 'react-plugins';

const App = () => (
  <div>
    <h1>
      Below are the plugins registered in the <b>body</b> section of the
      PluginStore
    </h1>
    <Plugins section='body' />
  </div>
);
```

## Advanced usage

### Lazy-loading with Suspense

Instead of importing your component and registering it as is, you can use `React.lazy` to import it dynamically.

```tsx
// src/index.tsx
import { lazy, Suspense } from 'react';
import { PluginStoreProvider } from 'react-plugins';
import ReactDOM from 'react-dom';
import App from './App';
import store from './pluginStore';

store.registerPlugin(
  'body',
  lazy(() => import('./MyComponent')),
  'MyComponent',
  10
);

ReactDOM.render(
  <Suspense fallback='Loading...'>
    <PluginStoreProvider>
      <App />
    </PluginStoreProvider>
  </Suspense>,
  document.getElementById('root')
);
```

```tsx
// src/index.tsx
import { Plugins } from 'react-plugins';

const App = () => (
  <div>
    <h1>
      Below are the plugins registered in the <b>body</b> section of the
      PluginStore
    </h1>
    <Plugins section='body' />
  </div>
);
```

### Registering plugins with props

react-plugins supports registering plugins that are components with props, simply by passing the JSX instead of the component declaration:

```tsx
store.registerPlugin(
  'body',
  <MyComponent prop='value' secondProp={10} />,
  'MyComponent',
  10
);
```

### Updating plugins

When you register a plugin, you can update it whenever you want. This allows you for example to update it's props. Simply passe then new component to `registerPlugin` by specifying the same section and name as the previous one:

```tsx
store.registerPlugin(
  'body',
  <MyComponent prop='value' secondProp={10} />,
  'MyComponent',
  10
);

// later...

store.registerPlugin(
  'body',
  <MyComponent prop='secondValue' secondProp={125} />,
  'MyComponent',
  10
);
```

### Registering plugins at runtime

Plugins can be registered either before the initial rendering, or from inside another component.

```tsx
const MyPluginHandler = () => {
  const [pluginProp, setPluginProp] = useState('value');

  // register or update the plugin whenever pluginProp changes
  useEffect(() => {
    store.registerPlugin(
      'body',
      <MyComponent prop={pluginProp} />,
      'MyComponent',
      10
    );
  }, [pluginProp]);

  return (...);
}

// in another file


const App = () => <Plugins section="body" />; // will receive MyComponent and display it
```

## API

### PluginStore

**registerPlugin(section, component, name, priority)**

Registers a plugin to be used in the application

- section: The section this plugin will appear in
- component: Either a component definition, or a component instance
- name: a unique name to identify this component in the section it will appear in
- priority: used to sort the plugins. A plugin with a higher priority will appear last. Lower priority comes first

**removePlugin(section, name)**

Removes a plugin from the given section, thus unmounting it if rendered anywhere

- section: the section where the plugin is registered
- name: the plugin to remove's name

### PluginStoreProvider

Used to make your application aware of the plugins registered

#### Props

**store** (PluginStore)
The store that will be used to retrieve plugins from

### Plugins

Used to render plugins registered in a particular section

#### Props

**section** (string)
The section to look for plugins. This component will render any plugin found in the given section, sorted by priority in ascending order

### usePlugins

Retrieve all plugins ready to render. returns an array of JSX elements that can be mapped and rendered

#### arguments

**section** (string)
The section to look for plugins. Will return all the components from this section, ready to render

## Roadmap

- [x] Remove global PluginStore and make PluginStoreProvider accept a `pluginStore` as parameter
- [x] `usePlugins` hook to retrieve plugins and leave rendering to the user

## License

MIT © [lmerotta](https://github.com/lmerotta)
