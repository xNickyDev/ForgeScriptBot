"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.ApplicationCommand({
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "avatar",
        description: "Get someone's avatar",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "user",
                description: "The user you want to retrieve the avatar from",
            }
        ],
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
  $avatarCmd[$option[user]]
  `
});
//# sourceMappingURL=avatar.js.map