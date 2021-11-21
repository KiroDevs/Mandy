'use strict';
const MandyBot = require('../src/loader');
const { Permissions, Message } = require('discord.js');
const db = require('quick.db');
const ms = require('easy-ms');
const { time } = require('console');
module.exports = {
    name: 'setprefix',
    aliases: ['setpx'],

    /**
     * @param {MandyBot} client Discord Client
     * @param {Message} message Discord Message
     * @param {String[]} args Command Arguments
     */

    run: async (client, message, args) => {
        const $o = () => {
            let prefixo = args[0];

            if (!message.guild) {
                return;
            }

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.delete();
                message.channel.send({
                    content:
                        '> Você não tem permissão para executar esse comando',
                });

                return;
            }

            if (!prefixo) {
                message.delete();
                return;
            }

            if (prefixo > 3) {
                message.delete();
                message.channel({
                    content: `> O prefix deve ter menos de **3** caracteres`,
                });

                return;
            }

            if (prefixo) {
                db.set(`prefix_${message.guild.id}`, prefixo);
                message.delete();
                message.channel.send({
                    content: `> Meu prefixo nesse servidor foi setado para ${prefixo}`,
                });

                return;
            }
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
