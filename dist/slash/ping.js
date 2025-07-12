"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "ping",
        description: "Retrieve the bot's ping",
        contexts: [
            discord_js_1.InteractionContextType.Guild,
            discord_js_1.InteractionContextType.BotDM,
            discord_js_1.InteractionContextType.PrivateChannel
        ],
        integration_types: [
            discord_js_1.ApplicationIntegrationType.GuildInstall,
            discord_js_1.ApplicationIntegrationType.UserInstall
        ]
    },
    code: `
  Pong! $pingms
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=ping.js.map