import React from 'react';

export default function Loading() {
  const cards = Array.from({ length: 10 });

  return (
    <div className="loading-container">
      <div className="loading-header">
        <div className="loading-spinner"></div>
        <h2 className="loading-text">Loading Products...</h2>
        <p className="loading-subtext">Fetching the best deals for you</p>
      </div>
      <div className="loading-grid">
        {cards.map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-card__image skeleton-element"></div>
            <div className="skeleton-card__body">
              <div className="skeleton-element skeleton-element--title-1"></div>
              <div className="skeleton-element skeleton-element--title-2"></div>
              <div className="skeleton-element skeleton-element--price"></div>
              <div className="skeleton-element skeleton-element--stars"></div>
            </div>
            <div className="skeleton-card__footer">
              <div className="skeleton-element skeleton-element--btn"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
