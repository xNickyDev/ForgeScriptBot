import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})