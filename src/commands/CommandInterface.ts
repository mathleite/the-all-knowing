import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";

export default interface CommandInterface {
    execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<any>>;
    getCommandBuilder(): SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
}