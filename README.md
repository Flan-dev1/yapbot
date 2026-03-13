# yapbot

A Discord bot that yaps random lines and gives AI-generated lore using Google Gemini. Reacting to the bot's messages increases a combo counter.

## Features

- Random "yap" messages
- AI-generated lore using Google Gemini API
- Responds to `!yap` and `!lore` commands
- Combo system triggered by message reactions

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/yapbot.git
   cd yapbot
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file with your Discord and Gemini API credentials:

   ```
   CHANNELID="your_channel_id"
   GUILDID="your_guild_id"
   DISCORDTOKEN="your_discord_token"
   GEMINI_API_KEY="your_gemini_api_key"
   ```

4. Start the bot:

   ```sh
   node index.js
   ```

## Usage

- Type `!yap` in your Discord channel to make the bot send a random message.
- Type `!lore` to receive a concise, AI-generated lore about the bot.
- React to the bot's messages to increase the DMC-esque combo counter.

## Dependencies

- [discord.js](https://discord.js.org/)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [dotenv](https://www.npmjs.com/package/dotenv)

## License

MIT License. See [LICENSE](LICENSE) for details.
