import React, { useEffect, useState } from 'react';
import PluginStore from '../../../pluginStore';
import BillingWidget from './BillingWidget';

const BillingSection = () => {
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    if (isActive) {
      // will appear first
      PluginStore.registerPlugin('sidebar', BillingWidget, 'billing-widget', 0);
    } else {
      PluginStore.removePlugin('sidebar', 'billing-widget');
    }
  });

  return (
    <div style={{ width: '100%' }}>
      <h2>Billing section</h2>
      <label>
        <input
          type='checkbox'
          checked={isActive}
          onChange={(e) => setActive(e.target.checked)}
        />{' '}
        Toggle the billing module on/off
      </label>
    </div>
  );
};

export default BillingSection;
