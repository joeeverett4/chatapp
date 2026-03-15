import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget';
import './styles.css';

// Create container for widget
function init() {
  // Don't initialize twice
  if (document.getElementById('shopappchat-widget-root')) {
    return;
  }

  const container = document.createElement('div');
  container.id = 'shopappchat-widget-root';
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<Widget />);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
