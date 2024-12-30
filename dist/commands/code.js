"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCodeCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const responseFormatter_1 = require("../utils/responseFormatter");
const handleCodeCommand = async (interaction) => {
    try {
        await interaction.deferReply();
        const data = interaction.options.getString("prompt");
        if (!data) {
            await interaction.editReply("Please provide a prompt.");
            return;
        }
        const response = await axios_1.default.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
            contents: [
                {
                    parts: [{ text: data }],
                },
            ],
        });
        if (!response.data.candidates?.[0]) {
            await interaction.editReply("Sorry, I couldn't generate a response.");
            return;
        }
        const fullResponse = response.data.candidates[0].content.parts[0].text;
        const chunks = (0, responseFormatter_1.formatResponse)(fullResponse);
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
    }
    catch (error) {
        console.error("Error:", error);
        await interaction.editReply("Sorry, there was an error processing your request.");
    }
};
exports.handleCodeCommand = handleCodeCommand;
