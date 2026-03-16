const { Client, IntentsBitField } = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const client = new Client({
  //intents - perms for the bot to access certain events
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

const channelID = process.env.CHANNELID;
const guildID = process.env.GUILDID;
const discordToken = process.env.DISCORDTOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

var guild;
var channel;
var messageID;
var comboCount = 0;
var modelName = "gemini-3.1-flash-lite-preview";
var persona = process.env.PERSONA;

// populate this variable for the lines your bot will yap randomly.
var botLines = [""];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLine() {
  return botLines[getRandomInt(0, botLines.length - 1)];
}

async function yap() {
  var botLine = getRandomLine();

  if (comboCount > 1) {
    botLine = botLine.concat(` **(x${comboCount})**`);

    if (comboCount > 20) {
      botLine = botLine.concat(` ***SMOKING SEXY STYLE!!!***`);
    } else if (comboCount > 15) {
      botLine = botLine.concat(` **SICK SKILLS!!**`);
    } else if (comboCount > 13) {
      botLine = botLine.concat(` *SAVAGE!*`);
    } else if (comboCount > 10) {
      botLine = botLine.concat(` APOCALYPTIC`);
    } else if (comboCount > 7) {
      botLine = botLine.concat(" Badass!!");
    } else if (comboCount > 5) {
      botLine = botLine.concat(" Crazy!");
    } else if (comboCount > 3) {
      botLine = botLine.concat(" Dismal");
    }
  }

  message = await channel.send(botLine);
  messageID = message.id;
}

client.on("messageCreate", async (message) => {
  if (message.content === "!yap") {
    yap();
  } else if (message.content === "!lore") {
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
    });

    //You can personalize by editing the prompt
    const prompt = `Give yourself a random concise lore`;

    const result = await model.generateContent(prompt);
    message = await channel.send(result.response.text());
    messageID = message.id;
  }

  message = message.content.split(" ");

  if (message[0] === "!chat") {
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: persona,
    });
    
    model.generationConfig.maxOutputTokens = process.env.MAX_TOKENS;

    message.shift();

    const prompt = message.join(" ");

    const result = await model.generateContent(prompt);
    message = await channel.send(result.response.text());
    messageID = message.id;
  }
});

client.on("ready", (c) => {
  guild = client.guilds.cache.get(guildID);
  channel = guild.channels.cache.get(channelID);
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on("messageReactionAdd", (reaction) => {
  if (reaction.message.id === messageID) {
    comboCount++;
    yap();
  }
});

client.login(discordToken);
