const { updateDb } = require('../helpers/db');

exports.run = (client, msg) => {
    msg.channel.send("Trying to update database, this will take a while...");

    updateDb(function( res ) {
        if (res[0] !== 'success') return msg.channel.send("Error updating database");

        msg.channel.send(`Successfully updated database! \nTotal items: ${res[1] + res[2]} \nNew items: ${res[2]} \nUpdated items: ${res[1]}`);
    })
}