"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "interactionCreate",
    allowedInteractionTypes: ["button"],
    code: `
  $arrayLoad[ID; ;$customID]
  $onlyIf[$arrayAt[ID;0]==eventExample]
  $let[event;$arrayAt[ID;1]]
  
  $ephemeral
  $addContainer[
    $addTextDisplay[## Example]
    $addTextDisplay[\`\`\`js\nmodule.exports = {\n  type: "$get[event]",\n  code: \`$$c[]log[$get[event] was just triggered!\\]\`\n}\n\`\`\`]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
  ;$getGlobalVar[main]]
  `
});
//# sourceMappingURL=event.js.map