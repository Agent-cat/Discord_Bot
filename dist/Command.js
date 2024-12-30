"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
    {
        name: "code",
        description: "Generates code",
        options: [
            {
                name: "prompt",
                description: "The code prompt",
                type: discord_js_1.ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];
const rest = new discord_js_1.REST({ version: "10" }).setToken(process.env.BOT_TOKEN);
(async () => {
    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        });
        console.log("Successfully reloaded application (/) commands.");
    }
    catch (error) {
        console.error(error);
    }
})();
