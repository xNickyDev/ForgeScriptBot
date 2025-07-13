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
    $if[$and[$env[branch]!=;$includes[$toLowerCase[$env[branch]];$toLowerCase[$focusedOptionValue]]];
      $addChoice[$env[branch];$env[branch]]
    ]
  ]
  $autocomplete
  `
}

export default Command