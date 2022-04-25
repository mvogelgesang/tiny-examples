var args = require('minimist')(process.argv.slice(2));
const fs = require("fs").promises;

(async function () {
    console.log("args folders", args);
    const folderArray = (args.folders) ? args.folders.split(",") : [];

    //const folderArray = ["20220331", "20220330", "20220329"];
    if (folderArray.length>0) {
        for (var folder in folderArray) {
            const dirName = `data/${folderArray[folder]}`;
            const files = await fs.readdir(dirName, {
                withFileTypes: true,
              });
              for (const file of files) {
            }
          }
    } else {
        const dirName = `data/`;
        console.log("dirname:", dirName);
    }


  })();