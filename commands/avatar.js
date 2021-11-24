'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Message } = require('discord.js');
const { TypePredicateKind } = require('typescript');

module.exports = {
    name: 'avatar',
    aliases: [],

    /**
     *  @param {MandyBot} client Discord Client
     *  @param {Message} message Discord Message
     *  @param {String[]} args Command Arguments
     */

    run: async (client, message, args) => {
        const $o = () => {
            if (!message.guild) {
                return;
            }
            const { guild } = message;

            let membro = message.mentions.users.first() || message.author;

            if (!membro) {
                message.delete();
                return;
            }

            let avatar = new MessageEmbed()
                .setColor('BLUE')
                .setImage(membro.displayAvatarURL({ dynamic: true, size: 4096 }))
                .setTimestamp()
                .setTitle('**Avatar**');

            message.delete();
            message.channel.send({
                embeds: [avatar],
            });
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
