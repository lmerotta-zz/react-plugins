import React from 'react';
import Sidebar from './components/Sidebar';
import ModulesPage from './components/Page';
import BillingSection from './modules/billing/components/BillingSection';
import AdminSection from './modules/admin/components/AdminSection';

const App = () => (
  <div
    style={{
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <Sidebar />
    <ModulesPage>
      <BillingSection />
      <AdminSection />
    </ModulesPage>
  </div>
);

export default App;
