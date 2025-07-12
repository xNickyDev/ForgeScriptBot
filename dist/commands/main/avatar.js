"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    name: "avatar",
    aliases: ["av", "pfp", "picture"],
    description: "Get someone's avatar",
    usage: "avatar {user}",
    type: "messageCreate",
    code: `
  $avatarCmd[$findUser[$message[0]]]
  `
};
exports.default = Command;
//# sourceMappingURL=avatar.js.map