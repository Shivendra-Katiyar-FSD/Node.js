const fs = require('fs');
const superagent = require('superagent');

//reading data(dog breed) from file dog.txt
//1st callback function inside the readFile method
fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  if (err) return console.log('Cannot find the file/Read data from file ❌');
  //Testing the data read from the file
  console.log(`Breed: ${data}`);

  //Using superagent package(external package) to use get request from dog.ceo API
  //2nd call back function inside the callback function of readFile
  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
    if (err) return console.log('Some error occured while getting data from API');
    //The data is present inside the ody of res(response from network request)
    console.log(`Random dog image URL: ${res.body.message}`);

    //writing the data recieved using superagent .get .end into a file
    //3rd callback function inside the callback of superagent
    fs.writeFile(`${__dirname}/cb-dog-img-url.txt`, res.body.message, (err) => {
      if (err) return console.log('Cannot write the img url to the file ❌');
      console.log('img url written to the file : cb-dog-img-url.txt successfully');
    });
  });
});
