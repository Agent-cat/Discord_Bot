import { Client, Events, Interaction } from "discord.js";
import { config } from "dotenv";
import express from 'express';
import { setupDiscordClient } from "./config/discord";
import { handlePingCommand } from "./commands/ping";
import { handleCodeCommand } from "./commands/code";
import axios from 'axios';

config();

const app = express();
const client = setupDiscordClient();

client.login(process.env.BOT_TOKEN);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.status(200).send('Discord bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

setInterval(async () => {
  try {
    const response = await axios.get(`https://discord-bot-x6gq.onrender.com/health`);
    if (response.status === 200) {
      console.log("Keep alive ping successful");
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.log("Keep alive ping failed: " + errorMessage);
  }
}, 5 * 60 * 1000);

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "ping":
      await handlePingCommand(interaction);
      break;
    case "code":
      await handleCodeCommand(interaction);
      break;
  }
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  message.reply({
    content: `Hello ${message.author.username}!`,
  });
}); 