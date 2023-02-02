const fs = require('fs');
const { url } = require('inspector');
const superagent = require('superagent');

const readFilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, breed) => {
      if (err) reject('Cannot read from the file ❌');
      resolve(breed);
    });
  });
};

const writeFilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject('Cannot write to the file ❌');
      resolve('Success');
    });
  });
};

/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((breed) => {
    console.log(`Breed: ${breed}`);
    return superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
  })
  .then((res) => {
    console.log(`Random Img URL : ${res.body.message}`);
    return writeFilePromise('dog-image-url.txt', res.body.message);
  })
  .then(() => {
    console.log('Dog Image url saved to file -> dog-image-url.txt');
  })
  .catch((err) => {
    console.log(err);
  });
*/

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, breed) => {
//   if (err) return console.log('File not found ❌');
//   console.log(`Breed: ${breed}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${breed}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog-image-url.txt`, res.body.message, (err) => {
//         if (err) return console.log('Can not write to the file ❌');
//         console.log(
//           `URL: ${res.body.message}\nof a random image of dog of Breed: ${breed} is saved in dog-image-url.txt`
//         );
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
