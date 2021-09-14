import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DISCORD_TOKEN, CLIENT_ID } from '../config/secrets';
//@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `import { ${f.name} } from '${f.path}';`)

//@endindex

export const deployCommands = (GUILD_ID: string) => {
  const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);
  const commands: any[] = [];

  //@index(['../commands/**/*.ts(x)?','!**/*.*.*'], f => `commands.push(${f.name}().data.toJSON());`)

  //@endindex

  (async () => {
    try {
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });
    } catch (error) {
      console.error(error);
    }
  })();
};
