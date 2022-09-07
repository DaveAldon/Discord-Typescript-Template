import setPresence from '../components/setPresence';
import ClientEvent from '../components/ClientEvent';
import { ActivityType } from 'discord.js';
import config from '../config/config';

export default new ClientEvent('ready', async client => {
  console.clear();
  console.log(`${client.user?.username} is online!`);

  new setPresence(client, [
    {
      content: `you like a fiddle - v${config.version}`,
      type: ActivityType.Playing,
      status: 'online',
    },
  ]);
});
