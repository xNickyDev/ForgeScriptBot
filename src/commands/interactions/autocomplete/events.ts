import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$and[$applicationSubCommandName==event;$focusedOptionName==name]]
  $let[branch;$default[$option[branch];main]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;eventsUrl]!=]
  $onlyIf[$hasBranch[$get[package];$get[branch]]]
  
  $httpSetContentType[Json]
  $onlyIf[$httpRequest[https://raw.githubusercontent.com/$env[data;githubPackageOwner]/$env[data;githubPackageName]/refs/heads/$get[branch]/metadata/events.json;GET;events]==200]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[events;$get[i]]!=];
    $let[name;$env[events;$get[i];name]]
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