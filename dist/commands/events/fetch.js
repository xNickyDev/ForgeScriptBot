"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "clientReady",
    code: `
  $if[$httpRequest[$api[packages];GET]==200;
    $jsonLoad[pkgs;$httpResult[data]]
    $arrayLoad[names]
    $arrayForEach[pkgs;pkg;
      $if[$or[$env[pkg;official];$env[pkg;verified]];
        $let[name;$env[pkg;packageName]]
        $arrayPush[names;$get[name]]
        $setGlobalVar[$toLowerCase[$get[name]];$jsonStringify[pkg]]
      ]
    ]
    $setGlobalVar[packages;$jsonStringify[names]]
  ]
  `
});
//# sourceMappingURL=fetch.js.map