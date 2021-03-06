import express, { Request, Response } from 'express';
import { Intents, Client } from 'discord.js';
import { DISCORD_TOKEN, OWNER, BOT_NAME } from './config/secrets';
import { commands } from './slashCommands/registerCommands';
import { deleteCommands, deployCommands } from './slashCommands/deployCommands';

const PORT = process.env.PORT || 5000;

const app = express();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  presence: {
    status: 'online',
  },
});

app.use(express.urlencoded({ extended: true }));

app.use('/', (_request: Request, response: Response) => {
  response.sendStatus(200);
});
client.on('messageCreate', message => {
  if (message.author.id !== OWNER) return;
  if (message.content.startsWith(`!${BOT_NAME}_deploy`)) {
    try {
      message.guildId && deployCommands(message.guildId);
    } catch (error) {}
  }

  if (message.content.startsWith(`!${BOT_NAME}_remove`)) {
    try {
      const slashCommandName = message.content.split(' ')[1];
      message.guildId && deleteCommands(message.guildId, slashCommandName);
    } catch (error) {}
  }
});
client.once('ready', async () => {
  console.log(`${BOT_NAME} has started`);
});
client.on('interactionCreate', async (interaction: any) => {
  if (!interaction.isCommand()) return;
  const command = commands()[interaction.commandName];
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});
client.on('error', e => {
  console.error('Discord client error!', e);
});
client.login(DISCORD_TOKEN);
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
