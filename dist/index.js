"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const discord_1 = require("./config/discord");
const ping_1 = require("./commands/ping");
const code_1 = require("./commands/code");
(0, dotenv_1.config)();
const client = (0, discord_1.setupDiscordClient)();
client.login(process.env.BOT_TOKEN);
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    switch (interaction.commandName) {
        case "ping":
            await (0, ping_1.handlePingCommand)(interaction);
            break;
        case "code":
            await (0, code_1.handleCodeCommand)(interaction);
            break;
    }
});
client.on(discord_js_1.Events.MessageCreate, (message) => {
    if (message.author.bot)
        return;
    message.reply({
        content: `Hello ${message.author.username}!`,
    });
});
