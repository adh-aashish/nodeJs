const fs = require('fs');
const superagent = require('superagent');

// Promisify
//we create new function that returns promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    //promise constructor takes a executor function
    //executor function takes two arguments resolve and reject which are functions indeed
    //inside this function asynchronous code lies
    fs.readFile(file, (err, data) => {
      if (err) reject('Couldnot read the file'); //if err call reject which takes error message as arg
      resolve(data); //else call resolve with data as arg
    });
  });
};

//another promisify function
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Couldnot write to the file');
      resolve('success');
    });
  });
};

//async and await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    //For multiple promises to resolve parallely
    //we first save the unresolved promises to variable
    //then we us Promise.all() method
    const res1 = superagent.get(
      //pending promise is stored in res1
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]); //resolve all promises parallely
    //store only message part of the promise
    const res = all.map((el) => {
      return el.body.message;
    });
    console.log(res);
    await writeFilePro(`dog-img.txt`, res.join('\n')); //join the result in newline
    console.log('Random dog saved');
  } catch (err) {
    // console.log(err);
    //we need to throw error to indicate promise is rejected otherwise
    //async function will always return fulfilled promise when all code inside braces
    //is executed even if there is error
    throw err;
  }
  return '2: Returning the dog pic';
};

/*
//when async funtion returns value
//handling with then() method
console.log('1: Getting dog pic');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Got dog pic');
  })
  .catch((err) => {
    console.log(err);
  });
*/

//handling with another async function
//IIFE
(async () => {
  try {
    console.log('1: Getting dog pic');
    const res = await getDogPic();
    console.log(res);
    console.log('3: Got dog pic');
  } catch (err) {
    console.log(err);
  }
})();

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed : ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    // get() ko method returns a promise so we can chain another then method
  })
  .then((res) => {
    //then() ko code runs after fulfilled promise
    console.log(res.body.message);
    return writeFilePro(`dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log('Random dog saved');
  })
  .catch((err) => {
    //catch ko code will run after rejected promise
    console.log(err);
  });
*/
/*
// Callback Hell
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`) // get() ko method returns a promise
    .then((res) => {
      //then() ko code runs after fulfilled promise
      console.log(res.body.message);
      fs.writeFile(`dog-img.txt`, res.body.message, (err) => {
        console.log('Random Dog image saved');
      });
    })
    .catch((err) => {
      //catch ko code will run after rejected promise
      if (err) {
        console.log(err.message);
      }
    });
});
*/
