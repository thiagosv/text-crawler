const pdf = require('html-pdf');
const fileUtils = require('../utils/fileUtils');

function make(webContent, request) {
    const fileName = fileUtils.getFileName(request.file_name);
    pdf.create(`<div style='font-size: ${request.height_text}px;'>${webContent}</div>`)
        .toFile(fileName, (err, res) => {
            if (err) console.log(`Não foi possível criar o arquivo: ${fileName}`);
            console.log(`${fileName} gerado!`);
        });
}

module.exports = make;