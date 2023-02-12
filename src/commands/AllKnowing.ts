import CommandInterface from "./CommandInterface";
import {ChatInputCommandInteraction, InteractionResponse, SlashCommandBuilder} from "discord.js";
import OpenaiClient from "../openai/client/OpenaiClient";

export default class AllKnowing implements CommandInterface {
    constructor(private readonly openai: OpenaiClient) {
    }
    // @ts-ignore
    async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<any>> {
        const completionQuery = interaction.options.getString('completion');
        if (!completionQuery) return await interaction.reply('`completion` option must be valid :KannaWhat:');
        const workingMessage = await interaction.reply({
            content: 'Working on It!',
            fetchReply: true
        });
        await workingMessage.react('<:remVV:867875641545064488>');
        const { data } = await this.openai.createCompletion(completionQuery);
        for (let response of data.choices) {
            const message = await interaction.followUp({
                content: response.text,
                fetchReply: true
            });
            await message.react('<:SataniaThumbsUp:867875642241318932>');
        }
    }

    getCommandBuilder(): SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">{
        return new SlashCommandBuilder()
            .setName('all-knowing')
            .setDescription('Use AI to create completions')
            .addStringOption(option => option
                .setName('completion')
                .setDescription('Completion to AI')
                .setRequired(true)
            );
    }
}