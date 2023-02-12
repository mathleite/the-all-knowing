import {Client, Collection, Events, GatewayIntentBits, InteractionResponse} from "discord.js";
import CommandInterface from "../../commands/CommandInterface";
import InvalidCommand from "./exceptions/InvalidCommand";

export default class ClientFacade extends Client{
    constructor() {
        super({ intents: [GatewayIntentBits.Guilds] });
        this.bootstrap();
    }

    public commands: Collection<string, CommandInterface> = new Collection<string, CommandInterface>();

    private bootstrap(): void {
        this.once(Events.ClientReady, c => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });
    }

    listenEvents() {
        this.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;
            try {
                const command = this.getCommand(interaction.commandName);
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: ':warning: There was an error while executing this command!', ephemeral: true, fetchReply: true });
            }
        });
    }

    registerCommand(command: CommandInterface): ClientFacade {
        this.commands.set(command.getCommandBuilder().name, command);
        return this;
    }

    private getCommand(commandName: string) {
        const clientCommand = this.commands.get(commandName);
        if (!commandName || !clientCommand) throw new InvalidCommand();
        return clientCommand;
    }
}