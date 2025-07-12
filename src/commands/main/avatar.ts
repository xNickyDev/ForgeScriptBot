import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  name: "avatar",
  aliases: ["av", "pfp", "picture"],
  description: "Get someone's avatar",
  usage: "avatar {user}",
  type: "messageCreate",
  code: `
  $avatarCmd[$findUser[$message[0]]]
  `
}

export default Command