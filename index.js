const path = require('path');
const fs = require('fs');
const _ = require('fxjs/Strict');

const inputDir = path.join(__dirname, 'input');
const outputNDJSON = path.join(__dirname, 'output.ndjson');
const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

const main = () => {
  fs.readdir(inputDir, (err, files) => {
    if (err) {
      return console.log(`error: ${err}`);
    }
  
    const images = files.filter(f => /\.jpg|\.jpeg|\.png|\.gif/i.test(f));

    _.go(
      images,
      _.each(async img => {
        const today = new Date();
        await sleep(10);
        const fullPathImg = path.join(inputDir, img);
        const birthday = fs.statSync(fullPathImg).birthtime.toISOString();
        const published = today.toISOString();
        const publishedStamp = today.valueOf();
        const json = `{"_type": "drawing","created": "${birthday}","drawingImage": {"_type": "image","_sanityAsset": "image@file://${fullPathImg}"},"mediumList": [{"_key": "4788adb1ebd8406d5317e49b5718cf43","_ref": "1e37680a-fb8c-4c86-8089-3a8a545aff23","_type": "reference"},{"_key": "b2d4947a475460ec2c9703e8d51ae8c0","_ref": "459fe5ec-1085-4723-9032-0140f3f26271","_type": "reference"}],"published": "${published}","slug": {"_type": "slug","current": "drawing-${publishedStamp}"},"title": "drawing ${publishedStamp}"}\n`;
        fs.open(outputNDJSON, 'a+', (err, fd) => {
          if (err) {
            if (err) {
              console.error(err);
              throw err;
            }
          }
  
          fs.write(fd, Buffer.from(json, 'utf8'), err => {
            if (err) {
              console.error(err);
              throw err;
            }
            fs.close(fd, err => {
              if (err) {
                console.error(err);
                throw err;
              }
            });
          });
        });
      })
    );

    //images.forEach();
  });
};

main();