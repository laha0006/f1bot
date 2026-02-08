import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";

const TOKEN = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const EVENT_NAME = "Race: "; // keep short
const EVENT_TIME = new Date("2026-02-08T19:00:00Z"); // set your target time (UTC recommended)

// Pick an interval that won't spam presence updates
const UPDATE_EVERY_MS = 60_000;

function formatCountdown(ms) {
    if (ms <= 0) return "now";

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Keep it short for presence. Show days when relevant.
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
}

function updatePresence() {
    const now = Date.now();
    const remaining = EVENT_TIME.getTime() - now;

    const text =
        remaining <= 0
            ? `${EVENT_NAME}: now!`
            : `${EVENT_NAME} ${formatCountdown(remaining)}`;

    client.user.setPresence({
        status: "online",
        activities: [
            {
                name: text,
                type: ActivityType.Playing,
            },
        ],
    });
}

client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);

    updatePresence(); // set immediately
    const timer = setInterval(updatePresence, UPDATE_EVERY_MS);

    // optional: stop updating after the event
    const stopCheck = setInterval(() => {
        if (Date.now() >= EVENT_TIME.getTime()) {
            clearInterval(timer);
            clearInterval(stopCheck);
            updatePresence(); // final "now!" presence
        }
    }, 5 * 60_000);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
});

client.login(TOKEN);
