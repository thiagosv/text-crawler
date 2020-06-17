const rp = require('request-promise');
const cheerio = require('cheerio');
const state = require('./state');

function getWebContent(current, callback) {
    const content = state.load();
    const uri = content.url + current;

    const options = {
        uri,
        transform: function (body) {
            return cheerio.load(body)
        }
    }

    const fileName = content.prefixo + current;

    rp(options)
        .then(($) => {
            callback(fileName, content.fontSize, $(content.selector).html());
        })
        .catch((err) => {
            throw err;
        });
}

module.exports = getWebContent;