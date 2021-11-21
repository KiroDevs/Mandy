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
    name: 'lembrete',
    aliases: [''],

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

            let tempo = ms(`${args[0]}`);

            let Aviso = args.slice(1).join(' ');

            if (!tempo || !Aviso) {
                message.delete();
                message.channel.send(
                    `Ocorreu um erro trate de colocar o lembrete nesse formato: >lembrete **tempo** **mensagem**`,
                );
                return;
            }

            let Embed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Lembrete`)
                .setDescription(`${Aviso}`);

            message.delete();
            setTimeout(() => {
                message.channel.send({
                    content: `${message.author}`,
                    embeds: [Embed],
                });
            }, tempo);
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
