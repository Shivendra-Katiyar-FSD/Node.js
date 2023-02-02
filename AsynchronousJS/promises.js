const fs = require('fs');
const superagent = require('superagent');

//Writing custom readFile method that returns the data as a promise
const readFilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject('Cannot find the file/read data from the file ❌');
      resolve(data);
    });
  });
};

//Writing custom writeFile method that writes data to file via promise
const writeFilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject('Cannot write data to the file ❌');
      resolve('Success');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(`Random dog image url: ${res.body.message}`);
    return writeFilePromise(`${__dirname}/prms-dog-img-url.txt`, res.body.message);
  })
  .then(() => {
    console.log('img url written to the file: prms-dog-img-url.txt successfully');
  })
  .catch((err) => {
    console.log(err);
  });
