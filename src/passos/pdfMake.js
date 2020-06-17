const pdf = require('html-pdf')
const fs = require('fs');
const contentPath = './pdf/';

function make(name, fontSize = 30, content) {
    const fileName = getFileName(name);
    pdf.create(`<div style='font-size: ${fontSize}px;'>${content}</div>`).toFile(fileName, (err, res) => {
        if (err) throw err;
        console.log(name + '.pdf gerado!');
    });
}

function isFile(name) {
    return fs.existsSync(getFileName(name)) ? true : false;
}

function getFileName(name) {
    return contentPath + name + '.pdf';
}

module.exports = {
    make,
    isFile
};