"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
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
});
//# sourceMappingURL=branches.js.map