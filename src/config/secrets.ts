import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const CLIENT_ID = '';
export const DISCORD_TOKEN = process.env['token'] || 'nothing';
export const OWNER = '197352387755638794';
export const BOT_NAME = 'Bot';
export const BOT_INVITE_LINK = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
if (DISCORD_TOKEN === 'nothing') {
  console.error("No 'discord token' provided in .env file.");
}
