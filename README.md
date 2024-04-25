# Home Assistant Number icons

This repo contains custom Home Assistant number icons.

## Installation instructions

```bash
# Install all dependencies
npm install

# Re-install text-to-svg from master
rm -rf node_modules/text-to-svg
git clone --depth=1 https://github.com/congpeijun/text-to-svg.git -b congpeijun-patch-1 node_modules/text-to-svg
npm install --prefix node_modules/text-to-svg
npm run build --prefix node_modules/text-to-svg
```
