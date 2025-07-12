import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$focusedOptionName==package]
  
  $onlyIf[$httpRequest[$api[packages];GET]==200]
  $jsonLoad[data;$httpResult[data]]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[data;$get[i]]!=];
    $let[name;$env[data;$get[i];packageName]]
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