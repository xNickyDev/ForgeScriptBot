import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "ready",
  code: `
  $if[$httpRequest[$api[packages];GET]==200;
    $jsonLoad[pkgs;$httpResult[data]]
    $arrayLoad[names]
    $arrayForEach[pkgs;pkg;
      $let[name;$env[pkg;packageName]]
      $arrayPush[names;$get[name]]
      $setGlobalVar[$toLowerCase[$get[name]];$jsonStringify[pkg]]
    ]
    $setGlobalVar[packages;$env[names]]
  ]
  `
})