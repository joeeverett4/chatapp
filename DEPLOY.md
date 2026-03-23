# Deploy Commands

## Update Gadget Client
```bash
cd shopifyappchat-widget
npm install @gadget-client/shopappchat@latest
```

## Build Analytics
```bash
cd shopifyappchat-widget
npm run build:analytics
```

## Commit, Tag, Push
```bash
git add .
git commit -m "Your commit message"
git tag v1.x.x
git push origin main --tags
```

## Update debug.md
Update version number in `debug.md` to match the new tag.

## jsDelivr URLs
```
Widget:
https://cdn.jsdelivr.net/gh/joeeverett4/chatapp@v1.x.x/shopifyappchat-widget/dist/widget.iife.js

Analytics:
https://cdn.jsdelivr.net/gh/joeeverett4/chatapp@v1.x.x/shopifyappchat-widget/dist/analytics.iife.js
```
