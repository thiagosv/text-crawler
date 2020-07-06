const htmlToPdfMake = require('html-to-pdfmake');
const pdfmake = require('pdfmake');
const fs = require('fs');

var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");


const fileUtils = require('../utils/fileUtils');

function make(webContent, request) {

    const fileName = fileUtils.getFileName(request.file_name);
    const htmlContent = `<div style='font-size: ${request.site.height_text}px;'>${webContent}</div>`;

    const getFont = font => fs.readFileSync(__dirname + `/fonts/${font}.ttf`);
    const getPdfMake = () => {
        return new pdfmake({
            Roboto: {
                normal: getFont('Roboto-Regular'),
                bold: getFont('Roboto-Bold'),
                italics: getFont('Roboto-Italic'),
                bolditalics: getFont('Roboto-BoldItalic'),
                light: getFont('Roboto-Light'),
                lightItalic: getFont('Roboto-LightItalic'),
                black: getFont('Roboto-Black'),
                blackItalic: getFont('Roboto-BlackItalic'),
            },
            "comic sans ms', sans-serif": {
                normal: getFont('Comic Sans MS'),
                bold: getFont('Comic Sans MS'),
                italics: getFont('Comic Sans MS'),
                bolditalics: getFont('Comic Sans MS'),
            }
        });
    }

    try {

        const docDefinition = {
            content: [
                htmlToPdfMake(htmlContent, { window })
            ]
        };

        const pdf = getPdfMake();

        Promise.resolve(pdf.createPdfKitDocument(docDefinition))
            .then(pdf => {
                pdf.pipe(fs.createWriteStream(fileName))
                pdf.end();
                console.log(`${fileName} gerado com sucesso!`);
            });
    } catch (err) {
        // fs.writeFile(fileName, htmlContent, [], ()=>{});
        console.log(err);
        console.log(`Erro ao gerar ${fileName}`)
    }

}

module.exports = make;