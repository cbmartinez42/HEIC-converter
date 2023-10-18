const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

(async () => {
    const filePath = 'C:\Users\alien\Desktop\Motega\iCloud_Photos';
    const files = fs.readdir(filePath,  
        { withFileTypes: true }, 
        (err, files) => { 
        console.log("\nCurrent directory files:"); 
        if (err) 
          console.log(err); 
        else { 
          files.forEach(file => { 
            console.log(file); 
          }) 
        } 
      }) 
    for (let index in files) {

    const fileName = files[index]


  const inputBuffer = await promisify(fs.readFile)(filePath + fileName + '.HEIC');
  const images = await convert.all({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'PNG'       // output format
  });
  

  for (let idx in images) {
    const image = images[idx];
    const outputBuffer = await image.convert();
    await promisify(fs.writeFile)(`./result-${idx}.jpg`, outputBuffer);
  }
}
})();