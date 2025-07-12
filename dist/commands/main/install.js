"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    name: "install",
    aliases: ["i", "download"],
    description: "How to install any package",
    usage: "install {package} {target}",
    type: "messageCreate",
    code: `
  $installCmd[$message[0];$findUser[$message[1]]]
  `
};
exports.default = Command;
//# sourceMappingURL=install.js.map