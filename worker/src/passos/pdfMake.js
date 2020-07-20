const htmlToPdfMake = require('html-to-pdfmake');
const pdfmake = require('pdfmake');
const fs = require('fs');

var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");


const fileUtils = require('../utils/fileUtils');

function make(webContent, request) {

    const fileName = fileUtils.getFileName(request.file_name);
    const htmlContent = `<div style="font-size: ${request.site.height_text}px;">` + replaceFontSize(webContent, request.site.height_text) + '</div>';

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

function getFonts() {
    const getFont = font => fs.readFileSync(__dirname + `/fonts/${font}.ttf`);

    return {
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
        },
        "noto serif, serif": {
            normal: getFont('Comic Sans MS'),
            bold: getFont('Comic Sans MS'),
            italics: getFont('Comic Sans MS'),
            bolditalics: getFont('Comic Sans MS'),
        },
        "times new roman, serif": {
            normal: getFont('times new roman'),
            bold: getFont('times new roman bold'),
            italics: getFont('times new roman italic'),
            bolditalics: getFont('times new roman bold italic'),
        },
        "nsimsun": {
            normal: getFont('simsun'),
            bold: getFont('simsun'),
            italics: getFont('simsun'),
            bolditalics: getFont('simsun'),
        },
        "noto sans lisu": {
            normal: getFont('NotoSans-Regular'),
            bold: getFont('NotoSans-Bold'),
            italics: getFont('NotoSans-Italic'),
            bolditalics: getFont('NotoSans-BoldItalic'),
        },
        "noto sans lisu, sans-serif": {
            normal: getFont('NotoSans-Regular'),
            bold: getFont('NotoSans-Bold'),
            italics: getFont('NotoSans-Italic'),
            bolditalics: getFont('NotoSans-BoldItalic'),
        }
    }
}

module.exports = make;