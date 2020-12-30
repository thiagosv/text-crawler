const rp = require('request-promise');
const cheerio = require('cheerio');

const { publish } = require("../passos/queue");

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
            console.log(err.statusCode);
            console.log(`Erro ao recuperar informações do URL: ${request.url}`);
            if (err.statusCode === 500 || err.statusCode === "500" || err.statusCode == "500" || err.statusCode == 500) {
                console.log("erro status 500");
                publish(request);
            }
        });
}

module.exports = getWebContent;