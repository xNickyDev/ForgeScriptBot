import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$and[$applicationSubCommandName==changelog;$focusedOptionName==version]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;changelogsUrl]!=]
  
  $httpSetContentType[Json]
  $onlyIf[$httpRequest[https://raw.githubusercontent.com/$env[data;githubPackageOwner]/$env[data;githubPackageName]/refs/heads/dev/metadata/changelogs.json;GET;changelogs]==200]
  $jsonLoad[versions;$jsonKeys[changelogs]]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[versions;$get[i]]!=];
    $let[version;$env[versions;$get[i]]]
    $if[$includes[v$toLowerCase[$get[version]];$toLowerCase[$focusedOptionValue]];
      $addChoice[v$get[version];$get[version]]
      $letSum[n;1]
    ]
    $letSum[i;1]
  ]
  $autocomplete
  `
}

export default Command