import React from 'react';

const SkeletonCard = () => (
  <div className="product-card glass" style={{ padding: '1rem' }}>
    <div className="skeleton" style={{ height: '250px', borderRadius: 'var(--radius-lg)' }} />
    <div style={{ padding: '1rem 0' }}>
      <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '12px' }} />
      <div className="skeleton" style={{ height: '14px', width: '50%', marginBottom: '12px' }} />
      <div className="skeleton" style={{ height: '40px', borderRadius: 'var(--radius-md)' }} />
    </div>
  </div>
);

export default SkeletonCard;
