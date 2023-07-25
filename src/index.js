const { Client, GatewayIntentBits, Collection} = require("discord.js");
const { REST, Routes } = require('discord.js');
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
            Routes.applicationGuildCommands(config.clientID, guildID), //guildID may make an error, either delete it or copy past ur test server guild id
            {body:commands},
        );
        console.log(`successfully reloaded ${data.length} application (/) commands.`);
    } catch(error){
        console.error(error);
    }
}) ();

client.once("ready", () => {
    console.log("jammys jammin!")
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

client.login(config.token)

