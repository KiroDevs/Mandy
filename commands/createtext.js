'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Permissions, Message } = require('discord.js');

module.exports = {
    name: 'createtext',
    aliases: ['create-txt'],

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

            let nome = args.join(' ');

            if (message.guild.channels.cache.find((ch) => ch.name === nome)) {
                return (
                    message.delete(),
                    message.channel.send(`Já existe um canal com esse nome`)
                );
            } else {
                await message.guild.channels.create(`${nome}`, {
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL],
                        },
                    ],
                });

                return (
                    message.delete(),
                    message.channel.send(
                        `<@${message.author.id}> seu canal foi criado com sucesso`,
                    )
                );
            }
        };

        try {
            $o();
        } catch (err) {
            console.log(err.message);
        }
    },
};
