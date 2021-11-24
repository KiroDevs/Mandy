'use strict';
const MandyBot = require('../src/loader');
const { Permissions, Message } = require('discord.js');
const ms = require('millisecond');
module.exports = {
    name: 'clear',
    aliases: ['limpar'],

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
                !message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) ||
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.delete();
                message.channel.send({
                    content: `> Você não tem permissão para executar esse comando`,
                });

                return;
            }

            let numero = args[0];

            let tempo;

            if (!numero) {
                message.delete();
                message.channel.send({
                    content: `> Mencione um número de **1** a **100** para apagar as mensagens`,
                });

                return;
            }
            message.delete();
            message.channel.bulkDelete(numero);
            message.channel.send({
                content: `> Você deletou ${numero} de mensagens.`,
            });
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
