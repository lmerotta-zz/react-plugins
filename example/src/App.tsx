import React from 'react'
import { Plugins } from 'react-plugins'

const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ width: '100%', height: '80px' }}>
        <h1>Header</h1>
      </div>
      <div
        style={{
          flex: '1',
          width: '100%',
          borderTop: '1px solid black',
          borderBottom: '1px solid black'
        }}
      >
        <p>Body</p>
        <Plugins section='body' />
      </div>
      <div style={{ width: '100%', height: '150px' }}>
        <h2>Footer</h2>
        <Plugins section='footer' />
      </div>
    </div>
  )
}

export default App
