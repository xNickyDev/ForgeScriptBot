import { CommandType, IBaseCommand } from "@tryforge/forgescript"

const Command: IBaseCommand<CommandType> = {
  type: "ready",
  code: `
  $registerFont[assets/fonts/Gilroy-ExtraBold.ttf]
  $registerFont[assets/fonts/microsoft-yahei.ttf]
  `
}

export default Command