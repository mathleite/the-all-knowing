import CommandInterface from "./CommandInterface";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";

export default class Ping implements CommandInterface {
    public async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<any>> {
        return await interaction.reply('Pong!');
    }

    getCommandBuilder(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!')
    }
}