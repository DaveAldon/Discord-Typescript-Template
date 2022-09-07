# Discord Bot Template

This is my template I use to spin up quick Discord bots, complete with the following features ready to go:

- Discord API v14.3.0
- Typescript
- Prettier
- Discord Slash commands (API registration and deletion support)
- Development environment switching
- Local, in-memory database (LokiJS)
  - In this example it handles the blocking of commands being run too frequently
  - Useful to keep track of state between separate interactions
  - Can be easily changed

### Installation

1. Create a discord bot
2. Create an `.env` file and populate its fields using the `.env.example` file
3. Run `npm install` and `npm run start`
