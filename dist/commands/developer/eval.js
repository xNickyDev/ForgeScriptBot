"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    name: "eval",
    aliases: ["ev"],
    type: "messageCreate",
    code: `
  $onlyForUsers[;$botOwnerID]
  
  $let[result;$trim[$eval[$message;false]]]
  $if[$charCount[$get[result]]>2000;$attachment[$get[result];result.json;true];$get[result]]
  $try[$!addMessageReactions[$channelID;$messageID;✅]]
  `
};
exports.default = Command;
//# sourceMappingURL=eval.js.map