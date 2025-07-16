import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "interactionCreate",
  allowedInteractionTypes: ["slashCommand", "contextMenu"],
  code: `$log[Command executed: $applicationCommandDisplay]`
}

export default Command