require('dotenv-defaults').config();

const fileUtils = require('./utils/fileUtils');

const passos = {
    queue: require('./passos/queue'),
    webContent: require('./passos/webContent'),
    pdfMake: require('./passos/pdfMake')
}

async function start() {
    const setFilename = request => `${request.prefix_file}-${request.current}`;

    passos.queue.consume((request) => {
        request.file_name = setFilename(request);
        if (!fileUtils.isFile(request.file_name)) {
            passos.webContent(request, passos.pdfMake);
        } else {
            console.log(`${request.file_name} já existe!`);
        }
    });
}

start();