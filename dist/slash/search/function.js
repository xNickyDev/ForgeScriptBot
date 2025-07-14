"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ApplicationCommand = {
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "function",
        description: "Search for a specific function",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "name",
                description: "The name of the function",
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
                description: "The package you want to search the function from. Default is ForgeScript",
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
  $onlyIf[$env[data;functionsUrl]!=;$ephemeral This package does not have any functions!]
  $onlyIf[$hasBranch[$get[package];$get[branch]];$ephemeral Invalid Branch Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $httpSetContentType[Json]
  $!httpRequest[https://raw.githubusercontent.com/$get[repo]/refs/heads/$get[branch]/metadata/functions.json;GET;functions]
  $jsonLoad[function;$env[functions;$arrayFindIndex[functions;fn;$return[$checkCondition[$env[fn;name]==$get[name]]]]]]
  
  $onlyIf[$env[function]!=;$ephemeral Invalid Function Provided!]
  $jsonLoad[args;$default[$env[function;args];[\\]]]
  $jsonLoad[aliases;$default[$env[function;aliases];[\\]]]
  $jsonLoad[output;$default[$env[function;output];[\\]]]
  
  $let[link;https://raw.githubusercontent.com/$get[repo]/refs/heads/dev/metadata/paths.json]
  $if[$httpRequest[$get[link];GET]==200;
    $httpSetContentType[Json]
    $!httpRequest[$get[link];GET;paths]
  ]
  $let[path;$default[$env[paths;functions];src/functions]]
  
  $arrayLoad[tags]
  $if[$env[function;deprecated];$arrayPush[tags;<:deprecated_1:1394004926258089995><:deprecated_2:1394004939914875023><:deprecated_3:1394004950710878238><:deprecated_4:1394004964673720421><:deprecated_5:1394004976564568134>]]
  $if[$env[function;experimental];$arrayPush[tags;<:experimental_1:1394005478123766002><:experimental_2:1394005489997709342><:experimental_3:1394005503037804637><:experimental_4:1394005515251486752><:experimental_5:1394005528346361921>]]
  
  $if[$option[hidden];$ephemeral]
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[# $env[function;name]]
    $addSeparator
    $if[$arrayLength[tags]>0;
      $addTextDisplay[$arrayJoin[tags; ]]
      $addSeparator
    ]
    $addTextDisplay[$env[function;description]]
    $addSeparator[Small;false]
    $if[$arrayLength[args]>0;
      $arrayMap[args;arg;$return[$if[$env[arg;rest];...]$env[arg;name]$if[$env[arg;required];;?]];parsed]
      $addTextDisplay[## Usage\n$if[$env[function;brackets]!=true;$codeBlock[$env[function;name];fs]\n]$codeBlock[$env[function;name][$arrayJoin[parsed;\\;]\\];fs]]
    ;
      $addTextDisplay[## Usage\n$codeBlock[$env[function;name];fs]]
    ]
    $if[$arrayLength[aliases]>0;
      $addSeparator[Small;false]
      $addTextDisplay[### Aliases\n- \`$arrayJoin[aliases;\`\n- \`]\`]
    ]
    $if[$arrayLength[args]>0;
      $addSeparator[Large]
      $addTextDisplay[## Arguments]
      $arrayLoad[btns]
      $arrayLoad[text]
      $arrayForEach[args;arg;
        $arrayPush[text;### $env[arg;name]$if[$env[arg;required];*]\n> $env[arg;description]\n- Type: \`$if[$env[arg;type]!=Enum;$env[arg;type];$env[arg;enumName]]$if[$env[arg;rest];[\\]]\`]
        $if[$env[arg;type]==Enum;
          $arrayPushJSON[btns;$env[arg]]
        ]
      ]
      $addTextDisplay[$arrayJoin[text;\n]]
      $if[$arrayLength[btns]>0;
        $addSeparator
        $addActionRow
        $arrayForEach[btns;btn;
          $addButton[functionEnum $env[btn;enumName] $env[data;packageName] $get[branch] true;$env[btn;enumName]$if[$env[btn;rest];[\\]];Primary]
        ]
      ]
    ]
    $if[$arrayLength[output]>0;
      $addSeparator[Large]
      $addTextDisplay[### Output Type\n\`$arrayJoin[output;\`, \`]\`]
    ]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/function/$env[function;name]?p=$env[data;packageName]&branch=$get[branch];Docs;Link]
    $addButton[placeholder;$env[data;packageName] v$env[function;version];Secondary;;true]
    $addButton[https://github.com/$get[repo]/tree/$get[branch]/$get[path]$if[$env[function;category]!=;/$env[function;category]]/$replace[$env[function;name];$;].ts;Source;Link]
  ;$getGlobalVar[main]]
  `
};
exports.default = ApplicationCommand;
//# sourceMappingURL=function.js.map