import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["autocomplete"],
  code: `
  $onlyIf[$focusedOptionName==package]
  $jsonLoad[packages;$getGlobalVar[packages]]
  
  $if[$applicationCommandName==search;
    $arrayMap[packages;package;
      $jsonLoad[pkg;$fetchPackage[$env[package]]]
      $if[$env[pkg;$applicationSubCommandNamesUrl]!=;
        $return[$env[package]]
      ]
    ;packages]
  ]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[packages;$get[i]]!=];
    $let[name;$env[packages;$get[i]]]
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