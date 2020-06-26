const amqp = require('amqplib').connect(`amqp://${process.env.RABBITMQ_URL}`);

async function consume(callback) {
    amqp.then(conn => conn.createChannel())
        .then(channel => {
            channel.consume(process.env.QUEUE, async (message) => {
                await sleep('1000');

                callback(JSON.parse(message.content.toString()));
            }, { noAck: true });
        })
        .catch(err => console.log(err));

    function sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }

}

module.exports = {
    consume
};