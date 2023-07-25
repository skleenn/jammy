const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("testing jammys life"),

        async execute(client, interaction){
            interaction.reply(`ping: ${client.ws.ping}`)
        }
}