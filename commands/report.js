'use strict';
const MandyBot = require('../src/loader');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageCollector,
    MessageAttachment,
    Permissions,
    Message,
} = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'report',
    aliases: ['reportar'],

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

            if (
                !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
            ) {
                message.delete();
                message.channel.send(`Você não pode executar esse comando`);
            }

            const report = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(
                    `Para começar seu report, clique no botão abaixo.`,
                );

            const report1 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`Nick da pessoa que deseja denunciar`);

            const report2 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`Selecione sua opção de Denúncia`);

            const report3 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(
                    `Envie um clip comprovando que ele está usando hack.`,
                );

            const report4 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`Informe o que você deseja denunciar.`);

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('Inicio-report')
                    .setStyle('PRIMARY')
                    .setEmoji('✉️'),
            );

            const row1 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('HACK')
                    .setStyle('DANGER')
                    .setLabel('Uso de hacks'),

                new MessageButton()
                    .setCustomId('OUTRO')
                    .setStyle('PRIMARY')
                    .setLabel('Outro'),
            );

            const report6 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`Para apagar o canal, cliquei no :x:`);
            const row3 = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('apagar')
                    .setStyle('SECONDARY')
                    .setEmoji('❌'),
            );

            const $embed = new MessageEmbed();
            const collector = message.channel.createMessageComponentCollector();

            $embed.setTitle(`Denúncia`);
            $embed.setColor('#ea11e6');
            message.channel.send({ embeds: [report], components: [row] });
            await collector.on('collect', async (i) => {
                if (i.customId === 'Inicio-report') {
                    const name = 'ticket-' + i.user.id;
                    if (
                        message.guild.channels.cache.find(
                            (ch) => ch.name == name,
                        )
                    ) {
                        message.channel.send(
                            `<@${i.user.id}>, Você ja tem um ticket aberto`,
                        );
                    } else {
                        await message.guild.channels
                            .create(`ticket-${i.user.id}`, {
                                type: 'GUILD_TEXT',
                                permissionOverwrites: [
                                    {
                                        id: message.guild.id,
                                        deny: [Permissions.FLAGS.VIEW_CHANNEL],
                                    },
                                    {
                                        id: i.user.id,
                                        allow: [Permissions.FLAGS.VIEW_CHANNEL],
                                    },
                                ],
                            })
                            .then(async (canal) => {
                                const $collector = canal.createMessageCollector(
                                    {},
                                );
                                const $colle = canal.createMessageCollector({});
                                const $cha =
                                    canal.createMessageComponentCollector({});
                                const $cho =
                                    canal.createMessageComponentCollector({});
                                await canal
                                    .send({
                                        content: `<@${i.user.id}>`,
                                        embeds: [report6],
                                        components: [row3],
                                    })
                                    .then(() => {
                                        $cho.on('collect', async (bed) => {
                                            if (bed.customId === 'apagar') {
                                                await canal.bulkDelete(10);
                                                $colle.stop();
                                                canal
                                                    .send(
                                                        `Apagarei o canal em 10s`,
                                                    )
                                                    .then(() => {
                                                        setTimeout(() => {
                                                            canal.delete();
                                                        }, 10000);
                                                    });
                                            }
                                        });
                                    });

                                await canal.send({ embeds: [report1] });
                                await $colle.on('collect', async (u) => {
                                    const message1 = u.content;

                                    if (message1) {
                                        $colle.stop();
                                        canal.send({
                                            embeds: [report2],
                                            components: [row1],
                                        });
                                    }
                                    await $cha.on('collect', async (ma) => {
                                        if (ma.customId === 'HACK') {
                                            await canal.send({
                                                embeds: [report3],
                                            });
                                            $collector.on(
                                                'collect',
                                                async (s) => {
                                                    $cha.stop();
                                                    const msg = s.content;
                                                    if (msg) {
                                                        canal.bulkDelete(5);
                                                        $collector.stop();
                                                        $embed.setDescription(
                                                            `Denúncia aberta por: ${message.author} \n IGN: ${u.content} \n Motivo: Hack \n Prova: ${s.content}`,
                                                        );
                                                        canal.send({
                                                            embeds: [$embed],
                                                        });
                                                    }
                                                },
                                            );
                                        }

                                        if (ma.customId === 'OUTRO') {
                                            await canal.send({
                                                embeds: [report4],
                                            });
                                            $collector.on(
                                                'collect',
                                                async (s) => {
                                                    $cha.stop();
                                                    const msg = s.content;
                                                    if (msg) {
                                                        canal.bulkDelete(5);
                                                        $collector.stop();
                                                        $embed.setDescription(
                                                            `Denúncia aberta por: ${message.author} \n IGN: ${u.content} \n Motivo: Anti jogo \n Prova: ${s.content}`,
                                                        );
                                                        canal.send({
                                                            embeds: [$embed],
                                                        });
                                                    }
                                                },
                                            );
                                        }
                                    });
                                });
                            });
                    }
                }
            });
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};

//https://www.youtube.com/watch?v=kV_SDN9QYM0

/*$collector.on('end', collected => {
    console.log(collected)
})*/
