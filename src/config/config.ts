import { config } from 'dotenv';
import setMode from './setMode';
config();

const { CLIENT_ID, GUILD_ID, TOKEN, BACKEND_URL } = setMode('development');

export default {
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  backendUrl: BACKEND_URL,
  prefix: '!',
  version: '1.0.0',
};
