import React from 'react';

const Page: React.FC = ({ children }) => {
  return <div style={{ flex: 1, padding: '0 15px' }}>{children}</div>;
};

export default Page;
