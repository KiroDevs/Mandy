'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Message } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'setstatus',
    aliases: ['set-p'],

    /**
     * @param {MandyBot} client Discord Client
     * @param {Message} message Discord Message
     * @param {String[]} args Command Arguments
     */
    run: async (client, message, args) => {
        const $o = () => {
            if (!message.guild) {
                return;
            }

            if (message.author.id !== '798534518897115137') {
                message.delete();
                message.channel.send(`Apenas o Dono do bot pode executar tal comando.`);
            } else {
                let status = args.join(' ');

                client.user.setStatus(`${status}`);
                db.set(`SETSTATUS`, status);
            }
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
