import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-secondary mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`bg-${color} bg-opacity-10 p-3 rounded-circle`} style={{ fontSize: '24px' }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;