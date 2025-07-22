import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "ping",
  description: "Retrieve the bot's ping",
  usage: "ping",
  type: "messageCreate",
  code: `Pong! $pingms`
})