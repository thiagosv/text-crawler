const rp = require('request-promise');
const cheerio = require('cheerio');

function getWebContent(request, callback) {
    const options = {
        uri: request.url,
        transform: function (body) {
            return cheerio.load(body)
        }
    }

    rp(options)
        .then(($) => {
            callback($(request.site.selector_text).html(), request);
        })
        .catch((err) => {
            console.log(`Erro ao recuperar informações do URL: ${request.url}`);
        });
}

module.exports = getWebContent;