import CommandInterface from "./CommandInterface";
import {
    AttachmentBuilder,
    ChatInputCommandInteraction,
    Embed,
    EmbedBuilder,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";

export default class Help implements CommandInterface{
    private LOGO_FILE_PATH = 'public/img/';
    private LOGO_FILE_NAME = 'the-all-knowing.png';
    private BOT_NAME = 'The All-Knowing';

    public async execute(interaction: ChatInputCommandInteraction): Promise<InteractionResponse<any>> {
        const embed = new EmbedBuilder()
            .setAuthor({
                name: this.BOT_NAME,
                iconURL: 'attachment://' + this.LOGO_FILE_NAME
            })
            .setDescription(this.getCommandDescription(interaction))
            .setTitle('The All-Knowing commands')
            .setThumbnail('attachment://' + this.LOGO_FILE_NAME);
        return await interaction.reply({
            embeds: [embed],
            ephemeral: true,
            files: [this.getBotLogoAttachment()]
        });
    }

    getCommandBuilder(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName('help')
            .setDescription('Receive a list of commands and utilities');
    }

    private getGuildName(interaction: ChatInputCommandInteraction): string|null {
        const guild = interaction.guild;
        const guildName = guild?.name ? guild?.name : null;
        return guildName ?  guildName : 'local';
    }

    private getCommandDescription(interaction: ChatInputCommandInteraction): string {
        return 'The prefix for `' + this.getGuildName(interaction) + '` is `/`';
    }

    private getBotLogoAttachment() {
        return new AttachmentBuilder(this.LOGO_FILE_PATH + this.LOGO_FILE_NAME);
    }
}