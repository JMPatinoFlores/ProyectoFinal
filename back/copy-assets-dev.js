const fs = require('fs-extra');

const srcDir = 'src/correos-nodemailer';
const destDir = 'dist/correos-nodemailer';

// Function to copy the directory
function copyAssets() {
  fs.copySync(srcDir, destDir, { overwrite: true }, (err) => {
    if (err) {
      console.error('Error copying static assets:', err);
    } else {
      console.log('Static assets copied successfully for development!');
    }
  });
}
// Run the function
copyAssets();
