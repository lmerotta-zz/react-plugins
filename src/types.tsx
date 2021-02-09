export type PluginType = {
  component: React.ComponentType | JSX.Element
  priority: number
  name?: string
}

export type PluginStoreType = {
  [key: string]: PluginType[]
}
