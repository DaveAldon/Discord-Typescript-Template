import { CommandBuilder } from '../../../components/CommandBuilder';
import { CommandError } from '../../../types/CommandError';
import {
  DatabaseCollections,
  DatabaseServices,
  getCollection,
  isInUse,
  updateInUse,
} from '../../../database/database';

export default new CommandBuilder({
  data: {
    name: 'example',
    alias: [],
    description: 'Example command.',
  },
  async run(_client, message, _args) {
    const collection = getCollection(DatabaseCollections.COLLECTION);
    const username = message.author.username;
    try {
      const { inUse, username: inUseBy } = isInUse(collection, DatabaseServices.SERVICE);
      if (inUse) {
        message.reply({
          content: `Bot is currently in use by ${inUseBy}, please try again later`,
        });
        return;
      }
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: true });
      await message.reply({ content: 'Example message.' });
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: false });
    } catch (err) {
      console.log(err);
      const error = err as CommandError;
      await message.channel.send({ content: error.message });
      updateInUse({ collection, service: DatabaseServices.SERVICE, username, inUse: false });
    }
  },
});
