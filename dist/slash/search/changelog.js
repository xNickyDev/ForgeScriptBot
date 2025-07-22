"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.ApplicationCommand({
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "changelog",
        description: "Search for the changelog of a specific version",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "version",
                description: "The version of the changelog you wish to retrieve",
                required: true,
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "package",
                description: "The package you want to search the changelog from. Default is ForgeScript",
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
  $let[version;$option[version]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $onlyIf[$env[data;changelogsUrl]!=;$ephemeral This package does not have any changelogs!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $httpSetContentType[Json]
  $!httpRequest[https://raw.githubusercontent.com/$get[repo]/refs/heads/dev/metadata/changelogs.json;GET;changelogs]
  $jsonLoad[changelog;$env[changelogs;$get[version]]]
  
  $onlyIf[$env[changelog]!=;$ephemeral Invalid Changelog Provided!]
  $arrayMap[changelog;change;$return[$default[$env[change;message];$env[change]]];changelog]
  
  $if[$option[hidden];$ephemeral]
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[## $env[data;packageName] v$get[version] Changelog]
    $addSeparator
    $addTextDisplay[$cropText[- $arrayJoin[changelog;\n- ];0;2000;...]]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/?p=$env[data;packageName]&tab=changelog;Full Changelog;Link]
  ;$getGlobalVar[main]]
  `
});
//# sourceMappingURL=changelog.js.map