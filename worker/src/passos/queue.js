const amqp = require('amqplib').connect(`amqp://${process.env.RABBITMQ_URL}`);

function consume(callback) {
    amqp.then(conn => conn.createChannel())
        .then(channel => {
            channel.consume(process.env.QUEUE, (message) => {
                callback(JSON.parse(message.content.toString()));
            }, { noAck: true });
        })
        .catch(err => console.log(err));
}

function publish(message) {
    amqp.then(conn => conn.createChannel())
        .then(channel => {
            channel.publish(process.env.EXCHANGE, '', Buffer.from(JSON.stringify({ ...message })));
        })
        .catch(err => console.log(err));
}

module.exports = {
    consume,
    publish
};