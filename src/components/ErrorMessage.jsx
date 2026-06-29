import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Premium Error card displaying user feedback and offering API re-fetch hooks.
 */
export default function ErrorMessage({ 
  message = "Something went wrong while loading products.", 
  onRetry = () => {} 
}) {
  return (
    <div className="error-container container fade-in">
      <div className="error-card">
        <div className="error-card__icon-wrapper">
          <AlertTriangle size={32} className="error-card__icon" />
        </div>
        <h2 className="error-card__title">Connection Error</h2>
        <p className="error-card__message">{message}</p>
        <p className="error-card__submessage">
          Please check your internet connection or reload the listing catalog.
        </p>
        <button className="error-card__retry-btn" onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
