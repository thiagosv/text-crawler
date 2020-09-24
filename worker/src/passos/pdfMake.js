const htmlToPdfMake = require('html-to-pdfmake');
const pdfmake = require('pdfmake');
const fs = require('fs');

var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");


const fileUtils = require('../utils/fileUtils');

async function make(webContent, request) {

    const fileName = fileUtils.getFileName(request.file_name);
    const htmlContent = `<div style="font-size: ${request.site.height_text}px; text-align: justify;">` + await replace(webContent, request) + '</div>';

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
        // fs.writeFile(fileName, htmlContent, [], () => { });
        console.log(err);
        console.log(`Erro ao gerar ${fileName}`);
    }

}

async function replace(webContent, request) {
    return Promise.resolve(replaceFont(webContent))
        .then(webContent => replaceFontSize(webContent, request.site.height_text))
        .then(webContent => replaceTextAlign(webContent))
        .then(webContent => replaceColor(webContent))
        .then(webContent => removeImages(webContent))
        .then(webContent => removeSpans(webContent))
        .then(webContent => removeLineHeight(webContent));
}

function replaceFontSize(webContent, fontSize) {
    return webContent.replace(/font-size:[a-zA-Z0-9. ]{1,}(|px)/gm, `font-size: ${fontSize}px`);
}

function replaceFont(webContent) {
    return webContent.replace(/font-family:[a-zA-Z0-9'"\-, \;\&]{1,};/gm, "font-family: Roboto;");
}

function replaceTextAlign(webContent) {
    return webContent.replace(/text-align:[a-zA-Z ]{1,};/gm, "text-align: justify;");
}

function replaceColor(webContent) {
    return webContent.replace(/color:[a-zA-Z0-9 #]{1,};/gm, "color: black;");
}

function removeImages(webContent) {
    return webContent.replace(/<img[a-zA-Z0-9:.\/\-"\= ]{1,}>/gmi, '')
        .replace(/<img[a-zA-Z0-9:.\/\-"\= ]{1,}]\/>/gmi, '');
}

function removeSpans(webContent) {
    return webContent.replace(/<span[a-zA-Z0-9:.\/\-"'&;= %]{1,}>/gmi, '')
        .replace(/<\/span>/gmi, '');
}

function removeLineHeight(webContent) {
    return webContent.replace(/line-height:[a-zA-Z0-9. ]{1,};/gm, '');
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
        },
        Roboto: {
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