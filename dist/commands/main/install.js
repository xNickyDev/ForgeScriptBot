"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: "install",
    aliases: ["i", "download"],
    description: "How to install any package",
    usage: "install {package} {target}",
    type: "messageCreate",
    code: `
  $installCmd[$message[0];$findUser[$message[1]]]
  `
});
//# sourceMappingURL=install.js.map