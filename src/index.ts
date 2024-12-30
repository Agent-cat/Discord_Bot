import { Client, Events, Interaction } from "discord.js";
import { config } from "dotenv";
import { setupDiscordClient } from "./config/discord";
import { handlePingCommand } from "./commands/ping";
import { handleCodeCommand } from "./commands/code";
import http from 'http';

config();

const client = setupDiscordClient();

client.login(process.env.BOT_TOKEN);

// Add HTTP server with health check
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200);
    res.end('OK');
  } else {
    res.writeHead(200);
    res.end('Discord bot is running!');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Keep alive mechanism
setInterval(() => {
  http.get(`http://localhost:${PORT}/health`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
      console.log("Keep alive ping successful");
    });
  }).on('error', (err) => {
    console.log("Keep alive ping failed: " + err.message);
  });
}, 5 * 60 * 1000); // Ping every 5 minutes

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