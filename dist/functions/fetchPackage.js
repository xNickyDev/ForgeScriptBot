"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function = {
    name: "fetchPackage",
    params: ["name"],
    code: `
  $let[name;$toLowerCase[$env[name]]]
  $jsonLoad[packages;$toLowerCase[$getGlobalVar[packages]]]
  $if[$arrayIncludes[packages;$get[name]];
    $return[$getGlobalVar[$get[name]]]
  ]
  $return[]
  `
};
exports.default = Function;
//# sourceMappingURL=fetchPackage.js.map