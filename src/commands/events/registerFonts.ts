import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
  $registerFont[assets/fonts/Gilroy-ExtraBold.ttf]
  $registerFont[assets/fonts/microsoft-yahei.ttf]
  `
})