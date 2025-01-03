import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import { config } from "dotenv";

config();

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
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})(); 