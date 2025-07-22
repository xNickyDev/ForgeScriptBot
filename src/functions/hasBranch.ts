import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "hasBranch",
  params: ["package", "branch"],
  code: `
  $jsonLoad[pkg;$fetchPackage[$env[package]]]
  $arrayLoad[branches;,;$env[pkg;mainBranch],$env[pkg;branches]]
  $return[$and[$env[branch]!=;$arrayIncludes[branches;$toLowerCase[$env[branch]]]]]
  `
})