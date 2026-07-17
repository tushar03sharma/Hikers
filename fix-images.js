const fs = require('fs');

const filesToFix = [
  'src/data/treks.js',
  'src/data/gallery.js',
  'src/data/reviews.js',
  'src/pages/About.jsx'
];

let trekCounter = 1;

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace unsplash images
  content = content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+[^'"`]+/g, () => {
    const img = `/trek-${trekCounter}.png`;
    trekCounter = trekCounter === 5 ? 1 : trekCounter + 1;
    return img;
  });

  // Replace pravatar images
  content = content.replace(/https:\/\/(i\.pravatar\.cc|randomuser\.me|ui-avatars\.com)[^'"`]+/g, '/avatar-1.png');

  fs.writeFileSync(file, content);
});

console.log("Replaced all images successfully!");
