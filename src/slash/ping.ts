import { IApplicationCommandData } from "@tryforge/forgescript"
import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

const ApplicationCommand: IApplicationCommandData = {
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
}

export default ApplicationCommand