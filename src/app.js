const passos = {
    input: require('./passos/input'),
    state: require('./passos/state'),
    webContent: require('./passos/webContent'),
    pdfMake: require('./passos/pdfMake')
}

async function start() {
    passos.input();

    const content = passos.state.load();

    for (let current = content.initial; current <= content.final; current++) {
        await sleep('500');
        if (!passos.pdfMake.isFile(content.prefixo + current)) {
            generatePDF(current);
        } else {
            console.log(`${current} já existe!`);
        }
    }

    function generatePDF(current) {
        passos.webContent(current, passos.pdfMake.make);
    }

    function sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }
}
start();