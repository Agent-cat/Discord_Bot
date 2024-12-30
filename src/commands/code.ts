import { ChatInputCommandInteraction } from "discord.js";
import axios from "axios";
import { formatResponse } from "../utils/responseFormatter";

export const handleCodeCommand = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  try {
    await interaction.deferReply();

    const data = interaction.options.getString("prompt");
    if (!data) {
      await interaction.editReply("Please provide a prompt.");
      return;
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: data }],
          },
        ],
      }
    );

    if (!response.data.candidates?.[0]) {
      await interaction.editReply("Sorry, I couldn't generate a response.");
      return;
    }

    const fullResponse = response.data.candidates[0].content.parts[0].text;
    const chunks = formatResponse(fullResponse);
    const maxChunks = Math.min(chunks.length, 4);

    await interaction.editReply({
      content: chunks[0],
    });

    for (let i = 1; i < maxChunks; i++) {
      await interaction.followUp({
        content: chunks[i],
      });
    }

    if (chunks.length > maxChunks) {
      await interaction.followUp({
        content: `The response was too long. Showing ${maxChunks} of ${chunks.length} parts.`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    await interaction.editReply(
      "Sorry, there was an error processing your request."
    );
  }
}; 