import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "install",
  aliases: ["i", "download"],
  description: "How to install any package",
  usage: "install {package} {target}",
  type: "messageCreate",
  code: `
  $installCmd[$message[0];$findUser[$message[1]]]
  `
})