"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function = {
    name: "hasBranch",
    params: ["package", "branch"],
    code: `
  $jsonLoad[pkg;$fetchPackage[$env[package]]]
  $arrayLoad[branches;,;$env[pkg;mainBranch],$env[pkg;branches]]
  $return[$and[$env[branch]!=;$arrayIncludes[branches;$toLowerCase[$env[branch]]]]]
  `
};
exports.default = Function;
//# sourceMappingURL=hasBranch.js.map