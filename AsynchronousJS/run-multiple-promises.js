const fs = require('fs');
const superagent = require('superagent');

//Creating custom readFile function that returns read data via promise in resolved state
const readFilePromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) reject('Could not find file/read data from file ❌');
      resolve(data);
    });
  });
};

//Creating custom writeFile function to write data to file via promise in resolved state
const writeFilePromise = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject('Could not write data to file ❌');
      resolve('File Written Successfully');
    });
  });
};

//Using asynchronous function along with async await
const getDogImage = async () => {
  try {
    const breed = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${breed}`);

    //Creating multiple requests to get promise using superagent.get
    const res1Promise = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    const res2Promise = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);
    const res3Promise = superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`);

    //Now getting all promises using await
    const allPromises = await Promise.all([res1Promise, res2Promise, res3Promise]);
    const allImages = allPromises.map(el => el.body.message);
    console.log(allImages);

    // console.log(`Random dog image URL: ${res.body.message}`);

    await writeFilePromise(`${__dirname}/mul-prms-dog-img-url.txt`, allImages.join('\n'));
    console.log(`${allImages.length} Dog img url(s) written to the file: mul-prms-dog-img-url.txt successfully`);
  } catch (err) {
    console.log(err);
  }
};

getDogImage();
