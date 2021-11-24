'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Permissions, Message } = require('discord.js');

module.exports = {
    name: 'addrole',
    aliases: ['add-r'],

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
            const { guild } = message;

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
                !message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)
            ) {
                message.delete();
                message.channel.send(`Você não tem permissão para executar esse comando`);
            }

            let membro = message.mentions.users.first();

            let cargo = message.mentions.roles.first();

            if (!cargo) {
                message.delete();
                message.channel.send(`Escreva o nome do cargo que deseja adicionar`);
            } else {
                if (!membro) {
                    message.delete();
                    message.channel.send(`Mencione ou coloque o ID da pessoa que deseja mutar`);
                } else {
                    const member = guild.members.cache.get(membro.id);
                    if (member.roles.cache.has(cargo.id)) {
                        message.delete();
                        message.channel.send(`Está pessoa já tem esse cargo`);
                    } else {
                        member.roles.add(cargo);

                        let embed = new MessageEmbed()
                            .setAuthor(`AddRole`)
                            .setColor('BLUE')
                            .setDescription(`<@${message.author.id}>, adicionou o ${cargo} para ${membro}`);

                        message.delete();
                        message.channel.send({
                            embeds: [embed],
                        });
                    }
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
