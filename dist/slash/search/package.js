"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "package",
        description: "Search for a specific package",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "name",
                description: "The package you want to search",
                required: true,
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "target",
                description: "The person you want to ping",
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.Boolean,
                name: "hidden",
                description: "If the reply should be hidden or not",
            },
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
  $let[name;$option[name]]
  
  $jsonLoad[data;$fetchPackage[$get[name]]]
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $if[$option[hidden];$ephemeral]
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[# $env[data;packageName]]
    $addSeparator
    $addTextDisplay[$env[data;packageDescription]]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/?p=$env[data;packageName];Docs;Link]
    $addButton[https://github.com/$get[repo];GitHub;Link]
    $if[$env[data;npmPackageName]!=;
      $addButton[https://npmjs.org/$if[$env[data;npmPackageOwner]!=;@$env[data;npmPackageOwner]/]$env[data;npmPackageName];NPM;Link]
    ]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=package.js.map