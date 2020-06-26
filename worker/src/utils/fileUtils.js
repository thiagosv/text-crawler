const fs = require('fs');
const contentPath = './pdf/';

const getFileName = name => contentPath + name + '.pdf';
const isFile = name => fs.existsSync(getFileName(name)) ? true : false;

module.exports = {
    isFile,
    getFileName
}