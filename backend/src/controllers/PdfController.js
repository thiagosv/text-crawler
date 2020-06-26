const amqp = require('amqplib').connect(`amqp://${process.env.RABBITMQ_URL}`);
const Novel = require('../models/Novel');

module.exports = {
    store(req, res) {
        const { novel_id, initial, final } = req.body;
        Novel.findOne({ _id: novel_id }).populate('site').then(novel => {
            for (let i = initial; i <= final; i++) {
                Promise.resolve({ ...novel._doc })
                    .then((novel_cp) => {
                        novel_cp.url = novel_cp.url.replace(">page<", i);
                        novel_cp.current = i;
                        return novel_cp;
                    })
                    .then((novel_cp) => {
                        amqp.then(conn => conn.createChannel())
                            .then(channel => {
                                channel.publish('pdf.generate', '', Buffer.from(JSON.stringify({ ...novel_cp })));
                            })
                    }).catch((err) => res.json(err).end());
            }
            res.json({ message: 'ok' }).end();
        }).catch(err => res.json(err));
    }
}; 