# Node.js TypeScript Discord Bot Template

This is a template for a Discord bot written in TypeScript, using [Discord.js](https://discord.js.org) v14.

## Installation

To get started, clone this repository and run `npm install` to install the required dependencies.

```
git clone https://github.com/SkepticalMatt/ts-bot-template.git
cd ts-bot-template
npm install

```

## Configuration

Before running the bot, you'll need to create a `.env` file with your [Discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#what-is-a-token-anyway). You will also have to specify your application ID and the guild ID used for testing.

```
DISCORD_TOKEN=your-bot-token-here
GUILD_ID=your-test-guild-id
APP_ID=your-application-id
```

## Usage

This template comes with several npm scripts to help you get started:

- `npm run dev`: This script will run two instances of nodemon - one to watch the project and one to watch only the `commands` folder. It will allow to reflect changes immediately, and refreshes the commands on your testing guild.
- `npm run serve`: This script will run the bot using `ts-node`. This is useful for testing your bot in a production-like environment.
- `npm run deploy-test`: This script will run the `deploy-commands.ts` script. It refreshes the bot commands on the specified test guild.
- `npm run deploy-global`: This script will run the `deploy-commands.ts` script with the environnement variable `GLOBAL`. It refreshes the bot commands on every guild the bot is on.

## License

This template is licensed under the ISC License. Feel free to use it however you like!