import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  name: "install",
  aliases: ["i", "download"],
  description: "How to install any package",
  usage: "install {package} {target}",
  type: "messageCreate",
  code: `
  $installCmd[$message[0];$findUser[$message[1]]]
  `
}

export default Command