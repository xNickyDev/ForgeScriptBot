"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "enum",
        description: "Search for a specific enum",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "name",
                description: "The name of the enum",
                required: true,
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "branch",
                description: "The branch you are using",
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "package",
                description: "The package you want to search the enum from. Default is ForgeScript",
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
  $let[branch;$default[$toLowerCase[$option[branch]];main]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $onlyIf[$env[data;enumsUrl]!=;$ephemeral This package does not have any enums!]
  $onlyIf[$hasBranch[$get[package];$get[branch]];$ephemeral Invalid Branch Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $httpSetContentType[Json]
  $!httpRequest[https://raw.githubusercontent.com/$get[repo]/refs/heads/$get[branch]/metadata/enums.json;GET;enums]
  $jsonLoad[enum;$env[enums;$get[name]]]
  $onlyIf[$env[enum]!=;$ephemeral Invalid Enum Provided!]
  
  $if[$option[hidden];$ephemeral]
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[## $get[name]]
    $addSeparator
    $addTextDisplay[- \`$arrayJoin[enum;\`\n- \`]\`]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[enum $get[name] $env[data;packageName] $get[branch] false;Shrink;Primary]
    $addButton[https://docs.botforge.org/enum/$get[name]?p=$env[data;packageName]&branch=$get[branch];Docs;Link]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=enum.js.map