"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
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
};
exports.default = Command;
//# sourceMappingURL=branches.js.map