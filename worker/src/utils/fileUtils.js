const fs = require('fs');
const contentPath = './pdf/';

const getPath = () => contentPath;
const getFileName = (fileDir, fileName) => `${contentPath}/${fileDir}/${fileName}.pdf`;
const isFile = (fileDir, fileName) => fs.existsSync(getFileName(fileDir, fileName)) ? true : false;

module.exports = {
    isFile,
    getPath,
    getFileName
}