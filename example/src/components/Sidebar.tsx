import React from 'react';
import { Plugins } from 'react-plugins';

const Sidebar = () => (
  <div
    style={{
      width: 'calc(100% - 30px)',
      height: '90px',
      padding: '10px 15px',
      backgroundColor: '#95a5a6',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    <h1 style={{ flex: 10 }}>Logo</h1>
    <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1 }}>
      <Plugins section='sidebar' />
    </div>
  </div>
);

export default Sidebar;
