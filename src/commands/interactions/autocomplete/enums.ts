import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$and[$applicationSubCommandName==enum;$focusedOptionName==name]]
  $let[branch;$default[$toLowerCase[$option[branch]];main]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;enumsUrl]!=]
  $onlyIf[$hasBranch[$get[package];$get[branch]]]
  
  $httpSetContentType[Json]
  $onlyIf[$httpRequest[https://raw.githubusercontent.com/$env[data;githubPackageOwner]/$env[data;githubPackageName]/refs/heads/$get[branch]/metadata/enums.json;GET;enums]==200]
  $jsonLoad[names;$jsonKeys[enums]]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[names;$get[i]]!=];
    $let[name;$env[names;$get[i]]]
    $if[$includes[$toLowerCase[$get[name]];$toLowerCase[$focusedOptionValue]];
      $addChoice[$get[name];$get[name]]
      $letSum[n;1]
    ]
    $letSum[i;1]
  ]
  $autocomplete
  `
}

export default Command