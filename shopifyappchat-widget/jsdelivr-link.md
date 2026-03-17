# Widget Deployment

## Current Production URL

```html
<script src="https://cdn.jsdelivr.net/gh/joeeverett4/chatappwidget@main/widget.iife.js"></script>
```

## Deploying Updates

### 1. Build the widget

```bash
cd /Users/joeeverett/Desktop/parentfolder/shopifyappchat-widget
npm run build
```

### 2. Commit and push

```bash
cd dist
git add -A
git commit -m "v1.0.x update"
git push origin main
```

### 3. Purge the cache

```bash
curl "https://purge.jsdelivr.net/gh/joeeverett4/chatappwidget@main/widget.iife.js"
```

## Using Version Tags (Recommended for Production)

Avoids cache issues entirely.

### Create a version tag

```bash
cd dist
git tag v1.0.1
git push origin v1.0.1
```

### Use the tag in your script

```html
<script src="https://cdn.jsdelivr.net/gh/joeeverett4/chatappwidget@v1.0.1/widget.iife.js"></script>
```

When updating, bump the version (v1.0.2), create new tag, update the script URL.

## Alternative: Query String Cache Buster

```html
<script src="https://cdn.jsdelivr.net/gh/joeeverett4/chatappwidget@main/widget.iife.js?v=1.0.1"></script>
```

Bump `?v=` whenever you deploy.
