// generates an automatic mock and overrides default behavior of the module
const fs = jest.genMockFromModule("fs");
const path = require("path");

// stores imaginary (mocked) files and folders
let mockFiles = Object.create(null);

// example of newMockFiles
// { "./testFolder/file1.txt": "this is the file content"}

// populates mockFiles and takes in test-specific configurations
function __createMockFiles(newMockFiles) {
    mockFiles = Object.create(null);

    for (const file in newMockFiles) {
        const dir = path.dirname(file);
        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
        
        mockFiles[dir].push(path.basename(file));
        mockFiles[dir][path.basename(file)] = newMockFiles[file];
    }
}

// this is the function that is getting mocked
function existsSync(pathToDirectory) {
    return mockFiles[pathToDirectory];
}

fs.existsSync = existsSync;
fs.__createMockFiles = __createMockFiles;
module.exports = fs;
