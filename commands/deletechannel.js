'use strict';
const MandyBot = require('../src/loader');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageCollector,
    MessageAttachment,
    Permissions,
    Message,
} = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'deletechannel',
    aliases: ['delete-c'],

    /**
     * @param {MandyBot} client Discord Client
     * @param {Message} message Discord Message
     * @param {String[]} args Command Arguments
     */

    run: async (client, message, args) => {
        const $o = async () => {
            if (!message.guild) {
                return;
            }

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.channel.send(
                    `Você não tem permissão para executar esse comando`,
                );
            }

            let nome = message.guild.channels.cache.find(
                (ch) => ch.name === args.join(' '),
            );

            const report6 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`Para apagar o canal, cliquei no :x:`);
            const row3 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('apagar')
                    .setStyle('SECONDARY')
                    .setEmoji('❌'),
            );

            const collector = message.channel.createMessageComponentCollector();

            if (args[0]) {
                nome.delete();
            } else {
                message.channel.delete();
            }
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
