"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Command = {
    type: "interactionCreate",
    allowedInteractionTypes: ["slashCommand", "contextMenu"],
    code: `$log[Command executed: $applicationCommandDisplay]`
};
exports.default = Command;
//# sourceMappingURL=log.js.map