import { Events, Interaction } from "discord.js";
import { config } from "dotenv";
import { setupDiscordClient } from "./config/discord";
import { handlePingCommand } from "./commands/ping";
import { handleCodeCommand } from "./commands/code";

config();

const client = setupDiscordClient();

client.login(process.env.BOT_TOKEN);

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