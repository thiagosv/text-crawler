const readline = require('readline-sync');
const state = require('./state.js');

function passo() {
    const content = {};

    content.url = askAndReturn('Qual o url? ');
    content.initial = askAndReturn('Qual a pagina inicial? ');
    content.final = askAndReturn('Qual a pagina final? ');
    content.selector = askAndReturn('Qual o seletor do texto? ');
    content.fontSize = askAndReturn('Qual o tamanho em px da font no pdf? ');
    content.prefixo = askAndReturn('Qual o prefixo dos arquivos? ');
    content.prefixo = content.prefixo != '' ? content.prefixo + '-' : '';

    state.save(content);

    function askAndReturn(question) {
        return readline.question(question);
    }
}

module.exports = passo;