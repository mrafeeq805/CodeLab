const sharp = require('sharp');

sharp("images/Group.png")
  .webp({ quality: 90 }) // Optional to change quality for more performance gainz
  .toFile("images/Group.webp", (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });