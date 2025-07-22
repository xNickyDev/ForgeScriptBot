import { ApplicationCommand } from "@tryforge/forgescript"
import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

export default new ApplicationCommand({
  data: {
    type: ApplicationCommandType.ChatInput,
    name: "avatar",
    description: "Get someone's avatar",
    options: [
      {
        type: ApplicationCommandOptionType.User,
        name: "user",
        description: "The user you want to retrieve the avatar from",
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
  $avatarCmd[$option[user]]
  `
})