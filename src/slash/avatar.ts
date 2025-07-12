import { IApplicationCommandData } from "@tryforge/forgescript"
import { ApplicationCommandOptionType, ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from "discord.js"

const ApplicationCommand: IApplicationCommandData = {
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
  $let[user;$default[$option[user];$authorID]]
  $let[avatar;$userAvatar[$get[user];4096]]
  $let[ext;.$advancedTextSplit[$replace[$get[avatar];?size=4096;];.;3]]

  $addContainer[
    $addTextDisplay[## $userDisplayName[$get[user]]'s Avatar]
    $addSeparator
    $addMediaGallery[
      $addMediaItem[$get[avatar]]
    ]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $if[$get[ext]==.gif;
      $addButton[$get[avatar];GIF;Link]
    ]
    $addButton[$replace[$get[avatar];$get[ext];.png];PNG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.jpg];JPG;Link]
    $addButton[$replace[$get[avatar];$get[ext];.webp];WEBP;Link]
  ;$getGlobalVar[main]]
  `
}

export default ApplicationCommand