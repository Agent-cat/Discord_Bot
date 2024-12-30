"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePingCommand = void 0;
const handlePingCommand = async (interaction) => {
    await interaction.reply("Pong!");
};
exports.handlePingCommand = handlePingCommand;
