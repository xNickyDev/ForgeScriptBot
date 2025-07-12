import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  name: "ping",
  description: "Retrieve the bot's ping",
  usage: "ping",
  type: "messageCreate",
  code: `Pong! $pingms`
}

export default Command