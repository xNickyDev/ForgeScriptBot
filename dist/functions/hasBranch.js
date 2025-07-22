"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "hasBranch",
    params: ["package", "branch"],
    code: `
  $jsonLoad[pkg;$fetchPackage[$env[package]]]
  $arrayLoad[branches;,;$env[pkg;mainBranch],$env[pkg;branches]]
  $return[$and[$env[branch]!=;$arrayIncludes[branches;$toLowerCase[$env[branch]]]]]
  `
});
//# sourceMappingURL=hasBranch.js.map