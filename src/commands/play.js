const { SlashCommandBuilder } = require("discord.js");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");

const clientid = "334d81c7cafb482ca840de440de2a167";
const clientsecret = "d010a39d6b54494ba4b34613bce702a8";

const manager = new Manager({
    plugins: [
        new Spotify({
            clientid,
            clientsecret
        })
    ]
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("plays a song"),

        async execute(client, interaction){
            
        }
}