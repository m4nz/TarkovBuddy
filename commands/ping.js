const { updateDb } = require('../helpers/db')

exports.run = (client, msg) => {
    //updateDb()
    msg.channel.send(`Pong!`);
}