const fs = require('fs');
const superagent = require('superagent');

//reading data(dog breed) from file dog.txt
//1st callback function inside the readFile method
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  if (err) return console.log('Cannot find File/Read data from the file ❌');
  console.log(`Breed: ${data}`);

  //Using superagent package(external package) to use get request from dog.ceo API
  //2nd call back function inside the callback function of readFile
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(`Random dog image URL: ${res.body.message}`);

      //writing the data recieved using superagent .get .end into a file
      //3rd callback function inside the callback of superagent
      fs.writeFile(`${__dirname}/tc-dog-img-url.txt`, res.body.message, (err) => {
        if (err) return console.log('Cannot write the image url to the file: tc-dog-img-url.txt');
        console.log('img url written to the file: tc-dog-img-url.txt successfully');
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
