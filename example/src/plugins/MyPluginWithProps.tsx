import React from 'react'

type MyPluginWithPropsType = {
  title: string
}

const MyPluginWithProps = ({ title }: MyPluginWithPropsType) => (
  <div>My title is {title}</div>
)

export default MyPluginWithProps
