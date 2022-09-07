import { SlashCommandBuilder } from 'discord.js';
import { SlashBuilder } from '../../../components/CommandBuilder';
import {
  DatabaseCollections,
  DatabaseServices,
  getCollection,
  isInUse,
  updateInUse,
} from '../../../database/database';
import { CommandError } from '../../../types/CommandError';

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName('slash-command')
    .setDescription('Example slash command')
    .addStringOption(option =>
      option.setName('option').setDescription('option to send to bot').setRequired(true)
    ),
  async run(_client, int) {
    const collection = getCollection(DatabaseCollections.COLLECTION);
    const username = int.user.username;
    try {
      const { inUse, username: inUseBy } = isInUse(collection, DatabaseServices.SERVICE);
      if (inUse) {
        int.reply({
          content: `Bot is currently in use by ${inUseBy}, please try again later`,
          ephemeral: true,
        });
        return;
      }
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: true });
      int.reply({
        content: `Reply to interaction.`,
        ephemeral: true,
      });
      await int.channel?.send({ content: `Separate message.` });
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: false });
    } catch (err) {
      console.log(err);
      const error = err as CommandError;
      await int.channel?.send({ content: error.message });
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: false });
    }
  },
});
