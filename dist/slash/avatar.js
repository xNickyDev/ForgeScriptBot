"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
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
  $let[user;$default[$option[user];$authorID]]
  $let[avatar;$userAvatar[$get[user];4096]]
  $let[ext;.$advancedTextSplit[$replace[$get[avatar];?size=4096;];.;3]]

  $addContainer[
    $addTextDisplay[## $userDisplayName[$get[user]]'s Avatar]
    $addSeparator
    $addMediaGallery[
      $addMediaItem[$get[avatar]]
    ]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $if[$includes[$get[avatar];.gif];
      $addButton[$get[avatar];GIF;Link]
    ]
    $addButton[$replace[$get[avatar];$get[ext];.png];PNG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.jpg];JPG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.webp];WEBP;Link]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=avatar.js.map