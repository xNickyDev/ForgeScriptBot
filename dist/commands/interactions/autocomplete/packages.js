"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    type: "interactionCreate",
    allowedInteractionTypes: ["autocomplete"],
    code: `
  $onlyIf[$focusedOptionName==package]
  $jsonLoad[packages;$getGlobalVar[packages]]
  
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