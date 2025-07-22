"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    name: "ping",
    description: "Retrieve the bot's ping",
    usage: "ping",
    type: "messageCreate",
    code: `Pong! $pingms`
});
//# sourceMappingURL=ping.js.map