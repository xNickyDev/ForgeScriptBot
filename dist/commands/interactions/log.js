"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "interactionCreate",
    allowedInteractionTypes: ["slashCommand", "contextMenu"],
    code: `$log[Command executed: $applicationCommandDisplay]`
});
//# sourceMappingURL=log.js.map