const { Client, GatewayIntentBits, Collection, ClientApplication} = require("discord.js");
const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const { Manager } = require("erela.js");
const { ErelaClient } = require("erela.js");
const Spotify = require("erela.js-spotify");

const clientid = "334d81c7cafb482ca840de440de2a167";
const clientsecret = "d010a39d6b54494ba4b34613bce702a8";
const config = require('./data/config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents:[GatewayIntentBits.Guilds]
})

client.commands = new Collection()

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));


for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '10'}).setToken(config.token);

(async () => {
    try{
        console.log(`started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(config.clientID, "1110334235505598617"), //guildID may make an error, either delete it or copy past ur test server guild id
            {body:commands},
        );
        console.log(`successfully reloaded ${data.length} application (/) commands.`);
    } catch(error){
        console.error(error);
    }
}) ();

client.once("ready", () => {
    console.log("jammys jammin!");
    client.manager.init(client.user.id)
})

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName)
    if (!command) return;

    try{
        command.execute(client, interaction)
    } catch (error) {
        interaction.reply({content: "there was an error while executing this command.", ephemeral:true})
    }
})

const nodes = [
    {
        host: lavalink1.snooby.ml,
        port: 443,
        password: "discord.gg/6xpF6YqVDd",
        secure: true,
    }
]

const manager = new Manager({
    plugins: [
        new Spotify({
            clientid,
            clientsecret
        })
    ]
});

client.manager.on("nodeError", (node, error) => {
    console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})

client.on("raw", d => client.manager.updateVoiceState(d));


client.login(config.token)

