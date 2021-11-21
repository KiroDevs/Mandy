'use strict';
const MandyBot = require('../src/loader');
const {
    Permissions,
    Collection,
    MessageEmbed,
    Message,
} = require('discord.js');
const ms = require('ms');
module.exports = {
    name: 'ban',
    aliases: ['banir'],

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
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.channel.send(
                    `Você não tem permissão para executar esse comando`,
                );
            }

            let $User = message.mentions.users.first();

            let razão = args.slice(1).join(' ');

            let Banido = new MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    `${$User} Foi Banido por <@${message.author.id}> Motivo: ${razão}`,
                )
                .setAuthor(`Expulso`)
                .setTimestamp();

            if ($User === message.author) {
                message.delete();
                message.channel.send(`> Você não pode expulsar a si mesmo`);
                return;
            }

            if (!$User) {
                message.delete();
                message.channel.send(
                    `Mencione ou coloque o ID de quem deseja banir`,
                );
            } else {
                message.guild.members
                    .ban($User)
                    .then(() => {
                        message.delete();
                        message.channel.send({
                            embeds: [Banido],
                        });
                    })
                    .catch((err) => {
                        console.log(err);
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
