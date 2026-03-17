# Widget Embed Instructions

## jsDelivr CDN URL

```
https://cdn.jsdelivr.net/gh/joeeverett4/chatappwidget@main/widget.iife.js
```

## Embed Code

Add this to any website:

```html
<script>
  window.SHOPAPPCHAT_CONFIG = {
    shopId: "your_shop_id",
    shopName: "Your Store",
    orgSlug: "flexcommerce"
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/joeeverett4/chatappwidget@main/widget.iife.js"></script>
```

## Configuration Options

| Option | Required | Description |
|--------|----------|-------------|
| `shopId` | Yes | Unique identifier for the shop |
| `shopName` | No | Display name for the shop |
| `orgSlug` | Yes | Organization slug in Gadget |

## Rebuilding

After making changes to the widget:

```bash
npm run build
```

Then push the updated `dist/widget.iife.js` to GitHub.
