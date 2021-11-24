'use strict';
const MandyBot = require('../src/loader');
const { Permissions, Collection, MessageEmbed, Message } = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'unban',
    aliases: ['desbanir'],

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

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
                !message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
            ) {
                message.delete();
                message.channel.send(`Você não tem permissão para executar esse comando`);

                return;
            }

            let userID = args[0];

            if (!userID) {
                message.delete();
                message.channel.send(`Insira o ID de quem deseja desbanir`);
                return;
            }

            let Echannel = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(`<@${userID}> Foi desbanido por <@${message.author.id}> `)
                .setAuthor(`UNBAN`)
                .setTimestamp()
                .setFooter(`Roblox Mall never dies`);

            message.guild.members
                .unban(userID)
                .then(() => {
                    message.delete();
                    message.channel.send({
                        embeds: [Echannel],
                    });
                })
                .catch((err) => {
                    message.delete();
                    message.channel.send({
                        content: `> Não achei esse usuário na Database de banidos.`,
                    });

                    console.log(err);
                });
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
