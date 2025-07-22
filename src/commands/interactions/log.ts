import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "interactionCreate",
  allowedInteractionTypes: ["slashCommand", "contextMenu"],
  code: `$log[Command executed: $applicationCommandDisplay]`
})