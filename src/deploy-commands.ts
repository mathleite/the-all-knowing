import Ping from "./commands/Ping";
import Help from "./commands/Help";
import AllKnowing from "./commands/AllKnowing";
import OpenaiClient from "./openai/client/OpenaiClient";

const { REST, Routes } = require('discord.js');
const {
    DISCORD_BOT_ID,
    DISCORD_SERVER_ID,
    DISCORD_BOT_TOKEN
} = process.env;

const commands = [
    new Ping().getCommandBuilder().toJSON(),
    new Help().getCommandBuilder().toJSON(),
    new AllKnowing(new OpenaiClient()).getCommandBuilder().toJSON(),
];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(DISCORD_BOT_ID, DISCORD_SERVER_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();