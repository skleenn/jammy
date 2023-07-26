const { SlashCommandBuilder, managerToFetchingStrategyOptions } = require("discord.js");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const { ErelaClient } = require("erela.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("plays a song")
        .addStringOption(option => option.setName("url").setDescription("enter spotify url of song!!")),

        async execute(client, interaction){
            const song = interaction.options.getString("song url");

            if (!interaction.member.voice.channel) return interaction.reply({content:"you must be in a vc to use this command!!", ephemeral: true});

            const player = client.music.players.spawn({
                guild: message.guild,
                voiceChannel: voiceChannel,
                textChannel: message.channel,
            });

            const songs = await manager.search("url")
        }
}