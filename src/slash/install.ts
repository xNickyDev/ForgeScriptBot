import { ApplicationCommand } from "@tryforge/forgescript"
import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

export default new ApplicationCommand({
  data: {
    type: ApplicationCommandType.ChatInput,
    name: "install",
    description: "How to install any package",
    options: [
      {
        type: ApplicationCommandOptionType.String,
        name: "package",
        description: "The package you want to install",
        autocomplete: true,
      },
      {
        type: ApplicationCommandOptionType.User,
        name: "target",
        description: "The person you want to ping",
      }
    ],
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
  code: `
  $installCmd[$option[package];$option[target]]
  `
})