import { ApplicationCommand } from "@tryforge/forgescript"
import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

export default new ApplicationCommand({
  data: {
    type: ApplicationCommandType.ChatInput,
    name: "ping",
    description: "Retrieve the bot's ping",
    contexts: [
      InteractionContextType.Guild,
      InteractionContextType.BotDM,
      InteractionContextType.PrivateChannel
    ],
    integration_types: [
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall
    ]
  },
  code: `Pong! $pingms`
})