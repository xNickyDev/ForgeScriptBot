import { ApplicationCommand } from "@tryforge/forgescript"
import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

export default new ApplicationCommand({
  data: {
    type: ApplicationCommandType.ChatInput,
    name: "changelog",
    description: "Search for the changelog of a specific version",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "version",
        description: "The version of the changelog you wish to retrieve",
        required: true,
        autocomplete: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "package",
        description: "The package you want to search the changelog from. Default is ForgeScript",
        autocomplete: true,
      },
      {
        type: ApplicationCommandOptionType.User,
        name: "target",
        description: "The person you want to ping",
      },
      {
        type: ApplicationCommandOptionType.Boolean,
        name: "hidden",
        description: "If the reply should be hidden or not",
      },
    ],
    contexts: [
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel
    ],
    integration_types: [
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall
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
})