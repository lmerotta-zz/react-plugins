import React, { useState } from 'react'

const MyPluginWithState = () => {
  const [count, setCount] = useState(0)

  return (
    <p>
      Components in plugins can use everything react offers, including hooks!
      like here with useState:
      <br />
      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
    </p>
  )
}

export default MyPluginWithState
