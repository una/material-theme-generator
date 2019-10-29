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
const visualizeShapeVal = () => {
  [...document.querySelectorAll('.shapeVal')].forEach((elem) => {
    let shapeName = elem.parentElement.innerText.replace(/:.*$/,"")
    const currentShapeVal = getComputedStyle(document.documentElement).getPropertyValue(shapeName)
    elem.value = currentShapeVal.replace(/\D/g, '')
    // hidden char for text selection to save theme
    elem.textContent = currentShapeVal.replace(/\D/g, '');

    elem.addEventListener('change', (e) => {
      shapeVal = e.target.value
      document.documentElement.style.setProperty(shapeName, `${shapeVal}px`);
    })
  })
}

// Build out color variable visualizer
const visualizeColorVal = () => {
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

      // randomize border radius on components
      randomizeShape()

      // Update colors in theme summary
      visualizeColorVal()

      // Update shape values in theme summary
      visualizeShapeVal()

      // Display Theme button
      document.querySelector('.image-source-container').classList.remove('hidden')
    });
  }
}

visualizeColorVal()
visualizeShapeVal()

// Update Typeface
const fontFamily = 'Roboto'
const fontLink = `<link href="https://fonts.googleapis.com/css?family=${fontFamily}&amp;display=swap" rel="stylesheet">`

// Save the theme (utility)
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download on button click
const downloadBtn = document.querySelector('.save-button')
downloadBtn.addEventListener('click', () => {
  const allVars = ['--mdc-theme-primary', '--mdc-theme-on-primary', '--mdc-theme-secondary', '--mdc-theme-on-secondary', '--mdc-theme-error','--mdc-theme-on-error', '--mdc-theme-surface', '--mdc-theme-on-surface', '--mdc-theme-background','--mdc-shape-small','--mdc-shape-medium','--mdc-shape-large','--mdc-typography--font-family']

  const rootVals = allVars.map((val) => {
    return `  ${val}: ${getComputedStyle(document.documentElement).getPropertyValue(val)};`
  })

  download("style.css", `:root {
${rootVals.toString().replace(/,/g, '\n')}
}`);
})

// Randomize Shape
const randomizeShape = () => {
  const root = document.documentElement;
  root.style.setProperty('--mdc-shape-small', Math.floor(Math.random()*20)+'px');
  root.style.setProperty('--mdc-shape-medium', Math.floor(Math.random()*20)+'px');
  root.style.setProperty('--mdc-shape-large', Math.floor(Math.random()*20)+'px');
}

// Randomize values
document.querySelector('.randomize-shape').addEventListener('click', () => {
  randomizeShape()
  visualizeShapeVal()
})

// Randomize Color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const randomizeColor = () => {
  const root = document.documentElement;

  root.style.setProperty('--mdc-theme-primary', getRandomColor())
  root.style.setProperty('--mdc-theme-secondary', getRandomColor())
  root.style.setProperty('--mdc-theme-background', getRandomColor())
  root.style.setProperty('--mdc-theme-surface', getRandomColor())
}

document.querySelector('.randomize-colors').addEventListener('click', () => {
  randomizeColor()
  visualizeColorVal()
})

// Randomize Typeface
document.querySelector('.randomize-typeface').addEventListener('click', () => {
  const root = document.documentElement;

  const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  const fontName = randomFont.text
  const fontUrlName = randomFont.value

  WebFont.load({
    google: {
      families: [fontName] } 
  });

  root.style.setProperty('--mdc-typography--font-family', fontName)
  root.querySelector('.font-name').innerHTML = `'${fontName}'`;
  root.querySelector('.font-link').href = `https://fonts.google.com/specimen/${fontUrlName}`
})