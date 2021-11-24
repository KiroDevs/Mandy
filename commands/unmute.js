'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Permissions, Message } = require('discord.js');
const ms = require('ms');
const mss = require('pretty-ms');
module.exports = {
    name: 'unmute',
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

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
                !message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)
            ) {
                message.delete();
                message.channel.send(`Você não tem permissão para executar esse comando`);
            }

            let membro = message.mentions.users.first();

            let cargo = message.guild.roles.cache.find((r) => r.name === 'Mutado');

            const { guild } = message;

            if (!membro) {
                message.delete();
                message.channel.send(`Mencione ou coloque o ID da pessoa que deseja desmutar`);
            } else {
                const member = guild.members.cache.get(membro.id);
                if (!member.roles.cache.has(cargo.id)) {
                    message.delete();
                    message.channel.send(`Está pessoa já está desmutada`);
                } else {
                    member.roles.remove(cargo);

                    let embed = new MessageEmbed()
                        .setAuthor(`Mute`)
                        .setColor('BLUE')
                        .setDescription(`<@${message.author.id}>, deu unmute no ${membro}`);

                    message.delete();
                    message.channel.send({
                        embeds: [embed],
                    });
                }
            }
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
