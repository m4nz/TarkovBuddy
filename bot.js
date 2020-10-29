const Discord = require('discord.js');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const { startCron } = require('./helpers/cron');


const client = new Discord.Client();
const prefix = "!tark";

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log("Connected to DB")
);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: 'with code. (TESTING)' }, status: 'dnd' })

    startCron()
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) { return }
    if (message.author.bot) { return }
    let msg = message.content.toLowerCase();
    let command = msg.slice(prefix.length).trim();

    try {
        let commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message);
    } catch (e) {
        console.log("Command does not exist")
    }

});

client.login(process.env.BOT_TOKEN);