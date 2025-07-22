"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
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
});
//# sourceMappingURL=fetch.js.map