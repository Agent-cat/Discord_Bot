import { ChatInputCommandInteraction } from "discord.js";

export const handlePingCommand = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  await interaction.reply("Pong!");
}; 