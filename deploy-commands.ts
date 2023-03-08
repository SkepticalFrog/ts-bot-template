import {
  REST,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from 'discord.js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { Command } from './types';

dotenv.config();
const { DISCORD_TOKEN, APP_ID, GUILD_ID, GLOBAL } = process.env;
if (
  typeof DISCORD_TOKEN !== 'string' ||
  typeof APP_ID !== 'string' ||
  typeof GUILD_ID !== 'string'
)
  throw new TypeError(' DISCORD_TOKEN, APP_ID, GUILD_ID should all be strings');

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    let data : any;
    if (GLOBAL) {
      data = await rest.put(
        Routes.applicationCommands(APP_ID),
        { body: commands }
      );
    } else {
      data = await rest.put(
        Routes.applicationGuildCommands(APP_ID, GUILD_ID),
        { body: commands }
      );
    }

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
