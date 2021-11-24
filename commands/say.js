'use strict';
const MandyBot = require('../src/loader');
const { Permissions, MessageEmbed, Message } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'say',
    aliases: ['falar'],

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

            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                message.delete();
                return;
            }

            let fala = args.join(' ');

            if (!fala) {
                message.delete();
                return;
            } else {
                message.delete();
                message.channel.send({
                    content: fala,
                });
            }
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
