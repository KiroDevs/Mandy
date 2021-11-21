const MandyBot = require('./loader');
const { readdirSync } = require('fs');

class Utils {
    /**
     * @param {MandyBot} client Discord Client
     */
    constructor(client) {
        this.client = client;
    }

    startClient() {
        const botCommands = readdirSync('./commands').filter((file) =>
            file.endsWith('js'),
        );

        botCommands.map((botCommand) => {
            const command = require(`../commands/${botCommand}`);

            this.client.commands.set(command.name, command);

            if (command.aliases && command.aliases.length)
                command.aliases.map((alias) =>
                    this.client.aliases.set(alias, command.name),
                );
        });

        const botEvents = readdirSync('./events').filter((file) =>
            file.endsWith('js'),
        );

        botEvents.map((botEvent) => {
            const event = require(`../events/${botEvent}`);

            this.client.events.set(event.name, event);
            this.client.on(event.name, event.run.bind(null, this.client));
        });

        this.client.login(this.client.config.token);
    }
}

module.exports = Utils;
