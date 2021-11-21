'use strict';
const MandyBot = require('../src/loader');
const ms = require('ms');
const {
    Permissions,
    Collection,
    MessageEmbed,
    Message,
} = require('discord.js');
module.exports = {
    name: 'createrole',
    aliases: ['create-r'],

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
                !message.member.permissions.has(
                    Permissions.FLAGS.MANAGE_ROLES,
                ) ||
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.delete();
                message.channel.send(
                    `Você não tem permissão para executar esse comando`,
                );

                return;
            }

            let Nome = args.join(' ');

            if (!Nome) {
                message.delete();
                message.channel.send(
                    `Coloque o nome do cargo para que eu possa criar`,
                );
            }

            let NoTime = new MessageEmbed()
                .setTitle(`CreateRole`)
                .setColor('BLUE')
                .setDescription(`<@${message.author.id}> Criou o cargo ${Nome}`)
                .setTimestamp();

            message.guild.roles.create({
                name: `${Nome}`,
                permissions: [],
            });
            message.delete();
            message.channel.send({
                embeds: [NoTime],
            });
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
