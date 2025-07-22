"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
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
});
//# sourceMappingURL=fetchPackage.js.map