"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatResponse = void 0;
const formatResponse = (fullResponse) => {
    let formattedResponse = fullResponse.includes("```")
        ? fullResponse
        : `Here's the solution:\n\n\`\`\`\n${fullResponse}\n\`\`\`\n\nYou can copy the code above using the copy button.`;
    const chunks = [];
    let currentChunk = "";
    const lines = formattedResponse.split("\n");
    for (const line of lines) {
        if (currentChunk.length + line.length + 1 > 1900) {
            if (currentChunk.includes("```") && !currentChunk.endsWith("```")) {
                currentChunk += "\n```";
            }
            chunks.push(currentChunk);
            currentChunk = "```\n" + line;
        }
        else {
            currentChunk += (currentChunk ? "\n" : "") + line;
        }
    }
    if (currentChunk) {
        if (currentChunk.includes("```") && !currentChunk.endsWith("```")) {
            currentChunk += "\n```";
        }
        chunks.push(currentChunk);
    }
    return chunks;
};
exports.formatResponse = formatResponse;