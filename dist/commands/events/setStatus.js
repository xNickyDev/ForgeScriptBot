"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    type: "ready",
    code: `
  $jsonLoad[statuses;$readFile[data/statuses.json]]

  $logger[Info;Ready on client ForgeBot!]
  $setStatus[online;Custom;$eval[$env[statuses;0];false]]
  
  $let[n;1]
  $setInterval[
    $setStatus[online;Custom;$eval[$env[statuses;$get[n]];false]]
    $letSum[n;1]
    $if[$get[n]>=$arrayLength[statuses];$let[n;0]]
  ;1m]
  `
};
exports.default = Command;
//# sourceMappingURL=setStatus.js.map