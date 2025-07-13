import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "ready",
  code: `
  $if[$httpRequest[$api[packages];GET]==200;
    $jsonLoad[pkgs;$httpResult[data]]
    $arrayLoad[names]
    $arrayForEach[pkgs;pkg;
      $let[name;$env[pkg;packageName]]
      $arrayPush[names;$get[name]]
      $setGlobalVar[$toLowerCase[$get[name]];$env[pkg]]
    ]
    $setGlobalVar[packages;$env[names]]
  ]
  `
}

export default Command