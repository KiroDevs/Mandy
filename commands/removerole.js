'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Permissions, Message } = require('discord.js');
module.exports = {
    name: 'removerole',
    aliases: ['remove-r'],

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

            const { guild } = message;

            let cargo = message.mentions.roles.first();

            if (!cargo) {
                message.delete();
                message.channel.send(`Escreva o nome do cargo que deseja remover`);
            } else {
                if (!membro) {
                    message.delete();
                    message.channel.send(`Mencione ou coloque o ID da pessoa que deseja mutar`);
                } else {
                    const member = guild.members.cache.get(membro.id);
                    if (!member.roles.cache.has(cargo.id)) {
                        message.delete();
                        message.channel.send(`Está pessoa já não tem esse cargo`);
                    } else {
                        member.roles.remove(cargo);

                        let embed = new MessageEmbed()
                            .setAuthor(`RemoveRole`)
                            .setColor('BLUE')
                            .setDescription(`<@${message.author.id}>, removeu o ${cargo} do ${membro}`);

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
