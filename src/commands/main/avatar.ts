import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "avatar",
  aliases: ["av", "pfp", "picture"],
  description: "Get someone's avatar",
  usage: "avatar {user}",
  type: "messageCreate",
  code: `
  $avatarCmd[$findUser[$message[0]]]
  `
})