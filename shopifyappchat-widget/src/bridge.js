(function() {
  console.log('[ShopAppChat Bridge] Loaded');
  console.log('[ShopAppChat Bridge] URL:', window.location.href);

  const params = new URLSearchParams(window.location.search);
  const shop = params.get('shop');

  console.log('[ShopAppChat Bridge] Shop param:', shop);

  if (shop) {
    // Respond to requests from widget iframe
    window.addEventListener('message', (e) => {
      if (e.data?.type === 'SHOPAPPCHAT_GET_SHOP' && e.source) {
        console.log('[ShopAppChat Bridge] Received request, sending shop:', shop);
        e.source.postMessage({ type: 'SHOPAPPCHAT_SHOP', shop }, '*');
      }
    });

    // Also proactively send to all iframes on load
    const sendToIframes = () => {
      const iframes = document.querySelectorAll('iframe');
      console.log('[ShopAppChat Bridge] Sending shop to', iframes.length, 'iframes:', shop);
      iframes.forEach(frame => {
        try {
          frame.contentWindow.postMessage({ type: 'SHOPAPPCHAT_SHOP', shop }, '*');
        } catch (e) {}
      });
    };

    if (document.readyState === 'complete') {
      sendToIframes();
    } else {
      window.addEventListener('load', sendToIframes);
    }
  }
})();
