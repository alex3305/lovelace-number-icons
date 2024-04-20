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
