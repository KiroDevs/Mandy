'use strict';
const MandyBot = require('../src/loader');
const { MessageEmbed, Message } = require('discord.js');
module.exports = {
    name: 'reload',
    aliases: ['carregar'],

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

            if (message.author.id !== '798534518897115137') {
                message.channel.send(`Apenas o Dono do bot pode executar tal comando.`);
            }

            if (!args[0]) {
                message.channel.send(`Coloque o nome da categoria que deseja carregar`);
            }

            if (!args[1]) {
                message.channel.send(`Coloque o nome do comando que deseja carregar`);
            }

            let categoria = args[0].toLowerCase();
            let comando = args[1].toLowerCase();

            try {
                delete require.cache[require.resolve(`../../commands/${categoria}/${comando}.js`)];
                client.commands.delete(comando);

                let pull = require(`../../commands/${categoria}/${comando}.js`);
                client.commands.set(comando, pull);

                message.channel.send(`Carreguei o **${comando}** da pasta **${categoria}**`);
            } catch (err) {
                message.channel.send(`Erro: ${err}`);
            }
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};
