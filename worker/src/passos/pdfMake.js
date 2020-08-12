const htmlToPdfMake = require('html-to-pdfmake');
const pdfmake = require('pdfmake');
const fs = require('fs');

var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");


const fileUtils = require('../utils/fileUtils');

function make(webContent, request) {

    const fileName = fileUtils.getFileName(request.file_name);
    const htmlContent = `<div style="font-size: ${request.site.height_text}px; text-align: justify !important; font-family: 'Roboto'">` + replaceFontSize(replaceFont(webContent), request.site.height_text) + '</div>';

    const getPdfMake = () => {
        return new pdfmake(getFonts());
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
            })
            .then(() => {
                console.log(`${fileName} gerado com sucesso!`);
            })
            .catch(err => console.log(err));
    } catch (err) {
        //fs.writeFile(fileName, htmlContent, [], ()=>{});
        console.log(err);
        console.log(`Erro ao gerar ${fileName}`);
    }

}

function replaceFontSize(webContent, fontSize){
    return webContent.replace(/font-size: [a-zA-Z0-9]{1,}(|px)/gm, `font-size: ${fontSize}px`);
}

function replaceFont(webContent){
    return webContent.replace(/font-family: [a-zA-Z', ]{1,};/gm, 'font-size: Roboto');
}

function getFonts() {
    const getFont = font => fs.readFileSync(__dirname + `/fonts/${font}.ttf`);

    return {
        roboto: {
            normal: getFont('Roboto-Regular'),
            bold: getFont('Roboto-Bold'),
            italics: getFont('Roboto-Italic'),
            bolditalics: getFont('Roboto-BoldItalic'),
            light: getFont('Roboto-Light'),
            lightItalic: getFont('Roboto-LightItalic'),
            black: getFont('Roboto-Black'),
            blackItalic: getFont('Roboto-BlackItalic'),
        }
    }
}

module.exports = make;