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

// Color Visualization
const rgbToHex = (col) => {
  if(col.charAt(0)=='r') {
    col=col.replace('rgb(','').replace(')','').split(',');
    var r=parseInt(col[0], 10).toString(16);
    var g=parseInt(col[1], 10).toString(16);
    var b=parseInt(col[2], 10).toString(16);
    r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
    var colHex='#'+r+g+b;
    return colHex;
  }
}

// Build out color variable visualizer
const visualizeColorText = () => {
  [...document.querySelectorAll('.theme-summary-color')].forEach((elem) => {
    let colorVal = elem.parentElement.firstElementChild.innerText
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue(colorVal)
    elem.value = currentColor.trim()
    console.log(currentColor, elem.value)
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
      const pallete = colorThief.getPalette(img, 3);

      // make 0 bg bc its usually duller/background ?
      const primary = pallete[1], 
            secondary = pallete[2],
            bg = pallete[0];

      const primaryColor = `rgb(${primary[0]}, ${primary[1]}, ${primary[2]})`
      const secondaryColor = `rgb(${secondary[0]}, ${secondary[1]}, ${secondary[2]})`
      const bgColor = `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`

      root.style.setProperty('--mdc-theme-primary', primaryColor);
      root.style.setProperty('--mdc-theme-secondary', secondaryColor);
      root.style.setProperty('--mdc-theme-background', bgColor);

      // randomize border radius on small components
      root.style.setProperty('--mdc-shape-small', Math.floor(Math.random()*20)+'px');

      // Update colors in theme summary
      visualizeColorText
    });
  }
}