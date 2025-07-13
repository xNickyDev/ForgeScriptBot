"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    type: "interactionCreate",
    allowedInteractionTypes: ["autocomplete"],
    code: `
  $onlyIf[$or[$focusedOptionName==package;$and[$applicationSubCommandName==package;$focusedOptionName==name]]]
  $jsonLoad[packages;$getGlobalVar[packages]]
  
  $if[$and[$applicationCommandName==search;$applicationSubCommandName!=package];
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
};
exports.default = Command;
//# sourceMappingURL=packages.js.map