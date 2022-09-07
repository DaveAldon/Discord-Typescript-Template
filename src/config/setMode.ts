function setMode(mode: 'development' | 'production') {
  let TOKEN;
  let CLIENT_ID = '...';
  let GUILD_ID = '...';
  let BACKEND_URL = '...';

  if (mode === 'production') {
    TOKEN = process.env.TOKEN;
    CLIENT_ID = process.env.CLIENT_ID || '...';
    GUILD_ID = process.env.GUILD_ID || '...';
    BACKEND_URL = process.env.BACKEND_URL || '...';
  }
  if (mode === 'development') {
    TOKEN = process.env.DEV_TOKEN;
    CLIENT_ID = process.env.DEV_CLIENT_ID || '...';
    GUILD_ID = process.env.DEV_GUILD_ID || '...';
    BACKEND_URL = process.env.DEV_BACKEND_URL || '...';
  }

  return { TOKEN, CLIENT_ID, GUILD_ID, BACKEND_URL };
}

export default setMode;
