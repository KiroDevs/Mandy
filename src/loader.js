const { Client, Collection, Intents } = require('discord.js');

const Utils = require('./loader2');

class MandyBot extends Client {
    constructor() {
        super({
            partials: [
                'CHANNEL',
                'GUILD_MEMBER',
                'MESSAGE',
                'REACTION',
                'USER',
            ],
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES,
            ],
        });

        this.commands = new Collection();
        this.aliases = new Collection();
        this.events = new Collection();

        this.config = require('../config.json');
        this.utils = new Utils(this);
    }

    start() {
        this.utils.startClient();
    }
}

module.exports = MandyBot;
