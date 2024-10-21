// Generated number-icons.js
// By Alex van den Hoogen
//
// Font source:       {{FONT_SOURCE}}
//

const iconPrefix = "{{PREFIX}}";
const icons = {};

async function getIcon(name) {
    if (!(name in icons)) {
        console.log(`Icon "${iconPrefix}:${name}" not available`);
        return "";
    }

    var svg = icons[name];

    return {
        path: svg.path,
        viewBox: svg.x + " " + svg.y + " " + svg.width + " " + svg.height,
    };
}

async function getIconList() {
    return Object.entries(icons).map(([icon]) => ({
        name: icon,
    }));
}

window.customIconsets = window.customIconsets || {};
window.customIconsets[iconPrefix] = getIcon;

window.customIcons = window.customIcons || {};
window.customIcons[iconPrefix] = { getIcon, getIconList };
