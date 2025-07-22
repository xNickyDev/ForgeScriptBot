import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "ready",
  code: `
  $registerFont[assets/fonts/Gilroy-ExtraBold.ttf]
  $registerFont[assets/fonts/microsoft-yahei.ttf]
  `
})