"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDiscordClient = void 0;
const discord_js_1 = require("discord.js");
const setupDiscordClient = () => {
    return new discord_js_1.Client({
        intents: [
            discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent,
        ],
    });
};
exports.setupDiscordClient = setupDiscordClient;
