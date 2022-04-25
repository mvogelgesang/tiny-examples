const axios = require('axios').default;
const fs = require("fs").promises;
const date = new Date();
const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

axios.get("https://dog.ceo/api/breeds/image/random/3")
  .then(function (response: any) {
        // handle success
        fs.writeFile(
            `data/legacy/dogs_${formattedDate}.json`,
            JSON.stringify(response.data));
        fs.writeFile(`data/dogs.json`, JSON.stringify(response.data));
      })
  .catch(function (error: any) {
    // handle error
    console.log(error);
  });