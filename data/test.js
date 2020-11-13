const csv = require('csv-parser');
const fs = require('fs');

reviews=[]
fs.createReadStream('reviews.csv')
  .pipe(csv())
  .on('data', (row) => {
    reviews.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });