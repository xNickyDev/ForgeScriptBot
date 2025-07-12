"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "install",
        description: "How to install any package",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "package",
                description: "The package you want to install",
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "target",
                description: "The person you want to ping",
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
  $let[pkg;$default[$option[package];ForgeScript]]
  
  $let[status;$httpRequest[$api[packages;packageName=$get[pkg]];GET]]
  $onlyIf[$get[status]==200;$ephemeral Error Fetching Package!]
  $jsonLoad[data;$httpResult[data]]
  
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $arrayLoad[branches;,;$env[data;mainBranch],$env[data;branches]]
  $let[github;$env[data;githubPackageOwner]/$env[data;githubPackageName]]

  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[# $env[data;packageName] Installation]
    $addSeparator[Large]
    $if[$env[data;npmPackageName]!=;
      $let[npm;$if[$env[data;npmPackageOwner]!=;@$env[data;npmPackageOwner]/]$env[data;npmPackageName]]
      $addTextDisplay[### Installing From NPM]
      $addTextDisplay[$codeBlock[npm i $get[npm];bash]]
      $addSeparator[Large]
    ]
    $addTextDisplay[### Installing From GitHub]
    $loop[$arrayLength[branches];
      $let[branch;$trim[$env[branches;$sub[$env[i];1]]]]
      $if[$get[branch]==;$continue]
      $addTextDisplay[**$get[branch] Branch**]
      $addTextDisplay[$codeBlock[npm i github:$get[github]$if[$env[i]>1;#$get[branch]];bash]]
    ;i;true]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/?p=$env[data;packageName];Docs;Link]
    $addButton[https://github.com/$get[github];GitHub;Link]
    $if[$get[npm]!=;
      $addButton[https://npmjs.org/$get[npm];NPM;Link]
    ]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=install.js.map