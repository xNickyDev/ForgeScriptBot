"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "event",
        description: "Search for a specific event",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "name",
                description: "The name of the event",
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
                description: "The package you want to search the event from. Default is ForgeScript",
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
  $onlyIf[$env[data;eventsUrl]!=;$ephemeral This package does not have any events!]
  $onlyIf[$hasBranch[$get[package];$get[branch]];$ephemeral Invalid Branch Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $httpSetContentType[Json]
  $!httpRequest[https://raw.githubusercontent.com/$get[repo]/refs/heads/$get[branch]/metadata/events.json;GET;events]
  $jsonLoad[event;$env[events;$arrayFindIndex[events;ev;$return[$checkCondition[$env[ev;name]==$get[name]]]]]]
  
  $onlyIf[$env[event]!=;$ephemeral Invalid Event Provided!]
  $jsonLoad[intents;$env[event;intents]]
  
  $let[link;https://raw.githubusercontent.com/$get[repo]/refs/heads/dev/metadata/paths.json]
  $if[$httpRequest[$get[link];GET]==200;
    $httpSetContentType[Json]
    $!httpRequest[$get[link];GET;paths]
  ]
  $let[path;$default[$env[paths;events];src/events]]
  
  $if[$option[hidden];$ephemeral]
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[## $env[event;name]]
    $addSeparator
    $addTextDisplay[$env[event;description]]
    $if[$arrayLength[intents]>0;
      $addTextDisplay[** **\n**Required Intents**\n> -# $arrayJoin[intents]]
    ]
    $addSeparator[Large]
    $addActionRow
    $addButton[placeholder;$env[data;packageName] v$env[event;version];Primary;;true]
    $addButton[eventExample $env[event;name];Example;Success]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/event/$env[event;name]?p=$env[data;packageName]&branch=$get[branch];Docs;Link]
    $addButton[https://github.com/$get[repo]/tree/$get[branch]/$get[path]/$env[event;name].ts;Source;Link]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=event.js.map