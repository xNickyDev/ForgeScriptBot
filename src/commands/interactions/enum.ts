import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
  $arrayLoad[ID; ;$customID]
  $let[id;$arrayAt[ID;0]]
  $onlyIf[$or[$get[id]==enum;$get[id]==functionEnum]]
  $onlyIf[$authorizingIntegrationOwners[User]==$authorID;$ephemeral Not for you dummy]
  
  $let[name;$arrayAt[ID;1]]
  $let[package;$arrayAt[ID;2]]
  $let[branch;$arrayAt[ID;3]]
  $let[expand;$arrayAt[ID;-1]]

  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $onlyIf[$env[data;enumsUrl]!=;$ephemeral This package does not have any enums!]
  $onlyIf[$hasBranch[$get[package];$get[branch]];$ephemeral Invalid Branch Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $httpSetContentType[Json]
  $!httpRequest[https://raw.githubusercontent.com/$get[repo]/refs/heads/$get[branch]/metadata/enums.json;GET;enums]
  $jsonLoad[enum;$env[enums;$get[name]]]
  $onlyIf[$env[enum]!=;$ephemeral Invalid Enum Provided!]
  
  $if[$get[id]!=enum;
    $ephemeral
  ;
    $if[$djsEval[ctx.interaction.message.components.at(0).data.type]==10;
      $loadComponents[$djsEval[JSON.stringify(ctx.interaction.message.components.at(0).data)]]
    ]
  ]
  $addContainer[
    $addTextDisplay[## $get[name]]
    $addSeparator
    $addTextDisplay[$if[$get[expand];- ]\`$arrayJoin[enum;\`$if[$get[expand];\n- ;, ]\`]\`]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[enum $get[name] $env[data;packageName] $get[branch] $checkCondition[$get[expand]!=true];$if[$get[expand];Shrink;Expand];Primary]
    $addButton[https://docs.botforge.org/enum/$get[name]?p=$env[data;packageName]&branch=$get[branch];Docs;Link]
  ;$getGlobalVar[main]]
  $if[$get[id]==enum;$interactionUpdate]
  `
}

export default Command