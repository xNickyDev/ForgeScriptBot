"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "ready",
    code: `
  $jsonLoad[statuses;$readFile[data/statuses.json]]
  $setStatus[online;Custom;$eval[$env[statuses;0];false]]
  
  $let[n;1]
  $setInterval[
    $setStatus[online;Custom;$eval[$env[statuses;$get[n]];false]]
    $letSum[n;1]
    $if[$get[n]>=$arrayLength[statuses];$let[n;0]]
  ;1m]
  `
});
//# sourceMappingURL=setStatus.js.map