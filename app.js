// Utils -- TODO: move out
const rgbToHex = (col) => {
  if(col.charAt(0)=='r') {
    col=col.replace('rgb(','').replace(')','').split(',');
    var r = parseInt(col[0], 10).toString(16);
    var g = parseInt(col[1], 10).toString(16);
    var b = parseInt(col[2], 10).toString(16);
    r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
    var colHex='#'+r+g+b;
    return colHex;
  }
}

// const rgbToHsl = (r, g, b) => {
//   r /= 255, g /= 255, b /= 255;

//   var max = Math.max(r, g, b), min = Math.min(r, g, b);
//   var h, s, l = (max + min) / 2;

//   if (max == min) {
//     h = s = 0; // achromatic
//   } else {
//     var d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//     switch (max) {
//       case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//       case g: h = (b - r) / d + 2; break;
//       case b: h = (r - g) / d + 4; break;
//     }

//     h /= 6;
//   }

//   return [ h, s, l ];
// }

const hslToHex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Build out shape size visualizer
[...document.querySelectorAll('.theme-summary-shape')].forEach((elem) => {
  // Get background value of color component and sanitize
  const sizeVals = getComputedStyle(elem).borderRadius
  const node = document.createElement("span");
  const textnode = document.createTextNode(`${sizeVals};`);
  node.classList.add('varValue');
  node.appendChild(textnode); 

  // Append text of the element adjacent sibling to the end of the text string
  elem.previousElementSibling.appendChild(node)
})

// Build out color variable visualizer
const visualizeColorText = () => {
  [...document.querySelectorAll('.theme-summary-color')].forEach((elem) => {
    let colorVal = elem.parentElement.firstElementChild.innerText.replace(/:.*$/,"")
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue(colorVal)
    elem.value = currentColor.trim()
    elem.parentElement.querySelector('.varVal').innerText =  `: ${currentColor};`

    elem.addEventListener('change', (e) => {
        colorVal = e.target.value
        const varVal = e.target.parentElement.firstElementChild.innerText.split(':')[0]
        e.target.parentElement.querySelector('.varVal').innerText = `: ${colorVal};`
        document.documentElement.style.setProperty(varVal, colorVal);
    })
  })
}

// Read Image
var loadFile = function(event) {
  var output = document.getElementById('source-image');
  output.src = URL.createObjectURL(event.target.files[0])

  runColors()
};

const runColors = () => {
  // Color Theif
  const colorThief = new ColorThief();
  const img = document.querySelector('#source-image');

  // Make sure image is finished loading
  if (img.complete) {
    // let root = document.documentElement;
    // const pallete = colorThief.getPalette(img, 3);
    // const primary = pallete[0], 
    //       secondary = pallete[1];

    // const primaryColor = `rgb(${primary[0]}, ${primary[1]}, ${primary[2]})`
    // const secondaryColor = `rgb(${secondary[0]}, ${secondary[1]}, ${secondary[2]})`


    // console.log(primaryColor, secondaryColor)

    // root.style.setProperty('--mdc-theme-primary', primaryColor);
    // root.style.setProperty('--mdc-theme-secondary', secondaryColor);

    // // TODO -- make the pallet and have the user select which colors they want
  }
  else {
    img.addEventListener('load', function() {
      // same code as above
      let root = document.documentElement;
      const pallete = colorThief.getPalette(img, 4);

      // make 0 bg bc its usually duller/background ?
      const primary = pallete[1], 
            secondary = pallete[2],
            bg = pallete[0],
            surface = pallete[3];

      const primaryColor = rgbToHex(`rgb(${primary[0]}, ${primary[1]}, ${primary[2]})`)
      const secondaryColor = rgbToHex(`rgb(${secondary[0]}, ${secondary[1]}, ${secondary[2]})`)
      const bgColor = rgbToHex(`rgb(${Math.min(bg[0] + 80, 255)}, ${Math.min(bg[1] + 80, 255)}, ${Math.min(bg[2] + 80, 255)})`)
      const lighterSurface = rgbToHex(`rgb(${Math.min(surface[0] + 80, 255)}, ${Math.min(surface[1] + 80, 255)}, ${Math.min(surface[2] + 80, 255)})`)
      const surfaceColor = lighterSurface;

      root.style.setProperty('--mdc-theme-primary', primaryColor)
      root.style.setProperty('--mdc-theme-secondary', secondaryColor)
      root.style.setProperty('--mdc-theme-background', bgColor)
      root.style.setProperty('--mdc-theme-surface', surfaceColor)

      // randomize border radius on small components
      root.style.setProperty('--mdc-shape-small', Math.floor(Math.random()*20)+'px');

      // Update colors in theme summary
      visualizeColorText()
    });
  }
}

visualizeColorText()