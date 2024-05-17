// Generated ha-number-icons.js
// By Alex van den Hoogen
// 
// Font source:       {{FONT_SOURCE}}
// Generator version: {{VERSION}}
// 

const icons = {};

async function getIcon(name) {
    if (!(name in icons)) {
        console.log(`Icon "num:${name}" not available`);
        return '';
    }
  
    var svg = icons[name];
    
    return {
        path: svg.path,
        viewBox: svg.x + " " + svg.y + " " + svg.width + " " + svg.height
    }  
}

async function getIconList() {
    return Object.entries(icons).map(([icon]) => ({
      name: icon
    }));
}

window.customIconsets = window.customIconsets || {};
window.customIconsets["num"] = getIcon;

window.customIcons = window.customIcons || {};
window.customIcons["num"] = { getIcon, getIconList };

const version = '{{VERSION}}';
console.info(`%c HA Number Icons %c ${version}`, "color:white;background:green;", "");
