import React, { useEffect, useState } from 'react';
import AdminWidget from './AdminWidget';
import PluginStore from '../../../pluginStore';

const AdminSection = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    PluginStore.registerPlugin(
      'sidebar',
      <AdminWidget badgeCount={count} />,
      'admin-widget',
      -100
    );
  });

  return (
    <div style={{ width: '100%' }}>
      <h2>Admin section</h2>
      <p>Set number of badges in the widget</p>
      <input
        type='number'
        step='1'
        min='0'
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
      />
    </div>
  );
};

export default AdminSection;
