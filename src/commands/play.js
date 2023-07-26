const { SlashCommandBuilder } = require("discord.js");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const { ErelaClient } = require("erela.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("plays a song")
        .addStringOption(option => option.setName("url").setDescription("enter spotify url of song!!")),

        async execute(client, interaction){
            
        }
}