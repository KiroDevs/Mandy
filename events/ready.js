const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const MandyBot = require('../src/loader');

module.exports = {
    name: 'ready',

    /**
     * @param {MandyBot} client Discord Client
     */

    run: async (client, message, args) => {
        console.log(
            `Logado ${client.user.username} \n Estou em ${client.guilds.cache.size} servidores com um total de ${client.users.cache.size} usuários.`,
        );

        let presence = db.fetch(`SETPRESENCE`);
        let status = db.fetch(`SETSTATUS`);

        client.user.setStatus(`${status}`);

        client.user.setPresence({
            activities: [{ name: `${presence}` }],
        });

        client.on('guildCreate', async (guild) => {
            let cargo = guild.roles.cache.find((r) => r.name === 'Mutado');

            if (!cargo) {
                guild.roles.create({
                    name: 'Mutado',
                    permissions: [],
                });
            }
        });

        client.on('messageCreate', (message) => {
            if (message.content.includes(client.user.id)) {
                const prefix = db.fetch(`prefix_${message.guild.id}`);
                const embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setDescription(
                        'Meu prefixo nesse servidor é `' + prefix + '`',
                    );
                message.delete();
                message.channel.send({ embeds: [embed] });
            }
        });
    },
};
