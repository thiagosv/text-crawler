const amqp = require('amqplib').connect(`amqp://${process.env.RABBITMQ_URL}`);
const Novel = require('../models/Novel');

const store = (req, res) => {
    const { novel_id, initial, final } = req.body;
    if (initial > final)
        return res.json({ message: "O capitulo inicial não pode ser maior que o final!" }).status(400);
    Novel.findOne({ _id: novel_id }).populate('site').then(novel => {
        amqp.then(conn => conn.createChannel())
            .then(channel => {
                for (let page = initial, timeOut = 1; page <= final; page++, timeOut++) {
                    Promise.resolve({ ...novel._doc })
                        .then(novel => resolveNovePage(novel, page))
                        .then(novel => novel.site.timeout ? publishPdfNovelWithTimeOut(novel, channel, timeOut) : publishPdfNovel(novel, channel))
                        .catch(console.log);
                }
                res.json({ message: 'ok' }).end();
            })
    }).catch(err => res.json(err));

    const resolveNovePage = (novel, p) => {
        let page = (p + "").padStart(2, '0');
        novel.url = novel.url.replace(">page<", page);
        novel.current = page;
        return novel;
    }

    const publishPdfNovelWithTimeOut = (novel, channel, timeOut) => {
        setTimeout(() => {
            publishPdfNovel(novel, channel)
        }, parseInt(timeOut + "000"));
    }

    const publishPdfNovel = (novel, channel) => {
        channel.publish(process.env.EXCHANGE, '', Buffer.from(JSON.stringify({ ...novel })));
    }
}


module.exports = {
    store: store
}; 