import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget';
import './styles.css';

// Auto-detect shop from Shopify admin URL and add to config
// URL pattern: https://admin.shopify.com/store/{shopName}/apps/{appName}
(function() {
  try {
    const url = window.location.href;
    const match = url.match(/admin\.shopify\.com\/store\/([^\/]+)/);
    if (match && match[1]) {
      window.SHOPAPPCHAT_CONFIG = window.SHOPAPPCHAT_CONFIG || {};
      // Only set if not already configured
      if (!window.SHOPAPPCHAT_CONFIG.shopId) {
        window.SHOPAPPCHAT_CONFIG.shopId = match[1];
        window.SHOPAPPCHAT_CONFIG.shopName = match[1];
      }
    }
  } catch (e) {
    // Silently fail
  }
})();

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
