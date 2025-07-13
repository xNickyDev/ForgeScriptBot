import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$focusedOptionName==branch]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $arrayLoad[branches;,;$env[data;mainBranch],$env[data;branches]]
  
  $arrayForEach[branches;branch;
    $let[branch;$trim[$env[branch]]]
    $if[$and[$get[branch]!=;$includes[$toLowerCase[$get[branch]];$toLowerCase[$focusedOptionValue]]];
      $addChoice[$get[branch];$get[branch]]
    ]
  ]
  $autocomplete
  `
}

export default Command