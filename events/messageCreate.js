const db = require('quick.db');
const MandyBot = require('../src/loader');
const { Message } = require('discord.js');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {MandyBot} client Discord Client
     * @param {Message} message Discord Message
     * @param {String[]} args Command Arguments
     */

    run: async (client, message) => {
        if (message.author.bot || message.channel.type === 'dm') {
            return;
        }

        var prefix = db.fetch(`prefix_${message.guild.id}`);
        if (prefix === null) {
            prefix = client.config.px;
        }

        if (!message.content.startsWith(prefix)) {
            return;
        }

        const messageArray = message.content.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        const command =
            client.commands.get(cmd.slice(prefix.length)) ||
            client.commands.get(client.aliases.get(cmd.slice(prefix.length)));

        if (command && message.content.startsWith(prefix)) {
            command.run(client, message, args);
        }
    },
};
