"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "interactionCreate",
    allowedInteractionTypes: ["autocomplete"],
    code: `
  $onlyIf[$and[$applicationSubCommandName==function;$focusedOptionName==name]]
  $let[branch;$default[$toLowerCase[$option[branch]];main]]
  $let[package;$default[$option[package];ForgeScript]]
  
  $jsonLoad[data;$fetchPackage[$get[package]]]
  $onlyIf[$env[data;functionsUrl]!=]
  $onlyIf[$hasBranch[$get[package];$get[branch]]]
  
  $httpSetContentType[Json]
  $onlyIf[$httpRequest[https://raw.githubusercontent.com/$env[data;githubPackageOwner]/$env[data;githubPackageName]/refs/heads/$get[branch]/metadata/functions.json;GET;functions]==200]
  
  $let[n;0]
  $let[i;0]
  $while[$and[$get[n]<25;$env[functions;$get[i]]!=];
    $let[name;$env[functions;$get[i];name]]
    $let[value;$toLowerCase[$focusedOptionValue]]
    $jsonLoad[aliases;$default[$env[functions;$get[i];aliases];[\\]]]
    $if[$or[$includes[$toLowerCase[$get[name]];$get[value]];$arraySome[aliases;alias;$includes[$toLowerCase[$env[alias]];$get[value]]]];
      $addChoice[$get[name];$get[name]]
      $letSum[n;1]
    ]
    $letSum[i;1]
  ]
  $autocomplete
  `
});
//# sourceMappingURL=functions.js.map