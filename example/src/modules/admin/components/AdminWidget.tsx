import React from 'react';

type AdminWidgetProps = {
  badgeCount: number;
};

const AdminWidget = ({ badgeCount }: AdminWidgetProps) => (
  <div style={{ position: 'relative' }}>
    <b>Admin</b>
    <span
      style={{
        backgroundColor: 'red',
        color: 'white',
        width: '27px',
        height: '25px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        position: 'absolute',
        top: '-90%',
        left: '90%'
      }}
    >
      {badgeCount > 99 ? '99+' : badgeCount}
    </span>
  </div>
);

export default AdminWidget;
