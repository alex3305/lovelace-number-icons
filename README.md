# Number Icons for Home Assistant

Adds SVG icons based on numbers for Home Assistant. These can be used for setting or showing temperatures within Home Assistant.

## Installing

### HACS

1. Add this repo as custom repo to HACS
2. Install this component

### Manual

1. Copy the `dist/ha-number-icons.js` to your `/config/www/` directory
2. Enable advanced mode to [register resources](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources)
3. Add `/local/ha-number-icons.js` as a custom resource

## Development

### Installation

```bash
# Install all dependencies
npm install

# Re-install text-to-svg from master
rm -rf node_modules/text-to-svg
git clone --depth=1 https://github.com/congpeijun/text-to-svg.git -b congpeijun-patch-1 node_modules/text-to-svg
npm install --prefix node_modules/text-to-svg
npm run build --prefix node_modules/text-to-svg
```
