"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: "avatar",
    aliases: ["av", "pfp", "picture"],
    description: "Get someone's avatar",
    usage: "avatar {user}",
    type: "messageCreate",
    code: `
  $avatarCmd[$findUser[$message[0]]]
  `
});
//# sourceMappingURL=avatar.js.map