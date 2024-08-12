const fs = require('fs-extra');

// Source directory
const srcDir = 'src/correos-nodemailer';

// Destination directory
const destDir = 'dist/correos-nodemailer';

// Copy directory
fs.copySync(srcDir, destDir, { overwrite: true }, (err) => {
  if (err) {
    console.error('Error copying static assets:', err);
  } else {
    console.log('Static assets copied successfully!');
  }
});
